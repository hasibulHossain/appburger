import React from 'react';
import './CheckoutForm.scss';
import Button from '../../UI/Button/Button';
import { postOrder } from '../../../request';
import { withRouter } from 'react-router-dom';

class CheckoutForm extends React.Component {
  state = {
    customer: {
      name: '',
      email: '',
      number: '',
      address: {
        country: '',
        district: '',
        area: ''
      }
    },
    deliveryMethod: ''
  }

  submitHandler = (e) => {
    console.log('clicked')
    e.preventDefault()
    const orderData = {
    customer: {
      name: 'hasib',
      email: 'hasibulHossain52@gmail.com',
      number: '01798095346',
      address: {
        country: 'Bangladesh',
        district: 'Dhaka',
        area: 'Mirpur'
      }
    },
    deliveryMethod: 'cash on delivery',
    ingredients: this.props.ingredients,
    totalPrice: this.props.totalPrice
    }


    postOrder(orderData).then(data => {
      const queryParam = []
      
      queryParam.push(encodeURIComponent('name') + '=' + encodeURIComponent(data.name))
      
      this.props.history.push({
        pathname: `${this.props.match.path}/success`,
        search: '?' + queryParam
      })
    }).catch(err => {
      this.setState({isLoading: false, errorOccurred: err})
    })
  }

  render() {
    return (
      <div className="CheckoutForm">
        <form action="">
          <label htmlFor="">
            <input type="text" placeholder="name" required />
          </label>
          <label htmlFor="">
            <input type="text" placeholder="email" />
          </label>
          <label htmlFor="">
            <input type="text" placeholder="number" />
          </label>
          <label htmlFor="">
            <input type="text" placeholder="country" />
          </label>
          <label htmlFor="">
            <input type="text" placeholder="district" />
          </label>
          <label htmlFor="">
            <input type="text" placeholder="area" />
          </label>
          <Button buttonType="Button-success" clicked={this.submitHandler} >Submit</Button>
        </form>
      </div>
    )
  }
}

export default withRouter(CheckoutForm);
