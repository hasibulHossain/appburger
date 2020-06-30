import React from 'react';
import './Orders.scss'
import { connect } from 'react-redux'

import Order from '../../Components/Checkout-page/Order/Order';
import * as actions from '../../store/actions/index';
import Spinner from '../../Components/UI/Snipper/Spinner';

class Orders extends React.Component {
    componentDidMount() {
        console.log('[componentDidMount] orders')
        this.props.fetchOrder(this.props.token, this.props.userId)
    }
    
    render() {
        console.log('[render] in orders', this.props)
        let orders = <Spinner/>

        
        if(!this.props.loading) {
            orders = this.props.orders.map(order => {
                return <Order key={order.id} ingredients={order.ingredients} price={order.totalPrice} />
            })
        }

        if(!this.props.orders[0] && !this.props.loading) {
            orders = <p style={{textAlign: 'center', fontSize: '20px'}}>Order bag is empty!</p>
        }

        return (
            <div className="Orders">
                {orders}     
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        orders: state.ordersRTR.orders,
        loading: state.ordersRTR.loading,
        token: state.authRTR.token,
        userId: state.authRTR.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchOrder: (token, userId) => dispatch(actions.fetchingOrders(token, userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders);