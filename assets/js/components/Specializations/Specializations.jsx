'use strict';

import React from 'react';
import { SpecializationLine } from './SpecializationLine';

class Specializations extends React.Component {
    render() {
        return (
            <div>
                <SpecializationLine {...this.props} id={0} onSpecializationChange={this.props.onSpecializationChange} onTraitChange={this.props.onTraitChange}/>
                <SpecializationLine {...this.props} id={1} onSpecializationChange={this.props.onSpecializationChange} onTraitChange={this.props.onTraitChange}/>
                <SpecializationLine {...this.props} id={2} onSpecializationChange={this.props.onSpecializationChange} onTraitChange={this.props.onTraitChange} isElite/>
            </div>
        );
    }
}

Specializations.propTypes = {
    onSpecializationChange: React.PropTypes.func,
    onTraitChange: React.PropTypes.func
};

export default Specializations;
