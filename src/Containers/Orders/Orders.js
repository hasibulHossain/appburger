import React from 'react';
import Order from '../../Components/Checkout-page/Order/Order';
import './Orders.scss'
import { getOrders } from '../../request';

class Orders extends React.Component {
    state = {
        orders: []
    }

    componentDidMount() {
        getOrders().then(data => {
            const fetchOrder = []
            for(const order in data) {
                fetchOrder.push({...data[order], id: order})
                this.setState({orders: fetchOrder})
            }
        }).catch(err => {
            console.log(err)
        })
    }

    render() {
        return (
            <div className="Orders">
                {this.state.orders.map(order => {
                    return <Order key={order.id} ingredients={order.ingredients} price={order.totalPrice} />
                })}
            </div>
        )
    }
}

export default Orders;