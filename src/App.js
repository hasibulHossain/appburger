import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import './App.scss';
import ErrorBoundary from './Components/Error/ErrorBoundary';
import Layout from '../src/Containers/Layout/Layout';
import BurgerBuilder from '../src/Containers/BurgerBuilder/BurgerBuilder';
import Checkout from './Containers/Checkout/Checkout';
import Orders from './Containers/Orders/Orders';
import Success from './Components/Success/Success';

class App extends React.Component {
  render() {
    return (
      <Router basename="/appburger">
        <ErrorBoundary>
          <div>
            <Layout>
              <Switch>
                <Route path="/checkout/contact/success" exact component={Success} />
                <Route path="/checkout" component={Checkout} />
                <Route path="/orders" component={Orders} />
                <Route path="/" exact component={BurgerBuilder} />
              </Switch>
            </Layout>
          </div>
        </ErrorBoundary>
      </Router>
    );
  }
}

export default App;