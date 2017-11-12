import React from 'react';
import { STATE_ADDKEY } from './States';
import { api } from '../../utils/api';
import style from './Overview.css';
import Header from './Header';

const SOURCE_API = 'api';
const SOURCE_GW2EFFICIENCY = 'gw2efficiency';

class Overview extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.handleAddApiKey = this.handleAddApiKey.bind(this);
        this.handleFocus = this.handleFocus.bind(this);

        this.state = {
            accounts: [],
            loading: {
                [SOURCE_API]: true,
                [SOURCE_GW2EFFICIENCY]: true
            }
        }
    }

    handleAddApiKey() {
        this.props.onStateChange(STATE_ADDKEY);
    }

    componentDidMount() {
        const keys = JSON.parse(localStorage.getItem('gw2builds:apikeys') || '[]')
            .concat(this.props.apiKey || []);

        this.loadApiKeys(SOURCE_API, keys);

        this.loadGw2EfficiencyKeys();

        window.addEventListener('focus', this.handleFocus);
    }

    loadGw2EfficiencyKeys() {
        fetch('https://api.gw2efficiency.com/user/status', { credentials: 'include' })
            .then(r => r.json())
            .then(user => this.loadApiKeys(SOURCE_GW2EFFICIENCY, user.apiKeys))
            .catch(() => this.setState(({loading}) => ({
                loading: Object.assign({}, loading, { [SOURCE_GW2EFFICIENCY]: false })
            })));
    }

    componentWillUnmount() {
        window.removeEventListener('focus', this.handleFocus);
    }

    handleFocus() {
        if(!this.state.loading[SOURCE_GW2EFFICIENCY] && this.state.accounts.length === 0) {
            this.setState(({loading}) => ({
                loading: Object.assign({}, loading, { [SOURCE_GW2EFFICIENCY]: true })
            }));
            this.loadGw2EfficiencyKeys();
        }
    }

    loadApiKeys(source, keys) {
        Promise.all(
            keys.map((k) => this.loadAccountDetails(source, k))
        ).then(
            (accs) => this.setState(({accounts, loading}) => ({
                accounts: accounts.concat(accs),
                loading: Object.assign({}, loading, { [source]: false })
            }))
        );
    }

    loadAccountDetails(source, key) {
        return Promise.all([
            api.authenticate(key).account().get(),
            api.authenticate(key).characters().all()
        ]).then(([account, characters]) => ({
            source, key, account, characters
        }));
    }

    render() {
        const { accounts, loading } = this.state;
        const isLoading = (loading[SOURCE_API] || loading[SOURCE_GW2EFFICIENCY]);

        return (
            <div>
                <Header onClose={this.props.onClose}>Load build</Header>
                {isLoading && <div className={style.loading}>Loading...</div>}
                {!isLoading && accounts.length === 0 && (
                    <div className={style.loading}>
                        Add your API key or log into <a href="https://gw2efficiency.com/" target="_blank" rel="noopener">gw2efficiency</a> to load your characters builds.
                    </div>
                )}
                {accounts.map(this.renderAccount, this)}
                <button type="button" onClick={this.handleAddApiKey} className={style.addButton}>
                    <span className={style.addButtonIcon}>+</span> Add API key
                </button>
            </div>
        );
    }

    renderAccount({ account, characters }) {
        return (
            <div key={account.id} className={style.account}>
                <div className={style.accountHeader}>{account.name}</div>
                {characters.map(this.renderCharacter, this)}
            </div>
        );
    }

    renderCharacter(character) {
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
                    <img className={style.characterAction} src="/img/pve.png" />
                    <img className={style.characterAction} src="/img/pvp.png" />
                    <img className={style.characterAction} src="/img/wvw.png" />
                </div>
            </div>
        );
    }
}

export default Overview;
