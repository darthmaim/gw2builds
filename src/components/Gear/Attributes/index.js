import { attributeCombinations, attributeValues } from './Static';
import { RARITY_ASCENDED } from '../Constants';
import pickBy from 'lodash/pickBy';

export function getAttributeValues(combination, rarity, type) {
    const values = attributeValues[type.id];

    const offset = rarity === RARITY_ASCENDED ? 0 : 5;
    const major = 0;
    const minor = 1;

    switch(combination.attributes.length) {
        case 3: return {
            [combination.attributes[0]]: values[offset + major],
            [combination.attributes[1]]: values[offset + minor],
            [combination.attributes[2]]: values[offset + minor]
        };
        case 4: return {
            [combination.attributes[0]]: values[offset + major],
            [combination.attributes[1]]: values[offset + major],
            [combination.attributes[2]]: values[offset + minor],
            [combination.attributes[3]]: values[offset + minor],
        };
        case 7: return {
            [combination.attributes[0]]: values[offset + major],
            [combination.attributes[1]]: values[offset + major],
            [combination.attributes[2]]: values[offset + major],
            [combination.attributes[3]]: values[offset + major],
            [combination.attributes[4]]: values[offset + major],
            [combination.attributes[5]]: values[offset + major],
            [combination.attributes[6]]: values[offset + major],
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
