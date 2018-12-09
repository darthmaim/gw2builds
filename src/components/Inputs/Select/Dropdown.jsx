import React from 'react';
import onClickOutside from 'react-onclickoutside';
import ContextShape from './ContextShape';
import Option from './Option';
import style from './Select.module.css';

class Dropdown extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            dropdown: null,
            values: [],
            highlightedValue: undefined,
            showFilter: false,
            filter: ''
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

    getValues(children) {
        return React.Children.toArray(children).reduce((values, child) => {
            if(child && child.type === Option) {
                if(!child.props.disabled && this.matchesFilter(child)) {
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
            highlightedValue: undefined,
            showFilter: false,
            filter: ''
        });
    }

    handleClickOutside() {
        this.state.dropdown && this.state.dropdown.onSelect();
    }

    handleKeyDown(e) {
        const {highlightedValue, dropdown, showFilter} = this.state;

        const values = this.getValues(dropdown.children);
        const currentHighlightIndex = values.indexOf(highlightedValue || dropdown.active);

        switch(e.which) {
            case 37: // ARROW_LEFT
            case 38: // ARROW_UP
                e.preventDefault();
                return this.setState({
                    highlightedValue: currentHighlightIndex !== -1
                        ? values[(values.length + currentHighlightIndex - 1) % values.length]
                        : values[values.length - 1]
                });
            case 39: // ARROW_RIGHT
            case 40: // ARROW_DOWN
                e.preventDefault();
                return this.setState({
                    highlightedValue: values[(currentHighlightIndex + 1) % values.length]
                });
            //case 32: // SPACE
            case 13: // ENTER
                e.preventDefault();
                dropdown.onSelect(highlightedValue);
        }

        // check if the key was an alphanumeric character
        const filter = String.fromCharCode(e.charCode || e.which);

        // show the filter input
        if(!showFilter && filter.match(/^[\w ]+$/)) {
            this.setState({ showFilter: true, filter });
            e.preventDefault();
        }
    }

    onSelect(value) {
        this.state.dropdown.onSelect(value);
    }

    matchesFilter(opt) {
        // ignore case of the filter
        const filter = this.state.filter.toLowerCase();

        // show all options if no filter is set
        if(!filter) {
            return true;
        }

        // if the option has keywords set, check if any of them match the filter,
        // otherwise check the option value
        return opt.props.keywords
            ? opt.props.keywords.some((keyword) => keyword.toLowerCase().indexOf(filter) !== -1)
            : opt.props.value.toString().toLowerCase().indexOf(filter) !== -1;
    }

    render() {
        const {dropdown, highlightedValue, showFilter, filter} = this.state;

        if(!dropdown) {
            // we need to always return a DOM node for react-onclickoutside
            return <div/>;
        }

        const directionBottom = window.innerHeight - dropdown.position.bottom > 200;
        const directionRight = window.innerWidth - dropdown.position.right > 120;

        const position = {
            top: directionBottom ? dropdown.position.bottom : 'auto',
            bottom: directionBottom ? 'auto' : window.innerHeight - dropdown.position.top,
            left: directionRight ? dropdown.position.left : 'auto',
            right: directionRight ? 'auto' : window.innerWidth - dropdown.position.right,
            minWidth: dropdown.position.width,
            maxWidth: directionRight
                ? `calc(100% - calc(20px + ${dropdown.position.left}px))`
                : `calc(100% - calc(20px + ${window.innerWidth - dropdown.position.right}px)`,
            maxHeight: directionBottom
                ? `calc(100% - calc(20px + ${dropdown.position.bottom}px))`
                : `calc(100% - calc(20px + ${window.innerHeight - dropdown.position.top}px))`
        };

        const onSelect = this.onSelect;
        const active = dropdown.active;
        const highlight = highlightedValue;

        return (
            <div className={style.dropdown} style={position} ref={this.updateRef} id={'select-dropdown'}>
                {showFilter && (<div className={style.filter}>
                    <input autoFocus className={style.filterInput} type="text" value={filter} onChange={e => this.setState({ filter: e.target.value })}/>
                </div>)}
                <div className={style.options}>
                    {React.Children.map(dropdown.children,
                        (opt) => this.matchesFilter(opt) && React.cloneElement(opt, {onSelect, active, highlight})
                    )}
                </div>
            </div>
        );
    }
}

Dropdown.contextTypes = {
    selectContext: ContextShape
};

export default onClickOutside(Dropdown);
