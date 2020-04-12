import React from 'react';
import Aux from '../../Hoc/Aux';
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
            <Aux>
                <Toolbar CloseSideDrawerHandler={this.OpenSideDrawerHandler} />
                <Sidedrawer close={this.CloseSideDrawerHandler} show={this.state.sideDrawer} />
                <main className="content">{this.props.children}</main>
            </Aux>
        )
    }
}


export default Layout;