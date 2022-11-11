import { createSlice } from '@reduxjs/toolkit';
//import { current } from '@reduxjs/toolkit';

const initialState = {
    items: [],
    shippingAddress: {},

}

export const cartSlice = createSlice({
  
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const itemExists = state.items.find( item => action.payload.id === item.id );
      if (!itemExists) {
        const newItem = {...action.payload, quantity:1};
        state.items.push(newItem);
      }
    },

    removeItem: (state, action) => {
      //console.log(action.payload)
      state.items = state.items.filter(item => item.id !== action.payload);
    },

    incrementQty: (state, action) => {
      const item = state.items.find( item => action.payload === item.id );
      item.quantity++;
    },

    decrementQty: (state, action) => {
      const item = state.items.find( item => action.payload === item.id );
      item.quantity--;
    },

    setShippingAddress: (state, action) => {
      console.log(action.payload);
      state.shippingAddress = action.payload;
    }
      
      
    

  },
})

export const { addItem, removeItem, incrementQty, decrementQty, setShippingAddress } = cartSlice.actions

export default cartSlice.reducer