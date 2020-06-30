import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem'
import './NavigationItems.css';

const navigationItems = props => {
    return ( 
        <ul className="NavigationItems">
            <NavigationItem link="/" exact >Home</NavigationItem>

            { props.isAuthenticate ?
            <NavigationItem link="/orders" >Orders</NavigationItem> : null }

            { !props.isAuthenticate ? 
            <NavigationItem link="/auth" >Sign In</NavigationItem> : 
            <NavigationItem link="/logout">Logout</NavigationItem> }
        </ul>
    )
}

export default navigationItems