import React from 'react';
import { Header, Panel } from './index';

class SettingsPanel extends React.Component {
    render() {
        return (
            <Panel onLanguageChange={this.props.onLanguageChange}
               onGameModeChange={this.props.onGameModeChange}
               onProfessionChange={this.props.onProfessionChange}
               onRaceChange={this.props.onRaceChange}
               {...this.props}
            />
        );
    }
}

export default SettingsPanel;
