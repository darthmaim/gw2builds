import React from "react";
import { getEditorModeConfiguration } from "../../editor-modes";
import style from './style.css';

class Header extends React.Component {
    render() {
        return (
            <ul className={style['header-list']}>
                {getEditorModeConfiguration("languagesEnabled") ? <li className={this.props.language ? style[`language-${this.props.language}`] : ""}/> : null}
                {getEditorModeConfiguration("gameModesEnabled") ? <li className={this.props.gameMode ? style[`gamemode-${this.props.gameMode}`] : ""}/> : null}
                {getEditorModeConfiguration("professionsEnabled") ? <li className={this.props.profession ? style[`profession-${this.props.profession}`] : null}/> : ""}
                {getEditorModeConfiguration("racesEnabled") ? <li className={this.props.race ? style[`race-${this.props.race}`] : null}/> : ""}
            </ul>
        );
    }
}

export default Header;
