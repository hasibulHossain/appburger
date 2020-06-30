import React from 'react';
import { connect } from 'react-redux'

import Toolbar from '../../Components/Navigation/Toolbar/Toolbar';
import Sidedrawer from '../../Components/Navigation/SideDrawer/sidedrawer';
import './Layout.css';

class Layout extends React.Component {
    state = {
        sideDrawer: false
    }

    OpenSideDrawerHandler = () => {
        this.setState({sideDrawer: true})
    }

    CloseSideDrawerHandler = () => {
        this.setState({sideDrawer: false})
    }

    render() {
        return (
            <>
                <Toolbar isAuth={this.props.isAuthenticate} CloseSideDrawerHandler={this.OpenSideDrawerHandler} />
                <Sidedrawer isAuth={this.props.isAuthenticate} close={this.CloseSideDrawerHandler} show={this.state.sideDrawer} />
                <main className="content">{this.props.children}</main>
            </> 
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticate: state.authRTR.token !== null
    }
}

export default connect(mapStateToProps)(Layout);