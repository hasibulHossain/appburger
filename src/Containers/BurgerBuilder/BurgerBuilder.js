import React from 'react';

import Aux from '../../Hoc/Aux';
import Burger from '../../Components/Burger/Burger';
import BuildControls from '../../Components/Burger/BuildControls/BuildConstrols';
import Modal from '../../Components/UI/Modal/Modal';
import OrderSummery from '../../Components/Burger/Ordersummery/Ordersummery';
import { getIngredients} from '../../request';
import Spinner from '../../Components/UI/Snipper/Spinner';
import ErrorBoundary from '../../Components/Error/ErrorBoundary';

const INGREDIENT_PRICE = {
    salad: 1,
    bacon: 0.50,
    meat: 3,
    cheese: 2
}

class BurgerBuilder extends React.Component {
    state = {
        ingredients: null,
        totalPrice: 2,
        purchasable: false,
        isPurchasable: false,
        isLoading: false,
        errorOccurred: null
    }

    componentDidMount() {
        getIngredients()
        .then(data => {
            this.setState({ingredients: data})
        })
        .catch(err => {
            console.log(err)
            this.setState({isLoading: false})
        })
    }

    addedIngredientHandler = type => {
        const ingredientQuantity = this.state.ingredients[type]
        const updatedIngredientQuantity = ingredientQuantity + 1
        const updatedIngredient = {
            ...this.state.ingredients
        }
        updatedIngredient[type] = updatedIngredientQuantity
        //To calculate price
        const totalPrice = this.state.totalPrice
        const updatedtotalPrice = INGREDIENT_PRICE[type] + totalPrice

        this.setState({ingredients: updatedIngredient, totalPrice: updatedtotalPrice})
        this.purchasing(updatedIngredient)
    }

    removeIngredientHandler = type => {
        const ingredientQuantity = this.state.ingredients[type]
        if(ingredientQuantity <= 0) {
            return
        }
        const updatedIngredientQuantity = ingredientQuantity - 1
        const updatedIngredient = {
            ...this.state.ingredients
        }
        updatedIngredient[type] = updatedIngredientQuantity
        //To calculate price
        const totalPrice = this.state.totalPrice
        const updatedtotalPrice = totalPrice - INGREDIENT_PRICE[type]
        
        this.setState({ingredients: updatedIngredient, totalPrice: updatedtotalPrice})
        this.purchasing(updatedIngredient)
    }

    purchasing = ingredients => {
        const sumOfIngredients = Object.keys(ingredients).map(item => {
            return ingredients[item]
        }).reduce((accumulator, currentValue) => {
            return accumulator + currentValue
        }, 0)
        this.setState({purchasable: sumOfIngredients > 0})
    }

    unlockCheckoutHandler = () => {
        this.setState({isPurchasable: true})
    }

    cancelPurchaseHandler = () => {
        console.log('from cancelPurchase')
        this.setState({isPurchasable: false, errorOccurred: false})
    }

    continuePurchaseHandler = () => {
        this.setState({isLoading: true})
        const queryParams = [];
        queryParams.push('totalPrice=' + this.state.totalPrice)
        
        for (const i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
        }

        const queryStr = queryParams.join('&')
        this.props.history.push({
            pathname: '/checkout/contact',
            search: '?' + queryStr
        })
    }

    render() {
        const disableBtn = {
            ...this.state.ingredients
        }
        //First approach
        for(let key in disableBtn) {
            disableBtn[key] = disableBtn[key] <= 0;
        }

        //Second approach to loop through disableBtn
        // Object.keys(disableBtn).map(item => {
        //     disableBtn[item] = disableBtn[item] <= 0
        // })


        let burger = <Spinner />
        let orderSummery = null;

        if(this.state.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients} /> 
                    <BuildControls
                    addedIngredients={this.addedIngredientHandler}
                    removeIngredients={this.removeIngredientHandler}
                    price={this.state.totalPrice}
                    disable={disableBtn}
                    purchasable={this.state.purchasable}
                    checkout={this.unlockCheckoutHandler}
                    openModal={this.state.isPurchasable} />    
                </Aux>
            );

            orderSummery = <OrderSummery
            ingredients={this.state.ingredients}
            price={this.state.totalPrice}
            cancelPurchase={this.cancelPurchaseHandler}
            continuePurchase={this.continuePurchaseHandler} />;
        }

        if(this.state.isLoading) {
            orderSummery = <Spinner />
        }
        return (
            <Aux>
                <ErrorBoundary>
                    <Modal openModal={this.state.isPurchasable}
                        cancelPurchase={this.cancelPurchaseHandler} >
                        {!this.state.errorOccurred ? orderSummery : <ErrorBoundary><OrderSummery /></ErrorBoundary>}
                    </Modal>
                    {burger}
                </ErrorBoundary>
            </Aux>
        )
    }
}

export default BurgerBuilder;

 