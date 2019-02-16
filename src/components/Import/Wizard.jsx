import React from 'react';
import Dialog from '../Inputs/Dialog/Dialog';
import Overview from './OverviewContainer';
import AddKey from './AddKeyContainer';
import Overlay from '../App/Overlay/Overlay';
import style from './Wizard.module.css';
import { ReactComponent as BackIcon } from './back.svg';

const VIEW_OVERVIEW = 'overview';
const VIEW_ADDKEY = 'addkey';

export default class extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            view: VIEW_OVERVIEW,
        };

        this.handleClose = this.handleClose.bind(this);
        this.handleShowAddKey = this.handleShowAddKey.bind(this);
        this.handleShowOverview = this.handleShowOverview.bind(this);
    }

    handleClose() {
        this.props.setImportDialogVisible(false);
    }

    handleShowAddKey() {
        this.setState({ view: VIEW_ADDKEY });
    }

    handleShowOverview() {
        this.setState({ view: VIEW_OVERVIEW });
    }

    render() {
        if(!this.props.visible) {
            return null;
        }

        const { view } = this.state;

        return (
            <Overlay>
                <Dialog onClose={this.handleClose} title={this.renderTitle(view)}>
                    {view === VIEW_OVERVIEW && <Overview onShowAddKey={this.handleShowAddKey}/>}
                    {view === VIEW_ADDKEY && <AddKey onBack={this.handleShowOverview}/>}
                </Dialog>
            </Overlay>
        );
    }

    renderTitle(view) {
        switch (view) {
            case VIEW_ADDKEY: return (
                <span>
                    <button type="button" className={style.backButton} onClick={this.handleShowOverview}>
                        <BackIcon/>
                    </button>
                    Add API key
                </span>
            );
            case VIEW_OVERVIEW:
            default: return 'Load build';
        }
    }
}
