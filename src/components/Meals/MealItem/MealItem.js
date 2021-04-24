import React,{useContext} from 'react';
import classes from './MealItem.module.css';
import MealItemForm from './MealItemForm';
import CartContext from '../../../Store/CartContext';
import img1 from '../../../assests/cover.jpg'

const MealItem = (props) => {
    const cartCtx = useContext(CartContext)
    const price =`price is: $${props.price} `

    const addToCartHandler =amount => {
        cartCtx.addItem({
            id:props.id,
            name:props.name,
            amount:amount,
            price:props.price
        });
    };

    return (
        <li className={classes.meal} key={props.name}>
            <div>
                <h3>{props.name}</h3>
                <div className={classes.description}>{props.description}</div>
                <div className={classes.image}>
                    <img className={classes.img} src={img1} alt="Meals images"/>
                </div>
                <div className={classes.price}>{price}</div>
            </div>
            <div>
                <MealItemForm  onAddToCart={addToCartHandler}/>
            </div>
        </li>
    );
}

export default MealItem;
