import { useRef, useState } from 'react';
import classes from './Checkout.module.css';

const isEmpty = value => value.trim() === '';
const isFiveChars = value => value.trim().length == 6;

const Checkout = (props) => {

    const [formInputsValidity, setFormInputIsValidty] = useState({
        name: true,
        street: true,
        city: true,
        pinCode: true
    })

    const nameInputRef = useRef();

    const streetInputRef = useRef();

    const codeInputRef = useRef();

    const cityInputRef = useRef();

    const onSubmitHandler = (event) => {
        event.preventDefault();

        const enteredName = nameInputRef.current.value;
        const enteredStreet = streetInputRef.current.value;
        const enteredcode = codeInputRef.current.value;
        const enteredCity = cityInputRef.current.value;

        const enteredNameIsValid = !isEmpty(enteredName);
        const enteredStreetIsValid = !isEmpty(enteredStreet);
        const enteredCityIsValid = !isEmpty(enteredCity);
        const enteredPinCodeValid = isFiveChars(enteredcode);

        setFormInputIsValidty({
            name: enteredNameIsValid,
            street: enteredStreetIsValid,
            city: enteredCityIsValid,
            pinCode: enteredPinCodeValid
        });

        const formisValid = enteredNameIsValid && enteredCityIsValid && enteredPinCodeValid && enteredStreetIsValid;

        if (!formisValid) {
            return;
        }

        props.onconfirm({
            name: enteredName,
            street: enteredStreet,
            city: enteredCity,
            pinCode: enteredcode,
        });

    }

    const nameControlClasses = `${classes.control} ${formInputsValidity.name ? '' : classes.invalid}`;

    const streetControlClasses = `${classes.control} ${formInputsValidity.street ? '' : classes.invalid}`;

    const codeControlClasses = `${classes.control} ${formInputsValidity.pinCode ? '' : classes.invalid}`;

    const cityControlClasses = `${classes.control} ${formInputsValidity.city ? '' : classes.invalid}`;


    return (
        <form onSubmit={onSubmitHandler} className={classes.form}>
            <div className={nameControlClasses}>
                <label htmlfor='name'>Your Name</label>
                <input ref={nameInputRef} type='text' id='name' />
                {!formInputsValidity.name && <p>Please enter a valid name!</p>}
            </div>
            <div className={streetControlClasses}>
                <label htmlfor='address'>street</label>
                <input ref={streetInputRef} type='text' id='address' />
                {!formInputsValidity.street && <p>Please enter a valid street name!</p>}
            </div>
            <div className={codeControlClasses}>
                <label htmlfor='code'>Pin Code</label>
                <input ref={codeInputRef} type='text' id='code' />
                {!formInputsValidity.pinCode && <p>Please enter a valid Pincode number!</p>}
            </div>
            <div className={cityControlClasses}>
                <label htmlfor='city'>City</label>
                <input ref={cityInputRef} type='text' id='city' />
                {!formInputsValidity.city && <p>Please enter a valid city name!</p>}
            </div>
            <div className={classes.actions}>
                <button type='button' onClick={props.onCancel}>Cancel</button>
                <button className={classes.submit}>Confirm</button>
            </div>
        </form>
    )

}

export default Checkout;