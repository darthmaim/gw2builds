import { connect } from 'react-redux';
import { getAvailableItemstatsForSlot, getRarityForSlot, getRarities, armorSlots, trinketSlots } from '../../selectors/gear';
import { setSelectedArmorIsAscended, setSelectedTrinketIsAscended } from '../../actions';
import Row from './Row';

const mapStateToProps = (state, ownProps) => ({
    availableItemstats: getAvailableItemstatsForSlot(state, ownProps),
    rarity: getRarityForSlot(state, ownProps),
    rarities: getRarities(state, ownProps)
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    onRarityChange: (rarity) => {
        const isAscended = rarity === 'Ascended';
        if(ownProps.type === 'Armor') {
            const slotId = armorSlots.indexOf(ownProps.slot);
            dispatch(setSelectedArmorIsAscended({ slotId, isAscended }));
        } else if(ownProps.type === 'Back') {
            dispatch(setSelectedTrinketIsAscended({ slotId: 0, isAscended }));
        } else if(ownProps.type === 'Trinket') {
                const slotId = trinketSlots.indexOf(ownProps.slot);
                dispatch(setSelectedTrinketIsAscended({ slotId, isAscended }));
        } else {
            console.error(`RowContainer.onRarityChange not implemented for type ${ownProps.type}`);
        }
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Row);
