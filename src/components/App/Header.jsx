import React, { Component } from 'react';
import style from './header.css';
import Overlay from './Overlay/Overlay';

export default class Header extends Component {
    constructor(props, context) {
        super(props, context);

        this.onToggleDropdown = this.onToggleDropdown.bind(this);

        this.state = {
            dropdown: false
        };
    }

    onToggleDropdown() {
        this.setState(
            ({dropdown}) => ({dropdown: !dropdown})
        );
    }

    render() {
        const { dropdown } = this.state;

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
                        <button type="button" className={style.option}>Share Build</button>
                        <button type="button" className={style.option}>Settings</button>
                        <button type="button" className={style.option}>About</button>
                    </div>
                </Overlay>)}
            </div>
        );
    }
}

