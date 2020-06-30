import React from 'react';
import { connect } from 'react-redux';

import Aux from '../../Hoc/Aux';
import Burger from '../../Components/Burger/Burger';
import BuildControls from '../../Components/Burger/BuildControls/BuildConstrols';
import Modal from '../../Components/UI/Modal/Modal';
import OrderSummery from '../../Components/Burger/Ordersummery/Ordersummery';
import Spinner from '../../Components/UI/Snipper/Spinner';
import ErrorBoundary from '../../Components/Error/ErrorBoundary';
import * as actions from '../../store/actions/index';

// const INGREDIENT_PRICE = {
//     salad: 1,
//     bacon: 0.50,
//     meat: 3,
//     cheese: 2
// }

class BurgerBuilder extends React.Component {
    state = {
        // ingredients: null,
        totalPrice: 2,
        // purchasable: false,
        isPurchasable: false,
        isLoading: false,
        errorOccurred: null
    }

    componentDidMount() {
        // console.log('[COMPONENT_DID_MOUNT]')
        this.props.initialIngredients()
    }

    // shouldComponentUpdate() {
    //     // console.log('[SHOULD_COMPONENT_UPDATE]')
    //     return true
    // }

    // componentDidUpdate() {
    //     // console.log('[COMPONENT_DID_UPDATE]')
    // }

    // addedIngredientHandler = type => {
    //     console.log(type)
    //     const ingredientQuantity = this.state.ingredients[type]
    //     const updatedIngredientQuantity = ingredientQuantity + 1
    //     const updatedIngredient = {
    //         ...this.state.ingredients
    //     }
    //     updatedIngredient[type] = updatedIngredientQuantity
    //     //To calculate price
    //     const totalPrice = this.state.totalPrice
    //     const updatedtotalPrice = INGREDIENT_PRICE[type] + totalPrice

    //     this.setState({ingredients: updatedIngredient, totalPrice: updatedtotalPrice})
    //     this.purchasing(updatedIngredient)
    // }

    // removeIngredientHandler = type => {
    //     const ingredientQuantity = this.state.ingredients[type]
    //     if(ingredientQuantity <= 0) {
    //         return
    //     }
    //     const updatedIngredientQuantity = ingredientQuantity - 1
    //     const updatedIngredient = {
    //         ...this.state.ingredients
    //     }
    //     updatedIngredient[type] = updatedIngredientQuantity
    //     //To calculate price
    //     const totalPrice = this.state.totalPrice
    //     const updatedtotalPrice = totalPrice - INGREDIENT_PRICE[type]
        
    //     this.setState({ingredients: updatedIngredient, totalPrice: updatedtotalPrice})
    //     this.purchasing(updatedIngredient)
    // }

    purchasing = ingredients => {
        const sumOfIngredients = Object.keys(ingredients).map(item => {
            return ingredients[item]
        }).reduce((accumulator, currentValue) => {
            return accumulator + currentValue
        }, 0)
        return sumOfIngredients > 0
    }

    unlockCheckoutHandler = () => {
        if(!this.props.token) {
            this.props.history.push({
                pathname: `${this.props.match.path}auth`
            })
        } else {
            this.setState({isPurchasable: true})
        }
    }

    cancelPurchaseHandler = () => {
        this.setState({isPurchasable: false, errorOccurred: false})
    }

    continuePurchaseHandler = () => {
        // this.setState({isLoading: true})
        // const queryParams = [];
        // queryParams.push('totalPrice=' + this.state.totalPrice)
        
        // for (const i in this.props.ings) {
        //     queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.props.ings[i]))
        // }

        // const queryStr = queryParams.join('&')
        this.props.history.push({
            pathname: '/checkout/contact'
            // search: '?' + queryStr
        })
    }

    render() {
        const disableBtn = {
            ...this.props.ings
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

        if(this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings} /> 
                    <BuildControls
                        addedIngredients={this.props.addedIngredient}
                        removeIngredients={this.props.removeIngredient}
                        price={this.props.price}
                        disable={disableBtn}
                        purchasable={this.purchasing(this.props.ings)}
                        checkout={this.unlockCheckoutHandler}
                        openModal={this.state.isPurchasable} />    
                </Aux>
            );

            orderSummery = <OrderSummery
            ingredients={this.props.ings}
            price={this.props.price}
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

const mapStateToProps = state => {
    return {
        ings: state.ingsRTR.ingredients,
        price: state.ingsRTR.totalPrice,
        error: state.ingsRTR.error,
        token: state.authRTR.token != null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        initialIngredients: () => dispatch(actions.initialIngredients()),
        addedIngredient: type => dispatch(actions.addIngredients(type)),
        removeIngredient: type => dispatch(actions.removeIngredients(type))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);