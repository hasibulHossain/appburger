import React from 'react';
import { connect } from 'react-redux'

import './BuildControls.css'
import { v4 as uuidv4 } from 'uuid'
import BuildControl from './BuildControl/BuildControl'

const controls = [
    {type: 'salad'},
    {type: 'bacon'},
    {type: 'meat'},
    {type: 'cheese'}
]

class BuildControls extends React.Component {
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.price !== this.props.price ||
        nextProps.openModal !== this.props.openModal ||
        nextProps.children !== this.props.children ||
        nextProps.purchasable !== this.props.purchasable ||
        nextProps.disable !== this.props.disable
    }
    render() {
        return (
            <div className="BuildControls">
                <p>Total price: <strong>{this.props.price.toFixed(2)}</strong></p>
                {controls.map(item => {
                    return <BuildControl 
                        key={uuidv4()}
                        type={item.type}
                        added={() => this.props.addedIngredients(item.type)}
                        remove={() => this.props.removeIngredients(item.type)}
                        disable={this.props.disable[item.type]} />
                })}
                <button className="OrderButton"
                disabled={!this.props.purchasable}
                onClick={this.props.checkout} >{(!this.props.token && this.props.purchasable) ? "Sign in to Order" : "Order Now"}</button>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        token: state.authRTR.token
    }
}

export default connect(mapStateToProps)(BuildControls)