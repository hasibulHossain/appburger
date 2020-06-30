import React from "react";
import './Button.css'

const button = props => {
    return (
        <button
        disabled={props.disabled}
        onClick={props.clicked}
        className={["Button", props.buttonType].join(' ')} > {props.children} </button>
    )
}
export default button;