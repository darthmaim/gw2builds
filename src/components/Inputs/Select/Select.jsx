import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import Option from './Option';
import Group from './Group';
import Dropdown from './Dropdown';
import Context from './Context';
import ContextShape from './ContextShape';
import style from './Select.css';

let nextInstanceId = 0;

class Select extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            open: false
        };

        this.instanceId = nextInstanceId++;

        this.handleClick = this.handleClick.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.renderCurrentValue = this.renderCurrentValue.bind(this);
    }

    componentDidUpdate() {
        if(this.state.open && this.ref) {
            this.context.selectContext.showDropdown({
                active: this.props.value,
                children: this.children,
                onSelect: this.onSelect,
                position: this.ref.getBoundingClientRect()
            });
        }
    }

    get children() {
        return this.props.children;
    }

    handleClick() {
        const {open} = this.state;
        const {disabled} = this.props;
        const children = this.children;

        if(open) {
            this.context.selectContext.hideDropdown();
        } else if(disabled || children.length === 0) {
            return;
        }

        this.setState({
            open: !open
        });
    }

    handleKeyDown(e) {
        const {open} = this.state;

        // arrows, space, enter, esc
        if((!open && ((e.which >= 37 && e.which <= 40) || e.which === 32 || e.which === 13)) || (e.which === 27 && open)) {
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

    options(children) {
        const options = [];

        React.Children.forEach(children, (option) => {
            if(option && option.type === Option) {
                options.push(option);
            } else if(option && option.props) {
                this.options(option.props.children).forEach(opt => options.push(opt))
            }
        });

        return options;
    }

    getClassName() {
        const { disabled } = this.props;

        return disabled ? style.disabled : style.select
    }

    render() {
        const { className } = this.props;

        return (
            <div
                role={'combobox'}
                aria-expanded={this.state.open}
                aria-haspopup={this.state.open}
                aria-owns={this.state.open ? 'select-dropdown' : undefined}
                aria-activedescendant={this.state.open ? 'select-dropdown' : 'select-value-' + this.instanceId}
                aria-readonly={this.state.disabled}
                aria-label={this.props['aria-label']}
                aria-labelledby={this.props['aria-labelledby']}
                aria-describedby={this.props['aria-describedby']}
                className={cx(this.getClassName(), className)}
                tabIndex={0}
                ref={(ref) => this.ref = ref}
                onClick={this.handleClick}
                onKeyDown={this.handleKeyDown}
            >
                {this.renderCurrentValue()}
            </div>
        );
    }

    renderCurrentValue() {
        const { placeholder, value } = this.props;

        const options = this.options(this.children);
        const current = options.filter(child => child.props.value === value)[0] || placeholder;

        return (
            <div className={style.currentValue} id={'select-value-' + this.instanceId}>{current}</div>
        )
    }
}

Select.propTypes = {
    children: PropTypes.node.isRequired,
    disabled: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.any,
    placeholder: PropTypes.string,
    className: PropTypes.string
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
Select.Group = Group;
Select.Context = Context;
Select.Dropdown = Dropdown;

export default Select;
