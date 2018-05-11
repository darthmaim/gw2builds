import React, { Component } from 'react';
import Overlay from '../Overlay/Overlay';
import Dialog from './../../Inputs/Dialog/Dialog';
import style from './ShareDialog.css';

const onFocus = ({target}) => target.select();

export default class ShareDialog extends Component {
    constructor(props, context) {
        super(props, context);

        this.setInputRef = this.setInputRef.bind(this);
        this.onCopy = this.onCopy.bind(this);

        this.inputRef = undefined;
    }

    setInputRef(ref) {
        this.inputRef = ref;
    }

    onCopy() {
        this.inputRef.focus();
        this.inputRef.select();

        if(navigator.clipboard) {
            navigator.clipboard.writeText(window.location.href);
        } else {
            try {
                document.execCommand('copy');
            } catch(err) {}
        }
    }

    render() {
        const { onClose } = this.props;

        return (
            <Overlay>
                <Dialog onClose={onClose} title="Share Build">
                    <p className={style.text}>You can use this url to share your build.</p>
                    <div className={style.inputWrapper}>
                        <input className={style.input} onFocus={onFocus} readOnly={true} ref={this.setInputRef} value={window.location.href}/>
                        <button className={style.copyButton} onClick={this.onCopy}>
                            <img src="/img/general/copy.svg"/>
                        </button>
                    </div>
                </Dialog>
            </Overlay>
        );
    }
}
