"use strict";

import React from "react";
import TabsPanel from "../base/tabs-panel";
import { TraitsPanelHeader, TraitsPanel } from "./traits";

class CharacterPanel extends React.Component {
    render() {
        return (
            <div className="character-panel">
                <TabsPanel
                    headers={[
                        <CharacterPanelSkillsHeader/>,
                        <TraitsPanelHeader/>,
                        <CharacterPanelGearHeader/>
                    ]}
                    tabs={[
                        <CharacterPanelSkills/>,
                        <TraitsPanel/>,
                        <CharacterPanelGear/>
                    ]}
                />
            </div>
        );
    }
}

class CharacterPanelSkillsHeader extends React.Component {
    render() {
        return <div>Skills</div>;
    }
}

class CharacterPanelGearHeader extends React.Component {
    render() {
        return <div>Gear</div>;
    }
}

class CharacterPanelSkills extends React.Component {
    render() {
        return <div>Welcome skills!</div>;
    }
}

class CharacterPanelGear extends React.Component {
    render() {
        return <div>Welcome gear!</div>;
    }
}

export default CharacterPanel;
