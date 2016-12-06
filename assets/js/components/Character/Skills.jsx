import React from 'react';
import { Tooltip } from '../Tooltips';

const TestTooltip = () => (<div>Tooltip!</div>);

export default () => (<div>
    Welcome to Skills!

    <Tooltip tooltip={<TestTooltip/>}>
        Testing Tooltips
        <Tooltip tooltip={<div>Inner</div>}>
            {' '}here
        </Tooltip>
    </Tooltip>
</div>);
