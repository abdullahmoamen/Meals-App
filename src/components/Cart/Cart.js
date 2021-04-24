import React , {useContext,useState} from 'react';
import classes from './Cart.module.css';
import Modal from '../Ui/Modal';
import CartContext from './../../Store/CartContext';
import CartItem from './CartItem';
import CheckOut from './CheckOut';
import { motion } from 'framer-motion';


const divVariants = {
    hidden: { 
        opacity: 0, 
        y: '50vh' 
    },
    visible: { 
        opacity: 1, 
        y: 0,
        transition: { type: 'spring', delay: 0.5 }
    },
    exit: {
        y: "-50vw",
        transition: { ease: 'easeInOut' }
    }
    };

const Cart = (props) => {

    const [isCheckout,setIsCheckout]=useState(false);
    const [isSubmitting,setIsSubmitting]=useState(false);
    const [didSubmit,setDidSubmit]=useState(false);
    const cartCtx =useContext(CartContext);

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems=cartCtx.items.length > 0;

    
    const cartItemRemoveHandler=id=>{
        cartCtx.removeItem(id)
    }
    
    const cartItemAddeHandler=item=>{
        cartCtx.addItem(item);
    }
    
    const handleOrder=()=>{
        setIsCheckout(true)
    }

    const submitOrderHandler= async (userData)=>{
                setIsSubmitting(true);
                await fetch('https://meals-7c8f6-default-rtdb.firebaseio.com/orders.json',{
                method:'POST',
                body: JSON.stringify({
                    user: userData,
                    orderedItems: cartCtx.items
                })
            });
            setIsSubmitting(false);
            setDidSubmit(true);
            cartCtx.clearCart();
    };

    const cartItems = (
        <ul className={classes['cart-items']}>
        {cartCtx.items.map((item) => (
            <CartItem
            key={item.id}
            name={item.name}
            amount={item.amount}
            price={item.price}
            onRemove={cartItemRemoveHandler.bind(null, item.id)}
            onAdd={cartItemAddeHandler.bind(null, item)}
            />
        ))}
        </ul>
    ); 

    const actions = 
    <motion.div
    variants={divVariants}
    initial="hidden"
    animate="visible"
    exit="exit"
    className={classes.actions}>
    <button className={classes['button--alt']} onClick={props.hideCart}>Close</button>
    {hasItems && <button className={classes.button} onClick={handleOrder}>Order</button>}
    </motion.div>

    const cartModelContent = 
    <>
    {cartItems}
        <div className={classes.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
        </div>
        {isCheckout && (
        <CheckOut 
        onCancel={props.hideCart}
        onConfirm={submitOrderHandler}
        />)}
        {!isCheckout && actions}
    </>

    const isSubmittingModalContent = <p>Sending Order Data....</p>
    
    const didSubmitModalContent =
    <motion.div
    variants={divVariants}
    initial="hidden"
    animate="visible"
    exit="exit"
    > 
        <p>Your Order Is Sent Successfuly 💗</p>
        <div className={classes.actions}>
        <button className={classes.button}
        onClick={props.hideCart}>
        Close</button>
        </div>
        </motion.div>
    return (
        <Modal hideCart={props.hideCart}>
            {!isSubmitting && !didSubmit && cartModelContent}
            {isSubmitting && isSubmittingModalContent}
            {!isSubmitting && didSubmit && didSubmitModalContent}
        </Modal>
    );
}

export default Cart;
