import React from "react";
import classes from './Checkout.module.css';
import { useRef, useState} from "react";


const isEmpty = value => value.trim()=== ''
const isNotFive = value => value.trim().length !== 5

const Checkout = (props) => {
  const [formInputValidity, setIsFormInputValidity] = useState({
    name:true,
    street:true,
    city:true,
    postal:true
  })

 const nameInputRef = useRef();
 const streetInputRef = useRef();
 const postalInputRef = useRef();
 const cityInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value; 
    const enteredStreet = streetInputRef.current.value; 
    const enteredPostal =postalInputRef.current.value; 
    const enteredCity = cityInputRef.current.value; 

    const enteredNameIsValid = !isEmpty(enteredName)
    const enteredStreetIsValid = !isEmpty(enteredStreet)
    const enteredCityIsValid = !isEmpty(enteredCity)
    const enteredPostalIsValid = !isNotFive(enteredPostal)

    setIsFormInputValidity({
      name:enteredNameIsValid,
      street:enteredStreetIsValid,
      city:enteredCityIsValid,
      postal:enteredPostalIsValid
    })

    const formIsValid = enteredNameIsValid && enteredCityIsValid && enteredPostalIsValid && enteredStreetIsValid
    if(!formIsValid){
        return;
    }
    props.onConfirm({
      name:enteredName,
      city:enteredCity,
      street:enteredStreet,
      postal:enteredPostal,
    })
  };

  const nameControl = `${classes.control} 
  ${formInputValidity.name ? '' : classes.invalid}`;

  const streetControl = `${classes.control} 
  ${formInputValidity.street ? '' : classes.invalid}`;

  const postalControl = `${classes.control} 
  ${formInputValidity.postal? '' : classes.invalid}`;

  const cityControl = `${classes.control} 
  ${formInputValidity.city ? '' : classes.invalid}`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControl}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={nameInputRef}/>
        {!formInputValidity.name && <p>Please Enter a Valid Name</p>}
      </div>
      <div className={streetControl}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' ref={streetInputRef}/>
        {!formInputValidity.street && <p>Please Enter a Valid Street</p>}
      </div>
      <div className={postalControl}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' ref={postalInputRef}/>
        {!formInputValidity.postal && <p>Please Enter a Valid Postal Code (5 caracters long)</p>}
      </div>
      <div className={cityControl}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' ref={cityInputRef}/>
        {!formInputValidity.city && <p>Please Enter a Valid City</p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;