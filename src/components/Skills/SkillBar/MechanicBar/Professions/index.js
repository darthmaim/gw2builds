import Elementalist from './Elementalist';

// placeholder components until all professions have their mechanics bar implemented
const NullComponent = () => null;
const emptyProfession = {
    Component: NullComponent,
    Container: NullComponent
};

const Guardian = emptyProfession;
const Revenant = emptyProfession;
const Warrior = emptyProfession;
const Engineer = emptyProfession;
const Ranger = emptyProfession;
const Thief = emptyProfession;
const Mesmer = emptyProfession;
const Necromancer = emptyProfession;

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
