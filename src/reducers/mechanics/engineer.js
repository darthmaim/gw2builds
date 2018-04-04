import { handleActions } from 'redux-actions';
import * as actions from '../../actions';

/** Reducer for available toolbelt skill ids. */
export const availableEngineerToolbeltSkillIds = handleActions({
    [actions.FETCH_AVAILABLE_SKILLS]: (state, action) => {
        return Object.values(action.payload).map(
            (skill) => skill.toolbelt_skill
        ).filter(Boolean);
    },

    [actions.SET_SELECTED_PROFESSION]: () => []
}, []);

export default {
    availableEngineerToolbeltSkillIds
};
