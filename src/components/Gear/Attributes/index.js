import { attributeCombinations, attributeValues } from './Static';
import { RARITY_ASCENDED } from '../Constants';
import pickBy from 'lodash/pickBy';

export function getAttributeValues(combinationId, rarity, type) {
    const combination = attributeCombinations[combinationId];
    const values = attributeValues[type.id];

    const offset = rarity === RARITY_ASCENDED ? 0 : 5;
    const major = 0;
    const minor = 1;

    switch(combination.attributes.length) {
        case 3: return {
            [combination.attributes[0]]: values[0 + offset + major],
            [combination.attributes[1]]: values[0 + offset + minor],
            [combination.attributes[2]]: values[0 + offset + minor]
        };
        case 4: return {
            [combination.attributes[0]]: values[2 + offset + major],
            [combination.attributes[1]]: values[2 + offset + major],
            [combination.attributes[2]]: values[2 + offset + minor],
            [combination.attributes[3]]: values[2 + offset + minor],
        };
        case 7: return {
            [combination.attributes[0]]: values[4 + offset + major],
            [combination.attributes[1]]: values[4 + offset + major],
            [combination.attributes[2]]: values[4 + offset + major],
            [combination.attributes[3]]: values[4 + offset + major],
            [combination.attributes[4]]: values[4 + offset + major],
            [combination.attributes[5]]: values[4 + offset + major],
            [combination.attributes[6]]: values[4 + offset + major],
        };
    }
}

export function getAvailableCombinations(availability) {
    return pickBy(attributeCombinations,
        (combination) => {
            return (combination.availability & availability) === availability
        }
    );
}
