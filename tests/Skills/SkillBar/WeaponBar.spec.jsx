/* eslint-env node, mocha */
import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import {
    skills, weapons, activeMajorTraits, activeMinorTraits,
    WEAPON_SIMPLE, WEAPON_OFFHAND, WEAPON_ATTUNEMENT,
    ATTUNEMENT1, ATTUNEMENT2,
    SKILL_SIMPLE, SKILL_OFFHAND_NOTHING, SKILL_OFFHAND_SOMETHING, SKILL_ATTUNEMENT_1, SKILL_ATTUNEMENT_2
} from './WeaponBar.stub';

import WeaponBar from '~/components/Skills/SkillBar/WeaponBar/WeaponBar';
import SkillIcon from '~/components/Skills/Icon';

describe('WeaponBar', () => {
    it('renders 5 empty skill icons', () => {
        const props = { skills, weapons, activeMajorTraits, activeMinorTraits };
        expect(shallow(<WeaponBar {...props}/>).find(SkillIcon.Empty)).to.have.length(5);
    });

    it('renders mainhand skills', () => {
        const props = {
            skills, weapons, activeMajorTraits, activeMinorTraits,
            mainhand: WEAPON_SIMPLE, isTwoHanded: false
        };

        const wrapper = shallow(<WeaponBar {...props}/>);
        expect(wrapper.find(SkillIcon)).to.have.length(3);
        expect(wrapper.find(SkillIcon).first().prop('skill')).to.equal(SKILL_SIMPLE);
        expect(wrapper.find(SkillIcon.Empty)).to.have.length(2);
    });

    it('renders offhand skills', () => {
        const props = {
            skills, weapons, activeMajorTraits, activeMinorTraits,
            offhand: WEAPON_SIMPLE, isTwoHanded: false
        };

        const wrapper = shallow(<WeaponBar {...props}/>);
        expect(wrapper.find(SkillIcon)).to.have.length(2);
        expect(wrapper.find(SkillIcon.Empty)).to.have.length(3);
    });

    it('renders mainhand and offhand skills', () => {
        const props = {
            skills, weapons, activeMajorTraits, activeMinorTraits,
            mainhand: WEAPON_SIMPLE, offhand: WEAPON_SIMPLE, isTwoHanded: false
        };

        const wrapper = shallow(<WeaponBar {...props}/>);
        expect(wrapper.find(SkillIcon)).to.have.length(5);
        expect(wrapper.find(SkillIcon.Empty)).to.have.length(0);
    });

    it('renders two handed skills', () => {
        const props = {
            skills, weapons, activeMajorTraits, activeMinorTraits,
            mainhand: WEAPON_SIMPLE, isTwoHanded: true
        };

        const wrapper = shallow(<WeaponBar {...props}/>);
        expect(wrapper.find(SkillIcon)).to.have.length(5);
        expect(wrapper.find(SkillIcon.Empty)).to.have.length(0);
    });

    it('renders offhand dependant skills', () => {
        const props = {
            skills, weapons, activeMajorTraits, activeMinorTraits,
            mainhand: WEAPON_OFFHAND, isTwoHanded: false
        };

        expect(shallow(<WeaponBar {...props}/>)
            .find(SkillIcon).at(2).prop('skill')).to.equal(SKILL_OFFHAND_NOTHING);
        expect(shallow(<WeaponBar {...props} offhand={WEAPON_SIMPLE}/>)
            .find(SkillIcon).at(2).prop('skill')).to.equal(SKILL_OFFHAND_SOMETHING);
    });


    it('renders attunement dependant skills', () => {
        const props = {
            skills, weapons, activeMajorTraits, activeMinorTraits,
            mainhand: WEAPON_ATTUNEMENT, isTwoHanded: true
        };

        expect(shallow(<WeaponBar {...props} attunement={ATTUNEMENT1}/>)
            .find(SkillIcon).first().prop('skill')).to.equal(SKILL_ATTUNEMENT_1);
        expect(shallow(<WeaponBar {...props} attunement={ATTUNEMENT2}/>)
            .find(SkillIcon).first().prop('skill')).to.equal(SKILL_ATTUNEMENT_2);
    });
});
