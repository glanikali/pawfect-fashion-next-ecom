import React, { useState } from "react";
import { useSelector } from "react-redux";
import DropDownItem from "./DropDownItem";

const DropdownInputSelector = (props) => {
  const stateInputValue = useSelector(
    (state) => state.checkoutReducer.form.formField.state.value
  );
  const stateInputValid = useSelector((state) => state.checkoutReducer.form.formField.state.valid)
  const stateInputBlur = useSelector((state) => state.checkoutReducer.form.formField.state.blur)
  const countryInputValue = useSelector(
    (state) => state.checkoutReducer.form.formField.country.value
  );
  let result;
  const provinces = useSelector(
    (state) => state.checkoutReducer.fetchData.canada.provinces
  );
  const states = useSelector(
    (state) => state.checkoutReducer.fetchData.usa.states
  );
 
  if (countryInputValue === "Canada") {
    result = provinces.filter((province) => {
      if (
       
        province.name.toUpperCase().includes(stateInputValue.toUpperCase()) ||
        province.state_code.toUpperCase().includes(stateInputValue.toUpperCase())
      ) {
          if (stateInputValue.toUpperCase() !== province.name.toUpperCase() && stateInputValue.toUpperCase() !== province.state_code.toUpperCase() )
        return province;
      }
    });
    
  }

  if (countryInputValue === "USA") {
    result = states.filter((state) => {
      if (
        
        state.name.toUpperCase().includes(stateInputValue.toUpperCase()) ||
        state.state_code.toUpperCase().includes(stateInputValue.toUpperCase())
      ) {
        return state;
      }
    });
  }
  
  return (
    <div >
      <ul>
        { result &&
           result.map((el) => {
              return <DropDownItem key={el.id} for="province" name={el.name} />;
            })
          }
      </ul>
    </div>
  );
};

export default DropdownInputSelector;
