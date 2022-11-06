import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  cart : { cartItems: [] },
}

export const cartSlice = createSlice({
  
  name: 'cart',
  initialState,
  reducers: {
    add: (state, action) => {
      console.log(action.payload)
      const newItem = action.payload;
      const existingItem = state.cart.cartItems.find(item => item.id === newItem.id);

      const cartItems = existingItem
          ? state.cart.cartItems.map( item => item.id === newItem.id ? newItem : item)
          : [...state.cart.cartItems, newItem];
      console.log('carrito', cartItems)      
      return {...state, cart: {...state.cart, cartItems}} 
    
    },
    
    remove: (state) => {
      state.value -= 1
    },
    
    /*
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },
    */
  },
})

// Action creators are generated for each case reducer function
export const { add, remove } = cartSlice.actions

export default cartSlice.reducer