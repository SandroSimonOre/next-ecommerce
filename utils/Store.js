import { createContext, useReducer } from "react";

export const Store = createContext();

const initialValue = {
    cart : { cartItems: []},
};

function reducer( state, action) {
    switch (action.type) {
        case 'CART_ADD_ITEM' : {
            const newItem = action.payload;
            const existingItem = state.cart.cartItems.find(
                item => item.id === newItem.id
            );

            const cartItems = existingItem
                ? state.cart.cartItems.map( item => item.id === newItem.id ? newItem : item)
                : [...state.cart.cartItems, newItem];
            
            return {...state, cart: {...state.cart, cartItems}} 
        }

        default:
            return state;
    }
}

export function StoreProvider( { children } ) {
    const [state, dispatch] = useReducer( reducer, initialValue);
    const value = { state, dispatch };
    return <Store.Provider value = {value}> {children} </Store.Provider>
}