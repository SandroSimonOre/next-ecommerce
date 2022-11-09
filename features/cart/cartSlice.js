import { createSlice } from '@reduxjs/toolkit';
//import { current } from '@reduxjs/toolkit';

const initialState = {
    items: []
}

export const cartSlice = createSlice({
  
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      
      state.items.push(action.payload);
      
    },

    removeItem: (state, action) => {
      console.log(action.payload)
      state.items = state.items.filter(item => item.id !== action.payload);
    }
      
      
    

  },
})

export const { addItem, removeItem } = cartSlice.actions

export default cartSlice.reducer