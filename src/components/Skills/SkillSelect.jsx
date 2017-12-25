import React from 'react';
import PropTypes from 'prop-types';
import Select from '../Inputs/Select/Select';
import SkillIcon from './Icon';
import SkillTooltip from '../Tooltips/Skills/TooltipContainer';
import style from './SkillSelect.css';

class SkillSelect extends Select {
    get children() {
        return this.props.skills.map(
            (skill) => (
                <Select.Option key={skill.id} value={skill.id}>
                    <SkillTooltip skill={skill}>
                        <div className={style.option}>
                            <SkillIcon className={style.icon} skill={skill} size={32}/>{skill.name}
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
        const size = this.props.size;
        const skill = this.props.skills.filter((skill) => skill.id === id)[0];

        if(!skill) {
            return (
                <SkillIcon.Empty size={size}/>
            );
        }

        return (
            <SkillTooltip selectedMajorTraitIds={[]} selectedMinorTraitIds={[]} skill={skill}>
                <div>
                    <SkillIcon skill={skill} size={size}/>
                </div>
            </SkillTooltip>
        );
    }
}

SkillSelect.PropTypes = {
    ...Select.PropTypes,
    skills: PropTypes.array.isRequired,
    size: PropTypes.number.isRequired
};

SkillSelect.defaultProps = {
    ...Select.defaultProps,
    size: 64
};

delete SkillSelect.propTypes['children'];

export default SkillSelect;
