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
        binary.write('Types', { specialization: 5, trait: 12 });
        expect(binary.read('uint32', 0)).to.equal(356);
    });

    it('deserializes Types', () => {
        const binary = new JBinary([0, 0, 1, 100], typeset);
        expect(binary.read('Types')).to.deep.equal({ specialization: 5, trait: 12 });
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
        expect(binary.read('uint32', 0)).to.equal(80889344);
        expect(binary.read('uint32', 4)).to.equal(0);
        expect(binary.view._bitOffset).to.equal(0);
    });

    it('deserializes BlockDataGeneral', () => {
        const binary = new JBinary([4, 210, 70, 0], typeset);
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
        expect(binary.read('uint32', 4)).to.equal(17920225);
        expect(binary.read('uint32', 8)).to.equal(2148321515);
        expect(binary.read('uint32', 12)).to.equal(4215839744);
    });

    it('deserializes BuildSettings', () => {
        const binary = new JBinary([0, 0, 1, 131, 1, 17, 112, 225, 128, 12, 200, 235, 251, 72, 156, 0], typeset);
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
});
