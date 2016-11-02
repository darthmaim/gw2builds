import React from 'react';
import OverlayPanel from '../base/overlay-panel';
import { Header, Panel } from '.';

class SettingsPanel extends React.Component {
    render() {
        return (
            <div className="settings-panel">
                <OverlayPanel
                    header={<Header {...this.props}/>}
                    panel={<Panel onLanguageChange={this.props.onLanguageChange}
                        onGameModeChange={this.props.onGameModeChange}
                        onProfessionChange={this.props.onProfessionChange}
                        onRaceChange={this.props.onRaceChange}
                        {...this.props}
                        />}
                    onClose={this.onClose}
                    />
            </div>
        );
    }
}

export default SettingsPanel;
