import React from 'react';
import Panel from './Panel';

class SettingsPanel extends React.Component {
    render() {
        return (
            <Panel
                onLanguageChange={this.props.onLanguageChange}
                onGameModeChange={this.props.onGameModeChange}
                onProfessionChange={this.props.onProfessionChange}
                onRaceChange={this.props.onRaceChange}
                {...this.props}/>
        );
    }
}

export default SettingsPanel;
