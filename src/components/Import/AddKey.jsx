import React from 'react';
import style from './AddKey.css';
import { api } from '../../utils/api';
import { STATE_OVERVIEW } from './States';
import Header from './Header';

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
        this.handleBack = this.handleBack.bind(this);
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
                this.props.onStateChange(STATE_OVERVIEW, { apiKey });
            } else {
                this.setState({
                    loading: false,
                    error: 'wrong permissions'
                });
            }
        }).catch((error) => {
            this.setState({
                loading: false,
                error: error.content && error.content.text || 'Unknown error'
            });
        });
    }

    handleBack() {
        this.props.onStateChange(STATE_OVERVIEW);
    }

    render() {
        const { loading, apiKey, error } = this.state;

        return (
            <div>
                <Header onClose={this.props.onClose}>
                    <button type="button" className={style.backButton} onClick={this.handleBack}>
                        <img src="/img/general/back.svg" alt="Back"/>
                    </button>
                    Add API key
                </Header>
                <form onSubmit={this.handleSubmit} disabled={loading}>
                    <p className={style.description}>
                        You can add your API key by going to <a href="https://account.arena.net/applications" target="_blank" rel="noopener">Guild Wars 2 Account Page</a>, generating a new key with <code>characters</code> and <code>builds</code> permissions and copy/pasting it into this form.
                    </p>
                    <label htmlFor="apikey">Enter your API key:</label>
                    <div className={style.inputGroup}>
                        <input name="apikey" id="apikey" className={style.input} disabled={loading} value={apiKey} onInput={this.handleInput} placeholder="API key"/>
                        {loading ? (
                            <div className={style.loader}/>
                        ) : (
                            <button type="submit" aria-label="Add API key" className={style.button}>
                                ►
                            </button>
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
            return (<div className={style.error}>The key you provided is invalid.</div>);
        } else if(error === 'endpoint requires authentication') {
            return (<div className={style.error}>You need to provide an API key.</div>);
        } else if(error === 'wrong permissions') {
            return (<div className={style.error}>The key needs <code>characters</code> and <code>builds</code> permissions.</div>);
        }

        return (<div className={style.error}>{error}</div>);
    }
}

export default AddKey;
