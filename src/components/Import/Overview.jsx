import React from 'react';
import isEqual from 'lodash/isEqual'
import { api } from '../../utils/api';
import style from './Overview.module.css';
import { TYPE_PVE, TYPE_PVP, TYPE_WVW } from './loadBuild';
import { t, Trans } from '@lingui/macro';
import { I18n } from '@lingui/react';

const SOURCE_API = 'api';
const SOURCE_GW2EFFICIENCY = 'gw2efficiency';

class Overview extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.handleFocus = this.handleFocus.bind(this);

        this.state = {
            search: '',

            [SOURCE_API]: { loading: true, accounts: [] },
            [SOURCE_GW2EFFICIENCY]: { loading: true, accounts: [] }
        }
    }

    componentDidMount() {
        this.loadApiKeys(SOURCE_API, this.props.apiKeys);
        this.loadGw2EfficiencyKeys();

        window.addEventListener('focus', this.handleFocus);
    }

    loadGw2EfficiencyKeys() {
        this.setState({ [SOURCE_GW2EFFICIENCY]: { loading: true, accounts: [] }});

        fetch('https://api.gw2efficiency.com/user/status', { credentials: 'include' })
            .then(r => r.json())
            .then(user => this.loadApiKeys(SOURCE_GW2EFFICIENCY, user.apiKeys))
            .catch(() => this.setState({
                [SOURCE_GW2EFFICIENCY]: { loading: false, accounts: [] }
            }));
    }

    componentWillUnmount() {
        window.removeEventListener('focus', this.handleFocus);
    }

    componentDidUpdate(prevProps) {
        if(!isEqual(prevProps.apiKeys, this.props.apiKeys)) {
            this.setState({ [SOURCE_API]: { loading: true, accounts: this.state[SOURCE_API].accounts }});
            this.loadApiKeys(SOURCE_API, this.props.apiKeys);
        }
    }

    handleFocus() {
        // try to load gw2efficiency keys when the tab gets focused and we haven't loaded any yet
        const state = this.state[SOURCE_GW2EFFICIENCY];
        
        if(!state.loading && state.accounts.length === 0) {
            this.loadGw2EfficiencyKeys();
        }
    }

    loadApiKeys(source, keys) {
        Promise.all(keys.map((k) => this.loadAccountDetails(source, k)))
            .then((accounts) => this.setState({
                [source]: { loading: false, accounts }
            }));
    }

    loadAccountDetails(source, key) {
        return Promise.all([
            api.authenticate(key).account().get(),
            api.authenticate(key).characters().all()
        ]).then(([account, characters]) => ({
            source, key, account, characters
        })).catch((details) => ({
            source, key, error: { text: <Trans>Could not load account details.</Trans>, details }
        }));
    }

    render() {
        const state = this.state;
        const isLoading = state[SOURCE_API].loading || state[SOURCE_GW2EFFICIENCY].loading;
        const accounts = state[SOURCE_API].accounts.concat(state[SOURCE_GW2EFFICIENCY].accounts);

        return (
            <div>
                {accounts.length > 0 && (
                    <I18n>
                        {({i18n}) => (
                            <input type="search"
                                className={style.search}
                                placeholder={i18n._(t`Search characters`)}
                                autoFocus
                                value={state.search}
                                onChange={(e) => this.setState({ search: e.target.value })}/>
                        )}
                    </I18n>
                )}
               {isLoading && <div className={style.loading}><Trans>Loading...</Trans></div>}
                {!isLoading && accounts.length === 0 && (
                    <div className={style.loading}>
                        <Trans>Add your API key or log into <a href="https://gw2efficiency.com/" target="_blank" rel="noopener noreferrer">gw2efficiency</a> to load your characters builds.</Trans>
                    </div>
                )}
                {accounts.map(this.renderAccount, this)}
                <button type="button" onClick={this.props.onShowAddKey} className={style.addButton}>
                    <span className={style.addButtonIcon}>+</span> <Trans>Add API key</Trans>
                </button>
            </div>
        );
    }

    renderAccount({ account, characters, source, key, error }) {
        return (
            <div key={key} className={style.account}>
                <div className={style.accountHeader}>
                    {(account && account.name) || <Trans>Unknown account</Trans>}
                    {source === SOURCE_API && (
                        <button type="button" onClick={() => this.props.removeImportApiKey(key)} className={style.removeButton}>
                            <Trans>Remove</Trans>
                        </button>
                    )}
                </div>
                {!error && characters.map(this.renderCharacter, this)}
                {error && (
                    <div className={style.accountError}>
                        {error.text}
                        <div className={style.accountErrorKey}>
                            {key}
                        </div>
                    </div>
                )}
            </div>
        );
    }

    renderCharacter(character) {
        const searchString = this.state.search.toLowerCase();

        const matchesSearch = searchString === '' ||
            character.name.toLowerCase().indexOf(searchString) !== -1 ||
            character.profession.toLowerCase().indexOf(searchString) !== -1

        if(!matchesSearch) {
            return null;
        }

        return (
            <div key={character.name} className={style.character}>
                <div className={style.characterInfo}>
                    <div className={style.characterName}>{character.name}</div>
                    <div className={style.characterStats}>
                        <span className={style.characterLevel}>{character.level}</span>
                        {' ' + character.profession}
                    </div>
                </div>
                <div className={style.characterActions}>
                    <button type="button"
                            onClick={() => this.props.loadBuild(TYPE_PVE, { character })}
                            className={style.characterActionPve}>PvE</button>
                    <button type="button"
                            onClick={() => this.props.loadBuild(TYPE_PVP, { character })}
                            className={style.characterActionPvp}>PvP</button>
                    <button type="button"
                            onClick={() => this.props.loadBuild(TYPE_WVW, { character })}
                            className={style.characterActionWvw}>WvW</button>
                </div>
            </div>
        );
    }
}

export default Overview;
