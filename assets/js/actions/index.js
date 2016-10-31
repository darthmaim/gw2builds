"use strict";

import { createAction } from "redux-actions";
import { ucFirst } from "change-case";

export const SET_LANGUAGE = "SET_LANGUAGE";
export const SET_GAMEMODE = "SET_GAMEMODE";
export const SET_PROFESSION = "SET_PROFESSION";
export const SET_RACE = "SET_RACE";

export const FETCH_PROFESSION = "FETCH_PROFESSION";
export const FETCH_SPECIALIZATIONS = "FETCH_SPECIALIZATIONS";
export const FETCH_TRAITS = "FETCH_TRAITS";


function createApiAction(actionType, apiCall) {
    return (...args) => {
        return (dispatch, getState, Gw2Api) => {
            return dispatch(createAction(actionType, (...args) => {
                return apiCall(Gw2Api, ...args);
            })(...args));
        };
    };
}

export const setLanguage = createAction(SET_LANGUAGE);
export const setGameMode = createAction(SET_GAMEMODE);
export const setProfession = createAction(SET_PROFESSION);
export const setRace = createAction(SET_RACE);

export const fetchProfession = createApiAction(FETCH_PROFESSION, (api, profession) => api.professions().get(ucFirst(profession)));
export const fetchSpecializations = createApiAction(FETCH_SPECIALIZATIONS, (api, ids) => api.specializations().many(ids));
export const fetchTraits = createApiAction(FETCH_TRAITS, (api, ids) => api.traits().many(ids));
