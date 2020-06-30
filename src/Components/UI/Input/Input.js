import React from 'react';
import './Input.scss';

const Input = props => {
   let inputElement = '';
   let classes = ['Input']
   if (!props.isValid && props.focusOut && props.touched) {
      classes.push('error')
   }

   switch (props.inputType) {
      case ('input'):
         inputElement = <input className="Input__item" 
            { ...props.elementConfig }
            value={ props.value } onBlur={ props.onBlur } onChange={ props.changed } />
         break;
      case ('textarea'):
         inputElement = <textarea className="Input__item"
            { ...props.elementConfig }
            value={ props.value } onBlur={ props.onBlur } onChange={ props.changed } ></textarea>
         break;
      case ('select'):
         inputElement = (
            <select className="Input__select" onChange={ props.changed } name={ props.name } id={ props.name } value={ props.value } >
               { props.elementConfig.option.map(item => <option className="Input__select__option" key={ item.value }>{ item.displayValue }</option>) }
            </select>
         );
         break;
      default:
         inputElement = <input className="Input__item" { ...props.elementConfig } value={ props.value } />
         break;
   }

   return (
      <div className={ classes.join(' ') }>
         <label className="Input__label">
            { props.label }
         </label>
         { inputElement }
         <small className="Input__errormassege"> { props.errorMessage } </small>
      </div>
   )
}

export default Input;