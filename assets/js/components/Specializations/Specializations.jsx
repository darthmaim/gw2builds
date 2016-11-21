'use strict';

import React from 'react';
// import { Layout } from '../App/Panel';
import { SpecializationLine } from './SpecializationLine';

class Specializations extends React.Component {
    render() {
        return (
            <div>
                <SpecializationLine {...this.props} id={0} onSpecializationChange={this.props.onSpecializationChange}/>
                <SpecializationLine {...this.props} id={1} onSpecializationChange={this.props.onSpecializationChange}/>
                <SpecializationLine {...this.props} id={2} onSpecializationChange={this.props.onSpecializationChange} isElite/>
            </div>
        );
    }
}

Specializations.propTypes = {
    onSpecializationChange: React.PropTypes.func
};

export default Specializations;
