import { useRef, useState } from 'react'
import classes from './MealItemForm.module.css';
import Input from '../../UI/Input'

const MealItemForm = (props) => {

    const amountInputRef = useRef()

    const [amountIsValid, setAmountisValid] = useState(true);

    const submitHandler = event => {
        event.preventDefault();

        const enteredAmount = amountInputRef.current.value; //As this will return string we have to convert it to number
        const enteredAmountNumber = +enteredAmount; // by adding + we can convert it to number

        if (enteredAmount.trim().length === 0 || enteredAmountNumber < 1 || enteredAmountNumber > 5) {
            setAmountisValid(false);
            return;
        }

        props.onAddToCart(enteredAmountNumber)
    }
    return (
        <form className={classes.form} onClick={submitHandler}>
            <Input
                ref={amountInputRef}
                label="Amount" input={{
                    id: 'amount',
                    type: 'number',
                    min: '1',
                    max: '5',
                    step: '1',
                    defaultValue: '1'
                }} />
            <button>+ Add</button>
            {!amountIsValid && <p>Please enter a valid amount</p>}
        </form>
    );
};

export default MealItemForm;