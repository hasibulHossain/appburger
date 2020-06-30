import React from 'react';

import './Backdrop.css';

const backdrop = props => {
    // console.log(props)
    if(props.show) {
        return  <div className="Backdrop" onClick={props.closeBackdrop} ></div>
    } else {
        return null
    }
}
export default backdrop;