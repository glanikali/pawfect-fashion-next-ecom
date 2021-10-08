import { createSlice } from "@reduxjs/toolkit";


const contactSlice = createSlice({
    name: 'contact',
    initialState: {
        name: {
            value: "",
            valid: false,
            blur: false,
            focus: false
        },
        email: {
            value: "",
            valid:false,
            blur: false,
            focus: false, 
        },
        message:{
            value: "",
            valid: false,
            blur: false,
            focus: false,
        },
        form:{
            valid: false,
        }
    },
    reducers:{
        updateName: (state, action) =>{
            state.name.value = action.payload;
            state.name.blur = false;
            state.name.focus = true;
        },
        blurName: (state, action) =>{
            state.name.blur = true;
            state.name.focus = false;

            if(state.name.value.length > 0){
                state.name.valid = true;
            }
            else{
                state.name.valid = false;
            }


            if (state.name.valid && state.email.valid && state.message.valid){
                state.form.valid = true;
            }
            else{
                state.form.valid = false;
            }
        },
        updateEmail: (state, action) =>{
            state.email.value = action.payload;
            state.email.blur = false;
            state.email.focus = true;
        },
        blurEmail: (state) =>{
            state.email.blur = true;
            state.email.focus = false;

            if(state.email.value.length> 4 && state.email.value.includes('@')){
                state.email.valid = true
            }
            else{
                state.email.valid = false;
            }

            if (state.name.valid && state.email.valid && state.message.valid){
                state.form.valid = true;
            }
            else{
                state.form.valid = false;
            }
        },
        updateMessage: (state, action) =>{
            state.message.value = action.payload;
            state.message.blur = false;
            state.message.focus = true;
        },
        blurMessage: (state) =>{
            state.message.blur = true;
            state.message.focus = false;


            if (state.message.value.length > 0){
                state.message.valid = true;
            }
            else{
                state.message.valid = false;
            }


            if (state.name.valid && state.email.valid && state.message.valid){
                state.form.valid = true;
            }
            else{
                state.form.valid = false;
            }
        },
    }
})


export default contactSlice.reducer;
export const contactSliceActions = contactSlice.actions;