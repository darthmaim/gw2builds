import React from 'react';
import SpecializationLine from './SpecializationLine';

class Specializations extends React.Component {
    render() {
        return (
            <div>
                <SpecializationLine specializationLine={0}/>
                <SpecializationLine specializationLine={1}/>
                <SpecializationLine specializationLine={2} supportsElite/>
            </div>
        );
    }
}

export default Specializations;
