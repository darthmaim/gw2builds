import { combineActions, handleAction, handleActions } from 'redux-actions';
import * as actions from '../../actions';

/** Reducer for the selected armor itemstat ids. */
export const selectedArmorItemstatIds = handleActions({
    // Set the itemstat of a piece of armor
    [actions.SET_SELECTED_ARMOR_ITEMSTAT_ID]: (state, action) => {
        if(action.payload.slotId !== undefined) {
            const newState = state.slice();
            newState[action.payload.slotId] = action.payload.itemstatId;
            return newState;
        } else {
            return state.map(_ => action.payload.itemstatId);
        }
    },

    // Reset the itemstat of a piece of armor
    [combineActions(actions.WIPE_SELECTED_ARMOR_ITEMSTAT_ID, actions.SET_SELECTED_GAMEMODE)](state, action) {
        const newState = state.slice();
        newState[action.payload.slotId] = undefined;
        return newState;
    }
}, [undefined, undefined, undefined, undefined, undefined, undefined, undefined]);

/** Reducer for the armor ascended flag. */
export const selectedArmorIsAscended = handleAction(
    combineActions(actions.SET_SELECTED_ARMOR_ISASCENDED, actions.SET_SELECTED_GAMEMODE), (state, action) => {
        // Set the ascended flag on a piece of armor
        if(action.payload.slotId !== undefined) {
            const newState = state.slice();
            newState[action.payload.slotId] = action.payload.isAscended;
            return newState;
        } else {
            return state.map(_ => action.payload.isAscended);
        }
    }, [false, false, false, false, false, false, false]);

/** Reducer for the selected armor upgrade item ids. */
export const selectedArmorUpgradeIds = handleActions({
    // Set the upgrade item of a piece of armor
    [actions.SET_SELECTED_ARMOR_UPGRADE_ID]: (state, action) => {
        const newState = state.slice();
        newState[action.payload.slotId] = action.payload.itemId;
        return newState;
    },

    // Reset the upgrade item of a piece of armor
    [combineActions(actions.WIPE_SELECTED_ARMOR_UPGRADE_ID, actions.SET_SELECTED_GAMEMODE)](state, action) {
        const newState = state.slice();
        newState[action.payload.slotId] = undefined;
        return newState;
    }
}, []);

/** Reducer for the selected armor infusion item ids. */
export const selectedArmorInfusionIds = handleActions({
    // Set the infusion item of a piece of armor
    [actions.SET_SELECTED_ARMOR_INFUSION_ID]: (state, action) => {
        const newState = state.slice();
        newState[action.payload.slotId] = action.payload.itemId;
        return newState;
    },

    // Reset the infusion item of a piece of armor
    [combineActions(actions.WIPE_SELECTED_ARMOR_INFUSION_ID, actions.SET_SELECTED_GAMEMODE)](state, action) {
        const newState = state.slice();
        newState[action.payload.slotId] = undefined;
        return newState;
    },
    [actions.SET_SELECTED_ARMOR_ISASCENDED]: (state, action) => {
        if (!action.payload.isAscended) {
            // Non-ascended armor pieces don't allow infusions
            const newState = state.slice();
            newState[action.payload.slotId] = undefined;
            return newState;
        }
        return state;
    }
}, []);

/** Reducer for the selected PvP amulet id. */
export const selectedPvpAmuletId = handleActions({
    // Set the PvP amulet item
    [actions.SET_SELECTED_PVP_AMULET_ID]: (state, action) => action.payload.amuletId,

    // Reset the PvP amulet item
    [combineActions(actions.WIPE_SELECTED_PVP_AMULET_ID, actions.SET_SELECTED_GAMEMODE)]() { return null; }
}, null);

/** Reducer for the selected PvP armor upgrade item id. */
export const selectedPvpArmorUpgradeId = handleActions({
    // Set the PvP armor upgrade item
    [actions.SET_SELECTED_PVP_ARMOR_UPGRADE_ID]: (state, action) => action.payload.itemId,

    // Reset the PvP armor upgrade item
    [combineActions(actions.WIPE_SELECTED_PVP_ARMOR_UPGRADE_ID, actions.SET_SELECTED_GAMEMODE)]() { return null; }
}, null);

export default {
    selectedArmorItemstatIds,
    selectedArmorIsAscended,
    selectedArmorUpgradeIds,
    selectedArmorInfusionIds,
    selectedPvpAmuletId,
    selectedPvpArmorUpgradeId
};
