import { serialize, deserialize } from 'gw2be-build-string';
import { setGameMode, setProfession, setRace } from '../actions/general';
import { setSpecialization } from '../actions/specializations';
import { setMajorTrait } from '../actions/traits';

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
    } catch(e) {
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
        disp('gameMode', build.general, setGameMode),
        disp('profession', build.general, setProfession),
        disp('race', build.general, setRace)
    ]).then(() => {
        const specializations = store.getState().specializations;
        return Promise.all([
            disp('specialization', build.specialization1, setSpecialization, id => ({ specializationLine: 0, specializationId: id, specializations })),
            disp('specialization', build.specialization2, setSpecialization, id => ({ specializationLine: 1, specializationId: id, specializations })),
            disp('specialization', build.specialization3, setSpecialization, id => ({ specializationLine: 2, specializationId: id, specializations }))
        ]);
    }).then(() => {
        return Promise.all([
            disp('majorTrait1', build.specialization1, setMajorTrait, id => ({ specializationLine: 0, traitTier: 1, traitId: id })),
            disp('majorTrait2', build.specialization1, setMajorTrait, id => ({ specializationLine: 0, traitTier: 2, traitId: id })),
            disp('majorTrait3', build.specialization1, setMajorTrait, id => ({ specializationLine: 0, traitTier: 3, traitId: id })),
            disp('majorTrait1', build.specialization2, setMajorTrait, id => ({ specializationLine: 1, traitTier: 1, traitId: id })),
            disp('majorTrait2', build.specialization2, setMajorTrait, id => ({ specializationLine: 1, traitTier: 2, traitId: id })),
            disp('majorTrait3', build.specialization2, setMajorTrait, id => ({ specializationLine: 1, traitTier: 3, traitId: id })),
            disp('majorTrait1', build.specialization3, setMajorTrait, id => ({ specializationLine: 2, traitTier: 1, traitId: id })),
            disp('majorTrait2', build.specialization3, setMajorTrait, id => ({ specializationLine: 2, traitTier: 2, traitId: id })),
            disp('majorTrait3', build.specialization3, setMajorTrait, id => ({ specializationLine: 2, traitTier: 3, traitId: id }))
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
            gameMode: state.gameMode,
            profession: state.profession,
            race: state.race
        },
        specialization1: {
            specialization: state.activeSpecializations[0],
            majorTrait1: state.activeMajorTraits[0],
            majorTrait2: state.activeMajorTraits[1],
            majorTrait3: state.activeMajorTraits[2]
        },
        specialization2: {
            specialization: state.activeSpecializations[1],
            majorTrait1: state.activeMajorTraits[3],
            majorTrait2: state.activeMajorTraits[4],
            majorTrait3: state.activeMajorTraits[5]
        },
        specialization3: {
            specialization: state.activeSpecializations[2],
            majorTrait1: state.activeMajorTraits[6],
            majorTrait2: state.activeMajorTraits[7],
            majorTrait3: state.activeMajorTraits[8]
        }
    };

    return serialize(build);
}

export default {
    initializeBuildFromString,
    exportBuildToString
};
