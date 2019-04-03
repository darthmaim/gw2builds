import React, { Component } from 'react';
import style from './MenuButton.module.css';
import Overlay from '../Overlay/Overlay';
import ShareDialog from '../Dialogs/ShareDialog';
import SettingsDialog from '../Dialogs/SettingsDialogContainer';
import AboutDialog from '../Dialogs/AboutDialog';
import { Trans } from '@lingui/macro';

export default class MenuButton extends Component {
    constructor(props, context) {
        super(props, context);

        this.handleBeforeInstallPrompt = this.handleBeforeInstallPrompt.bind(this);
        this.handleInstallPrompt = this.handleInstallPrompt.bind(this);

        this.onToggleDropdown = this.onToggleDropdown.bind(this);

        this.onLoadBuild = this.onLoadBuild.bind(this);
        this.onResetBuild = this.onResetBuild.bind(this);
        this.onShareBuild = this.onShareBuild.bind(this);
        this.onHideShareDialog = this.onHideShareDialog.bind(this);

        this.onSettingsDialog = this.onSettingsDialog.bind(this);
        this.onHideSettingsDialog = this.onHideSettingsDialog.bind(this);

        this.onAboutDialog = this.onAboutDialog.bind(this);
        this.onHideAboutDialog = this.onHideAboutDialog.bind(this);

        this.state = {
            dropdown: false,
            shareDialog: false,
            settingsDialog: false,
            aboutDialog: false,
            beforeinstallprompt: undefined
        };
    }

    componentDidMount() {
        window.addEventListener('beforeinstallprompt', this.handleBeforeInstallPrompt);
    }

    componentWillUnmount() {
        window.removeEventListener('beforeinstallprompt', this.handleBeforeInstallPrompt);
    }

    handleBeforeInstallPrompt(e) {
        e.preventDefault();

        this.setState({ beforeinstallprompt: e });
    }

    handleInstallPrompt() {
        const installPrompt = this.state.beforeinstallprompt;
        installPrompt.prompt();
        installPrompt.userChoice.then(
            () => this.setState({ beforeinstallprompt: undefined })
        );
    }

    onToggleDropdown() {
        this.setState(
            ({dropdown}) => ({dropdown: !dropdown})
        );
    }

    onLoadBuild() {
        this.onToggleDropdown();
        this.props.setImportDialogVisible(true);
    }

    onResetBuild() {
        this.onToggleDropdown();
        this.props.resetBuild();
    }

    onShareBuild() {
        if(window.navigator.share) {
            window.navigator.share({
                url: window.location.href,
                title: window.document.title
            }).catch(() => this.showShareDialog());
        } else {
            this.showShareDialog();
        }
    }

    showShareDialog() {
        this.setState({ shareDialog: true });
    }

    onHideShareDialog() {
        this.setState({ shareDialog: false, dropdown: false });
    }

    onSettingsDialog() {
        this.setState({ settingsDialog: true });
    }

    onHideSettingsDialog() {
        this.setState({ settingsDialog: false, dropdown: false });
    }

    onAboutDialog() {
        this.setState({ aboutDialog: true });
    }

    onHideAboutDialog() {
        this.setState({ aboutDialog: false, dropdown: false });
    }

    render() {
        const { dropdown, shareDialog, settingsDialog, aboutDialog } = this.state;

        return (
            <React.Fragment>
                <button className={style.more} onClick={this.onToggleDropdown}>
                    Menu Button
                </button>
                {dropdown && (<Overlay onClick={this.onToggleDropdown}>
                    <div className={style.options}>
                        {this.state.beforeinstallprompt && (
                            <button type="button" className={style.option} onClick={this.handleInstallPrompt}>
                                <Trans>Add to Homescreen</Trans>
                            </button>
                        )}
                        <button type="button" className={style.option} onClick={this.onLoadBuild}><Trans>Load Build</Trans></button>
                        <button type="button" className={style.option} onClick={this.onResetBuild}><Trans>Clear Build</Trans></button>
                        <button type="button" className={style.option} onClick={this.onShareBuild}><Trans>Share Build</Trans></button>
                        <button type="button" className={style.option} onClick={this.onSettingsDialog}><Trans>Settings</Trans></button>
                        <button type="button" className={style.option} onClick={this.onAboutDialog}><Trans>About</Trans></button>
                    </div>
                </Overlay>)}
                {shareDialog && <ShareDialog onClose={this.onHideShareDialog}/>}
                {settingsDialog && <SettingsDialog onClose={this.onHideSettingsDialog}/>}
                {aboutDialog && <AboutDialog onClose={this.onHideAboutDialog}/>}
            </React.Fragment>
        );
    }
}

