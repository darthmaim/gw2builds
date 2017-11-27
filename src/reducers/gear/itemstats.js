import { handleSimpleAction } from '../utils';
import * as actions from '../../actions';

/** Reducer for the selected armor itemstat ids. */
export const availableItemstats = handleSimpleAction(actions.FETCH_AVAILABLE_ITEMSTATS, []);

export default {
    availableItemstats
};
