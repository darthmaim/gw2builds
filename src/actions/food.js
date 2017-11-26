import { createAction } from 'redux-actions';

export const SET_SELECTED_FOOD_ITEM_ID = 'SET_SELECTED_FOOD_ITEM_ID';
export const WIPE_SELECTED_FOOD_ITEM_ID = 'WIPE_SELECTED_FOOD_ITEM_ID';
export const WIPE_ALL_SELECTED_FOOD_ITEM_IDS = 'WIPE_ALL_SELECTED_FOOD_ITEM_IDS';

/** Action to set a selected food item id. Params: { slotId, itemId } */
export const setSelectedFoodItemId = createAction(SET_SELECTED_FOOD_ITEM_ID);

/** Action to wipe a selected food item id. Params: { slotId } */
export const wipeSelectedFoodItemId = createAction(WIPE_SELECTED_FOOD_ITEM_ID);

/** Action to wipe all selected food item ids. Params: { } */
export const wipeAllSelectedFoodItemIds = createAction(WIPE_ALL_SELECTED_FOOD_ITEM_IDS);

export default {
    SET_SELECTED_FOOD_ITEM_ID,
    WIPE_SELECTED_FOOD_ITEM_ID,
    WIPE_ALL_SELECTED_FOOD_ITEM_IDS,

    setSelectedFoodItemId,
    wipeSelectedFoodItemId,
    wipeAllSelectedFoodItemIds
};
