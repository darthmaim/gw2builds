import React from 'react';
import { STATE_ADDKEY, STATE_OVERVIEW } from './States';
import style from './Wizard.css';
import Overview from './Overview';
import AddKey from './AddKey';

export default class extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            content: {
                state: STATE_OVERVIEW,
                props: {}
            }
        };

        this.handleStateChange = this.handleStateChange.bind(this);
    }

    handleStateChange(state, props = {}) {
        this.setState({
            content: { state, props }
        });
    }

    render() {
        const { content } = this.state;
        const Component = this.stateToComponent(content.state);

        return (
            <div className={style.wrapper}>
                <div className={style.container}>
                    <Component onStateChange={this.handleStateChange} onClose={this.props.onClose} {...content.props}/>
                </div>
            </div>
        );
    }

    stateToComponent(state) {
        switch(state) {
            case STATE_OVERVIEW: return Overview;
            case STATE_ADDKEY: return AddKey;
        }
    }
}
