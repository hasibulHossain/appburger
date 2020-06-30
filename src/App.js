import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import './App.scss';

import ErrorBoundary from './Components/Error/ErrorBoundary';
import Layout from '../src/Containers/Layout/Layout';
import BurgerBuilder from '../src/Containers/BurgerBuilder/BurgerBuilder';
import Checkout from './Containers/Checkout/Checkout';
import Success from './Components/Success/Success';
import Auth from './Components/Authentication/Auth';
import Logout from './Components/Authentication/Logout/Logout';
import * as actions from './store/actions/index';
import pageNotFound from './Components/Error/PageNotFound';
import asyncCom from './Hoc/asyncCom';

const AsyncOrders = asyncCom(() => import('./Containers/Orders/Orders'))

class App extends React.Component {
  componentDidMount() {
    this.props.checkingAuthStateOnReload()
  }

  render() {
    // Guarding protected route
    let routes = (
      <Switch>
        <Route path="/auth" component={ Auth } />
        <Route path="/" exact component={ BurgerBuilder } />
        <Route to="/" component={pageNotFound} />
      </Switch>
    )

    if(this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/checkout/contact/success" exact component={ Success } />
          <Route path="/checkout" component={ Checkout } />
          <Route path="/orders" component={ AsyncOrders } />
          <Route path="/auth" component={ Auth } />
          <Route path="/logout" component={ Logout } />
          <Route path="/" exact component={ BurgerBuilder } />
  
          { <Redirect to="/" /> }
        </Switch>
      )
    } // unprotected routes o protected routes er vitor rakhte hobe, na hole unknown problem hobe. ex- protected routes theke jodi auth route remove kori(karon auth route akta unprotected route) tahole sign in a click korle(akdom first bar sign in korar shomoi, localstorage a kono data store kora nai) checkout page a na jaia home page a redirect hoi. but auth jokhon protected & unprotected routes dui jagai rakha hoi tokhon checkout page a jai.



    return (
      <Router basename="/appburger">
        <ErrorBoundary>
          <div>
            <Layout>
              { routes }
            </Layout>
          </div>
        </ErrorBoundary>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.authRTR.token != null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    checkingAuthStateOnReload: () => dispatch(actions.checkingAuthState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);