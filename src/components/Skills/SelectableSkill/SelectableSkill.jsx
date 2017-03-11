import React, { Component } from 'react';
import SelectionPopup from './SelectionPopup';
import SkillTooltip from '~/components/Tooltips/Skills/TooltipContainer';
import SkillIcon from '../Icon';
import style from './SelectableSkill.css'

class SelectableSkill extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            isSelectionPopupOpen: false
        };
        this.handleCloseSelectionPopup = this.handleCloseSelectionPopup.bind(this);
        this.handleToggleSelectionPopup = this.handleToggleSelectionPopup.bind(this);
        this.renderSkill = this.renderSkill.bind(this);
    }

    handleCloseSelectionPopup() {
        this.setState({
            isSelectionPopupOpen: false
        });
    }

    handleToggleSelectionPopup() {
        if (this.getSkillsForSlot(this.props) && this.getSkillsForSlot(this.props).length > 0) {
            this.setState({
                isSelectionPopupOpen: !this.state.isSelectionPopupOpen
            });
        }
    }

    getSkillsForSlot({ skills, attunement, slot }) {
        // find all matching skills for the requested slot
        return Object.values(skills)
        // filter slot
            .filter(skill => skill.slot === slot);
    }

    render() {
        const skills = this.getSkillsForSlot(this.props);
        return (
            <div className={style.skill} onClick={this.handleToggleSelectionPopup}>
                {this.renderSkill(this.props.selectedSkill > 0 ? this.props.skills[this.props.selectedSkill] : null)}
                { this.state.isSelectionPopupOpen ?
                    <SelectionPopup
                        onWantsClose={this.handleCloseSelectionPopup}
                        skills={skills}
                    />
                    :
                    null
                }
            </div>
        );
    }

    renderSkill(skill, index) {
        if (skill === null) {
            return (
                <SkillIcon.Empty
                    key={index}
                    onClick={this.handleToggleSelectionPopup}
                />
            );
        }

        return (
            <SkillTooltip
                key={index}
                skill={skill}
                onClick={this.handleToggleSelectionPopup}
            >
                <SkillIcon
                    skill={skill}
                    onClick={this.handleToggleSelectionPopup}
                />
            </SkillTooltip>
        );
    }
}

SelectableSkill.propTypes = {
    attunement: React.PropTypes.string,
    selectedSkill: React.PropTypes.number,
    skills: React.PropTypes.object.isRequired,
    slot: React.PropTypes.string
};

export default SelectableSkill;

