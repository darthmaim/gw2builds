import { createSelector } from 'reselect';
import { getAttributeToughness } from './toughness';
import { getAttributeDefense } from './defense';
import { createAttributeReducer } from './utils';

export const getAttributeArmorDetails = createSelector(
    [getAttributeToughness, getAttributeDefense],
    (toughness, defense) => [
        { label: 'Defense', value: defense },
        { label: 'Toughness', value: toughness }
    ]
);

export const getAttributeArmor = createAttributeReducer(getAttributeArmorDetails);
