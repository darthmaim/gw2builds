import React from 'react';
import Header from './Header';
import Content from './Content';
import { TooltipElement } from '../Tooltips';
import { Select } from '../Inputs';
import Wizard from '../Import/Wizard'
import style from './layout.css';

export default class extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            importWizardVisible: false
        };

        this.onShowImport = this.onShowImport.bind(this);
        this.onCloseImport = this.onCloseImport.bind(this);
    }

    onShowImport() {
        this.setState({importWizardVisible: true});
    }

    onCloseImport() {
        this.setState({importWizardVisible: false});
    }

    render() {
        const { loading } = this.props;
        const { importWizardVisible } = this.state;

        return (
            <div className={style.frame}>
                <div className={loading ? style.loadingVisible : style.loading}>Loading…</div>
                <TooltipElement/>
                <Select.Dropdown/>
                <Header onShowImport={this.onShowImport}/>
                <Content/>
                {importWizardVisible && <Wizard onClose={this.onCloseImport}/>}
            </div>
        );
    }
};
