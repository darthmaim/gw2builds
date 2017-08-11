import PropTypes from 'prop-types';
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
    selectedProfession: PropTypes.string
};

export default MechanicBar;
