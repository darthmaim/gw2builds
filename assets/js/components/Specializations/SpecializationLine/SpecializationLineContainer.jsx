'use strict';

import { connect } from 'react-redux';
import { getSelectedSpecializationId } from '../../../selectors/specializations';
import SpecializationLine from './SpecializationLine';

const mapStateToProps = (state, ownProps) => ({
    selectedSpecialization: getSelectedSpecializationId(state, ownProps),
    specializations: state.specializations
});

export default connect(mapStateToProps)(SpecializationLine);
