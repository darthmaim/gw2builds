/* eslint-env node, mocha */
import { expect } from 'chai';
import { toBase64, fromBase64 } from '../src/utils';

describe('global utils', () => {
    it('encodes data to url safe base64', () => {
        expect(toBase64(new Uint8ClampedArray([0, 0, 0]))).to.equal('AAAA');
        expect(toBase64([0])).to.equal('AA');
        expect(toBase64([77, 97])).to.equal('TWE');
        expect(toBase64([251, 255, 254])).to.equal('-__-');
    });

    it('decodes url safe base64 to data', () => {
        expect(fromBase64('AAAA')).to.deep.equal([0, 0, 0]);
        expect(fromBase64('AA')).to.deep.equal([0]);
        expect(fromBase64('TWE')).to.deep.equal([77, 97]);
        expect(fromBase64('-__-')).to.deep.equal([251, 255, 254]);
    });
});
