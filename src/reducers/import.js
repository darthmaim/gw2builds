import * as actions from '../actions';
import { handleSimpleAction } from './utils';

/** The game mode reducer. */
export const importDialogVisible = handleSimpleAction(actions.SET_IMPORT_DIALOG_VISIBLE, false);

export default {
    importDialogVisible
};
