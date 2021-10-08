import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    size: ["S", "M", "L"],
  },
  reducers: {
    loadProducts: (state, action) => {
      state.products = action.payload;
    },
  },
});

export default productSlice.reducer;
export const productSliceActions = productSlice.actions;
