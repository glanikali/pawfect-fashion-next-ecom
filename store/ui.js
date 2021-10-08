import { createSlice } from "@reduxjs/toolkit";


const uiSlice = createSlice({
    name: "ui",
    initialState: {
        modal:{
            isVisible: true,
        },
        mobileMenu:{
            isVisible: false,
        }
    },
    reducers:{
        changeModalVisibility: (state, action) =>{
            state.modal.isVisible = !state.modal.isVisible;
        },
        changeMenuStatus: (state, action) =>{
            state.mobileMenu.isVisible = !state.mobileMenu.isVisible
        },
    }
})

export default uiSlice.reducer;
export const uiSliceActions = uiSlice.actions;