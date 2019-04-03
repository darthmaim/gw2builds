import React from 'react';
import style from './AddKey.module.css';
import { api } from '../../utils/api';
import { t, Trans } from '@lingui/macro';
import { I18n } from '@lingui/react';

const REQUIRED_PERMISSIONS = ['account', 'characters', 'builds'];

class AddKey extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            loading: false,
            apiKey: '',
            error: undefined
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    handleInput(e) {
        this.setState({ apiKey: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({
            loading: true
        });

        const { apiKey } = this.state;

        api.authenticate(apiKey).tokeninfo().get().then((tokeninfo) => {
            if(REQUIRED_PERMISSIONS.every(s => tokeninfo.permissions.indexOf(s) !== -1)) {
                this.props.addImportApiKey(apiKey);
                this.props.onBack();
            } else {
                this.setState({
                    loading: false,
                    error: 'wrong permissions'
                });
            }
        }).catch((error) => {
            console.error(error);
            this.setState({
                loading: false,
                error: (error.content && error.content.text) || <Trans>Unknown error</Trans>
            });
        });
    }

    render() {
        const { loading, apiKey, error } = this.state;

        return (
            <div>
                <form onSubmit={this.handleSubmit} disabled={loading}>
                    <p className={style.description}>
                        <Trans>You can add your API key by going to your <a href="https://account.arena.net/applications" target="_blank" rel="noopener noreferrer">Guild Wars 2 Account Page</a>, generating a new key with <code>characters</code> and <code>builds</code> permissions and copy/pasting it into this form.</Trans>
                    </p>
                    <label htmlFor="apikey"><Trans>Enter your API key:</Trans></label>
                    <div className={style.inputGroup}>
                        <I18n>
                            {({i18n}) => (
                                <input name="apikey" id="apikey" autoFocus className={style.input} disabled={loading} value={apiKey} onChange={this.handleInput} placeholder={i18n._(t`API key`)}/>
                            )}
                        </I18n>
                        {loading ? (
                            <div className={style.loader}/>
                        ) : (
                            <button type="submit" aria-label={<Trans>Add API key</Trans>} className={style.button}/>
                        )}
                    </div>
                    {this.renderErrorMessage(error, loading)}
                </form>
            </div>
        )
    }

    renderErrorMessage(error, loading) {
        if(!error || loading) {
            return;
        }

        if(error === 'invalid key') {
            return (<div className={style.error}><Trans>The key you provided is invalid.</Trans></div>);
        } else if(error === 'endpoint requires authentication') {
            return (<div className={style.error}><Trans>You need to provide an API key.</Trans></div>);
        } else if(error === 'wrong permissions') {
            return (<div className={style.error}><Trans>The key needs <code>characters</code> and <code>builds</code> permissions.</Trans></div>);
        }

        return (<div className={style.error}>{error}</div>);
    }
}

export default AddKey;
