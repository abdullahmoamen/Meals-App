import React ,{useReducer} from 'react';
import CartContext from './CartContext';

const defaultCartState={
    items: [],
    totalAmount:0
};

const cartReducer =(state,action)=>{

    if(action.type === 'ADD'){
        const updatedAmount = state.totalAmount + action.item.price * action.item.amount;

        const existingItemIndex=state.items.findIndex(item=>item.id === action.item.id);
        const existingCartItems = state.items[existingItemIndex];
        let updatedItems;
        
        if(existingCartItems){
            const updatedItem={
                ...existingCartItems,
                amount: existingCartItems.amount + action.item.amount
            };
            updatedItems=[...state.items];
            updatedItems[existingItemIndex]=updatedItem;
        }else{
            // updatedItem={...action.item};
            updatedItems = state.items.concat(action.item);
        }
        
        return{
            items:updatedItems,
            totalAmount:updatedAmount
        }
    }
    if(action.type === 'REMOVE'){
        const existingItemIndex=state.items.findIndex(
            item=>item.id === action.id);
            const existingItem = state.items[existingItemIndex];
            const updatedTotalAmount =state.totalAmount - existingItem.price;
            let updatedItems;
            if(existingItem.amount === 1){
                updatedItems=state.items.filter(item => item.id !== action.id)
            } else{
                const updatedItem = {...existingItem , amount: existingItem.amount-1};
                updatedItems=[...state.items]
                updatedItems[existingItemIndex]=updatedItem
            }
            return{
                items: updatedItems,
                totalAmount:updatedTotalAmount
            }
    }

    if(action.type==='CLEAR'){
        return defaultCartState;
    }

    return defaultCartState
}

export default function CartProvider(props) {
    const [cartState,dispatchCartAction] = useReducer(cartReducer,defaultCartState);

    const addItemHandler=(item)=>{
        dispatchCartAction({type: 'ADD',item: item})
    }

    const removeItemHandler=(id)=>{
        dispatchCartAction({type: 'REMOVE',id: id})
    }

    const clearCartHandler=()=>{
        dispatchCartAction({type: 'CLEAR' })
    }  

    const cartContext={
        items:cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemHandler,
        removeItem: removeItemHandler,
        clearCart: clearCartHandler
    }

    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    )
}
