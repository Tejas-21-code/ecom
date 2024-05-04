import classes from './MealItemForm.module.css'
import Input from '../../UI/Input'
import { useRef,useState } from 'react'


const MealItemForm = (props) =>{

const [amountIsValid, setAmountIsValid] = useState(true);    

const amountInputref = useRef() 

const submitHandler = event =>{
event.preventDefault();

const enteredAmount = amountInputref.current.value
const enteredAmountNumber = +enteredAmount

if(enteredAmount.trim().length ===0 || enteredAmountNumber < 1 || enteredAmountNumber >5) {
setAmountIsValid(false);
return;
}
props.onAddToCart(enteredAmountNumber)
}

return <form className={classes.form} onSubmit={submitHandler}>
    <Input 
    ref={amountInputref}
    label="Amount" input={{
        id: 'amount_' + props.id,
        type:'number',
        min:'1',
        max:'5',
        step:'1',
        defaultValue:'1',
    }}/>
    <button>Add</button>
    {!amountIsValid && <p>Enter a valid number between 1-5.</p>}
</form>
}


export default MealItemForm