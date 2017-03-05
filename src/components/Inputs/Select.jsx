import React from 'react';
import style from './Select.css';

function Select({ children, onChange, value, placeholder }) {
    return (
        <div className={style.wrapper}>
            <select onChange={event => onChange(event.target.value)} value={value || '?'} className={style.select}>
                {!value && placeholder && <option value="?">{placeholder}</option>}
                {children}
            </select>
        </div>
    );
}

Select.propTypes = {
    children: React.PropTypes.node.isRequired,
    onChange: React.PropTypes.func.isRequired,
    value: React.PropTypes.string,
    placeholder: React.PropTypes.string
};

export default Select;