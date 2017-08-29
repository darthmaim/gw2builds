import React from 'react';
import onClickOutside from 'react-onclickoutside';
import eventPath from '../../../utils/eventPath';
import ContextShape from './ContextShape';
import style from './Select.css';

const wheelEvents = ['mousewheel', 'DOMMouseScroll'];

class Dropdown extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            dropdown: null
        };

        this.handleDropdown = this.handleDropdown.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.preventDefault = this.preventDefault.bind(this);
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
            wheelEvents.forEach((event) => window.document.addEventListener(event, this.preventDefault));
            this.scrollPrevented = true;
        }
    }

    stopPreventScroll() {
        if(this.scrollPrevented) {
            wheelEvents.forEach((event) => window.document.removeEventListener(event, this.preventDefault));
            this.scrollPrevented = false;
        }
    }

    preventDefault(e) {
        if(this.ref && eventPath(e).indexOf(this.ref) !== -1) {
            return;
        }

        e.preventDefault();
        return false;
    }

    updateRef(ref) {
        this.ref = ref;

        if(ref) {
            wheelEvents.forEach((event) => ref.addEventListener(event, this.handleScroll));
        }
    }

    handleDropdown(dropdown) {
        this.setState({dropdown});
    }

    handleClickOutside() {
        this.state.dropdown && this.state.dropdown.onSelect();
    }

    handleScroll(e) {
        const scrollHeight = this.ref.scrollHeight;
        const scrollTop = this.ref.scrollTop;
        const height = this.ref.offsetHeight;
        const delta = e.type === 'DOMMouseScroll' ? e.detail * -40 : e.wheelDelta;
        const up = delta > 0;

        if(!up && -delta > scrollHeight - height - scrollTop) {
            this.ref.scrollTop = scrollHeight;
            e.preventDefault();
        } else if(up && delta > scrollTop) {
            this.ref.scrollTop = 0;
            e.preventDefault();
        }
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

        return (
            <div className={style.dropdown} style={position} ref={this.updateRef}>
                {dropdown.children.map((opt) => React.cloneElement(opt, {
                    onSelect: this.onSelect
                }))}
            </div>
        );
    }
}


Dropdown.contextTypes = {
    selectContext: ContextShape
};

export default onClickOutside(Dropdown);
