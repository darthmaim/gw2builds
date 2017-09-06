import React from 'react';
import cx from 'classnames';
import ContextShape from './ContextShape';
import style from './Select.css';

class Option extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        const {disabled, value, onSelect} = this.props;

        if(!disabled && onSelect) {
            onSelect(value);
        }
    };

    componentDidUpdate() {
        if(this.ref && this.props.highlight === this.props.value) {
            if(this.ref.scrollIntoViewIfNeeded) {
                this.ref.scrollIntoViewIfNeeded();
            } else {
                this.ref.scrollIntoView();
            }
        }
    }

    render() {
        const {disabled, children, value, active, highlight} = this.props;

        const optionClass = disabled ? style.disabledOption : style.option;
        const activeClass = value === active ? style.activeOption : undefined;
        const highlightClass = value === highlight ? style.highlightOption : undefined;
        const className = cx(optionClass, activeClass, highlightClass);

        return (
            <div className={className} onClick={this.handleClick} ref={(ref) => this.ref = ref}>
                {children}
            </div>
        )
    }
}

Option.contextTypes = {
    selectContext: ContextShape
};

export default Option;
