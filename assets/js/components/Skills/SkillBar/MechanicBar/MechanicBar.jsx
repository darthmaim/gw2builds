import React from 'react';
import Professions from './Professions';

const MechanicBar = ({ selectedProfession }) => {
    if (!selectedProfession) {
        return null;
    }

    const Container = Professions[selectedProfession];

    return (
        <Container/>
    );
};

MechanicBar.propTypes = {
    selectedProfession: React.PropTypes.string
};

export default MechanicBar;
