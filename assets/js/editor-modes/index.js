import forOwn from 'lodash/fp/forOwn';
import get from 'lodash/fp/get';
import mergeWith from 'lodash/fp/mergeWith';
import defaultMode from './default';

import * as language from './languages';
import * as gameMode from './game-modes';
import * as profession from './professions';
import * as race from './races';

let selectedModes = {};
let selectedConfiguration = defaultMode;

const availableConfigurations = {
    language,
    gameMode,
    profession,
    race
};

function setEditorMode(modes) {
    let configuration = defaultMode;
    forOwn(v => {
        configuration = mergeWith((a, c) => {
            if (a === c) {
                return null;
            }
            return undefined;
        })(configuration)(availableConfigurations.gameMode[v]);
    })(modes);
    selectedConfiguration = configuration;
}

export function applyEditorMode(mode, value) {
    selectedModes[mode] = value;
    setEditorMode(selectedModes);
}

export function getEditorModeConfiguration(configName) {
    return get(configName)(selectedConfiguration);
}

export default {
    applyEditorMode,
    getEditorModeConfiguration
};
