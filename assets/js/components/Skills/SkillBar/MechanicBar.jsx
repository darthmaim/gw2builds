import React from 'react';

const Professions = {
    elementalist: ({onMechanicChange, mechanic}) => (
        <div>
            <button style={{fontWeight: mechanic === 0 ? 'bold' : 'normal'}} onClick={onMechanicChange.bind(this, 0)}>[F1]</button>
            <button style={{fontWeight: mechanic === 1 ? 'bold' : 'normal'}} onClick={onMechanicChange.bind(this, 1)}>[F2]</button>
            <button style={{fontWeight: mechanic === 2 ? 'bold' : 'normal'}} onClick={onMechanicChange.bind(this, 2)}>[F3]</button>
            <button style={{fontWeight: mechanic === 3 ? 'bold' : 'normal'}} onClick={onMechanicChange.bind(this, 3)}>[F4]</button>
        </div>
    )
};

const MechanicBar = props => (Professions[props.profession] ? Professions[props.profession](props) : null);


MechanicBar.propTypes = {
    onMechanicChange: React.PropTypes.func.isRequired,
    profession: React.PropTypes.string,
    mechanic: React.PropTypes.number
};

export default MechanicBar;
