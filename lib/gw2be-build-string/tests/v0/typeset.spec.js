/* eslint-env node, mocha */
import { expect } from 'chai';
import JBinary from 'jbinary';
import { getBitsRequiredToEncodeNumber, default as typeset } from '../../src/v0/typeset';

describe('v0 typeset', () => {
    it('encodes no value with 1 bit', () => {
        expect(getBitsRequiredToEncodeNumber(undefined, undefined), 1);
    });

    it('encodes with a minimum amount of bits', () => {
        expect(getBitsRequiredToEncodeNumber(10, 8), 8);
    });

    it('encodes without a minimum amount of bits', () => {
        expect(getBitsRequiredToEncodeNumber(10, undefined), 4);
    });

    it('serializes withDuplicateFlag in a condensed manner when all values are the same', () => {
        const binary = new JBinary(4, typeset);
        binary.write(['withDuplicateFlag', 'bool', ['field1', 'field2', 'field3', 'field4', 'field5']], {
            field1: true,
            field2: true,
            field3: true,
            field4: true,
            field5: true
        });
        expect(binary.read('uint32', 0)).to.equal(3221225472);
    });

    it('deserializes withDuplicateFlag in a condensed manner when all values are the same', () => {
        const binary = new JBinary([192, 0, 0, 0], typeset);
        expect(binary.read(['withDuplicateFlag', 'bool', ['field1', 'field2', 'field3', 'field4', 'field5']])).to.deep.equal({
            field1: true,
            field2: true,
            field3: true,
            field4: true,
            field5: true
        });
    });

    it('serializes withDuplicateFlag normally when not all values are the same', () => {
        const binary = new JBinary(4, typeset);
        binary.write(['withDuplicateFlag', 'bool', ['field1', 'field2', 'field3', 'field4', 'field5']], {
            field1: true,
            field2: true,
            field3: false,
            field4: true,
            field5: true
        });
        expect(binary.read('uint32', 0)).to.equal(1811939328);
    });

    it('deserializes withDuplicateFlag normally when not all values are the same', () => {
        const binary = new JBinary([108, 0, 0, 0], typeset);
        expect(binary.read(['withDuplicateFlag', 'bool', ['field1', 'field2', 'field3', 'field4', 'field5']])).to.deep.equal({
            field1: true,
            field2: true,
            field3: false,
            field4: true,
            field5: true
        });
    });

    it('serializes TypeBits', () => {
        const binary = new JBinary(4, typeset);
        binary.write('TypeBits', 6);
        binary.write('TypeBits', 2);
        expect(binary.read('uint32', 0)).to.equal(675282944);
    });

    it('deserializes TypeBits', () => {
        const binary = new JBinary([40, 64, 0, 0], typeset);
        expect(binary.read('TypeBits')).to.equal(6);
        expect(binary.read('TypeBits')).to.equal(2);
    });

    it('serializes Types', () => {
        const binary = new JBinary(4, typeset);
        binary.write('Types', { item: 1, itemstat: 1, pet: 1, skill: 1, specialization: 5, trait: 12 });
        expect(binary.read('uint32', 0)).to.equal(356);
    });

    it('deserializes Types', () => {
        const binary = new JBinary([0, 0, 1, 100], typeset);
        expect(binary.read('Types')).to.deep.equal({ item: 1, itemstat: 1, pet: 1, skill: 1, specialization: 5, trait: 12 });
    });

    it('serializes EnumGameMode', () => {
        const binary = new JBinary(4, typeset);
        binary.write('EnumGameMode', 'pvp');
        binary.write('EnumGameMode', 'bla');
        binary.write('EnumGameMode', undefined);
        expect(binary.read('uint32', 0)).to.equal(2147483648);
    });

    it('deserializes EnumGameMode', () => {
        const binary = new JBinary([128, 0, 0, 0], typeset);
        expect(binary.read('EnumGameMode')).to.equal('pvp');
        expect(binary.read('EnumGameMode')).to.equal(0);
    });

    it('serializes EnumProfession', () => {
        const binary = new JBinary(4, typeset);
        binary.write('EnumProfession', 'Thief');
        binary.write('EnumProfession', 'nothing');
        binary.write('EnumProfession', undefined);
        expect(binary.read('uint32', 0)).to.equal(1610612736);
    });

    it('deserializes EnumProfession', () => {
        const binary = new JBinary([96, 0, 0, 0], typeset);
        expect(binary.read('EnumProfession')).to.equal('Thief');
        expect(binary.read('EnumProfession')).to.equal(0);
    });

    it('serializes EnumRace', () => {
        const binary = new JBinary(4, typeset);
        binary.write('EnumRace', 'Charr');
        binary.write('EnumRace', 'none');
        binary.write('EnumRace', undefined);
        expect(binary.read('uint32', 0)).to.equal(1073741824);
    });

    it('deserializes EnumRace', () => {
        const binary = new JBinary([64, 0, 0, 0], typeset);
        expect(binary.read('EnumRace')).to.equal('Charr');
        expect(binary.read('EnumRace')).to.equal(0);
    });

    it('serializes EnumWeapon', () => {
        const binary = new JBinary(4, typeset);
        binary.write('EnumWeapon', 'Axe');
        binary.write('EnumWeapon', undefined);
        expect(binary.read('uint32', 0)).to.equal(134217728);
    });

    it('deserializes EnumWeapon', () => {
        const binary = new JBinary([8, 0, 0, 0], typeset);
        expect(binary.read('EnumWeapon')).to.equal('Axe');
        expect(binary.read('EnumWeapon')).to.equal(0);
    });

    it('serializes EnumWeaponAquatic', () => {
        const binary = new JBinary(4, typeset);
        binary.write('EnumWeaponAquatic', 'Speargun');
        binary.write('EnumWeaponAquatic', undefined);
        expect(binary.read('uint32', 0)).to.equal(1073741824);
    });

    it('deserializes EnumWeaponAquatic', () => {
        const binary = new JBinary([64, 0, 0, 0], typeset);
        expect(binary.read('EnumWeaponAquatic')).to.equal('Speargun');
        expect(binary.read('EnumWeaponAquatic')).to.equal(0);
    });

    it('serializes EnumLegend', () => {
        const binary = new JBinary(4, typeset);
        binary.write('EnumLegend', 'Legend1');
        binary.write('EnumLegend', undefined);
        expect(binary.read('uint32', 0)).to.equal(268435456);
    });

    it('deserializes EnumLegend', () => {
        const binary = new JBinary([16, 0, 0, 0], typeset);
        expect(binary.read('EnumLegend')).to.equal('Legend1');
        expect(binary.read('EnumLegend')).to.equal(0);
    });

    it('serializes EnumAttunement', () => {
        const binary = new JBinary(4, typeset);
        binary.write('EnumAttunement', 'Fire');
        binary.write('EnumAttunement', undefined);
        expect(binary.read('uint32', 0)).to.equal(536870912);
    });

    it('deserializes EnumAttunement', () => {
        const binary = new JBinary([32, 0, 0, 0], typeset);
        expect(binary.read('EnumAttunement')).to.equal('Fire');
        expect(binary.read('EnumAttunement')).to.equal(0);
    });

    it('serializes BlockId', () => {
        const binary = new JBinary(4, typeset);
        binary.write('BlockId', 123);
        expect(binary.read('uint32', 0)).to.equal(2063597568);
    });

    it('deserializes BlockId', () => {
        const binary = new JBinary([123, 0, 0, 0], typeset);
        expect(binary.read('BlockId')).to.equal(123);
    });

    it('serializes BlockDataGeneral', () => {
        const binary = new JBinary(8, typeset);
        binary.write('BlockDataGeneral', {
            build: 66770,
            gameMode: 'pve',
            profession: 'Guardian',
            race: 'Norn'
        });
        binary.write('BlockDataGeneral', {
            build: 0,
            gameMode: undefined,
            profession: undefined,
            race: undefined
        });
        expect(binary.read('uint32', 0)).to.equal(40444672);
        expect(binary.read('uint32', 4)).to.equal(0);
        expect(binary.view._bitOffset).to.equal(0);
    });

    it('deserializes BlockDataGeneral', () => {
        const binary = new JBinary([2, 105, 35, 0], typeset);
        expect(binary.read('BlockDataGeneral', 0)).to.deep.equal({
            build: 66770,
            gameMode: 'pve',
            profession: 'Guardian',
            race: 'Norn'
        });
        expect(binary.view._bitOffset).to.equal(0);
    });

    it('serializes BlockDataSpecialization', () => {
        const types = { specialization: 5, trait: 12 };
        const binary = new JBinary(8, typeset);
        binary.write(['BlockDataSpecialization', types], {
            specialization: 12,
            majorTrait1: 1234,
            majorTrait2: 2345,
            majorTrait3: 3456
        });
        expect(binary.read('uint32', 0)).to.equal(1651067214);
        expect(binary.read('uint32', 4)).to.equal(3221225472);
        expect(binary.view._bitOffset).to.equal(0);
    });

    it('deserializes BlockDataSpecialization', () => {
        const types = { specialization: 5, trait: 12 };
        const binary = new JBinary([98, 105, 73, 78, 192, 0, 0, 0], typeset);
        expect(binary.read(['BlockDataSpecialization', types], 0)).to.deep.equal({
            specialization: 12,
            majorTrait1: 1234,
            majorTrait2: 2345,
            majorTrait3: 3456
        });
        expect(binary.view._bitOffset).to.equal(0);
    });

    it('serializes BlockDataWeapons', () => {
        const binary = new JBinary(4, typeset);
        binary.write('BlockDataWeapons', {
            weaponA1: 'Axe',
            weaponA2: 'Pistol',
            weaponB1: 'Greatsword',
            aquaticA: 'Speargun',
            aquaticB: 'Spear'
        });
        expect(binary.read('uint32', 0)).to.equal(152438272);
        expect(binary.view._bitOffset).to.equal(0);
    });

    it('deserializes BlockDataWeapons', () => {
        const binary = new JBinary([9, 22, 6, 0], typeset);
        expect(binary.read('BlockDataWeapons', 0)).to.deep.equal({
            weaponA1: 'Axe',
            weaponA2: 'Pistol',
            weaponB1: 'Greatsword',
            weaponB2: 0,
            aquaticA: 'Speargun',
            aquaticB: 'Spear'
        });
        expect(binary.view._bitOffset).to.equal(0);
    });

    it('serializes BlockDataSkills', () => {
        const types = { skill: 13 };
        const binary = new JBinary(12, typeset);
        binary.write(['BlockDataSkills', types], {
            healing: 1234,
            utility1: 2345,
            utility2: 3456,
            utility3: 4567,
            elite: 5678
        });
        expect(binary.read('uint32', 0)).to.equal(647121499);
        expect(binary.read('uint32', 4)).to.equal(18709271);
        expect(binary.read('uint32', 8)).to.equal(0);
        expect(binary.view._bitOffset).to.equal(0);
    });

    it('deserializes BlockDataSkills', () => {
        const types = { skill: 13 };
        const binary = new JBinary([38, 146, 74, 91, 1, 29, 123, 23, 0], typeset);
        expect(binary.read(['BlockDataSkills', types], 0)).to.deep.equal({
            healing: 1234,
            utility1: 2345,
            utility2: 3456,
            utility3: 4567,
            elite: 5678
        });
        expect(binary.view._bitOffset).to.equal(0);
    });

    it('serializes BlockDataProfessionGuardian', () => {
        const binary = new JBinary(4, typeset);
        binary.write('BlockDataProfessionGuardian', { });
        expect(binary.read('uint32', 0)).to.equal(0);
        expect(binary.view._bitOffset).to.equal(0);
    });

    it('deserializes BlockDataProfessionGuardian', () => {
        const binary = new JBinary([0], typeset);
        expect(binary.read('BlockDataProfessionGuardian', 0)).to.deep.equal({ });
        expect(binary.view._bitOffset).to.equal(0);
    });

    it('serializes BlockDataProfessionRevenant', () => {
        const binary = new JBinary(4, typeset);
        binary.write('BlockDataProfessionRevenant', {
            legendA: 'Legend1',
            legendB: 'Legend2'
        });
        expect(binary.read('uint32', 0)).to.equal(301989888);
        expect(binary.view._bitOffset).to.equal(0);
    });

    it('deserializes BlockDataProfessionRevenant', () => {
        const binary = new JBinary([18, 0, 0, 0], typeset);
        expect(binary.read('BlockDataProfessionRevenant', 0)).to.deep.equal({
            legendA: 'Legend1',
            legendB: 'Legend2'
        });
        expect(binary.view._bitOffset).to.equal(0);
    });

    it('serializes BlockDataProfessionWarrior', () => {
        const binary = new JBinary(4, typeset);
        binary.write('BlockDataProfessionWarrior', { });
        expect(binary.read('uint32', 0)).to.equal(0);
        expect(binary.view._bitOffset).to.equal(0);
    });

    it('deserializes BlockDataProfessionWarrior', () => {
        const binary = new JBinary([0], typeset);
        expect(binary.read('BlockDataProfessionWarrior', 0)).to.deep.equal({ });
        expect(binary.view._bitOffset).to.equal(0);
    });

    it('serializes BlockDataProfessionEngineer', () => {
        const binary = new JBinary(4, typeset);
        binary.write('BlockDataProfessionEngineer', { });
        expect(binary.read('uint32', 0)).to.equal(0);
        expect(binary.view._bitOffset).to.equal(0);
    });

    it('deserializes BlockDataProfessionEngineer', () => {
        const binary = new JBinary([0], typeset);
        expect(binary.read('BlockDataProfessionEngineer', 0)).to.deep.equal({ });
        expect(binary.view._bitOffset).to.equal(0);
    });

    it('serializes BlockDataProfessionRanger', () => {
        const types = { pet: 6 };
        const binary = new JBinary(4, typeset);
        binary.write(['BlockDataProfessionRanger', types], {
            petA: 12,
            petB: 23,
            petAquaticA: 34,
            petAquaticB: 45
        });
        expect(binary.read('uint32', 0)).to.equal(829992192);
        expect(binary.view._bitOffset).to.equal(0);
    });

    it('deserializes BlockDataProfessionRanger', () => {
        const types = { pet: 6 };
        const binary = new JBinary([49, 120, 173, 0], typeset);
        expect(binary.read(['BlockDataProfessionRanger', types], 0)).to.deep.equal({
            petA: 12,
            petB: 23,
            petAquaticA: 34,
            petAquaticB: 45
        });
        expect(binary.view._bitOffset).to.equal(0);
    });

    it('serializes BlockDataProfessionThief', () => {
        const binary = new JBinary(4, typeset);
        binary.write('BlockDataProfessionThief', { });
        expect(binary.read('uint32', 0)).to.equal(0);
        expect(binary.view._bitOffset).to.equal(0);
    });

    it('deserializes BlockDataProfessionThief', () => {
        const binary = new JBinary([0], typeset);
        expect(binary.read('BlockDataProfessionThief', 0)).to.deep.equal({ });
        expect(binary.view._bitOffset).to.equal(0);
    });

    it('serializes BlockDataProfessionElementalist', () => {
        const binary = new JBinary(4, typeset);
        binary.write('BlockDataProfessionElementalist', {
            attunement: 'Fire',
            prevAttunementWeaver: 'Water'
        });
        expect(binary.read('uint32', 0)).to.equal(671088640);
        expect(binary.view._bitOffset).to.equal(0);
    });

    it('deserializes BlockDataProfessionElementalist', () => {
        const binary = new JBinary([40, 0, 0, 0], typeset);
        expect(binary.read('BlockDataProfessionElementalist', 0)).to.deep.equal({
            attunement: 'Fire',
            prevAttunementWeaver: 'Water'
        });
        expect(binary.view._bitOffset).to.equal(0);
    });

    it('serializes BlockDataProfessionMesmer', () => {
        const binary = new JBinary(4, typeset);
        binary.write('BlockDataProfessionMesmer', { });
        expect(binary.read('uint32', 0)).to.equal(0);
        expect(binary.view._bitOffset).to.equal(0);
    });

    it('deserializes BlockDataProfessionMesmer', () => {
        const binary = new JBinary([0], typeset);
        expect(binary.read('BlockDataProfessionMesmer', 0)).to.deep.equal({ });
        expect(binary.view._bitOffset).to.equal(0);
    });

    it('serializes BlockDataProfessionNecromancer', () => {
        const binary = new JBinary(4, typeset);
        binary.write('BlockDataProfessionNecromancer', { });
        expect(binary.read('uint32', 0)).to.equal(0);
        expect(binary.view._bitOffset).to.equal(0);
    });

    it('deserializes BlockDataProfessionNecromancer', () => {
        const binary = new JBinary([0], typeset);
        expect(binary.read('BlockDataProfessionNecromancer', 0)).to.deep.equal({ });
        expect(binary.view._bitOffset).to.equal(0);
    });

    it('serializes BlockDataGearStats', () => {
        const types = { itemstat: 5 };
        const binary = new JBinary(16, typeset);
        binary.write(['BlockDataGearStats', types], {
            weaponA1: 1,
            weaponA2: 2,
            weaponB1: 3,
            weaponB2: 4,
            weaponAquaticA: 5,
            weaponAquaticB: 6,
            helm: 7,
            shoulders: 8,
            coat: 9,
            gloves: 10,
            leggings: 11,
            boots: 12,
            helmAquatic: 13,
            backpack: 14,
            accessory1: 15,
            accessory2: 16,
            amulet: 17,
            ring1: 18,
            ring2: 19,

            weaponA1IsAscended: true,
            weaponA2IsAscended: false,
            weaponB1IsAscended: true,
            weaponB2IsAscended: false,
            weaponAquaticAIsAscended: true,
            weaponAquaticBIsAscended: false,
            helmIsAscended: true,
            shouldersIsAscended: false,
            coatIsAscended: true,
            glovesIsAscended: false,
            leggingsIsAscended: true,
            bootsIsAscended: false,
            helmAquaticIsAscended: true,
            backpackIsAscended: false,
            accessory1IsAscended: true,
            accessory2IsAscended: false,
            amuletIsAscended: true,
            ring1IsAscended: false,
            ring2IsAscended: true
        });
        expect(binary.read('uint32', 0)).to.equal(143016600);
        expect(binary.read('uint32', 4)).to.equal(3897202374);
        expect(binary.read('uint32', 8)).to.equal(3119549606);
        expect(binary.read('uint32', 12)).to.equal(2863308800);
        expect(binary.view._bitOffset).to.equal(0);
    });

    it('deserializes BlockDataGearStats', () => {
        const types = { itemstat: 5 };
        const binary = new JBinary([8, 134, 66, 152, 232, 74, 150, 198, 185, 240, 140, 166, 170, 170, 160], typeset);
        expect(binary.read(['BlockDataGearStats', types], 0)).to.deep.equal({
            weaponA1: 1,
            weaponA2: 2,
            weaponB1: 3,
            weaponB2: 4,
            weaponAquaticA: 5,
            weaponAquaticB: 6,
            helm: 7,
            shoulders: 8,
            coat: 9,
            gloves: 10,
            leggings: 11,
            boots: 12,
            helmAquatic: 13,
            backpack: 14,
            accessory1: 15,
            accessory2: 16,
            amulet: 17,
            ring1: 18,
            ring2: 19,

            weaponA1IsAscended: true,
            weaponA2IsAscended: false,
            weaponB1IsAscended: true,
            weaponB2IsAscended: false,
            weaponAquaticAIsAscended: true,
            weaponAquaticBIsAscended: false,
            helmIsAscended: true,
            shouldersIsAscended: false,
            coatIsAscended: true,
            glovesIsAscended: false,
            leggingsIsAscended: true,
            bootsIsAscended: false,
            helmAquaticIsAscended: true,
            backpackIsAscended: false,
            accessory1IsAscended: true,
            accessory2IsAscended: false,
            amuletIsAscended: true,
            ring1IsAscended: false,
            ring2IsAscended: true
        });
        expect(binary.view._bitOffset).to.equal(0);
    });

    it('serializes BlockDataGearUpgrades', () => {
        const types = { item: 4 };
        const binary = new JBinary(8, typeset);
        binary.write(['BlockDataGearUpgrades', types], {
            weaponA1: 1,
            weaponA2: 2,
            weaponB1: 3,
            weaponB2: 4,
            weaponAquaticA: 5,
            weaponAquaticB: 6,
            helm: 7,
            shoulders: 7,
            coat: 7,
            gloves: 7,
            leggings: 7,
            boots: 7,
            helmAquatic: 7,
            backpack: 8,
            accessory1: 9,
            accessory2: 10,
            amulet: 11,
            ring1: 12,
            ring2: 13,
        });
        expect(binary.read('uint32', 0)).to.equal(305419962);
        expect(binary.read('uint32', 4)).to.equal(649016320);
        expect(binary.view._bitOffset).to.equal(0);
    });

    it('deserializes BlockDataGearUpgrades', () => {
        const types = { item: 4 };
        const binary = new JBinary([18, 52, 86, 186, 38, 175, 52, 0], typeset);
        expect(binary.read(['BlockDataGearUpgrades', types], 0)).to.deep.equal({
            weaponA1: 1,
            weaponA2: 2,
            weaponB1: 3,
            weaponB2: 4,
            weaponAquaticA: 5,
            weaponAquaticB: 6,
            helm: 7,
            shoulders: 7,
            coat: 7,
            gloves: 7,
            leggings: 7,
            boots: 7,
            helmAquatic: 7,
            backpack: 8,
            accessory1: 9,
            accessory2: 10,
            amulet: 11,
            ring1: 12,
            ring2: 13,
        });
        expect(binary.view._bitOffset).to.equal(0);
    });

    it('serializes BlockDataGearInfusions', () => {
        const types = { item: 5 };
        const binary = new JBinary(16, typeset);
        binary.write(['BlockDataGearInfusions', types], {
            weaponA1: 1,
            weaponA2: 2,
            weaponB1: 3,
            weaponB2: 4,
            weaponAquaticA: 5,
            weaponAquaticB: 6,
            helm: 7,
            shoulders: 8,
            coat: 9,
            gloves: 10,
            leggings: 11,
            boots: 12,
            helmAquatic: 13,
            backpack: 14,
            backpackInfused: 15,
            accessory1: 16,
            accessory2: 17,
            ring1: 18,
            ring1Infused: 19,
            ring1Attuned: 20,
            ring2: 21,
            ring2Infused: 22,
            ring2Attuned: 23
        });
        expect(binary.read('uint32', 0)).to.equal(71508300);
        expect(binary.read('uint32', 4)).to.equal(1948601187);
        expect(binary.read('uint32', 8)).to.equal(1559774803);
        expect(binary.read('uint32', 12)).to.equal(2775412736);
        expect(binary.view._bitOffset).to.equal(0);
    });

    it('deserializes BlockDataGearInfusions', () => {
        const types = { item: 5 };
        const binary = new JBinary([4, 67, 33, 76, 116, 37, 75, 99, 92, 248, 70, 83, 165, 109, 112, 0], typeset);
        expect(binary.read(['BlockDataGearInfusions', types], 0)).to.deep.equal({
            weaponA1: 1,
            weaponA2: 2,
            weaponB1: 3,
            weaponB2: 4,
            weaponAquaticA: 5,
            weaponAquaticB: 6,
            helm: 7,
            shoulders: 8,
            coat: 9,
            gloves: 10,
            leggings: 11,
            boots: 12,
            helmAquatic: 13,
            backpack: 14,
            backpackInfused: 15,
            accessory1: 16,
            accessory2: 17,
            ring1: 18,
            ring1Infused: 19,
            ring1Attuned: 20,
            ring2: 21,
            ring2Infused: 22,
            ring2Attuned: 23
        });
        expect(binary.view._bitOffset).to.equal(0);
    });

    it('serializes BlockDataGearPvp', () => {
        const types = { item: 3, itemstat: 1 };
        const binary = new JBinary(4, typeset);
        binary.write(['BlockDataGearPvp', types], {
            amulet: 1,
            weaponA1Upgrade: 2,
            weaponA2Upgrade: 3,
            weaponB1Upgrade: 4,
            weaponB2Upgrade: 5,
            armorUpgrade: 6
        });
        expect(binary.read('uint32', 0)).to.equal(2804809728);
        expect(binary.view._bitOffset).to.equal(0);
    });

    it('deserializes BlockDataGearPvp', () => {
        const types = { item: 3, itemstat: 1 };
        const binary = new JBinary([167, 46, 0, 0], typeset);
        expect(binary.read(['BlockDataGearPvp', types], 0)).to.deep.equal({
            amulet: 1,
            weaponA1Upgrade: 2,
            weaponA2Upgrade: 3,
            weaponB1Upgrade: 4,
            weaponB2Upgrade: 5,
            armorUpgrade: 6
        });
        expect(binary.view._bitOffset).to.equal(0);
    });

    it('serializes BlockDataFood', () => {
        const types = { item: 2 };
        const binary = new JBinary(4, typeset);
        binary.write(['BlockDataFood', types], {
            food: 1,
            utility: 2
        });
        expect(binary.read('uint32', 0)).to.equal(1610612736);
        expect(binary.view._bitOffset).to.equal(0);
    });

    it('deserializes BlockDataFood', () => {
        const types = { item: 2 };
        const binary = new JBinary([96, 0, 0, 0], typeset);
        expect(binary.read(['BlockDataFood', types], 0)).to.deep.equal({
            food: 1,
            utility: 2
        });
        expect(binary.view._bitOffset).to.equal(0);
    });

    it('serializes Block', () => {
        const types = { specialization: 5, trait: 12 };
        const binary = new JBinary(8, typeset);

        binary.write(['Block', types], {
            id: 'BlockDataSpecialization1',
            data: {
                specialization: 0,
                majorTrait1: 0,
                majorTrait2: undefined,
                majorTrait3: undefined
            }
        });
        expect(binary.read('uint32', 0)).to.equal(0);
        expect(binary.read('uint32', 4)).to.equal(0);
        expect(binary.tell()).to.equal(0);

        binary.write(['Block', types], {
            id: 'BlockDataSpecialization1',
            data: undefined
        });
        expect(binary.read('uint32', 0)).to.equal(0);
        expect(binary.read('uint32', 4)).to.equal(0);
        expect(binary.tell()).to.equal(0);

        binary.write(['Block', types], {
            id: 'BlockDataSpecialization1',
            data: {
                specialization: 12,
                majorTrait1: 1234,
                majorTrait2: 2345,
                majorTrait3: 3456
            }
        });
        expect(binary.read('uint32', 0)).to.equal(190998857);
        expect(binary.read('uint32', 4)).to.equal(1321205760);
        expect(binary.view._bitOffset).to.equal(0);
    });

    it('deserializes Block', () => {
        const types = { specialization: 5, trait: 12 };
        const binary = new JBinary([11, 98, 105, 73, 78, 192, 0, 0], typeset);
        expect(binary.read(['Block', types], 0)).to.deep.equal({
            id: 'BlockDataSpecialization1',
            data: {
                specialization: 12,
                majorTrait1: 1234,
                majorTrait2: 2345,
                majorTrait3: 3456
            }
        });
        expect(binary.view._bitOffset).to.equal(0);
    });

    it('serializes BuildSettings', () => {
        const binary = new JBinary(16, typeset);
        binary.write('BuildSettings', {
            general: {
                build: 70000,
                gameMode: 'wvw',
                profession: 'Mesmer',
                race: 'Human'
            },
            specialization2: {
                specialization: 12,
                majorTrait1: 4567,
                majorTrait2: 7890,
                majorTrait3: 1248
            }
        });
        expect(binary.read('uint32', 0)).to.equal(387);
        expect(binary.read('uint32', 4)).to.equal(17348720);
        expect(binary.read('uint32', 8)).to.equal(3222063339);
        expect(binary.read('uint32', 12)).to.equal(4215839744);
    });

    it('deserializes BuildSettings', () => {
        const binary = new JBinary([0, 0, 1, 131, 1, 8, 184, 112, 192, 12, 200, 235, 251, 72, 156, 0], typeset);
        expect(binary.read('BuildSettings')).to.deep.equal({
            general: {
                build: 70000,
                gameMode: 'wvw',
                profession: 'Mesmer',
                race: 'Human'
            },
            specialization2: {
                specialization: 12,
                majorTrait1: 4567,
                majorTrait2: 7890,
                majorTrait3: 1248
            }
        });
    });

    it('ignores all irrelevant data when PvP is selected', () => {
        const binary = new JBinary(128, typeset);
        binary.write('BuildSettings', {
            general: {
                build: 70000,
                gameMode: 'pvp',
                profession: 'Revenant',
                race: 'Sylvari'
            },
            gearStats: {
                weaponA1: 1234
            },
            gearUpgrades: {
                weaponA1: 2345
            },
            gearInfusions: {
                weaponA1: 3456
            },
            gearPvp: {
                amulet: 4567,
                weaponA1Upgrade: 0,
                weaponA2Upgrade: 0,
                weaponB1Upgrade: 0,
                weaponB2Upgrade: 0,
                armorUpgrade: 0
            },
            food: {
                food: 5678
            }
        });
        expect(binary.read('BuildSettings', 0)).to.deep.equal({
            general: {
                build: 70000,
                gameMode: 'pvp',
                profession: 'Revenant',
                race: 0
            },
            gearPvp: {
                amulet: 4567,
                weaponA1Upgrade: 0,
                weaponA2Upgrade: 0,
                weaponB1Upgrade: 0,
                weaponB2Upgrade: 0,
                armorUpgrade: 0
            }
        });
    });

    it('ignores all profession blocks except for the selected profession', () => {
        const binary = new JBinary(64, typeset);
        binary.write('BuildSettings', {
            general: {
                build: 70000,
                gameMode: 'pve',
                profession: 'Ranger',
                race: 'Asura'
            },
            professionGuardian: {},
            professionRevenant: {
                legendA: 'Legend1',
                legendB: 'Legend2'
            },
            professionWarrior: {},
            professionEngineer: {},
            professionRanger: {
                petA: 12,
                petB: 23,
                petAquaticA: 34,
                petAquaticB: 45
            },
            professionThief: {},
            professionElementalist: {
                attunement: 'Fire',
                prevAttunementWeaver: 'Water'
            },
            professionMesmer: {},
            professionNecromancer: {}
        });
        expect(binary.read('BuildSettings', 0)).to.deep.equal({
            general: {
                build: 70000,
                gameMode: 'pve',
                profession: 'Ranger',
                race: 'Asura'
            },
            professionRanger: {
                petA: 12,
                petB: 23,
                petAquaticA: 34,
                petAquaticB: 45
            }
        });
    });
});
