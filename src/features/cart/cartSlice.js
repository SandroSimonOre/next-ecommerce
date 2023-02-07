import { createSlice } from '@reduxjs/toolkit';
//import { current } from '@reduxjs/toolkit';

const initialState = {
    items: [],
    shippingAddress: {},
    paymentMethod: '',
    identification: {},
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

    emptyCart: (state, action) => {
      state.items = []
    },

    setShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
    },

    setPaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
    },

    clearCartItems: (state) => {
      state.items = [];
    },

    setIdentification: (state, action) => {
      state.identification = action.payload;
    },

    setDeliveryInfo: (state, action) => {
      state.deliveryInfo = action.payload;
    }
      
  },
})

export const {
  addItem,
  removeItem,
  incrementQty, 
  decrementQty, 
  emptyCart,
  setShippingAddress,
  setPaymentMethod,
  clearCartItems,
  setIdentification,
  setDeliveryInfo
} = cartSlice.actions

export default cartSlice.reducer