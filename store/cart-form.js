import { createSlice } from "@reduxjs/toolkit";

const cartFormSlice = createSlice({
  name: "cart form slice",
  initialState: {
    pattern: null,
    size: null,
    customText: "",
    mediaURL: "",
  },
  reducers: {
    changePattern: (state, action) => {
      state.pattern = action.payload;
    },
    changeSize: (state, action) => {
      state.size = action.payload;
    },
    changeText: (state, action) => {
      state.customText = action.payload;
    },
    changeMediaURL: (state, action) => {
      state.mediaURL = action.payload;
    },
    clearForm: (state, action) =>{
        state.pattern = null;
        state.size = null;
        state.customText = "";
        state.mediaURL = "";
    }
  },
});

export default cartFormSlice.reducer;
export const cartFormActions = cartFormSlice.actions;
