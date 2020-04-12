import React from 'react';
import './Menu.css';

const menu = props => {
    return (
        <div className="Menubtn" onClick={props.clicked} ></div>
    )
}

export default menu