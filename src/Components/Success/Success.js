import React from 'react';
import './Success.scss';

const success = props => {
    const query = []
    const searchParams = new URLSearchParams(props.location.search)
    for (const i of searchParams.entries()) {
        query.push(i[1])
    }

    return (
        <div className="success">
            <div className="success__box">
                <p className="success__box-order">Order# {query.join().slice(query.length - 12, query.length - 7)}</p> 
                <p>Thank you for your order</p>
                <p>We will contact you soon to verify the order.</p>
            </div>     
        </div>
    )
}

export default success;