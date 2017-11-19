import { createAction } from 'redux-actions';

export const SET_IMPORT_DIALOG_VISIBLE = 'SET_IMPORT_DIALOG_VISIBLE';
export const ADD_IMPORT_API_KEY = 'ADD_IMPORT_API_KEY';
export const REMOVE_IMPORT_API_KEY = 'REMOVE_IMPORT_API_KEY';

/** Action to set the visibility of the import dialog. Params: { visible } */
export const setImportDialogVisible = createAction(SET_IMPORT_DIALOG_VISIBLE);

/** Action to add a new API key for the import dialog. Params: { apiKey } */
export const addImportApiKey = createAction(ADD_IMPORT_API_KEY);

/** Action to remove a API key for the import dialog. Params: { apiKey } */
export const removeImportApiKey = createAction(REMOVE_IMPORT_API_KEY);

export default {
    SET_IMPORT_DIALOG_VISIBLE,
    ADD_IMPORT_API_KEY,
    REMOVE_IMPORT_API_KEY,

    setImportDialogVisible,
    addImportApiKey,
    removeImportApiKey
};
