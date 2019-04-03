import React, { Component } from 'react';
import Overlay from '../Overlay/Overlay';
import Dialog from './../../Inputs/Dialog/Dialog';
import style from './ShareDialog.module.css';
import { ReactComponent as CopyIcon } from './copy.svg';
import { Trans, t } from '@lingui/macro';
import { I18n } from '@lingui/react';

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
                <Dialog onClose={onClose} title={<Trans>Share Build</Trans>}>
                    <p className={style.text}><Trans>You can use this url to share your build.</Trans></p>
                    <div className={style.inputWrapper}>
                        <input className={style.input} onFocus={onFocus} readOnly={true} ref={this.setInputRef} value={window.location.href}/>
                        <button className={style.copyButton} onClick={this.onCopy}>
                            <I18n>
                                {({i18n}) => (
                                    <CopyIcon className={style.copyButtonIcon} alt={i18n._(t`Copy`)}/>
                                )}
                            </I18n>
                        </button>
                    </div>
                </Dialog>
            </Overlay>
        );
    }
}
