import React, { Component } from 'react';
import Overlay from '../Overlay/Overlay';
import Dialog from './../../Inputs/Dialog/Dialog';
import style from './SettingsDialog.css';
import { LANGUAGES } from '../Sidebar/LanguageSelector/LanguageSelector';
import Select from '../../Inputs/Select/Select';

const languages = {
    de: 'German',
    en: 'English',
    es: 'Spanish',
    fr: 'French'
};

export default class SettingsDialog extends Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        const { onClose, selectedLanguage, onLanguageChange } = this.props;

        return (
            <Overlay>
                <Dialog onClose={onClose} title="Settings">
                    <div className={style.setting}>
                        <label htmlFor={"language"}>Language</label>
                        <Select id="language" value={selectedLanguage} onChange={onLanguageChange}>
                            {LANGUAGES.map(
                                (language) => <Select.Option key={language} value={language}>{languages[language]}</Select.Option>
                            )}
                        </Select>
                    </div>
                </Dialog>
            </Overlay>
        );
    }
}
