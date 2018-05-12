import * as actions from '../actions';
import { handleSimpleAction } from './utils';
import { syncedReducer } from 'redux-sync-reducer';
import { combineReducers } from 'redux';

export const settings = syncedReducer(combineReducers({
    showIds: handleSimpleAction(actions.SET_SETTINGS_SHOW_IDS, false, 'showIds')
}), { name: 'settings' });

export default {
    settings
};
