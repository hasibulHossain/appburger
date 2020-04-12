import React from 'react';

import './Modal.css';
import Aux from '../../../Hoc/Aux';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends React.Component {
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.openModal !== this.props.openModal || (nextProps.children !== this.props.children)
    }

    render() {
        return (
            <Aux>
                <Backdrop show={this.props.openModal} closeBackdrop={this.props.closeBackdrop}/>
                <div className="Modal"
                style={
                    {
                        transform: this.props.openModal ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.openModal ? 1 : 0
                    }
                } >
                    {this.props.children}
                </div>
            </Aux>
        )
    }
}

export default Modal;