import React from 'react';
import style from './specializationIcon.css';

class SpecializationIcon extends React.Component {
    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        if (this.props.onClick) {
            this.props.onClick(this.props.id);
        }
    }

    render() {
        return (
            <div
                className={this.props.isSelected ? style.specializationIconSelected : style.specializationIcon}
                style={{ backgroundImage: `url(${this.props.icon})` }}
                onClick={this.handleClick}>
                {this.props.name}
            </div>
        );
    }
}

SpecializationIcon.propTypes = {
    icon: React.PropTypes.string,
    id: React.PropTypes.number,
    isSelected: React.PropTypes.bool,
    name: React.PropTypes.string,

    // Events
    onClick: React.PropTypes.func
};

export default SpecializationIcon;
