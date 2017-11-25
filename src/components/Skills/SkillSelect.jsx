import React from 'react';
import PropTypes from 'prop-types';
import Select from '../Inputs/Select/Select';
import SkillIcon from './Icon';
import SkillTooltip from '../Tooltips/Skills/Tooltip';
import style from './SkillSelect.css';

class SkillSelect extends Select {
    get children() {
        return this.props.skills.map(
            (skill) => (
                <Select.Option key={skill.id} value={skill.id}>
                    <SkillTooltip selectedMajorTraitIds={[]} selectedMinorTraitIds={[]} skill={skill}>
                        <div>
                            <SkillIcon skill={skill} size={32}/> {skill.name}
                        </div>
                    </SkillTooltip>
                </Select.Option>
            )
        );
    }

    getClassName() {
        return style.select;
    }

    renderCurrentValue() {
        const id = this.props.value;
        const skill = this.props.skills.filter((skill) => skill.id === id)[0];

        return (
            <SkillTooltip selectedMajorTraitIds={[]} selectedMinorTraitIds={[]} skill={skill}>
                <div>
                    <SkillIcon skill={skill} size={64}/>
                </div>
            </SkillTooltip>
        );
    }
}

SkillSelect.PropTypes = {
    ...Select.PropTypes,
    skills: PropTypes.array.isRequired
};

delete SkillSelect.propTypes['children'];
//SkillSelect.propTypes.skills = PropTypes.array.isRequired;

export default SkillSelect;
