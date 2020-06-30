import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Menu from '../Menu/Menu'
import './Toolbar.css'

const toolbar = props => {
    return(
        <header className="Toolbar">           
            <Menu clicked={props.CloseSideDrawerHandler} />
            <Logo height="70%" />
            <nav className="onlyDesktop">
                <NavigationItems isAuthenticate={props.isAuth} />
            </nav>
        </header>
    )
}
export default toolbar 