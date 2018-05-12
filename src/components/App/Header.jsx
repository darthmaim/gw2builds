import React, { Component } from 'react';
import style from './header.css';
import Overlay from './Overlay/Overlay';
import ShareDialog from './Dialogs/ShareDialog';
import SettingsDialog from './Dialogs/SettingsDialogContainer';

export default class Header extends Component {
    constructor(props, context) {
        super(props, context);

        this.onToggleDropdown = this.onToggleDropdown.bind(this);
        this.onLoadBuild = this.onLoadBuild.bind(this);
        this.onResetBuild = this.onResetBuild.bind(this);
        this.onShareBuild = this.onShareBuild.bind(this);
        this.onHideShareDialog = this.onHideShareDialog.bind(this);

        this.onSettingsDialog = this.onSettingsDialog.bind(this);
        this.onHideSettingsDialog = this.onHideSettingsDialog.bind(this);

        this.state = {
            dropdown: false,
            shareDialog: false,
            settingsDialog: false
        };
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
        this.setState({ settingsDialog: false });
    }

    render() {
        const { dropdown, shareDialog, settingsDialog } = this.state;

        return (
            <div className={style.header}>
                <div className={style.logo}>
                    <img src="/img/header/logo.svg" role="presentation"/>
                </div>
                <div className={style.title}>
                    <img src="/img/header/title.svg" alt="gw2efficiency | Build Editor"/>
                </div>
                <div className={style.more} onClick={this.onToggleDropdown}>
                </div>
                {dropdown && (<Overlay onClick={this.onToggleDropdown}>
                    <div className={style.options}>
                        <button type="button" className={style.option} onClick={this.onLoadBuild}>Load Build</button>
                        <button type="button" className={style.option} onClick={this.onResetBuild}>Clear Build</button>
                        <button type="button" className={style.option} onClick={this.onShareBuild}>Share Build</button>
                        <button type="button" className={style.option} onClick={this.onSettingsDialog}>Settings</button>
                        <button type="button" className={style.option}>About</button>
                    </div>
                </Overlay>)}
                {shareDialog && <ShareDialog onClose={this.onHideShareDialog}/>}
                {settingsDialog && <SettingsDialog onClose={this.onHideSettingsDialog}/>}
            </div>
        );
    }
}

