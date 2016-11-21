import React from 'react';
import { Tooltip } from '../Tooltips';
import TraitTooltip from '../Tooltips/Traits/Tooltip';

const TestTooltip = props => (<div>Tooltip!</div>);

const exampleTrait = {"id":214,"tier":2,"order":1,"name":"Aeromancer's Training","description":"Gain precision while attuned to air. Reduces recharge on all air weapon skills.","slot":"Major","facts":[{"text":"Recharge Reduced","type":"Percent","icon":"https:\/\/render.guildwars2.com\/file\/9352ED3244417304995F26CB01AE76BB7E547052\/156661.png","percent":20},{"text":"Precision Increase","type":"AttributeAdjust","icon":"https:\/\/render.guildwars2.com\/file\/E1E7C4D3A6E62F3D5C9F627CE8175BFB0C614CBE\/156652.png","value":190,"target":"Precision"}],"traited_facts":[{"text":"Ferocity Increase","type":"AttributeAdjust","icon":"https:\/\/render.guildwars2.com\/file\/E1E7C4D3A6E62F3D5C9F627CE8175BFB0C614CBE\/156652.png","value":190,"requires_trait":396,"target":"Precision"}],"specialization":41,"icon":"https:\/\/render.guildwars2.com\/file\/A747E59680760ACDDEAACBD053BF3C7F1A335919\/1012274.png"};

export default () => (<div>
    Welcome to Skills!

    <Tooltip tooltip={<TestTooltip/>}>
        Testing Tooltips
        <Tooltip tooltip={<div>Inner</div>}>
            {' '}here
        </Tooltip>
    </Tooltip>

    <div>
        <TraitTooltip trait={exampleTrait}>Testing tooltips for traits...</TraitTooltip>
    </div>
</div>);
