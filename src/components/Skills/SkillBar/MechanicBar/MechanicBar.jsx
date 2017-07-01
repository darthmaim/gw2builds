import PropTypes from 'prop-types';
import React from 'react';
import Professions from './Professions';

const MechanicBar = ({ profession }) => {
    if (!profession) {
        return null;
    }

    const Container = Professions[profession].Container;

    return (
        <Container/>
    );
};

MechanicBar.propTypes = {
    profession: PropTypes.string
};

export default MechanicBar;
