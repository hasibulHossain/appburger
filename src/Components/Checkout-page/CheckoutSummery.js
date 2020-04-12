import React from 'react';
import './CheckoutSummery.scss';

import { v4 as uuidv4} from 'uuid';

const checkoutSummery = props => {
    const generatedList = Object.keys(props.ingredients).map(keys => (
        <li key={uuidv4()}>
            <span>{keys}: </span>
            <span>  {props.ingredients[keys]}</span>
        </li>
    ))

    return (
        <div className="checkoutSummery">
            <span className="checkoutSummery__one">1</span>
            <h2 className="checkoutSummery__head">Order overview</h2>
            <div className="checkoutSummery__information">
                <p>Burger Ingredients</p>
                <ul>
                    {generatedList}
                </ul>
                <strong>Total price: {!props.totalPrice ? null : props.totalPrice.toFixed(2)}</strong>
            </div>
        </div>
    )
}

export default checkoutSummery