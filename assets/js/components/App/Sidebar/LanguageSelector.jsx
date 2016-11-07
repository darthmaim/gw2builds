import React, { Component } from 'react';

import style from './languageSelector.css';

// TODO: can we configure the available languages somewhere else?
const LANGUAGES = [
    'de', 'en', 'es', 'fr'
];

class LanguageSelector extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            open: false
        };

        this.handleToggle = this.handleToggle.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.filterLanguageOptions = this.filterLanguageOptions.bind(this);
    }

    filterLanguageOptions(lang) {
        return lang !== this.props.language;
    }

    setLanguage(language) {
        this.props.onLanguageChange(language);
        this.setState({
            open: false
        });
    }

    handleToggle() {
        this.setState({
            open: !this.state.open
        });
    }

    handleClick(lang) {
        return () => this.setLanguage(lang);
    }

    handleFocus(e) {
        this.setState({ open: true });
        e.stopPropagation();
        e.preventDefault();
    }

    handleBlur() {
        this.setState({ open: false });
    }

    render() {
        return (
            <div className={this.state.open ? style.containerOpen : style.container}>
                <div className={style.dropdown}>
                    <div className={style.active} onClick={this.handleToggle}>
                        {this.props.language.toUpperCase()}
                    </div>
                    {this.renderSelect()}
                </div>
            </div>
        );
    }

    renderSelect() {
        return (<div className={style.selector}>
            {LANGUAGES.filter(this.filterLanguageOptions).map(lang => (
                <button
                    type="button" key={lang} className={style.selectorItem}
                    onClick={this.handleClick(lang)} onFocus={this.handleFocus} onBlur={this.handleBlur}>
                    {lang.toUpperCase()}
                </button>)
            )}
        </div>);
    }
}

LanguageSelector.propTypes = {
    language: React.PropTypes.string.isRequired,
    onLanguageChange: React.PropTypes.func.isRequired
};

export default LanguageSelector;
