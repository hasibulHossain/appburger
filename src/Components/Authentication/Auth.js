import React from 'react';
import { Redirect } from 'react-router-dom';
import './Auth.scss';
import { connect } from 'react-redux'

import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import * as actions from '../../store/actions/index';

class Auth extends React.Component {
   state = {
      loginForm: {
         email: {
            label: 'Email',
            errorMessage: 'enter a valid email',
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
         password: {
            label: 'Password',
            errorMessage: 'must be greater than 6',
            elementType: 'input',
            elementConfig: {
               type: 'password',
               placeholder: 'password'
            },
            value: '',
            validation: {
               required: true,
               minLength: 6
            },
            isValid: false,
            focusOut: false,
            touched: false
         }
      },
      formValid: false,
      signUp: true
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
      const updatedLoginForm = { ...this.state.loginForm }; // cloning the loginForm
      const updatedElement = {...updatedLoginForm[targetedElement]}; // deep cloning loginForm nested element
      updatedElement.value = event.target.value; // set the value of the element by onChange event
      updatedElement.touched = true;
      updatedElement.isValid = this.validationCheck(updatedElement.value, updatedElement.validation, targetedElement)
      updatedLoginForm[targetedElement] = updatedElement;  // updating element with new value
      
      // to validate full form. this code will check is every element of this form is valid or not.
      let formValid = true;
      for(const element in updatedLoginForm) {
        formValid = updatedLoginForm[element].isValid && formValid
      }
  
      this.setState({ loginForm: updatedLoginForm, formValid: formValid });
   }

   focusoutHandler = targetedElement => {
      const updatedLoginForm = { ...this.state.loginForm };
      const updatedElement = {...updatedLoginForm[targetedElement]};
      updatedElement.focusOut = true;
      updatedLoginForm[targetedElement] = updatedElement;
      this.setState({ loginForm: updatedLoginForm });
   }

   authSubmitHandler = e => {
      e.preventDefault()
      this.props.onAuth(this.state.loginForm.email.value, this.state.loginForm.password.value, this.state.signUp)
   }

   signUpHandler = e => {
      e.preventDefault();
      this.setState(prevState => {
         return {signUp: !prevState.signUp}
      })
   }

   render() {
      const loginForm = [];
      for (const key in this.state.loginForm) {
         loginForm.push({ id: key, config: this.state.loginForm[key] })
      }

      let form;

      form = loginForm.map(inputElement => (
            <Input key={inputElement.id}
            touched={inputElement.config.touched}
            focusOut={inputElement.config.focusOut}
            onBlur={() => this.focusoutHandler(inputElement.id)}
            isValid={ inputElement.config.isValid}
            label={inputElement.config.label}
            errorMessage={inputElement.config.errorMessage}
            inputType={inputElement.config.elementType}
            elementConfig={inputElement.config.elementConfig}
            value={inputElement.config.value}
            name={inputElement.id}
            changed={event => this.inputEventHandler(event, inputElement.id)} />
      ));

      let redirectToHome = null;
      if(this.props.isAuthenticated && !this.props.haveIngredients) {
         redirectToHome = <Redirect to="/" />
      }

      if(this.props.isAuthenticated && this.props.haveIngredients) {
         redirectToHome = <Redirect to="/checkout/contact" />
      }
      
      return (
         <>
            {redirectToHome}
            <div className="Auth">
               {this.state.signUp ? <p style={{textAlign: 'center'}}>Login Page</p> : <p style={{textAlign: 'center'}}>Sign Up Page</p>}
               <form onSubmit={this.authSubmitHandler} className="form">
                  {form}
                  <small style={{display: 'block', color: '#e74c3c'}}>{this.props.errorMessage}</small>
                  <Button buttonType="Button-success" >Continue</Button>
               </form>
               <div className="centering-btn">
                  {!this.state.signUp ? <span>Already a user?</span> : <span>Don't have an account? </span>} 
                  <button onClick={this.signUpHandler} className="toggle" > {this.state.signUp ? 'sign up' : 'login'} </button>
               </div>
            </div>
         </>
      )
   }
}

const mapStateToProps = state => {
   return {
      isAuthenticated: state.authRTR.token !== null,
      haveIngredients: state.ingsRTR.totalPrice > 2,
      errorMessage: state.authRTR.errorMessage
   }
}

const mapDispatchToProps = dispatch => {
   return {
      onAuth: (email, password, signUp) => dispatch(actions.auth(email, password, signUp))
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);