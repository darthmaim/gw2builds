import PropTypes from 'prop-types';
import React from 'react';
import style from './Select.css';

function Select({ children, onChange, value, placeholder }) {
    return (
        <div className={style.wrapper}>
            <select onChange={event => onChange(event.target.value)} value={value || '?'} className={!value && placeholder ? style.placeholder : style.select}>
                {!value && placeholder && <option value="?" disabled>{placeholder}</option>}
                {children}
            </select>
        </div>
    );
}

Select.propTypes = {
    children: PropTypes.node.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string,
    placeholder: PropTypes.string
};

Select.defaultProps = {
    onChange: () => {}
};

export default Select;
