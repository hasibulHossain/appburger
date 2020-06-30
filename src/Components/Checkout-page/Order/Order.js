import React from 'react';
import './Order.scss';

const Order = (props) => {
    const ingredients = []
    for(const i in props.ingredients) {
        ingredients.push({name: i, amount: props.ingredients[i]})
    }
    return (
        <div className="Order">
            <p style={{textTransform: 'capitalize', marginLeft: '7px'}}>Ingredients: </p>
                {ingredients.map(item => <span className="Order__ingredients" key={item.name}>{item.name} = {item.amount} </span>)}
            <p style={{fontSize: '18px'}}>Total Price: <strong>{props.price}$</strong></p>
        </div>
    )
}

export default Order;