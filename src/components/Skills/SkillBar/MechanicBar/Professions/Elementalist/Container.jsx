import { connect } from 'react-redux';
import { setAttunement } from '~/actions/skills';
import { getActiveAttunement } from '~/selectors/skills/mechanic';
import Elementalist from './Component';

const mapStateToProps = (state, ownProps) => ({
    activeWeaponSet: state.activeWeaponSet,
    attunements: state.attunements,
    activeAttunement: getActiveAttunement(state, ownProps),
    skills: state.skills
});

const mergeProps = (mappedProps, { dispatch }, ownProps) => Object.assign({}, mappedProps, ownProps, {
    onAttunementChange: attunement => {
        dispatch(setAttunement({
            attunement,
            activeWeaponSet: mappedProps.activeWeaponSet
        }));
    }
});

export default connect(mapStateToProps, null, mergeProps)(Elementalist);
