import { setImportDialogVisible } from '../../actions';
import { loadBuild as load } from '../../utils/build-string'
import { api } from '../../utils/api';
import keyBy from 'lodash/fp/keyBy';

export const TYPE_PVE = 'pve';
export const TYPE_PVP = 'pvp';
export const TYPE_WVW = 'wvw';

export default (dispatch, state) => (type, { character }) => {
    console.log(`Loading ${type} build of ${character.name}`);

    const itemIds = character.equipment.map(({id}) => id);

    api.items().many(itemIds).then((items) => {
        const itemsById = keyBy(i => i.id)(items);
        const equipmentSlots = keyBy(i => i.slot)(character.equipment.map(i => ({...i, item: itemsById[i.id]})));

        const weaponType = (slot) => {
            const weapon = equipmentSlots[slot] ? equipmentSlots[slot].item.details.type : undefined;
            switch(weapon) {
                case 'Harpoon': return 'Spear';
                default: return weapon;
            }
        };

        const build = {
            general: {
                gameMode: type,
                profession: character.profession,
                race: character.race
            },
            specialization1: {
                specialization: character.specializations[type][0].id,
                majorTrait1: character.specializations[type][0].traits[0],
                majorTrait2: character.specializations[type][0].traits[1],
                majorTrait3: character.specializations[type][0].traits[2],
            },
            specialization2: {
                specialization: character.specializations[type][1].id,
                majorTrait1: character.specializations[type][1].traits[0],
                majorTrait2: character.specializations[type][1].traits[1],
                majorTrait3: character.specializations[type][1].traits[2],
            },
            specialization3: {
                specialization: character.specializations[type][2].id,
                majorTrait1: character.specializations[type][2].traits[0],
                majorTrait2: character.specializations[type][2].traits[1],
                majorTrait3: character.specializations[type][2].traits[2],
            },
            weapons: {
                weaponA1: weaponType('WeaponA1'),
                weaponA2: weaponType('WeaponA2'),
                weaponB1: weaponType('WeaponB1'),
                weaponB2: weaponType('WeaponB2'),
                aquaticA: weaponType('WeaponAquaticA'),
                aquaticB: weaponType('WeaponAquaticB')
            },
        };

        console.log(build);

        load(dispatch, build);
    });

    dispatch(setImportDialogVisible(false));
}
