import React, { Component } from 'react';
import Overlay from '../Overlay/Overlay';
import Dialog from './../../Inputs/Dialog/Dialog';
import style from './SettingsDialog.module.css';
import { LANGUAGES } from '../Sidebar/LanguageSelector/LanguageSelector';
import Select from '../../Inputs/Select/Select';

const languages = {
    de: 'German',
    en: 'English',
    es: 'Spanish',
    fr: 'French'
};

export default class SettingsDialog extends Component {
    render() {
        const { onClose, selectedLanguage, onLanguageChange, settings, setSettingsShowIds } = this.props;

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
                    <div className={style.setting}>
                        <label htmlFor={"showIds"}>Show IDs in tooltips</label>
                        <Select id="language" value={settings.showIds} onChange={setSettingsShowIds}>
                            <Select.Option value={true}>Yes</Select.Option>
                            <Select.Option value={false}>No</Select.Option>
                        </Select>
                    </div>
                </Dialog>
            </Overlay>
        );
    }
}
