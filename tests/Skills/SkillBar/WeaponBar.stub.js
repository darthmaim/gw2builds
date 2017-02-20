export const SKILL_SIMPLE = { id: 1, name: 'Simple Skill', description: '' };
export const SKILL_OFFHAND_NOTHING = { id: 2, name: 'Offhand Nothing Skill', description: '' };
export const SKILL_OFFHAND_SOMETHING = { id: 3, name: 'Offhand Simple Skill', description: '' };
export const SKILL_ATTUNEMENT_1 = { id: 4, name: 'Attunement 1 Skill', description: '' };
export const SKILL_ATTUNEMENT_2 = { id: 5, name: 'Attunement 2 Skill', description: '' };

export const WEAPON_SIMPLE = 'Simple';
export const WEAPON_OFFHAND = 'Offhand';
export const WEAPON_ATTUNEMENT = 'Attunement';

export const ATTUNEMENT1 = 'Foo';
export const ATTUNEMENT2 = 'Bar';

export const skills = {
    [SKILL_SIMPLE.id]: SKILL_SIMPLE,
    [SKILL_OFFHAND_NOTHING.id]: SKILL_OFFHAND_NOTHING,
    [SKILL_OFFHAND_SOMETHING.id]: SKILL_OFFHAND_SOMETHING,
    [SKILL_ATTUNEMENT_1.id]: SKILL_ATTUNEMENT_1,
    [SKILL_ATTUNEMENT_2.id]: SKILL_ATTUNEMENT_2
};

export const weapons = {
    [WEAPON_SIMPLE]: {
        skills: [
            { id: SKILL_SIMPLE.id, slot: 'Weapon_1' },
            { id: SKILL_SIMPLE.id, slot: 'Weapon_2' },
            { id: SKILL_SIMPLE.id, slot: 'Weapon_3' },
            { id: SKILL_SIMPLE.id, slot: 'Weapon_4' },
            { id: SKILL_SIMPLE.id, slot: 'Weapon_5' }
        ]
    },
    [WEAPON_OFFHAND]: {
        skills: [
            { id: SKILL_SIMPLE.id, slot: 'Weapon_1' },
            { id: SKILL_SIMPLE.id, slot: 'Weapon_2' },
            { id: SKILL_OFFHAND_NOTHING.id, slot: 'Weapon_3', offhand: 'Nothing' },
            { id: SKILL_OFFHAND_SOMETHING.id, slot: 'Weapon_3', offhand: WEAPON_SIMPLE },
            { id: SKILL_SIMPLE.id, slot: 'Weapon_4' },
            { id: SKILL_SIMPLE.id, slot: 'Weapon_5' }
        ]
    },
    [WEAPON_ATTUNEMENT]: {
        skills: [
            { id: SKILL_ATTUNEMENT_1.id, slot: 'Weapon_1', attunement: ATTUNEMENT1 },
            { id: SKILL_ATTUNEMENT_2.id, slot: 'Weapon_1', attunement: ATTUNEMENT2 },
            { id: SKILL_ATTUNEMENT_1.id, slot: 'Weapon_2', attunement: ATTUNEMENT1 },
            { id: SKILL_ATTUNEMENT_2.id, slot: 'Weapon_2', attunement: ATTUNEMENT2 },
            { id: SKILL_ATTUNEMENT_1.id, slot: 'Weapon_3', attunement: ATTUNEMENT1 },
            { id: SKILL_ATTUNEMENT_2.id, slot: 'Weapon_3', attunement: ATTUNEMENT2 },
            { id: SKILL_ATTUNEMENT_1.id, slot: 'Weapon_4', attunement: ATTUNEMENT1 },
            { id: SKILL_ATTUNEMENT_2.id, slot: 'Weapon_4', attunement: ATTUNEMENT2 },
            { id: SKILL_ATTUNEMENT_1.id, slot: 'Weapon_5', attunement: ATTUNEMENT1 },
            { id: SKILL_ATTUNEMENT_2.id, slot: 'Weapon_5', attunement: ATTUNEMENT2 }
        ]
    }
};

export const activeMajorTraits = [];
export const activeMinorTraits = [];
