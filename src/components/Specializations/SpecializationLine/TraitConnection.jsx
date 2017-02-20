import React from 'react';
import { ucFirst } from 'change-case';
import style from './traitConnection.css';

const TraitConnection = props => props.from && props.to ?
    (<div className={style[`line${ucFirst(props.from)}To${ucFirst(props.to)}`]}/>) :
    (<div className={style.lineInvisible}/>);

TraitConnection.propTypes = {
    from: React.PropTypes.string,
    to: React.PropTypes.string
};

export default TraitConnection;
