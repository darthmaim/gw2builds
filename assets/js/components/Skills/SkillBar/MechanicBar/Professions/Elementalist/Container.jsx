import { connect } from 'react-redux';
import { setActiveAttunement } from '~/actions/skills';
import { getActiveAttunement } from '~/selectors/skills/mechanic';
import Elementalist from './Component';

const mapStateToProps = (state, ownProps) => ({
    // Redux states
    activeAttunement: getActiveAttunement(state, ownProps),
    activeWeaponSet: state.activeWeaponSet,
    availableAttunementObjects: state.availableAttunementObjects,
    availableSkillObjects: state.availableSkillObjects,
    selectedMajorTraitIds: state.selectedMajorTraitIds,
    selectedMinorTraitIds: state.selectedMinorTraitIds
});

const mergeProps = (mappedProps, { dispatch }, ownProps) => Object.assign({}, mappedProps, ownProps, {
    onAttunementChange: attunement => {
        dispatch(setActiveAttunement({
            attunement,
            activeWeaponSet: mappedProps.activeWeaponSet
        }));
    }
});

export default connect(mapStateToProps, null, mergeProps)(Elementalist);
