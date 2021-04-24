import React ,{useRef,useState} from 'react';
import  './CheckOut.css';

const isEmpty = val => val.trim() === '' || val.trim() === ' ' ;
const isFiveChars = val=>val.trim().length === 5; 

const CheckOut=(props)=> {

    const [formInputsValidity,setFormInputsValidity]=useState({
        name:true,
        street:true,
        postalCode:true,
        city:true,
    });

    const nameInputRef=useRef();
    const streetInputRef=useRef();
    const postalCodeInputRef=useRef();
    const cityInputRef=useRef();

    const confirmHandler=(e)=>{
        e.preventDefault();

        const enterdName=nameInputRef.current.value;
        const enterdStreet=streetInputRef.current.value;
        const enterdPostalCode=postalCodeInputRef.current.value;
        const enterdCity=cityInputRef.current.value;

        const enterdNameIsValid=!isEmpty(enterdName);
        const enterdStreetIsValid=!isEmpty(enterdStreet);
        const enterdCityIsValid=!isEmpty(enterdCity);
        const enterdPostalCodeIsValid=isFiveChars(enterdPostalCode);

        setFormInputsValidity({
            name:enterdNameIsValid,
            street:enterdStreetIsValid,
            postalCode:enterdPostalCodeIsValid,
            city:enterdCityIsValid
        })

        const formIsValid= 
        enterdNameIsValid && enterdStreetIsValid && 
        enterdCityIsValid && enterdPostalCodeIsValid;

        if(! formIsValid) {
            return;
        }

        props.onConfirm({
            name:enterdName,
            street:enterdStreet,
            city:enterdCity,
            postalCode:enterdPostalCode,
        })

    }


    return (
        
        <form onSubmit={confirmHandler} className='form'>
            <div className={`control ${formInputsValidity.name ? '' : 'invalid'}`}>
                <label htmlFor="name">User Name</label>
                <input type="text" id="name" ref={nameInputRef} />
                {!formInputsValidity.name && <p>Please Enter Valid Name !!</p>}
            </div>
            
            <div className={`control ${formInputsValidity.street ? '' : 'invalid'}`}>
                <label htmlFor="street">Street</label>
                <input type="text" id="street" ref={streetInputRef}  />
                {!formInputsValidity.street && <p>Please Enter Valid street !!</p>}
            </div>
            
            <div className={`control ${formInputsValidity.postalCode ? '' : 'invalid'}`}>
                <label htmlFor="postal">Postl Code</label>
                <input type="text" id="postal" ref={postalCodeInputRef}  />
                {!formInputsValidity.postalCode && <p>Please Enter Valid postalCode !!</p>}
            </div>
            
            <div className={`control ${formInputsValidity.city ? '' : 'invalid'}`}>
                <label htmlFor="city">City</label>
                <input type="text" id="city" ref={cityInputRef} />
                {!formInputsValidity.city && <p>Please Enter Valid city !!</p>}
            </div>

            <div className="actions">
            <button type="submit">CONFIRM</button>
            <button className='actions' onClick={props.onCancel} type='button'>CANCEL</button>
            </div>
        </form>
            
    )
}

export default CheckOut
