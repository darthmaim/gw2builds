import * as actions from '../actions';
import { handleSimpleAction } from './utils';
import { syncedReducer } from 'redux-sync-reducer';
import { handleActions } from 'redux-actions';

/** The import dialog visible reducer. */
export const importDialogVisible = handleSimpleAction(actions.SET_IMPORT_DIALOG_VISIBLE, false);

/** The api keys reducer. */
export const importApiKeys = syncedReducer(handleActions({
    // Add a new API key
    [actions.ADD_IMPORT_API_KEY]: (state, action) => [action.payload].concat(state),

    // Remove a API key
    [actions.REMOVE_IMPORT_API_KEY]: (state, action) => state.filter(apiKey => apiKey !== action.payload)
}, []), { name: 'apikeys' });

export default {
    importDialogVisible,
    importApiKeys
};
