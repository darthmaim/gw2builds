import React from 'react';
import onClickOutside from 'react-onclickoutside';
import eventPath from '../../../utils/eventPath';
import ContextShape from './ContextShape';
import style from './Select.css';

class Dropdown extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            dropdown: null
        };

        this.handleDropdown = this.handleDropdown.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
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

    startPreventScroll() {
        if(!this.scrollPrevented) {
            window.document.documentElement.className += ' js-select-disable-scroll';
            this.scrollPrevented = true;
        }
    }

    stopPreventScroll() {
        if(this.scrollPrevented) {
            window.document.documentElement.className = window.document.documentElement.className.replace(' js-select-disable-scroll', '');
            this.scrollPrevented = false;
        }
    }

    updateRef(ref) {
        this.ref = ref;
    }

    handleDropdown(dropdown) {
        this.setState({dropdown});
    }

    handleClickOutside() {
        this.state.dropdown && this.state.dropdown.onSelect();
    }

    onSelect(value) {
        this.state.dropdown.onSelect(value);
    }

    render() {
        const {dropdown} = this.state;

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

        return (
            <div className={style.dropdown} style={position} ref={this.updateRef}>
                {React.Children.map(dropdown.children, (opt) => React.cloneElement(opt, {onSelect, active}))}
            </div>
        );
    }
}


Dropdown.contextTypes = {
    selectContext: ContextShape
};

export default onClickOutside(Dropdown);
