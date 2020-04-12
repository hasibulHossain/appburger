import React from 'react';
import './Logo.css';
import burgerLogo from "../../assets/Images/burger-logo.png";

const logo = props => {
    return (
        <div className="Logo" style={{height: props.height}} >
            <img src={burgerLogo} alt="burgerlogo"/>
        </div>
    )
}

export default logo;