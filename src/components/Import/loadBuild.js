import { setImportDialogVisible } from '../../actions';
import { loadBuild as load } from '../../utils/build-string'
import { setIsLoading } from '../../actions';
import { api } from '../../utils/api';
import keyBy from 'lodash/fp/keyBy';

export const TYPE_PVE = 'pve';
export const TYPE_PVP = 'pvp';
export const TYPE_WVW = 'wvw';

export default (dispatch, state) => (type, { character }) => {
    console.log(`Loading ${type} build of ${character.name}`);
    dispatch(setIsLoading({ loading: true }));

    const itemIds = character.equipment.map(({id}) => id);

    api.items().many(itemIds).then((items) => {
        const itemsById = keyBy(i => i.id)(items);
        const equipmentSlots = keyBy(i => i.slot)(character.equipment.map(i => ({...i, item: itemsById[i.id]})));

        const weaponType = (slot) => {
            const weapon = equipmentSlots[slot] ? equipmentSlots[slot].item.details.type : undefined;
            switch(weapon) {
                case 'Harpoon': return 'Spear';
                case 'LongBow': return 'Longbow';
                default: return weapon;
            }
        };

        const specialization = (index) => {
            const spec = character.specializations[type][index];

            return spec ? {
                specialization: spec.id,
                majorTrait1: spec.traits[0],
                majorTrait2: spec.traits[1],
                majorTrait3: spec.traits[2],
            } : undefined;
        };

        const build = {
            general: {
                gameMode: type,
                profession: character.profession,
                race: character.race
            },
            specialization1: specialization(0),
            specialization2: specialization(1),
            specialization3: specialization(2),
            weapons: {
                weaponA1: weaponType('WeaponA1'),
                weaponA2: weaponType('WeaponA2'),
                weaponB1: weaponType('WeaponB1'),
                weaponB2: weaponType('WeaponB2'),
                aquaticA: weaponType('WeaponAquaticA'),
                aquaticB: weaponType('WeaponAquaticB')
            },
            skills: {
                healing: character.skills[type].heal,
                utility1: character.skills[type].utilities[0],
                utility2: character.skills[type].utilities[1],
                utility3: character.skills[type].utilities[2],
                elite:  character.skills[type].elite
            }
        };

        if(character.profession === 'Revenant') {
            build.professionRevenant = {
                legendA: character.skills[type].legends[0],
                legendB: character.skills[type].legends[1]
            }
        }

        console.log(build);

        load(dispatch, build);
    });

    dispatch(setImportDialogVisible(false));
}
