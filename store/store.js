import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./products";
import cartReducer from "./cart";
import cartFormReducer from "./cart-form";
import checkoutReducer from './checkout'
import uiReducer from './ui'
import contactReducer from './contact'

const store = configureStore({
  reducer: {
    productsReducer,
    cartReducer,
    cartFormReducer,
    checkoutReducer,
    uiReducer, 
    contactReducer
  },
});

export default store;
