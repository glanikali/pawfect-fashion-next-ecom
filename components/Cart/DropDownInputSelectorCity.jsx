import React from "react";
import { useSelector } from "react-redux";
import DropDownItem from "./DropDownItem";
;


const DropdownInputSelectorCity = (props) => {
  let result;
  const country = useSelector(
    (state) => state.checkoutReducer.form.formField.country.value
  );
  const province = useSelector(state=> state.checkoutReducer.form.formField.state.value);
  const fetchedData = useSelector(state=> state.checkoutReducer.fetchData)
  const cityInput = useSelector(state=> state.checkoutReducer.form.formField.city.value);

  if (country === "Canada") {
    const filteredCities = fetchedData.canada.cities.filter(el => el.province.toUpperCase() === province.toUpperCase());
    if (filteredCities.length > 0){
    result = filteredCities[0].cities.filter(city => city.name.toUpperCase().includes(cityInput.toUpperCase()) )}
  }

  if (country === "USA") {
    const filteredCities = fetchedData.usa.cities.filter(el => el.province.toUpperCase() === province.toUpperCase());
    if (filteredCities.length > 0){
    result = filteredCities[0].cities.filter(city => city.name.toUpperCase().includes(cityInput.toUpperCase()) )}
  }

  return (
    <div>
      <ul>
        {result &&
          result.map((el) => {
            return <DropDownItem key={el.id} for="city" name={el.name} />;
          })}
      </ul>
    </div>
  );
};

export default DropdownInputSelectorCity;
