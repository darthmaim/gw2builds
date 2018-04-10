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

const mapDispatchToProps = (dispatch, ownProps) => ({
    onRarityChange: (rarity) => {
        const isAscended = rarity === RARITY_ASCENDED;
        const { id: slotId, type } = ownProps.slot;

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
    },
    onItemstatIdChange: (itemstatId) => {
        const { id: slotId, type } = ownProps.slot;

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
});

export default connect(mapStateToProps, mapDispatchToProps)(Row);
