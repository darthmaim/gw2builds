import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import Option from './Option';
import Dropdown from './Dropdown';
import Context from './Context';
import ContextShape from './ContextShape';
import style from './Select.css';

class Select extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            open: false
        };

        this.handleBlur = this.handleBlur.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.onSelect = this.onSelect.bind(this);
    }

    componentDidUpdate() {
        if(this.state.open && this.ref) {
            this.context.selectContext.showDropdown({
                children: this.props.children,
                onSelect: this.onSelect,
                position: this.ref.getBoundingClientRect()
            });
        }
    }

    handleBlur() {
        return;

        const {open} = this.state;

        if(!open) {
            return;
        }

        this.context.selectContext.hideDropdown();
        this.setState({ open: false });
    }

    handleClick() {
        const {open} = this.state;
        const {children, disabled} = this.props;

        if(open) {
            this.context.selectContext.hideDropdown()
        } else if(disabled || children.length === 0) {
            return;
        }

        this.setState({
            open: !open
        });
    }

    handleKeyDown(e) {
        const {open} = this.state;

        // space, enter, arrow down, esc
        if(e.which === 32 || e.which === 13 || e.which === 40 || (e.which === 27 && open)) {
            this.handleClick();

            e.preventDefault();
        }

        // tab
        if(e.which === 9 && open) {
            this.handleClick();
        }
    }

    onSelect(value) {
        this.setState({
            open: false,
        });

        if(value !== undefined) {
            this.props.onChange(value);
        }

        this.context.selectContext.hideDropdown();
        this.ref.focus();
    }

    render() {
        const {className, children, disabled, placeholder, value} = this.props;

        const current = children.filter(child => child.props.value === value)[0] || placeholder;

        return (
            <div
                className={cx(disabled ? style.disabled : style.select, className)}
                tabIndex={0}
                ref={(ref) => this.ref = ref}
                onBlur={this.handleBlur}
                onClick={this.handleClick}
                onKeyDown={this.handleKeyDown}
            >
                <div className={style.currentValue}>{current}</div>
            </div>
        );
    }
}

Select.propTypes = {
    children: PropTypes.node.isRequired,
    disabled: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.any,
    placeholder: PropTypes.string
};

Select.defaultProps = {
    disabled: false,
    onChange: () => {}
};

Select.contextTypes = {
    selectContext: ContextShape
};

Select.childContextTypes = {
    onSelect: PropTypes.func
};

Select.Option = Option;
Select.Context = Context;
Select.Dropdown = Dropdown;

export default Select;
