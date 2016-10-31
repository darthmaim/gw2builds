"use strict";

import _ from "lodash";
import fp from "lodash/fp";
import defaultMode from "./default";

import * as language from "./languages";
import * as gameMode from "./game-modes";
import * as profession from "./professions";
import * as race from "./races";

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
    _.forOwn(modes, (v, k) => {
        configuration = fp.mergeWith((a, c) => {
            if (a === c) return null;
            return undefined;
        })(configuration)(availableConfigurations[k][v]);
    });
    selectedConfiguration = configuration;
}

export function applyEditorMode(mode, value) {
    selectedModes[mode] = value;
    setEditorMode(selectedModes);
}

export function getEditorModeConfiguration(configName) {
    return _.get(selectedConfiguration, configName);
}

export default {
    applyEditorMode,
    getEditorModeConfiguration
};
