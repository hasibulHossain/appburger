import React from 'react';
// import Burger from '../../Components/Burger/Burger';
import CheckoutSummery from '../../Components/Checkout-page/CheckoutSummery';
// import Aux from '../../Hoc/Aux';
import './Checkout.css'

import CheckoutForm from '../../Components/Checkout-page/Checkout-form/CheckoutForm';
import {Route} from 'react-router-dom';

class Checkout extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            ingredients: null,
            totalPrice: null
        }
    }

    static getDerivedStateFromProps(props, state) {
        //approach 1(my idea, create object from url search param to create checkout summery) 
        // let myobj = {}
        // const locations = window.location.href.split('?')[1].split('&')
        //                   .map(item => item.split('='))
        //                   .map(item => myobj[item[0]] = +item[1] )
        // console.log(myobj)

        //approach 2 
        const query = new URLSearchParams(props.location.search)
        const colIngredients = {}; //collectedIngredients from url
        let totalPrice = '';
        for( const i of query.entries() ) {
            if(i[0] === 'totalPrice') {
                totalPrice = +i[1]
            } else {
                colIngredients[i[0]] = +i[1]
            }
        }
        return {ingredients: colIngredients, totalPrice: totalPrice}
    }

    render() {
        return (
            <div className="Checkout">
                <p style={{textAlign: 'center', fontSize: '50px'}}>Checkout</p>
                {/* <Burger ingredients={this.state.ingredients} /> */}
                <div className="Checkout__OrderSummery">
                    <CheckoutSummery ingredients={this.state.ingredients} totalPrice={this.state.totalPrice} />
                    <Route 
                    path={this.props.match.path + '/contact'} 
                    render={() => <CheckoutForm 
                                    ingredients={this.state.ingredients}
                                    totalPrice={this.state.totalPrice} />} />
                </div>
            </div>
        )
    }
}

export default Checkout;