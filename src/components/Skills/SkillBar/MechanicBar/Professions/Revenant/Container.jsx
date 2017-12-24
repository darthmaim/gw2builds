import { connect } from 'react-redux';
import { getAttributeHealth } from '../../../../../../selectors/attributes';
import Revenant from './Component';
import { setSelectedRevenantLegendId } from '../../../../../../actions';

const mapStateToProps = (state, ownProps) => ({
    availableSkillObjects: state.availableSkillObjects,
    availableRevenantLegends: state.availableRevenantLegends,
    selectedRevenantLegendIds: state.selectedRevenantLegendIds
});

const mapDispatchToProps = {
    setSelectedRevenantLegendId: setSelectedRevenantLegendId
};

export default connect(mapStateToProps, mapDispatchToProps)(Revenant);
