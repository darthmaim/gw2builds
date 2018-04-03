import Elementalist from './Elementalist';
import Engineer from './Engineer';
import Guardian from './Guardian';
import Mesmer from './Mesmer';
import Necromancer from './Necromancer';
import Ranger from './Ranger';
import Thief from './Thief';
import Warrior from './Warrior';

// placeholder components until all professions have their mechanics bar implemented
const NullComponent = () => null;
const emptyProfession = {
    Component: NullComponent,
    Container: NullComponent
};

const Revenant = emptyProfession;

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
