import { serialize, deserialize } from 'gw2be-build-string';
import { setSelectedGameMode, setSelectedProfession, setSelectedRace } from '../actions/general';
import { setSelectedArmorItemstatId, setSelectedArmorIsAscended, setSelectedTrinketItemstatId, setSelectedTrinketIsAscended, setSelectedMainhandWeaponItemstatId, setSelectedMainhandWeaponIsAscended, setSelectedOffhandWeaponItemstatId, setSelectedOffhandWeaponIsAscended } from '../actions/gear';
import { setSelectedElementalistAttunementId, setSelectedWeaverPreviousAttunementId, setSelectedRangerPetId, setSelectedRevenantLegendId } from '../actions/mechanics';
import { setSelectedMainhandWeaponId, setSelectedOffhandWeaponId, setSelectedSkillId } from '../actions/skills';
import { setSelectedSpecializationId } from '../actions/specializations';
import { setSelectedMajorTraitId } from '../actions/traits';

/**
 * Initializes a build.
 * @param {String} buildString - The build string.
 * @return {Promise|undefined} Promise or undefined.
 */
export function initializeBuildFromString(store, buildString) {
    const dispatch = store.dispatch;
    let build;

    try {
        build = deserialize(buildString);
    } catch (e) {
        return Promise.reject(e);
    }

    if (!build) {
        return Promise.reject(new Error('Invalid build string'));
    }

    const disp = (propName, prop, action, creator = (v, p, n) => ({ [n]: v })) => {
        if (prop && prop[propName]) {
            return dispatch(action(creator(prop[propName], prop, propName)));
        }
    };

    return Promise.all([
        // General
        disp('gameMode', build.general, setSelectedGameMode),
        disp('profession', build.general, setSelectedProfession),
        disp('race', build.general, setSelectedRace)
    ]).then(() => {
        const specializations = store.getState().availableSpecializationObjects;
        return Promise.all([
            // Specializations
            disp('specialization', build.specialization1, setSelectedSpecializationId, id => ({ specializationLine: 0, specializationId: id, specializations })),
            disp('specialization', build.specialization2, setSelectedSpecializationId, id => ({ specializationLine: 1, specializationId: id, specializations })),
            disp('specialization', build.specialization3, setSelectedSpecializationId, id => ({ specializationLine: 2, specializationId: id, specializations }))
        ]);
    }).then(() => {
        return Promise.all([
            // Weapon stats
            disp('weaponA1', build.gearStats, setSelectedMainhandWeaponItemstatId, id => ({ slotId: 0, itemstatId: id })),
            disp('weaponA2', build.gearStats, setSelectedOffhandWeaponItemstatId, id => ({ slotId: 0, itemstatId: id })),
            disp('weaponB1', build.gearStats, setSelectedMainhandWeaponItemstatId, id => ({ slotId: 1, itemstatId: id })),
            disp('weaponB2', build.gearStats, setSelectedOffhandWeaponItemstatId, id => ({ slotId: 1, itemstatId: id })),
            disp('weaponAquaticA', build.gearStats, setSelectedMainhandWeaponItemstatId, id => ({ slotId: 2, itemstatId: id })),
            disp('weaponAquaticB', build.gearStats, setSelectedMainhandWeaponItemstatId, id => ({ slotId: 3, itemstatId: id })),
            disp('weaponA1', build.gearStats.ascendedFlags, setSelectedMainhandWeaponIsAscended, flag => ({ slotId: 0, isAscended: flag })),
            disp('weaponA2', build.gearStats.ascendedFlags, setSelectedOffhandWeaponIsAscended, flag => ({ slotId: 0, isAscended: flag })),
            disp('weaponB1', build.gearStats.ascendedFlags, setSelectedMainhandWeaponIsAscended, flag => ({ slotId: 1, isAscended: flag })),
            disp('weaponB2', build.gearStats.ascendedFlags, setSelectedOffhandWeaponIsAscended, flag => ({ slotId: 1, isAscended: flag })),
            disp('weaponAquaticA', build.gearStats.ascendedFlags, setSelectedMainhandWeaponIsAscended, flag => ({ slotId: 2, isAscended: flag })),
            disp('weaponAquaticB', build.gearStats.ascendedFlags, setSelectedMainhandWeaponIsAscended, flag => ({ slotId: 3, isAscended: flag })),

            // Armor stats
            disp('helm', build.gearStats, setSelectedArmorItemstatId, id => ({ slotId: 0, itemstatId: id })),
            disp('shoulders', build.gearStats, setSelectedArmorItemstatId, id => ({ slotId: 1, itemstatId: id })),
            disp('coat', build.gearStats, setSelectedArmorItemstatId, id => ({ slotId: 2, itemstatId: id })),
            disp('gloves', build.gearStats, setSelectedArmorItemstatId, id => ({ slotId: 3, itemstatId: id })),
            disp('leggings', build.gearStats, setSelectedArmorItemstatId, id => ({ slotId: 4, itemstatId: id })),
            disp('boots', build.gearStats, setSelectedArmorItemstatId, id => ({ slotId: 5, itemstatId: id })),
            disp('helmAquatic', build.gearStats, setSelectedArmorItemstatId, id => ({ slotId: 6, itemstatId: id })),
            disp('helm', build.gearStats.ascendedFlags, setSelectedArmorIsAscended, flag => ({ slotId: 0, isAscended: flag })),
            disp('shoulders', build.gearStats.ascendedFlags, setSelectedArmorIsAscended, flag => ({ slotId: 1, isAscended: flag })),
            disp('coat', build.gearStats.ascendedFlags, setSelectedArmorIsAscended, flag => ({ slotId: 2, isAscended: flag })),
            disp('gloves', build.gearStats.ascendedFlags, setSelectedArmorIsAscended, flag => ({ slotId: 3, isAscended: flag })),
            disp('leggings', build.gearStats.ascendedFlags, setSelectedArmorIsAscended, flag => ({ slotId: 4, isAscended: flag })),
            disp('boots', build.gearStats.ascendedFlags, setSelectedArmorIsAscended, flag => ({ slotId: 5, isAscended: flag })),
            disp('helmAquatic', build.gearStats.ascendedFlags, setSelectedArmorIsAscended, flag => ({ slotId: 6, isAscended: flag })),

            // Trinket stats
            disp('backpack', build.gearStats, setSelectedTrinketItemstatId, id => ({ slotId: 0, itemstatId: id })),
            disp('accessory1', build.gearStats, setSelectedTrinketItemstatId, id => ({ slotId: 1, itemstatId: id })),
            disp('accessory2', build.gearStats, setSelectedTrinketItemstatId, id => ({ slotId: 2, itemstatId: id })),
            disp('amulet', build.gearStats, setSelectedTrinketItemstatId, id => ({ slotId: 3, itemstatId: id })),
            disp('ring1', build.gearStats, setSelectedTrinketItemstatId, id => ({ slotId: 4, itemstatId: id })),
            disp('ring2', build.gearStats, setSelectedTrinketItemstatId, id => ({ slotId: 5, itemstatId: id })),
            disp('backpack', build.gearStats.ascendedFlags, setSelectedTrinketIsAscended, flag => ({ slotId: 0, isAscended: flag })),
            disp('accessory1', build.gearStats.ascendedFlags, setSelectedTrinketIsAscended, flag => ({ slotId: 1, isAscended: flag })),
            disp('accessory2', build.gearStats.ascendedFlags, setSelectedTrinketIsAscended, flag => ({ slotId: 2, isAscended: flag })),
            disp('amulet', build.gearStats.ascendedFlags, setSelectedTrinketIsAscended, flag => ({ slotId: 3, isAscended: flag })),
            disp('ring1', build.gearStats.ascendedFlags, setSelectedTrinketIsAscended, flag => ({ slotId: 4, isAscended: flag })),
            disp('ring2', build.gearStats.ascendedFlags, setSelectedTrinketIsAscended, flag => ({ slotId: 5, isAscended: flag }))
        ]);
    }).then(() => {
        return Promise.all([
            // Traits
            disp('majorTrait1', build.specialization1, setSelectedMajorTraitId, id => ({ specializationLine: 0, traitTier: 1, traitId: id })),
            disp('majorTrait2', build.specialization1, setSelectedMajorTraitId, id => ({ specializationLine: 0, traitTier: 2, traitId: id })),
            disp('majorTrait3', build.specialization1, setSelectedMajorTraitId, id => ({ specializationLine: 0, traitTier: 3, traitId: id })),
            disp('majorTrait1', build.specialization2, setSelectedMajorTraitId, id => ({ specializationLine: 1, traitTier: 1, traitId: id })),
            disp('majorTrait2', build.specialization2, setSelectedMajorTraitId, id => ({ specializationLine: 1, traitTier: 2, traitId: id })),
            disp('majorTrait3', build.specialization2, setSelectedMajorTraitId, id => ({ specializationLine: 1, traitTier: 3, traitId: id })),
            disp('majorTrait1', build.specialization3, setSelectedMajorTraitId, id => ({ specializationLine: 2, traitTier: 1, traitId: id })),
            disp('majorTrait2', build.specialization3, setSelectedMajorTraitId, id => ({ specializationLine: 2, traitTier: 2, traitId: id })),
            disp('majorTrait3', build.specialization3, setSelectedMajorTraitId, id => ({ specializationLine: 2, traitTier: 3, traitId: id }))
        ]);
    }).then(() => {
        return Promise.all([
            // Profession-specific data
            disp('legendA', build.professionRevenant, setSelectedRevenantLegendId, id => ({ slotId: 0, legendId: id })),
            disp('legendB', build.professionRevenant, setSelectedRevenantLegendId, id => ({ slotId: 1, legendId: id })),
            disp('petA', build.professionRanger, setSelectedRangerPetId, id => ({ slotId: 0, petId: id })),
            disp('petB', build.professionRanger, setSelectedRangerPetId, id => ({ slotId: 1, petId: id })),
            disp('petAquaticA', build.professionRanger, setSelectedRangerPetId, id => ({ slotId: 2, petId: id })),
            disp('petAquaticB', build.professionRanger, setSelectedRangerPetId, id => ({ slotId: 3, petId: id })),
            disp('attunement', build.professionElementalist, setSelectedElementalistAttunementId),
            disp('prevAttunementWeaver', build.professionElementalist, setSelectedWeaverPreviousAttunementId)
        ]);
    }).then(() => {
        return Promise.all([
            // Weapon types
            disp('weaponA1', build.weapons, setSelectedMainhandWeaponId, id => ({ weaponSet: 0, weaponId: id }) ),
            disp('weaponA2', build.weapons, setSelectedOffhandWeaponId, id => ({ weaponSet: 0, weaponId: id }) ),
            disp('weaponB1', build.weapons, setSelectedMainhandWeaponId, id => ({ weaponSet: 1, weaponId: id }) ),
            disp('weaponB2', build.weapons, setSelectedOffhandWeaponId, id => ({ weaponSet: 1, weaponId: id }) ),
            disp('aquaticA', build.weapons, setSelectedMainhandWeaponId, id => ({ weaponSet: 2, weaponId: id }) ),
            disp('aquaticB', build.weapons, setSelectedMainhandWeaponId, id => ({ weaponSet: 3, weaponId: id }) )
        ]);
    }).then(() => {
        return Promise.all([
            // Skills
            disp('healing', build.skills, setSelectedSkillId, id => ({ slotId: 0, skillId: id })),
            disp('utility1', build.skills, setSelectedSkillId, id => ({ slotId: 1, skillId: id })),
            disp('utility2', build.skills, setSelectedSkillId, id => ({ slotId: 2, skillId: id })),
            disp('utility3', build.skills, setSelectedSkillId, id => ({ slotId: 3, skillId: id })),
            disp('elite', build.skills, setSelectedSkillId, id => ({ slotId: 4, skillId: id }))
        ]);
    }).then(() => build);
}

/**
 * Converts a state to a build string.
 * @param {Object} state - The state.
 * @return {String} The build string.
 */
export function exportBuildToString(state) {
    const build = {
        general: {
            gameMode: state.selectedGameMode,
            profession: state.selectedProfession,
            race: state.selectedRace
        },
        specialization1: {
            specialization: state.selectedSpecializationIds[0],
            majorTrait1: state.selectedMajorTraitIds[0],
            majorTrait2: state.selectedMajorTraitIds[1],
            majorTrait3: state.selectedMajorTraitIds[2]
        },
        specialization2: {
            specialization: state.selectedSpecializationIds[1],
            majorTrait1: state.selectedMajorTraitIds[3],
            majorTrait2: state.selectedMajorTraitIds[4],
            majorTrait3: state.selectedMajorTraitIds[5]
        },
        specialization3: {
            specialization: state.selectedSpecializationIds[2],
            majorTrait1: state.selectedMajorTraitIds[6],
            majorTrait2: state.selectedMajorTraitIds[7],
            majorTrait3: state.selectedMajorTraitIds[8]
        },
        weapons: {
            weaponA1: state.selectedMainhandWeaponIds[0],
            weaponA2: state.selectedOffhandWeaponIds[0],
            weaponB1: state.selectedMainhandWeaponIds[1],
            weaponB2: state.selectedOffhandWeaponIds[1],
            aquaticA: state.selectedMainhandWeaponIds[2],
            aquaticB: state.selectedMainhandWeaponIds[3]
        },
        skills: {
            healing: state.selectedSkillIds[0],
            utility1: state.selectedSkillIds[1],
            utility2: state.selectedSkillIds[2],
            utility3: state.selectedSkillIds[3],
            elite: state.selectedSkillIds[4]
        },
        professionRevenant: {
            legendA: state.selectedRevenantLegendIds[0],
            legendB: state.selectedRevenantLegendIds[1]
        },
        professionRanger: {
            petA: state.selectedRangerPetIds[0],
            petB: state.selectedRangerPetIds[1],
            petAquaticA: state.selectedRangerPetIds[2],
            petAquaticB: state.selectedRangerPetIds[3],
        },
        professionElementalist: {
            attunement: state.selectedElementalistAttunementId,
            prevAttunementWeaver: state.selectedWeaverPreviousAttunementId
        },
        gearStats: {
            weaponA1: state.selectedMainhandWeaponItemstatIds[0],
            weaponA2: state.selectedOffhandWeaponItemstatIds[0],
            weaponB1: state.selectedMainhandWeaponItemstatIds[1],
            weaponB2: state.selectedOffhandWeaponItemstatIds[1],
            weaponAquaticA: state.selectedMainhandWeaponItemstatIds[2],
            weaponAquaticB: state.selectedMainhandWeaponItemstatIds[3],
            helm: state.selectedArmorItemstatIds[0],
            shoulders: state.selectedArmorItemstatIds[1],
            coat: state.selectedArmorItemstatIds[2],
            gloves: state.selectedArmorItemstatIds[3],
            leggings: state.selectedArmorItemstatIds[4],
            boots: state.selectedArmorItemstatIds[5],
            helmAquatic: state.selectedArmorItemstatIds[6],
            backpack: state.selectedTrinketItemstatIds[0],
            accessory1: state.selectedTrinketItemstatIds[1],
            accessory2: state.selectedTrinketItemstatIds[2],
            amulet: state.selectedTrinketItemstatIds[3],
            ring1: state.selectedTrinketItemstatIds[4],
            ring2: state.selectedTrinketItemstatIds[5],
            ascendedFlags: {
                weaponA1: state.selectedMainhandWeaponIsAscended[0],
                weaponA2: state.selectedOffhandWeaponIsAscended[0],
                weaponB1: state.selectedMainhandWeaponIsAscended[1],
                weaponB2: state.selectedOffhandWeaponIsAscended[1],
                weaponAquaticA: state.selectedMainhandWeaponIsAscended[2],
                weaponAquaticB: state.selectedMainhandWeaponIsAscended[3],
                helm: state.selectedArmorIsAscended[0],
                shoulders: state.selectedArmorIsAscended[1],
                coat: state.selectedArmorIsAscended[2],
                gloves: state.selectedArmorIsAscended[3],
                leggings: state.selectedArmorIsAscended[4],
                boots: state.selectedArmorIsAscended[5],
                helmAquatic: state.selectedArmorIsAscended[6],
                backpack: state.selectedTrinketIsAscended[0],
                accessory1: state.selectedTrinketIsAscended[1],
                accessory2: state.selectedTrinketIsAscended[2],
                amulet: state.selectedTrinketIsAscended[3],
                ring1: state.selectedTrinketIsAscended[4],
                ring2: state.selectedTrinketIsAscended[5],
            }
        }
    };

    return serialize(build);
}

export default {
    initializeBuildFromString,
    exportBuildToString
};
