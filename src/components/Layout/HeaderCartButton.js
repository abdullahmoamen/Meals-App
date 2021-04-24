import React ,{useContext , useEffect , useState} from 'react';
import CartIcon from '../Cart/CartIcon'
import classes from './HeaderCartButton.module.css'
import CartContext from '../../Store/CartContext';

const HeaderCartButton = (props) => {
    const [btnIsHighlighted,setBtnIsHighlighted]=useState(false)
    const cartCtx =useContext(CartContext);

    const {items} = cartCtx;
    const cartItemsNum=items.reduce((currNum, item) =>{
        return currNum + item.amount;
    },0);


    const btnClasses = ` ${classes.button} ${btnIsHighlighted ? classes.bump :''} `;
    useEffect(()=>{
        if (items.length === 0){
            return ;
        }
        setBtnIsHighlighted(true);
        const timer = setTimeout(()=>{
            setBtnIsHighlighted(false)
        },400)
        // clean up 
        return()=>{
            clearTimeout(timer);
        }

    },[items])
    return (
        <>
        <button className={btnClasses} onClick={props.onClick}>
            <span className={classes.icon}>
                <CartIcon />
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>
                {cartItemsNum}
            </span>
        </button>
        </>
    );
}

export default HeaderCartButton;
