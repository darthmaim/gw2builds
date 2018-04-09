import {
    GEAR_TYPE_ARMOR_BOOTS, GEAR_TYPE_ARMOR_COAT, GEAR_TYPE_ARMOR_GLOVES, GEAR_TYPE_ARMOR_HELM, GEAR_TYPE_ARMOR_LEGGINGS, GEAR_TYPE_ARMOR_SHOULDERS,
    GEAR_TYPE_TRINKET_ACCESSORY, GEAR_TYPE_TRINKET_AMULET, GEAR_TYPE_TRINKET_BACK, GEAR_TYPE_TRINKET_JEWEL, GEAR_TYPE_TRINKET_RING,
    GEAR_TYPE_WEAPON_1HANDED,
    GEAR_TYPE_WEAPON_2HANDED
} from '../Constants';

export const attributeValues = {
    //                         Rarity |        Ascended       |        Exotic          |
    //           number of attributes | 3 Attr | 4 Attr  |  7 |  3 Attr | 4 Attr  | 7  |
    //                                |Maj Min | Maj Min | Maj| Maj Min | Maj Min | Maj|
    [GEAR_TYPE_WEAPON_1HANDED.id]:    [125,  90, 108,  59,  59, 120,  85, 102,  56,  56],
    [GEAR_TYPE_WEAPON_2HANDED.id]:    [251, 179, 215, 118, 118, 239, 171, 205, 113, 113],
    [GEAR_TYPE_ARMOR_COAT.id]:        [141, 101, 121,  67,  67, 134,  96, 115,  63,  63],
    [GEAR_TYPE_ARMOR_LEGGINGS.id]:    [ 94,  67,  81,  44,  44,  90,  64,  77,  42,  42],
    [GEAR_TYPE_ARMOR_HELM.id]:        [ 63,  45,  54,  30,  30,  60,  43,  51,  28,  28],
    [GEAR_TYPE_ARMOR_SHOULDERS.id]:   [ 47,  34,  40,  22,  22,  45,  32,  38,  21,  21],
    [GEAR_TYPE_ARMOR_GLOVES.id]:      [ 47,  34,  40,  22,  22,  45,  32,  38,  21,  21],
    [GEAR_TYPE_ARMOR_BOOTS.id]:       [ 47,  34,  40,  22,  22,  45,  32,  38,  21,  21],
    [GEAR_TYPE_TRINKET_AMULET.id]:    [157, 108, 133,  71,  72, 120,  85, 102,  56,  56],
    [GEAR_TYPE_TRINKET_RING.id]:      [126,  85, 106,  56,  57,  90,  64,  77,  42,  42],
    [GEAR_TYPE_TRINKET_ACCESSORY.id]: [110,  74,  92,  49,  50,  75,  53,  64,  35,  35],
    [GEAR_TYPE_TRINKET_BACK.id]:      [ 63,  40,  52,  27,  28,  30,  21,  26,  14,  14],
    [GEAR_TYPE_TRINKET_JEWEL.id]:     [NaN, NaN, NaN, NaN, NaN,  25,  15,  20,  10,  12],
};

export const AVAILABILITY_WEAPON  = 1;
export const AVAILABILITY_ARMOR   = 2;
export const AVAILABILITY_TRINKET = 4;
export const AVAILABILITY_BACK    = 8;
export const AVAILABILITY_UPGRADE = 16;
export const AVAILABILITY_PVP     = 32;

export const attributeCombinations = {
     1: { "name": "Berserker",  "availability": 63, "attributes": ["Power", "Precision", "CritDamage"] },
     2: { "name": "Zealot",     "availability": 15, "attributes": ["Power", "Precision", "Healing"] },
     3: { "name": "Soldier",    "availability": 31, "attributes": ["Power", "Toughness", "Vitality"] },
     4: { "name": "Forsaken",   "availability":  1, "attributes": ["Power", "Toughness", "Healing"] },
     5: { "name": "Valkyrie",   "availability": 63, "attributes": ["Power", "Vitality", "CritDamage"] },
     6: { "name": "Captain",    "availability": 28, "attributes": ["Precision", "Power", "Toughness"] },
     7: { "name": "Rampager",   "availability": 63, "attributes": ["Precision", "Power", "ConditionDamage"] },
     8: { "name": "Assassin",   "availability": 63, "attributes": ["Precision", "Power", "CritDamage"] },
     9: { "name": "Knight",     "availability": 47, "attributes": ["Toughness", "Power", "Precision"] },
    11: { "name": "Cavalier",   "availability": 47, "attributes": ["Toughness", "Power", "CritDamage"] },
    12: { "name": "Nomad",      "availability": 31, "attributes": ["Toughness", "Vitality", "Healing"] },
    13: { "name": "Giver",      "availability": 31, "attributes": ["Toughness", "Healing", "Concentration"] },
    14: { "name": "Settler",    "availability": 15, "attributes": ["Toughness", "ConditionDamage", "Healing"] },
    15: { "name": "Barbarian",  "availability": 32, "attributes": ["Vitality", "Power", "Precision"] },
    16: { "name": "Sentinel",   "availability": 31, "attributes": ["Vitality", "Power", "Toughness"] },
    17: { "name": "Shaman",     "availability": 31, "attributes": ["Vitality", "ConditionDamage", "Healing"] },
    18: { "name": "Sinister",   "availability": 63, "attributes": ["ConditionDamage", "Power", "Precision"] },
    19: { "name": "Carrion",    "availability": 63, "attributes": ["ConditionDamage", "Power", "Vitality"] },
    21: { "name": "Rabid",      "availability": 63, "attributes": ["ConditionDamage", "Precision", "Toughness"] },
    22: { "name": "Dire",       "availability": 15, "attributes": ["ConditionDamage", "Toughness", "Vitality"] },
    23: { "name": "Apostate",   "availability":  1, "attributes": ["ConditionDamage", "Toughness", "Healing"] },
    24: { "name": "Cleric",     "availability": 31, "attributes": ["Healing", "Power", "Toughness"] },
    25: { "name": "Magi",       "availability": 63, "attributes": ["Healing", "Precision", "Vitality"] },
    26: { "name": "Apothecary", "availability": 31, "attributes": ["Healing", "Toughness", "ConditionDamage"] },
    27: { "name": "Bringer",    "availability":  3, "attributes": ["ConditionDuration", "Precision", "Vitality"] },
    28: { "name": "Harrier",    "availability": 15, "attributes": ["Power", "Healing", "Concentration"] },

    29: { "name": "Paladin",      "availability": 32, "attributes": ["Power", "Precision", "Toughness", "Vitality"] },
    31: { "name": "Demolisher",   "availability": 32, "attributes": ["Power", "Precision", "Toughness", "CritDamage"] },
    32: { "name": "Seeker",       "availability": 32, "attributes": ["Power", "Precision", "Concentration", "CritDamage"] },
    33: { "name": "Destroyer",    "availability": 32, "attributes": ["Power", "Precision", "ConditionDamage", "CritDamage"] },
    34: { "name": "Diviner",      "availability": 32, "attributes": ["Power", "Concentration", "Precision", "CritDamage"] },
    35: { "name": "Sage",         "availability": 32, "attributes": ["Power", "ConditionDamage", "Vitality", "Healing"] },
    36: { "name": "Mender",       "availability": 32, "attributes": ["Power", "Healing", "Precision", "Vitality"] },
    37: { "name": "Deadshot",     "availability": 32, "attributes": ["Precision", "ConditionDamage", "Vitality", "ConditionDuration"] },
    38: { "name": "Commander",    "availability": 31, "attributes": ["Power", "Precision", "Toughness", "Concentration"] },
    39: { "name": "Marauder",     "availability": 63, "attributes": ["Power", "Precision", "Vitality", "CritDamage"] },
    41: { "name": "Vigilant",     "availability": 31, "attributes": ["Power", "Toughness", "Concentration", "ConditionDuration"] },
    42: { "name": "Crusader",     "availability": 31, "attributes": ["Power", "Toughness", "CritDamage", "Healing"] },
    43: { "name": "Wanderer",     "availability": 55, "attributes": ["Power", "Vitality", "Toughness", "Concentration"] },
    44: { "name": "Viper",        "availability": 63, "attributes": ["Power", "ConditionDamage", "Precision", "ConditionDuration"] },
    45: { "name": "Seraph",       "availability": 15, "attributes": ["Precision", "ConditionDamage", "Concentration", "Healing"] },
    46: { "name": "Trailblazer",  "availability": 31, "attributes": ["Toughness", "ConditionDamage", "Vitality", "ConditionDuration"] },
    47: { "name": "Minstrel",     "availability": 31, "attributes": ["Toughness", "Healing", "Vitality", "Concentration"] },
    48: { "name": "Swashbuckler", "availability": 32, "attributes": ["Power", "Precision", "Vitality", "ConditionDamage"] },
    49: { "name": "Avatar",       "availability": 32, "attributes": ["Power", "Precision", "Vitality", "Healing"] },
    51: { "name": "Grieving",     "availability": 15, "attributes": ["Power", "ConditionDamage", "Precision", "CritDamage"] },
    52: { "name": "Wizard",       "availability": 32, "attributes": ["Power", "ConditionDamage", "Precision", "Vitality"] },
    53: { "name": "Marshal",      "availability": 15, "attributes": ["Power", "Healing", "Precision", "ConditionDamage"] },

    54: { "name": "Celestial", "availability": 63, "attributes": ["Power", "Precision", "Toughness", "Vitality", "ConditionDamage", "CritDamage", "Healing"] },
};
