import React from 'react';
import style from './Select.css';

function Select({children, onChange, value}) {
    return (
        <div className={style.wrapper}>
            <select onChange={onChange} value={value} className={style.select}>
                {children}
            </select>
        </div>
    );
}

Select.propTypes = {
    children: React.PropTypes.node.isRequired,
    onChange: React.PropTypes.func.isRequired,
    value: React.PropTypes.string.isRequired,
};

export default Select;
