import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";


const findIndex = (id, cart) =>{
  return cart.findIndex(el=> el.id === id);
}
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      state.cart.push(action.payload);
      state.quantity = state.quantity + 1;
      state.total = state.total + 18;
    },
    removeFromCart: (state, action) => {
    
      const filteredCart = state.cart.filter(el => el.id !== action.payload.id)
      state.cart = filteredCart;
      state.quantity = state.quantity - 1
      state.total = state.total - 18;
    },
    updatePattern: (state, action) =>{
      //index to update
      const index = findIndex(action.payload.id,state.cart);

      //updating pattern text
      state.cart[index].pattern = action.payload.pattern;

      //update pattern media url 
      
      const indexOfMediaURL = action.payload.products.findIndex(el => el.color === action.payload.pattern)
   

      const mediaURL = action.payload.products[indexOfMediaURL].img
   
      
      state.cart[index].mediaURL = mediaURL; 

    },
    updateSize: (state,action) =>{

      const index = findIndex(action.payload.id,state.cart)
      state.cart[index].size = action.payload.size;
    },
    updateCustomText: (state, action) =>{
      const index = findIndex(action.payload.id,state.cart);
      state.cart[index].customText = action.payload.text
    },
    updateFromFetch: (state, action) =>{
      state.cart = action.payload.cart;
      state.total = action.payload.total;
      state.quantity = action.payload.quantity;
    },
    clearCart: (state) =>{
      state.cart = [];
      state.quantity = 0;
      state.total= 0;

    },
  },
});

export default cartSlice.reducer;
export const cartSliceActions = cartSlice.actions;
