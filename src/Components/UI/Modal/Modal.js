import React from 'react';

import './Modal.css';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends React.Component {
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.openModal !== this.props.openModal || (nextProps.children !== this.props.children)
    }

    render() {
        let classes = ['Modal']
        if(this.props.openModal) classes.push('openModal')

        return (
            <>
                <Backdrop show={this.props.openModal} closeBackdrop={this.props.cancelPurchase}/>
                <div className={classes.join(' ')} >
                    {this.props.children}
                </div>
            </>
        )
    }
}

export default Modal;