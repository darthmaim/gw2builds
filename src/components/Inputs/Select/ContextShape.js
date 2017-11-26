import PropTypes from 'prop-types';

export default PropTypes.shape({
    showDropdown: PropTypes.func.isRequired,
    hideDropdown: PropTypes.func.isRequired,
    addListener: PropTypes.func.isRequired
});
