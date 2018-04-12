import { connect } from 'react-redux';
import { getRarityForSlot, getItemstatIdForSlot } from '../../selectors/gear';
import {
    setSelectedArmorIsAscended, setSelectedArmorItemstatId,
    setSelectedTrinketIsAscended, setSelectedTrinketItemstatId,
    setSelectedMainhandWeaponIsAscended, setSelectedMainhandWeaponItemstatId,
    setSelectedOffhandWeaponIsAscended, setSelectedOffhandWeaponItemstatId
} from '../../actions';
import {
    GEAR_CATEGORY_ARMOR, GEAR_CATEGORY_TRINKET, GEAR_CATEGORY_WEAPON, GEAR_TYPE_WEAPON_OFFHAND,
    RARITY_ASCENDED
} from './Constants';
import Row from './Row';

const mapStateToProps = (state, ownProps) => ({
    rarity: getRarityForSlot(state, ownProps),
    itemstatId: getItemstatIdForSlot(state, ownProps)
});

function dispatchRarityChange(dispatch, type, rarity, slotId) {
    const isAscended = rarity === RARITY_ASCENDED;

    switch(type.category) {
        case GEAR_CATEGORY_ARMOR:
            return dispatch(setSelectedArmorIsAscended({ slotId, isAscended }));
        case GEAR_CATEGORY_TRINKET:
            return dispatch(setSelectedTrinketIsAscended({ slotId, isAscended }));
        case GEAR_CATEGORY_WEAPON:
            return type === GEAR_TYPE_WEAPON_OFFHAND
                ? dispatch(setSelectedOffhandWeaponIsAscended({ slotId, isAscended }))
                : dispatch(setSelectedMainhandWeaponIsAscended({ slotId, isAscended }));
    }

    console.error(`RowContainer.onRarityChange not implemented for type ${type}`);
}

function dispatchItemstatIdChange(dispatch, type, itemstatId, slotId) {
    switch(type.category) {
        case GEAR_CATEGORY_ARMOR:
            return dispatch(setSelectedArmorItemstatId({ slotId, itemstatId }));
        case GEAR_CATEGORY_TRINKET:
            return dispatch(setSelectedTrinketItemstatId({ slotId, itemstatId }));
        case GEAR_CATEGORY_WEAPON:
            return type === GEAR_TYPE_WEAPON_OFFHAND
                ? dispatch(setSelectedOffhandWeaponItemstatId({ slotId, itemstatId }))
                : dispatch(setSelectedMainhandWeaponItemstatId({ slotId, itemstatId }));
    }

    console.error(`RowContainer.onItemstatIdChange not implemented for type ${type}`);
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    onRarityChange: (rarity) => {
        const { id: slotId, type } = ownProps.slot;

        dispatchRarityChange(dispatch, type, rarity, slotId);
    },
    onItemstatIdChange: (itemstatId) => {
        const { id: slotId, type } = ownProps.slot;

        dispatchItemstatIdChange(dispatch, type, itemstatId, slotId);
    },
    onCopyRarity: (rarity) => {
        dispatchRarityChange(dispatch, ownProps.slot.type, rarity, undefined)
    },
    onCopyItemstatId: (itemstatId) => {
        dispatchItemstatIdChange(dispatch, ownProps.slot.type, itemstatId, undefined)
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Row);
