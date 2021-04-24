import React ,{useRef,useState} from 'react';
import classes from './MealItemForm.module.css'
import Input from '../../Ui/Input'

function MealItemForm(props) {
    const [amountIsValid,setAmountIsValid]=useState(true)
    const amountInputRef =useRef()
    const submitHandler =(e)=>{
        e.preventDefault()

        const enterdAmount = amountInputRef.current.value;
        const enterdAmountNum = +enterdAmount;

        if(enterdAmount.trim().length === 0 || enterdAmountNum < 1 || enterdAmountNum > 5){
            setAmountIsValid(false);
            return 
        }
        props.onAddToCart(enterdAmountNum);
    }

    return (
        <>
            <form className={classes.form} onSubmit={submitHandler}>

                <Input 
                label='Amount'
                ref={amountInputRef}
                input={{
                    id :'amount',
                    type : 'number',
                    min:'1',
                    max:'6',
                    defaultValue:'1'
                }}/>
                <button>+ ADD</button>
                {!amountIsValid && <p>You Should Enter Valid Amount From (1/5).</p>}
            </form>
        </>
    )
}

export default MealItemForm
