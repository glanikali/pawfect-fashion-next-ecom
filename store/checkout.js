import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  form: {
    formStatus: { valid: false },
    formField: {
      name: { value: "", blur: false, focus: false, valid: false },
      email: { value: "", blur: false, focus: false, valid: false },
      country: { value: "Canada", blur: false, focus: false, valid: false },
      phoneNumber: { value: "", blur: false, focus: false, valid: false },
      address: { value: "", blur: false, focus: false, valid: false },
      state: { value: "", blur: false, focus: false, valid: false },
      city: { value: "", blur: false, focus: false, valid: false },
      zipcode: { value: "", blur: false, focus: false, valid: false },
    },
  },
  shipping: {
    cost: "",
    type: "",
    time: "",
  },
  fetchData: {
    canada: { provinces: [], cities: [] },
    usa: { states: [], cities: [] },
  },
  paymentType: "",
  status: {
    completed: false,
  },
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    updateName: (state, action) => {
      state.form.formField.name.value = action.payload;
      state.form.formField.name.focus = true;
      state.form.formField.name.blur = false;

      if (state.form.formField.name.value.length > 0) {
        state.form.formField.name.valid = true;
      } else {
        state.form.formField.name.valid = false;
      }
    },
    blurName: (state, action) => {
      state.form.formField.name.focus = false;
      state.form.formField.name.blur = true;

      //validation
      if (state.form.formField.name.value.length > 0) {
        state.form.formField.name.valid = true;
      } else {
        state.form.formField.name.valid = false;
      }
    },

    updateEmail: (state, action) => {
      state.form.formField.email.value = action.payload;
      state.form.formField.email.focus = true;
      state.form.formField.email.blur = false;

      const emailValueToArr = state.form.formField.email.value.split("");

      const index = emailValueToArr.findIndex((el) => el === "@");

      const nameBefore = emailValueToArr.slice(0, index);

      //validation
      if (
        state.form.formField.email.value.length > 4 &&
        state.form.formField.email.value.includes("@") &&
        nameBefore.length > 0
      ) {
        state.form.formField.email.valid = true;
      } else {
        state.form.formField.email.valid = false;
      }
    },
    blurEmail: (state) => {
      state.form.formField.email.focus = false;
      state.form.formField.email.blur = true;

      //find length of name before @
      const emailValueToArr = state.form.formField.email.value.split("");

      const index = emailValueToArr.findIndex((el) => el === "@");

      const nameBefore = emailValueToArr.slice(0, index);

      //validation
      if (
        state.form.formField.email.value.length > 4 &&
        state.form.formField.email.value.includes("@") &&
        nameBefore.length > 0
      ) {
        state.form.formField.email.valid = true;
      } else {
        state.form.formField.email.valid = false;
      }
    },
    updatePhoneNumber: (state, action) => {
      state.form.formField.phoneNumber.value = action.payload;
      state.form.formField.phoneNumber.focus = true;
      state.form.formField.phoneNumber.blur = false;

      const phoneNumberValue = state.form.formField.phoneNumber.value
        .trim()
        .replace(/[^+\d]+/g, "");

      if (phoneNumberValue.length > 9 || phoneNumberValue.length === 0) {
        state.form.formField.phoneNumber.valid = true;
      } else {
        state.form.formField.phoneNumber.valid = false;
      }
    },
    blurPhoneNumber: (state) => {
      state.form.formField.phoneNumber.blur = true;
      state.form.formField.phoneNumber.focus = false;
      const phoneNumberValue = state.form.formField.phoneNumber.value
        .trim()
        .replace(/[^+\d]+/g, "");

      if (phoneNumberValue.length > 9 || phoneNumberValue.length === 0) {
        state.form.formField.phoneNumber.valid = true;
      } else {
        state.form.formField.phoneNumber.valid = false;
      }
    },

    updateCountry: (state, action) => {
      state.form.formField.country.value = action.payload;
      state.form.formField.country.focus = true;
      state.form.formField.country.blur = false;

      if (
        state.form.formField.country.value === "USA" ||
        state.form.formField.country.value === "Canada"
      ) {
        state.form.formField.country.valid = true;
      } else {
        state.form.formField.country.valid = false;
      }
    },
    blurCountry: (state) => {
      state.form.formField.country.focus = false;
      state.form.formField.country.blur = true;
      if (
        state.form.formField.country.value === "USA" ||
        state.form.formField.country.value === "Canada"
      ) {
        state.form.formField.country.valid = true;
      } else {
        state.form.formField.country.valid = false;
      }
    },

    updateCity: (state, action) => {
      
      state.form.formField.city.value = action.payload;
      state.form.formField.city.focus = true;
      state.form.formField.city.blur = false;
      state.form.formField.city.valid = false;


      if(state.form.formField.city.value.length > 0){
        state.form.formField.city.valid = true;
      }
      else{
        state.form.formField.city.valid = false;
      }
    },
    setProvinces: (state, action) => {
      state.fetchData.canada.provinces = action.payload;
    },
    updateProvinces: (state, action) => {
      state.form.formField.state.focus = true;
      state.form.formField.state.blur = false;
      state.form.formField.state.value = action.payload;

      let isValid;

      // check if valid
      if (state.form.formField.country.value === "Canada") {
        isValid = state.fetchData.canada.provinces.some(
          (el) =>
            el.name.toUpperCase() ===
            state.form.formField.state.value.toUpperCase()
        );
      }

      if (state.form.formField.country.value === "USA") {
        isValid = state.fetchData.usa.states.some(
          (el) =>
            el.name.toUpperCase() ===
            state.form.formField.state.value.toUpperCase()
        );
      }

      state.form.formField.state.valid = isValid;
    },
    blurProvinces: (state, action) => {
      state.form.formField.country.focus = false;
      state.form.formField.country.blur = true;
    },
    setValidProvince: (state, action) => {
      state.form.formField.state.value = action.payload;
      state.form.formField.state.valid = true;
    },
    setStates: (state, action) => {
      state.fetchData.usa.states = action.payload;
    },
    setValidCity: (state, action) => {
      
      state.form.formField.city.valid = true;
      state.form.formField.city.value = action.payload;
      
    },
    setCities: (state, action) => {
      if (state.form.formField.country.value === "Canada") {
        state.fetchData.canada.cities.push(action.payload);
      }
      if (state.form.formField.country.value === "USA") {
        state.fetchData.usa.cities.push(action.payload);
      }
    },
   
    blurCity: (state) => {
      state.form.formField.city.focus = false;
      // state.form.formField.city.blur = true;
    },
    updateAddress: (state, action) => {
      state.form.formField.address.focus = true;
      state.form.formField.address.blur = false;
      state.form.formField.address.value = action.payload;

      if (state.form.formField.address.value.length > 0) {
        state.form.formField.address.valid = true;
      } else {
        state.form.formField.address.valid = false;
      }
    },
    blurAddress: (state, action) => {
      state.form.formField.address.focus = false;
      state.form.formField.address.blur = true;

      if (state.form.formField.address.value.length > 0) {
        state.form.formField.address.valid = true;
      } else {
        state.form.formField.address.valid = false;
      }
    },
    updateZip: (state, action) => {
      state.form.formField.zipcode.focus = true;
      state.form.formField.zipcode.blur = false;
      state.form.formField.zipcode.value = action.payload;

      if (state.form.formField.address.value.trim().length > 0) {
        state.form.formField.zipcode.valid = true;
      } else {
        state.form.formField.zipcode.valid = false;
      }
    },
    blurZip: (state, action) => {
      state.form.formField.zipcode.focus = false;
      state.form.formField.zipcode.blur = true;
      if (state.form.formField.address.value.trim().length > 0) {
        state.form.formField.zipcode.valid = true;
      } else {
        state.form.formField.zipcode.valid = false;
      }
    },
    validateForm: (state) => {
      const formField = state.form.formField;
      if (
        formField.name.valid &&
        formField.email.valid &&
        formField.address.valid &&
        formField.state.valid &&
        formField.zipcode.valid &&formField.city.valid 
      ) {
        state.form.formStatus.valid = true;
      } else {
        state.form.formStatus.valid = false;
      }
    },
    updateFromFetch:(state, action) =>{
      state.form.formField.name.value = action.payload.name;
      state.form.formField.email.value = action.payload.email;
      state.form.formField.country.value = action.payload.country;
      state.form.formField.phoneNumber.value = action.payload.phoneNumber;
      state.form.formField.address.value = action.payload.address;
      state.form.formField.state.value = action.payload.state;
      state.form.formField.city.value = action.payload.city;
      state.form.formField.zipcode.value = action.payload.zipcode;
      state.form.formStatus.valid = true;

      state.form.formField.name.valid = true;
      state.form.formField.email.valid =  true;
      state.form.formField.country.valid =  true;
      state.form.formField.phoneNumber.valid =  true;
      state.form.formField.address.valid =  true;
      state.form.formField.state.valid =  true;
      state.form.formField.city.valid = true;
      state.form.formField.zipcode.valid =  true;
      state.form.formStatus.valid = true;
    },

    clear: () => {
      state = initialState;
    },
  },
});

export default checkoutSlice.reducer;
export const checkoutSliceActions = checkoutSlice.actions;
