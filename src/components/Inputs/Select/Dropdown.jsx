import React from 'react';
import onClickOutside from 'react-onclickoutside';
import ContextShape from './ContextShape';
import Option from './Option';
import style from './Select.css';

class Dropdown extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            dropdown: null,
            values: [],
            highlightedValue: undefined
        };

        this.handleDropdown = this.handleDropdown.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.updateRef = this.updateRef.bind(this);

        this.scrollPrevented = false;
    }

    componentDidMount() {
        this.context.selectContext.addListener(this.handleDropdown);
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.state.dropdown && !prevState.dropdown) {
            this.startPreventScroll();

            if(this.ref) {
                this.ref.scrollTop = 0;
            }
        } else if(!this.state.dropdown && prevState.dropdown) {
            this.stopPreventScroll();
        }
    }

    componentWillUnmount() {
        this.stopPreventScroll();
    }

    values(children) {
        return React.Children.toArray(children).reduce((values, child) => {
            if(child && child.type === Option) {
                if(!child.props.disabled) {
                    return [...values, child.props.value];
                }
            } else if(child && child.props) {
                return [...values, ...this.values(child.props.children)];
            }
            return values;
        }, []);
    }

    startPreventScroll() {
        if(!this.scrollPrevented) {
            window.document.documentElement.className += ' js-select-disable-scroll';
            window.document.addEventListener('keydown', this.handleKeyDown);
            this.scrollPrevented = true;
        }
    }

    stopPreventScroll() {
        if(this.scrollPrevented) {
            window.document.documentElement.className = window.document.documentElement.className.replace(' js-select-disable-scroll', '');
            window.document.removeEventListener('keydown', this.handleKeyDown);
            this.scrollPrevented = false;
        }
    }

    updateRef(ref) {
        this.ref = ref;
    }

    handleDropdown(dropdown) {
        this.setState({
            dropdown,
            values: dropdown ? this.values(dropdown.children) : [],
            highlightedValue: undefined
        });
    }

    handleClickOutside() {
        this.state.dropdown && this.state.dropdown.onSelect();
    }

    handleKeyDown(e) {
        const {values, highlightedValue, dropdown} = this.state;

        const currentHighlightIndex = values.indexOf(highlightedValue || dropdown.active);

        switch(e.which) {
            case 37:
            case 38:
                e.preventDefault();
                return this.setState({
                    highlightedValue: currentHighlightIndex !== -1
                        ? values[(values.length + currentHighlightIndex - 1) % values.length]
                        : values[values.length - 1]
                });
            case 39:
            case 40:
                e.preventDefault();
                return this.setState({
                    highlightedValue: values[(currentHighlightIndex + 1) % values.length]
                });
            case 32:
            case 13:
                e.preventDefault();
                dropdown.onSelect(highlightedValue);
        }
    }

    onSelect(value) {
        this.state.dropdown.onSelect(value);
    }

    render() {
        const {dropdown, values, highlightedValue} = this.state;

        if(!dropdown) {
            // we need to always return a DOM node for react-onclickoutside
            return <div/>;
        }

        const directionBottom = window.innerHeight - dropdown.position.bottom > 200;

        const position = {
            top: directionBottom ? dropdown.position.bottom : 'auto',
            bottom: directionBottom ? 'auto' : window.innerHeight - dropdown.position.top,
            left: dropdown.position.left,
            right: 'auto',
            minWidth: dropdown.position.width,
            maxWidth: `calc(100% - calc(20px + ${dropdown.position.left}px))`,
            maxHeight: directionBottom
                ? `calc(100% - calc(20px + ${dropdown.position.bottom}px))`
                : `calc(100% - calc(20px + ${window.innerHeight - dropdown.position.top}px))`
        };

        const onSelect = this.onSelect;
        const active = dropdown.active;
        const highlight = highlightedValue;

        return (
            <div className={style.dropdown} style={position} ref={this.updateRef} id={'select-dropdown'}>
                {React.Children.map(dropdown.children, (opt) => React.cloneElement(opt, {onSelect, active, highlight}))}
            </div>
        );
    }
}

Dropdown.contextTypes = {
    selectContext: ContextShape
};

export default onClickOutside(Dropdown);
