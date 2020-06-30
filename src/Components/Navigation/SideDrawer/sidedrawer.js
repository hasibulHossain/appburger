import React from 'react';
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems';
import Aux from '../../../Hoc/Aux';
import Backdrop from '../../UI/Backdrop/Backdrop'
import './sidedrawer.css';

const sideDrawer = props => {
    let attachedClass = ["Sidedrawer", "close"]
    if(props.show) {
        attachedClass = ["Sidedrawer", "open"]
    }
    return (
        <Aux >
            <Backdrop show={props.show} closeBackdrop={props.close} />
            <div className={attachedClass.join(' ')}>
                <Logo height="9%" />
                <NavigationItems isAuthenticate={props.isAuth} />
            </div>
        </Aux>
    )
}

export default sideDrawer