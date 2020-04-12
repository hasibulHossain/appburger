import React from 'react';
import { v4 as uuidv4} from 'uuid'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import './burger.css'

const burger = props => {
    let transformIngredients = Object.keys(props.ingredients).map(item => {
        return [...Array(props.ingredients[item])]
        .map(_ => <BurgerIngredient key={uuidv4()} type={item} />)
    }).reduce((accumulator, currentValue) => {
        return accumulator.concat(currentValue)
    }, []); // Initiator []
    if(transformIngredients.length <= 0) {
        transformIngredients = <p>Please choose burger ingredients</p>
    }

    return (
        <div className="burger-con">
            <div className="burger">
                <BurgerIngredient type="bread-top" />
                {transformIngredients}
                <BurgerIngredient type="bread-bottom"/>
            </div>
        </div>
    )
}

export default burger;