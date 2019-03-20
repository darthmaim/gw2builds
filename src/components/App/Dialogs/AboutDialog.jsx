import React from 'react';
import Overlay from '../Overlay/Overlay';
import Dialog from './../../Inputs/Dialog/Dialog';
import style from './AboutDialog.module.css';
import { Trans } from '@lingui/macro';

export default ({ onClose }) => (
    <Overlay>
        <Dialog className={style.dialog} onClose={onClose} title={<Trans>About</Trans>}>
            <Trans>
                <p>
                    This build editor was made by <strong>Archomeda.6472</strong> and <strong>darthmaim.6017</strong>.
                    Thanks to queicherius.2563 and Eearslya.6309 for helping along the way.
                </p>
                <p>
                    Found any bugs or have Feedback? You can report them in our{' '}
                    <a rel="noreferrer noopener" target="_blank" href="https://github.com/darthmaim/gw2builds/issues">Issue Tracker</a>.
                </p>
                <p>
                    Want to contribute? The code is open source at{' '}
                    <a rel="noreferrer noopener" target="_blank" href="https://github.com/darthmaim/gw2builds">github.com/darthmaim/gw2builds</a>{' '}
                    and we appreciate every Pull Request.
                </p>
            </Trans>
        </Dialog>
    </Overlay>
);
