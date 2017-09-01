import React from 'react';
import PropTyes from 'prop-types';
import style from './Select.css';

const Group = ({children, label, onSelect}) => (
    <div className={style.group}>
        <div className={style.groupLabel}>
            {label}
        </div>
        {React.Children.map(children, (opt) => React.cloneElement(opt, {onSelect}))}
    </div>
);

Group.propTypes = {
    label: PropTyes.string.isRequired,
    children: PropTyes.any
};

export default Group;
