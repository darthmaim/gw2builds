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

    render() {
        const {disabled, children, value, active} = this.props;

        const className = disabled ? style.disabledOption : style.option;
        const activeClass = value === active ? style.activeOption : undefined;

        return (
            <div className={cx(className, activeClass)} onClick={this.handleClick}>
                {children}
            </div>
        )
    }
}

Option.contextTypes = {
    selectContext: ContextShape
};

export default Option;
