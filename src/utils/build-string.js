import { serialize, deserialize } from 'gw2be-build-string';
import { setSelectedGameMode, setSelectedProfession, setSelectedRace } from '../actions/general';
import { setSelectedGearItemstatId, setSelectedGearIsAscended } from '../actions/gear';
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
        disp('gameMode', build.general, setSelectedGameMode),
        disp('profession', build.general, setSelectedProfession),
        disp('race', build.general, setSelectedRace)
    ]).then(() => {
        const specializations = store.getState().availableSpecializationObjects;
        return Promise.all([
            disp('specialization', build.specialization1, setSelectedSpecializationId, id => ({ specializationLine: 0, specializationId: id, specializations })),
            disp('specialization', build.specialization2, setSelectedSpecializationId, id => ({ specializationLine: 1, specializationId: id, specializations })),
            disp('specialization', build.specialization3, setSelectedSpecializationId, id => ({ specializationLine: 2, specializationId: id, specializations }))
        ]);
    }).then(() => {
        return Promise.all([
            disp('weaponA1', build.gearStats, setSelectedGearItemstatId, id => ({ slotId: 'weaponA1', itemstatId: id })),
            disp('weaponA2', build.gearStats, setSelectedGearItemstatId, id => ({ slotId: 'weaponA2', itemstatId: id })),
            disp('weaponB1', build.gearStats, setSelectedGearItemstatId, id => ({ slotId: 'weaponB1', itemstatId: id })),
            disp('weaponB2', build.gearStats, setSelectedGearItemstatId, id => ({ slotId: 'weaponB2', itemstatId: id })),
            disp('weaponAquaticA', build.gearStats, setSelectedGearItemstatId, id => ({ slotId: 'weaponAquaticA', itemstatId: id })),
            disp('weaponAquaticB', build.gearStats, setSelectedGearItemstatId, id => ({ slotId: 'weaponAquaticB', itemstatId: id })),
            disp('helm', build.gearStats, setSelectedGearItemstatId, id => ({ slotId: 'helm', itemstatId: id })),
            disp('shoulders', build.gearStats, setSelectedGearItemstatId, id => ({ slotId: 'shoulders', itemstatId: id })),
            disp('coat', build.gearStats, setSelectedGearItemstatId, id => ({ slotId: 'coat', itemstatId: id })),
            disp('gloves', build.gearStats, setSelectedGearItemstatId, id => ({ slotId: 'gloves', itemstatId: id })),
            disp('leggings', build.gearStats, setSelectedGearItemstatId, id => ({ slotId: 'leggings', itemstatId: id })),
            disp('boots', build.gearStats, setSelectedGearItemstatId, id => ({ slotId: 'boots', itemstatId: id })),
            disp('helmAquatic', build.gearStats, setSelectedGearItemstatId, id => ({ slotId: 'helmAquatic', itemstatId: id })),
            disp('backpack', build.gearStats, setSelectedGearItemstatId, id => ({ slotId: 'backpack', itemstatId: id })),
            disp('accessory1', build.gearStats, setSelectedGearItemstatId, id => ({ slotId: 'accessory1', itemstatId: id })),
            disp('accessory2', build.gearStats, setSelectedGearItemstatId, id => ({ slotId: 'accessory2', itemstatId: id })),
            disp('amulet', build.gearStats, setSelectedGearItemstatId, id => ({ slotId: 'amulet', itemstatId: id })),
            disp('ring1', build.gearStats, setSelectedGearItemstatId, id => ({ slotId: 'ring1', itemstatId: id })),
            disp('ring2', build.gearStats, setSelectedGearItemstatId, id => ({ slotId: 'ring2', itemstatId: id })),
            
            disp('weaponA1', build.gearStats.ascendedFlags, setSelectedGearIsAscended, flag => ({ slotId: 'weaponA1', isAscended: flag })),
            disp('weaponA2', build.gearStats.ascendedFlags, setSelectedGearIsAscended, flag => ({ slotId: 'weaponA2', isAscended: flag })),
            disp('weaponB1', build.gearStats.ascendedFlags, setSelectedGearIsAscended, flag => ({ slotId: 'weaponB1', isAscended: flag })),
            disp('weaponB2', build.gearStats.ascendedFlags, setSelectedGearIsAscended, flag => ({ slotId: 'weaponB2', isAscended: flag })),
            disp('weaponAquaticA', build.gearStats.ascendedFlags, setSelectedGearIsAscended, flag => ({ slotId: 'weaponAquaticA', isAscended: flag })),
            disp('weaponAquaticB', build.gearStats.ascendedFlags, setSelectedGearIsAscended, flag => ({ slotId: 'weaponAquaticB', isAscended: flag })),
            disp('helm', build.gearStats.ascendedFlags, setSelectedGearIsAscended, flag => ({ slotId: 'helm', isAscended: flag })),
            disp('shoulders', build.gearStats.ascendedFlags, setSelectedGearIsAscended, flag => ({ slotId: 'shoulders', isAscended: flag })),
            disp('coat', build.gearStats.ascendedFlags, setSelectedGearIsAscended, flag => ({ slotId: 'coat', isAscended: flag })),
            disp('gloves', build.gearStats.ascendedFlags, setSelectedGearIsAscended, flag => ({ slotId: 'gloves', isAscended: flag })),
            disp('leggings', build.gearStats.ascendedFlags, setSelectedGearIsAscended, flag => ({ slotId: 'leggings', isAscended: flag })),
            disp('boots', build.gearStats.ascendedFlags, setSelectedGearIsAscended, flag => ({ slotId: 'boots', isAscended: flag })),
            disp('helmAquatic', build.gearStats.ascendedFlags, setSelectedGearIsAscended, flag => ({ slotId: 'helmAquatic', isAscended: flag })),
            disp('backpack', build.gearStats.ascendedFlags, setSelectedGearIsAscended, flag => ({ slotId: 'backpack', isAscended: flag })),
            disp('accessory1', build.gearStats.ascendedFlags, setSelectedGearIsAscended, flag => ({ slotId: 'accessory1', isAscended: flag })),
            disp('accessory2', build.gearStats.ascendedFlags, setSelectedGearIsAscended, flag => ({ slotId: 'accessory2', isAscended: flag })),
            disp('amulet', build.gearStats.ascendedFlags, setSelectedGearIsAscended, flag => ({ slotId: 'amulet', isAscended: flag })),
            disp('ring1', build.gearStats.ascendedFlags, setSelectedGearIsAscended, flag => ({ slotId: 'ring1', isAscended: flag })),
            disp('ring2', build.gearStats.ascendedFlags, setSelectedGearIsAscended, flag => ({ slotId: 'ring2', isAscended: flag }))
        ]);
    }).then(() => {
        return Promise.all([
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
            disp('weaponA1', build.weapons, setSelectedMainhandWeaponId, id => ({ weaponSet: 0, weaponId: id }) ),
            disp('weaponA2', build.weapons, setSelectedOffhandWeaponId, id => ({ weaponSet: 0, weaponId: id }) ),
            disp('weaponB1', build.weapons, setSelectedMainhandWeaponId, id => ({ weaponSet: 1, weaponId: id }) ),
            disp('weaponB2', build.weapons, setSelectedOffhandWeaponId, id => ({ weaponSet: 1, weaponId: id }) ),
            disp('aquaticA', build.weapons, setSelectedMainhandWeaponId, id => ({ weaponSet: 2, weaponId: id }) ),
            disp('aquaticB', build.weapons, setSelectedMainhandWeaponId, id => ({ weaponSet: 3, weaponId: id }) )
        ]);
    }).then(() => {
        return Promise.all([
            disp('healing', build.skills, setSelectedSkillId, id => ({ slotId: 0, skillId: id })),
            disp('utility1', build.skills, setSelectedSkillId, id => ({ slotId: 1, skillId: id })),
            disp('utility2', build.skills, setSelectedSkillId, id => ({ slotId: 2, skillId: id })),
            disp('utility3', build.skills, setSelectedSkillId, id => ({ slotId: 3, skillId: id })),
            disp('elite', build.skills, setSelectedSkillId, id => ({ slotId: 4, skillId: id }))
        ]);
    });
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
        gearStats: Object.assign({}, state.selectedGearItemstatIds, {
            ascendedFlags: Object.assign({}, state.selectedGearIsAscended)
        })
    };

    return serialize(build);
}

export default {
    initializeBuildFromString,
    exportBuildToString
};
