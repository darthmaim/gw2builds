import { connect } from 'react-redux';
import { getRarityForSlot, getItemstatIdForSlot } from '../../selectors/gear';
import { setSelectedArmorIsAscended, setSelectedTrinketIsAscended } from '../../actions';
import Row from './Row';
import { GEAR_CATEGORY_ARMOR, GEAR_CATEGORY_TRINKET, GEAR_CATEGORY_WEAPON, RARITY_ASCENDED } from './Constants';
import { setSelectedArmorItemstatId } from '../../actions/gear/armor';
import { setSelectedTrinketItemstatId } from '../../actions/gear/trinkets';

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
        }

        console.error(`RowContainer.onItemstatIdChange not implemented for type ${type}`);
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Row);
