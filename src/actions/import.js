import { createAction } from 'redux-actions';

export const SET_IMPORT_DIALOG_VISIBLE = 'SET_IMPORT_DIALOG_VISIBLE';

/** Action to set the visibility of the import dialog. Params: { visible } */
export const setImportDialogVisible = createAction(SET_IMPORT_DIALOG_VISIBLE);

export default {
    SET_IMPORT_DIALOG_VISIBLE,

    setImportDialogVisible
};
