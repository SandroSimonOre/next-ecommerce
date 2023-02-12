import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [],
    shippingInfo: {},
    deliveryInfo: {}
}

export const cartSlice = createSlice({
  
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const itemExists = state.items.find( item => action.payload._id === item._id );
      if (!itemExists) state.items.push(action.payload);
    },

    removeItem: (state, action) => {
      state.items = state.items.filter(item => item._id !== action.payload._id );
    },

    incrementQty: (state, action) => {
      const item = state.items.find( item => action.payload._id === item._id );
      item.quantity++;
    },

    decrementQty: (state, action) => {
      const item = state.items.find( item => action.payload._id === item._id );
      item.quantity--;
    },

    emptyCart: (state) => {
      state.items = []
    },

    setShippingInfo: (state, action) => {
      state.shippingInfo = action.payload;
    },

    setDeliveryInfo: (state, action) => {
      state.deliveryInfo = action.payload; // It is ok ? It is not an object.
    }
      
  },
})

export const {
  addItem,
  removeItem,
  incrementQty, 
  decrementQty, 
  emptyCart,
  setShippingInfo,
  setDeliveryInfo
} = cartSlice.actions

export default cartSlice.reducer