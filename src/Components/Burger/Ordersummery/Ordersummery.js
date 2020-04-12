import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import './OrderSummery.css';
import Aux from '../../../Hoc/Aux';
import Button from '../../UI/Button/Button';

const orderSummery = props => {
    const ingredientDetails = Object.keys(props.ingredients).map(item => (
        <li key={uuidv4()}>
            <strong>
                <span style={{textTransform: 'capitalize'}}>{item}: </span>
                {props.ingredients[item]}
            </strong>
        </li>
    ))
    return (
        <Aux>
            <div className="OrderSummery">
                <p className="OrderSummery__head">Here your order details</p>
                <ul>
                    {ingredientDetails}
                </ul>
                <strong><p>Total price: {props.price.toFixed(2)}</p></strong>
            </div>
            <Button buttonType="Button-success" clicked={props.continuePurchase} >Continue</Button>
            <Button buttonType="Button-danger" clicked={props.cancelPurchase} >Cancel</Button>
        </Aux>
    )
}
export default orderSummery;