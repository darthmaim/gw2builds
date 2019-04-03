/* eslint-disable no-use-before-define */
// TODO: check how we can refactor this to remove the above linting exception

export const RARITY_EXOTIC = 'Exotic';
export const RARITY_ASCENDED = 'Ascended';

export const RARITIES = [RARITY_EXOTIC, RARITY_ASCENDED];

export const GEAR_CATEGORY_ARMOR = 'Armor';
export const GEAR_CATEGORY_WEAPON = 'Weapon';
export const GEAR_CATEGORY_TRINKET = 'Trinket';

export const GEAR_TYPE_ARMOR_HELM = { id: 'Helm', category: GEAR_CATEGORY_ARMOR };
export const GEAR_TYPE_ARMOR_SHOULDERS = { id: 'Shoulders', category: GEAR_CATEGORY_ARMOR };
export const GEAR_TYPE_ARMOR_COAT = { id: 'Coat', category: GEAR_CATEGORY_ARMOR };
export const GEAR_TYPE_ARMOR_GLOVES = { id: 'Gloves', category: GEAR_CATEGORY_ARMOR };
export const GEAR_TYPE_ARMOR_LEGGINGS = { id: 'Leggings', category: GEAR_CATEGORY_ARMOR };
export const GEAR_TYPE_ARMOR_BOOTS = { id: 'Boots', category: GEAR_CATEGORY_ARMOR };

export const GEAR_TYPE_WEAPON_2HANDED = { id: '2Handed', category: GEAR_CATEGORY_WEAPON };
export const GEAR_TYPE_WEAPON_MAINHAND = { id: 'Mainhand', category: GEAR_CATEGORY_WEAPON };
export const GEAR_TYPE_WEAPON_OFFHAND = { id: 'Offhand', category: GEAR_CATEGORY_WEAPON };

export const GEAR_TYPE_TRINKET_ACCESSORY = { id: 'Accessory', category: GEAR_CATEGORY_TRINKET };
export const GEAR_TYPE_TRINKET_AMULET = { id: 'Amulet', category: GEAR_CATEGORY_TRINKET };
export const GEAR_TYPE_TRINKET_RING = { id: 'Ring', category: GEAR_CATEGORY_TRINKET };
export const GEAR_TYPE_TRINKET_BACK = { id: 'Back', category: GEAR_CATEGORY_TRINKET };
export const GEAR_TYPE_TRINKET_JEWEL = { id: 'Jewel', category: GEAR_CATEGORY_TRINKET };

export const GEAR_SLOT_ARMOR_HELM = { id: 0, type: GEAR_TYPE_ARMOR_HELM, upgrades: [GEAR_SLOT_ARMOR_UPGRADE_HELM] };
export const GEAR_SLOT_ARMOR_SHOULDERS = { id: 1, type: GEAR_TYPE_ARMOR_SHOULDERS, upgrades: [GEAR_SLOT_ARMOR_UPGRADE_SHOULDERS] };
export const GEAR_SLOT_ARMOR_COAT = { id: 2, type: GEAR_TYPE_ARMOR_COAT, upgrades: [GEAR_SLOT_ARMOR_UPGRADE_COAT] };
export const GEAR_SLOT_ARMOR_GLOVES = { id: 3, type: GEAR_TYPE_ARMOR_GLOVES, upgrades: [GEAR_SLOT_ARMOR_UPGRADE_GLOVES] };
export const GEAR_SLOT_ARMOR_LEGGINGS = { id: 4, type: GEAR_TYPE_ARMOR_LEGGINGS, upgrades: [GEAR_SLOT_ARMOR_UPGRADE_LEGGINGS] };
export const GEAR_SLOT_ARMOR_BOOTS = { id: 5, type: GEAR_TYPE_ARMOR_BOOTS, upgrades: [GEAR_SLOT_ARMOR_UPGRADE_BOOTS] };
export const GEAR_SLOT_ARMOR_AQUATIC = { id: 6, type: GEAR_TYPE_ARMOR_HELM, upgrades: [GEAR_SLOT_ARMOR_UPGRADE_AQUATIC] };

export const GEAR_SLOT_WEAPON_TWOHAND1 = { id: 0, type: GEAR_TYPE_WEAPON_2HANDED, upgrades: [GEAR_SLOT_WEAPON_UPGRADE_TWOHAND1] };
export const GEAR_SLOT_WEAPON_TWOHAND2 = { id: 1, type: GEAR_TYPE_WEAPON_2HANDED, upgrades: [GEAR_SLOT_WEAPON_UPGRADE_TWOHAND2] };
export const GEAR_SLOT_WEAPON_MAINHAND1 = { id: 0, type: GEAR_TYPE_WEAPON_MAINHAND, upgrades: [GEAR_SLOT_WEAPON_UPGRADE_MAINHAND1] };
export const GEAR_SLOT_WEAPON_MAINHAND2 = { id: 1, type: GEAR_TYPE_WEAPON_MAINHAND, upgrades: [GEAR_SLOT_WEAPON_UPGRADE_MAINHAND2] };
export const GEAR_SLOT_WEAPON_AQUATIC1 = { id: 2, type: GEAR_TYPE_WEAPON_2HANDED, upgrades: [GEAR_SLOT_WEAPON_UPGRADE_AQUATIC1] };
export const GEAR_SLOT_WEAPON_AQUATIC2 = { id: 3, type: GEAR_TYPE_WEAPON_2HANDED, upgrades: [GEAR_SLOT_WEAPON_UPGRADE_AQUATIC2] };
export const GEAR_SLOT_WEAPON_OFFHAND1 = { id: 0, type: GEAR_TYPE_WEAPON_OFFHAND, upgrades: [GEAR_SLOT_WEAPON_UPGRADE_OFFHAND1] };
export const GEAR_SLOT_WEAPON_OFFHAND2 = { id: 1, type: GEAR_TYPE_WEAPON_OFFHAND, upgrades: [GEAR_SLOT_WEAPON_UPGRADE_OFFHAND2] };

export const GEAR_SLOT_TRINKET_BACK = { id: 0, type: GEAR_TYPE_TRINKET_BACK, upgrades: [GEAR_SLOT_TRINKET_UPGRADE_BACK, GEAR_SLOT_TRINKET_UPGRADE_BACK_2] };
export const GEAR_SLOT_TRINKET_ACCESSORY1 = { id: 1, type: GEAR_TYPE_TRINKET_ACCESSORY, upgrades: [GEAR_SLOT_TRINKET_UPGRADE_ACCESSORY1] };
export const GEAR_SLOT_TRINKET_ACCESSORY2 = { id: 2, type: GEAR_TYPE_TRINKET_ACCESSORY, upgrades: [GEAR_SLOT_TRINKET_UPGRADE_ACCESSORY2] };
export const GEAR_SLOT_TRINKET_AMULET = { id: 3, type: GEAR_TYPE_TRINKET_AMULET, upgrades: [GEAR_SLOT_TRINKET_UPGRADE_AMULET] };
export const GEAR_SLOT_TRINKET_RING1 = { id: 4, type: GEAR_TYPE_TRINKET_RING, upgrades: [GEAR_SLOT_TRINKET_UPGRADE_RING1, GEAR_SLOT_TRINKET_UPGRADE_RING1_2, GEAR_SLOT_TRINKET_UPGRADE_RING1_3] };
export const GEAR_SLOT_TRINKET_RING2 = { id: 5, type: GEAR_TYPE_TRINKET_RING, upgrades: [GEAR_SLOT_TRINKET_UPGRADE_RING2, GEAR_SLOT_TRINKET_UPGRADE_RING2_2, GEAR_SLOT_TRINKET_UPGRADE_RING2_3] };


export const GEAR_SLOT_ARMOR_UPGRADE_HELM = { id: 0, slot: GEAR_SLOT_ARMOR_HELM };
export const GEAR_SLOT_ARMOR_UPGRADE_SHOULDERS = { id: 1, slot: GEAR_SLOT_ARMOR_SHOULDERS };
export const GEAR_SLOT_ARMOR_UPGRADE_COAT = { id: 2, slot: GEAR_SLOT_ARMOR_COAT };
export const GEAR_SLOT_ARMOR_UPGRADE_GLOVES = { id: 3, slot: GEAR_SLOT_ARMOR_GLOVES };
export const GEAR_SLOT_ARMOR_UPGRADE_LEGGINGS = { id: 4, slot: GEAR_SLOT_ARMOR_LEGGINGS };
export const GEAR_SLOT_ARMOR_UPGRADE_BOOTS = { id: 5, slot: GEAR_SLOT_ARMOR_BOOTS };
export const GEAR_SLOT_ARMOR_UPGRADE_AQUATIC = { id: 6, slot: GEAR_SLOT_ARMOR_AQUATIC };

export const GEAR_SLOT_WEAPON_UPGRADE_TWOHAND1 = { id: 0, slot: GEAR_SLOT_WEAPON_TWOHAND1 };
export const GEAR_SLOT_WEAPON_UPGRADE_TWOHAND2 = { id: 1, slot: GEAR_SLOT_WEAPON_TWOHAND2 };
export const GEAR_SLOT_WEAPON_UPGRADE_MAINHAND1 = { id: 0, slot: GEAR_SLOT_WEAPON_MAINHAND1 };
export const GEAR_SLOT_WEAPON_UPGRADE_MAINHAND2 = { id: 1, slot: GEAR_SLOT_WEAPON_MAINHAND2 };
export const GEAR_SLOT_WEAPON_UPGRADE_AQUATIC1 = { id: 2, slot: GEAR_SLOT_WEAPON_AQUATIC1 };
export const GEAR_SLOT_WEAPON_UPGRADE_AQUATIC2 = { id: 3, slot: GEAR_SLOT_WEAPON_AQUATIC2 };
export const GEAR_SLOT_WEAPON_UPGRADE_OFFHAND1 = { id: 0, slot: GEAR_SLOT_WEAPON_OFFHAND1 };
export const GEAR_SLOT_WEAPON_UPGRADE_OFFHAND2 = { id: 1, slot: GEAR_SLOT_WEAPON_OFFHAND2 };

export const GEAR_SLOT_TRINKET_UPGRADE_BACK = { id: 0, slot: GEAR_SLOT_TRINKET_BACK };
export const GEAR_SLOT_TRINKET_UPGRADE_ACCESSORY1 = { id: 1, slot: GEAR_SLOT_TRINKET_ACCESSORY1 };
export const GEAR_SLOT_TRINKET_UPGRADE_ACCESSORY2 = { id: 2, slot: GEAR_SLOT_TRINKET_ACCESSORY2 };
export const GEAR_SLOT_TRINKET_UPGRADE_AMULET = { id: 3, slot: GEAR_SLOT_TRINKET_AMULET };
export const GEAR_SLOT_TRINKET_UPGRADE_RING1 = { id: 4, slot: GEAR_SLOT_TRINKET_RING1 };
export const GEAR_SLOT_TRINKET_UPGRADE_RING2 = { id: 5, slot: GEAR_SLOT_TRINKET_RING2 };
export const GEAR_SLOT_TRINKET_UPGRADE_BACK_2 = { id: 6, type: GEAR_SLOT_TRINKET_BACK };
export const GEAR_SLOT_TRINKET_UPGRADE_RING1_2 = { id: 7, type: GEAR_SLOT_TRINKET_RING1 };
export const GEAR_SLOT_TRINKET_UPGRADE_RING1_3 = { id: 8, type: GEAR_SLOT_TRINKET_RING1 };
export const GEAR_SLOT_TRINKET_UPGRADE_RING2_2 = { id: 9, type: GEAR_SLOT_TRINKET_RING2 };
export const GEAR_SLOT_TRINKET_UPGRADE_RING2_3 = { id: 1, type: GEAR_SLOT_TRINKET_RING2 };


export const SLOTS = [
    GEAR_SLOT_ARMOR_HELM, GEAR_SLOT_ARMOR_SHOULDERS, GEAR_SLOT_ARMOR_COAT, GEAR_SLOT_ARMOR_GLOVES,
    GEAR_SLOT_ARMOR_LEGGINGS, GEAR_SLOT_ARMOR_BOOTS, GEAR_SLOT_ARMOR_AQUATIC
];