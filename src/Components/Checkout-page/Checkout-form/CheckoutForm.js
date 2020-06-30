import React from 'react';
import { connect } from 'react-redux';
import './CheckoutForm.scss';
import { postOrder } from '../../../request';
import { withRouter } from 'react-router-dom';
import Input from '../../UI/Input/Input';

class CheckoutForm extends React.Component {
  state = {
    orderForm: {
      userName: {
        label: 'Name',
        errorMessage: 'input a name',
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'hasib09'
        },
        value: '',
        validation: {
          required: true,
          minLength: 3,
          maxLength: 18
        },
        isValid: false,
        focusOut: false,
        touched: false
      },
      email: {
        label: 'Email',
        errorMessage: 'enter a valid em@il',
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'example@email.com'
        },
        value: '',
        validation: {
          required: true,
          maxLength: 35
        },
        isValid: false,
        focusOut: false,
        touched: false
      },
      area: {
        label: 'Area',
        elementType: 'input',
        errorMessage: 'are name must be required',
        elementConfig: {
          type: 'text',
          placeholder: 'Mirpur'
        },
        value: '',
        validation: {
          required: true,
        },
        isValid: false,
        focusOut: false,
        touched: false
      },
      number: {
        label: 'Number',
        elementType: 'input',
        errorMessage: 'Please enter a valid number',
        elementConfig: {
          type: 'text',
          placeholder: '01*********'
        },
        value: '',
        validation: {
          required: true,
          minLength: 11,
          maxLength: 11
        },
        isValid: false,
        focusOut: false,
        touched: false
      },
      deliveryMethod: {
        label: 'Delivery Method',
        elementType: 'select',
        elementConfig: {
          option: [
            { value: 'fast', displayValue: 'fast' },
            { value: 'slow', displayValue: 'slow' }
          ]
        },
        value: 'fast',
        validation: {},
        isValid: true
      }
    },
    formValid: false
  }

  validationCheck = (value, validationRules, inputElementName) => {
    let isValidate = true;
    

    if (validationRules.required && isValidate) {
      isValidate = value.trim() !== '';
    }

    if (inputElementName === 'email' && isValidate) {
      const emailValidityCheck = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
      isValidate = emailValidityCheck.test(value)
    }

    if (inputElementName === 'number' && isValidate) {
      const numberValidityCheck = /^[0][1-9]\d{9}$|^[1-9]\d{9}$/;
      isValidate = numberValidityCheck.test(value)
    }

    if (validationRules.minLength && isValidate) {
      isValidate = validationRules.minLength <= value.trim().length
    }

    if (validationRules.maxLength && isValidate) {
      isValidate = validationRules.maxLength >= value.trim().length
    }
    return isValidate;
  }

  inputEventHandler = (event, targetedElement) => {
    const updatedOrderForm = { ...this.state.orderForm }; // cloning the orderForm
    const updatedElement = {...updatedOrderForm[targetedElement]}; // deep cloning orderForm nested element
    updatedElement.value = event.target.value; // set the value of the element by onChange event
    updatedElement.touched = true;
    updatedElement.isValid = this.validationCheck(updatedElement.value, updatedElement.validation, targetedElement)
    updatedOrderForm[targetedElement] = updatedElement;  // updating element with new value
    
    // to validate full form. this code will check is every element of this form is valid or not.
    let formValid = true;
    for(const element in updatedOrderForm) {
      formValid = updatedOrderForm[element].isValid && formValid
    }

    this.setState({ orderForm: updatedOrderForm, formValid: formValid });
  }

  focusoutHandler = targetedElement => {
    const updatedOrderForm = { ...this.state.orderForm };
    const updatedElement = {...updatedOrderForm[targetedElement]};
    updatedElement.focusOut = true;
    updatedOrderForm[targetedElement] = updatedElement;
    this.setState({ orderForm: updatedOrderForm });
  }

  submitHandler = (e) => {
    e.preventDefault()
    const formData = {}
    for (const inputElement in this.state.orderForm) {
      formData[inputElement] = this.state.orderForm[inputElement].value
    }
    const orderData = {
      ingredients: this.props.ingredients,
      totalPrice: this.props.totalPrice,
      customer: formData,
      userId: this.props.userId
    }

    postOrder(orderData, this.props.token).then(data => { 
      const queryParam = []

      queryParam.push(encodeURIComponent('name') + '=' + encodeURIComponent(data.name))

      this.props.history.replace({
        pathname: `${this.props.match.path}/success`,
        search: '?' + queryParam
      })
    }).catch(err => {
      console.log(err)
    })
  }

  render() {
    const orderForm = [];
    for (const key in this.state.orderForm) {
      orderForm.push({ id: key, config: this.state.orderForm[key] })
    }

    return (
      <div className="CheckoutForm">
        <form className="form" action="">
          <h1>Submit Form</h1>
          { orderForm.map(inputElement => (
            <Input key={ inputElement.id }
              touched={ inputElement.config.touched }
              focusOut={ inputElement.config.focusOut }
              onBlur={ () => this.focusoutHandler(inputElement.id) }
              isValid={ inputElement.config.isValid }
              label={ inputElement.config.label }
              errorMessage={ inputElement.config.errorMessage }
              inputType={ inputElement.config.elementType }
              elementConfig={ inputElement.config.elementConfig }
              value={ inputElement.config.value }
              name={ inputElement.id }
              changed={ (event) => this.inputEventHandler(event, inputElement.id) } />)) }
          <button className="form__submit" disabled={!this.state.formValid} onClick={ this.submitHandler } >Submit</button>
        </form>
      </div>
    )
  }
}

// connecting with global state
const mapStateToProps = state => {
  return {
    ingredients: state.ingsRTR.ingredients,
    totalPrice: state.ingsRTR.totalPrice,
    token: state.authRTR.token,
    userId: state.authRTR.userId
  }
}

export default connect(mapStateToProps)(withRouter(CheckoutForm));