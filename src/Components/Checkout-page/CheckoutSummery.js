import React from 'react';
import { connect } from 'react-redux'

import { v4 as uuidv4 } from 'uuid';
import './CheckoutSummery.scss';


const checkoutSummery = props => {
    let generatedList = null;
    if (props.ingredients) {
        generatedList = Object.keys(props.ingredients).map(keys => (
            <li key={ uuidv4() }>
                <span>{ keys }: </span>
                <span>  { props.ingredients[keys] }</span>
            </li>
        ))
    }

    return (
        <div className="checkoutSummery">
            <span className="checkoutSummery__one">1</span>
            <h2 className="checkoutSummery__head">Order overview</h2><div className="checkoutSummery__information">
                <p>Burger Ingredients</p>
                <ul>
                    { generatedList }
                </ul>
                <strong>Total price: { props.totalPrice.toFixed(2) }</strong>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        ingredients: state.ingsRTR.ingredients,
        totalPrice: state.ingsRTR.totalPrice
    }
}

export default connect(mapStateToProps)(checkoutSummery);