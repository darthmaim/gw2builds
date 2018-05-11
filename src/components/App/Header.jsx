import React, { Component } from 'react';
import style from './header.css';
import Overlay from './Overlay/Overlay';
import ShareDialog from './Dialogs/ShareDialog';

export default class Header extends Component {
    constructor(props, context) {
        super(props, context);

        this.onToggleDropdown = this.onToggleDropdown.bind(this);
        this.onShareBuild = this.onShareBuild.bind(this);
        this.onHideShareDialog = this.onHideShareDialog.bind(this);

        this.state = {
            dropdown: false,
            shareDialog: false,
        };
    }

    onToggleDropdown() {
        this.setState(
            ({dropdown}) => ({dropdown: !dropdown})
        );
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

    render() {
        const { dropdown, shareDialog } = this.state;

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
                        <button type="button" className={style.option}>Load Build</button>
                        <button type="button" className={style.option}>Clear Build</button>
                        <button type="button" className={style.option} onClick={this.onShareBuild}>Share Build</button>
                        <button type="button" className={style.option}>Settings</button>
                        <button type="button" className={style.option}>About</button>
                    </div>
                </Overlay>)}
                {shareDialog && <ShareDialog onClose={this.onHideShareDialog}/>}
            </div>
        );
    }
}

