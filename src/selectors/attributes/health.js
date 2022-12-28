import { createSelector } from 'reselect';
import { getAttributeVitality } from './vitality';
import { createAttributeReducer } from './utils';

const getSelectedProfession = state => state.selectedProfession;

export const getAttributeHealthBase = createSelector(
    [getSelectedProfession],
    profession => {
        switch (profession) {
            case 'Warrior':
            case 'Necromancer':
                return 9212;
            case 'Revenant':
            case 'Engineer':
            case 'Ranger':
            case 'Mesmer':
                return 5922;
            case 'Guardian':
            case 'Thief':
            case 'Elementalist':
                return 1645;
            default:
                return 0;
        }
    }
);

export const getAttributeHealthDetails = createSelector(
    [getAttributeHealthBase, getAttributeVitality],
    (base, vitality) => [
        { label: 'Base', value: base },
        { label: 'Vitality', value: vitality * 10 }
    ]
);

export const getAttributeHealth = createAttributeReducer(getAttributeHealthDetails);
