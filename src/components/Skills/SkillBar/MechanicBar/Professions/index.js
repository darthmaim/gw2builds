import Elementalist from './Elementalist';
import Thief from './Thief';
import Necromancer from './Necromancer';
import Mesmer from './Mesmer';
import Warrior from './Warrior';

// placeholder components until all professions have their mechanics bar implemented
const NullComponent = () => null;
const emptyProfession = {
    Component: NullComponent,
    Container: NullComponent
};

const Guardian = emptyProfession;
const Revenant = emptyProfession;
const Engineer = emptyProfession;
const Ranger = emptyProfession;

export default {
    Guardian,
    Revenant,
    Warrior,
    Engineer,
    Ranger,
    Thief,
    Elementalist,
    Mesmer,
    Necromancer
};
