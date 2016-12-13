import jBinary from 'jbinary';
import typeset from './typeset';

export function serialize(data) {
    const binary = new jBinary(64, typeset);
    binary.write('BuildSettings', data);
    const bytesWritten = binary.tell();
    binary.seek(0);
    return binary.read(['array', 'uint8', bytesWritten]);
}

export function deserialize(data) {
    const binary = new jBinary(data, typeset);
    return binary.read('BuildSettings');
}

export default {
    serialize,
    deserialize
};
