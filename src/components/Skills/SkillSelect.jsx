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
                <Select.Option key={skill.id} value={skill.id} keywords={[skill.name]}>
                    <SkillTooltip skill={skill} action={this.props.optionAction}>
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
        const skill = this.props.getCurrentSkill(id);

        if(!skill) {
            return (
                <SkillIcon.Empty size={size}/>
            );
        }

        return (
            <SkillTooltip skill={skill} action={this.props.valueAction}>
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
    size: PropTypes.number.isRequired,
    valueAction: PropTypes.string.isRequired,
    optionAction: PropTypes.string.isRequired,
    getCurrentSkill: PropTypes.func.isRequired
};

SkillSelect.defaultProps = {
    ...Select.defaultProps,
    size: 64,
    valueAction: 'select different skill',
    optionAction: 'select this skill',
    getCurrentSkill: (value) => this.props.skills.filter((skill) => skill.id === value)[0]
};

delete SkillSelect.propTypes['children'];

export default SkillSelect;
