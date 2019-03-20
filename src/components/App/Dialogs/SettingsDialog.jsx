import React, { Component } from 'react';
import Overlay from '../Overlay/Overlay';
import Dialog from './../../Inputs/Dialog/Dialog';
import style from './SettingsDialog.module.css';
import { LANGUAGES } from '../Sidebar/LanguageSelector/LanguageSelector';
import Select from '../../Inputs/Select/Select';
import { Trans } from '@lingui/macro';

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
                <Dialog onClose={onClose} title={<Trans>Settings</Trans>}>
                    <div className={style.setting}>
                        <label htmlFor={"language"}><Trans>Language</Trans></label>
                        <Select id="language" value={selectedLanguage} onChange={onLanguageChange}>
                            {LANGUAGES.map(
                                (language) => <Select.Option key={language} value={language}>{languages[language]}</Select.Option>
                            )}
                        </Select>
                    </div>
                    <div className={style.setting}>
                        <label htmlFor={"showIds"}><Trans>Show IDs in tooltips</Trans></label>
                        <Select id="language" value={settings.showIds} onChange={setSettingsShowIds}>
                            <Select.Option value={true}><Trans>Yes</Trans></Select.Option>
                            <Select.Option value={false}><Trans>No</Trans></Select.Option>
                        </Select>
                    </div>
                </Dialog>
            </Overlay>
        );
    }
}
