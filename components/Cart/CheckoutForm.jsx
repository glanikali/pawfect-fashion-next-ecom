import React, { useState, useEffect } from "react";
import Checkout from "../Checkout/Checkout";
import { useSelector, useDispatch } from "react-redux";
import checkout, { checkoutSliceActions } from "../../store/checkout";
import Card from "../UI/Card";
import styles from "./CheckoutForm.module.scss";
import DropdownInputSelector from "./DropdownInputSelector";
import DropdownInputSelectorCity from './DropDownInputSelectorCity'
import Button from "../UI/Button";

const CheckoutForm = (props) => {
  
  const { quantity } = useSelector((state) => state.cartReducer);
  const canadaCities= useSelector(state=> state.checkoutReducer.fetchData.canada.cities);
  const usaCities = useSelector(state=> state.checkoutReducer.fetchData.usa.cities);
  const formValid = useSelector(state=> state.checkoutReducer.form.formStatus.valid)
  const checkoutForm = useSelector(
    (state) => state.checkoutReducer.form.formField
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (!checkoutForm.state.valid ) {
      return;
    }

    if (canadaCities.some(el => el.province.toUpperCase() === checkoutForm.state.value.toUpperCase()) || usaCities.some(el => el.province.toUpperCase() === checkoutForm.state.value.toUpperCase()) ){
      console.log("Return because value exists");
      return;
    }

    const fetchCities = async () => {
      try {
        const req = await fetch(
          `/api/shipping/get-city-data`,
          {
            method: "POST",
            body: JSON.stringify({
              country: checkoutForm.country.value,
              province: checkoutForm.state.value,
            }),
            headers: {
              "content-type": "application/json",
            },
          }
        );
        const data = await req.json();
        dispatch(checkoutSliceActions.setCities(data))
      } catch (error) {
        console.log(error);
      }
    };
    fetchCities();
  }, [checkoutForm.state.valid]);

  return (
    <>
      <form className={styles.formContainer} action="submit">
        {checkoutForm.name.blur && !checkoutForm.name.valid && (
          <p className={styles.fallbackText}>Input a valid name</p>
        )}
        <div className={styles.inputContainer}>
          <label htmlFor="name">Name:</label>
          <input
            className={`${styles.checkoutFormInput} ${
              checkoutForm.name.blur &&
              !checkoutForm.name.valid &&
              styles.invalid
            }`}
            onChange={(e) => {
              dispatch(checkoutSliceActions.updateName(e.target.value));
            }}
            onBlur={() =>{dispatch(checkoutSliceActions.blurName());
              dispatch(checkoutSliceActions.validateForm())
            }  
            
            }
            value={checkoutForm.name.value}
            id="name"
            required="required"
            type="text"
            placeholder="required"
          />
        </div>
        {checkoutForm.email.blur && !checkoutForm.email.valid && (
          <p className={styles.fallbackText}>Input a valid email</p>
        )}
        <div className={styles.inputContainer}>
          <label htmlFor="email">Email:</label>
          <input
            className={`${styles.checkoutFormInput} ${
              checkoutForm.email.blur &&
              !checkoutForm.email.valid &&
              styles.invalid
            }`}
            type="email"
            id="email"
            required="required"
            placeholder="required"
            value={checkoutForm.email.value}
            onChange={(e) =>
              dispatch(checkoutSliceActions.updateEmail(e.target.value))
            }
            onBlur={() => {dispatch(checkoutSliceActions.blurEmail())
            dispatch(checkoutSliceActions.validateForm())
            }}
          />
        </div>
        {checkoutForm.phoneNumber.blur && !checkoutForm.phoneNumber.valid && (
          <p className={styles.fallbackText}>
            Input a valid phone number or leave blank
          </p>
        )}
        <div className={styles.inputContainer}>
          <label htmlFor="phoneNumber">Phone:</label>
          <input
            value={checkoutForm.phoneNumber.value}
            onChange={(e) =>
              dispatch(checkoutSliceActions.updatePhoneNumber(e.target.value))
            }
            onBlur={() =>{ dispatch(checkoutSliceActions.blurPhoneNumber())
            dispatch(checkoutSliceActions.validateForm())}}
            className={`${styles.checkoutFormInput} ${
              checkoutForm.phoneNumber.blur &&
              !checkoutForm.phoneNumber.valid &&
              styles.invalid
            }`}
            type="phone number"
            id="phoneNumber"
            placeholder="optional"
          />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="Country">Country:</label>
          <select
            className={`${styles.checkoutFormInput}`}
            name="country"
            id="country"
            required="required"
            placeholder="required"
            value={checkoutForm.country.value}
            onChange={(e) =>
              dispatch(checkoutSliceActions.updateCountry(e.target.value))
            }
            onBlur={() => {dispatch(checkoutSliceActions.blurCountry())
            dispatch(checkoutSliceActions.validateForm())}}
          >
            <option value="Canada">Canada</option>
            <option value="USA">USA</option>
            <option disabled value="Other">
              Other
            </option>
          </select>
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor={"provinces"}>{`${
            checkoutForm.country.value === "Canada" ? "Province:" : "State:"
          }`}</label>
          <div>
            <input
              type="text"
              id="provinces"
              value={checkoutForm.state.value}
              onChange={(e) => {
                dispatch(checkoutSliceActions.updateProvinces(e.target.value));
              }}
              onBlur={() => {dispatch(checkoutSliceActions.blurProvinces())
                dispatch(checkoutSliceActions.validateForm())}}
              className={styles.checkoutFormInput}
              type="text"
              required="required"
              placeholder="required"
            />

            {checkoutForm.state.value.length > 0 &&
              checkoutForm.state.blur === false &&
              !checkoutForm.state.valid && <DropdownInputSelector />}
          </div>
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="city">City:</label>
          <div>
            <input
            placeholder="required"
              type="text"
              id="city"
              value={checkoutForm.city.value}
              onChange={(e) => {
                
                dispatch(checkoutSliceActions.updateCity(e.target.value));
              }}
              onBlur={() => {dispatch(checkoutSliceActions.blurCity())
                dispatch(checkoutSliceActions.validateForm())}}
              className={styles.checkoutFormInput}
              type="text"
              required="required"
            />

            {checkoutForm.city.value.length > 0 &&
              checkoutForm.city.blur === false &&
              !checkoutForm.city.valid && <DropdownInputSelectorCity />}
          </div>
        </div>
        {checkoutForm.address.blur && !checkoutForm.address.valid && (
          <p className={styles.fallbackText}>
            Input a valid address
          </p>
        )}
        <div className={styles.inputContainer}>
          <label htmlFor="address">Address:</label>

          <input
            className={`${styles.checkoutFormInput} ${
              checkoutForm.address.blur &&
              !checkoutForm.address.valid &&
              styles.invalid
            }`}
            type="address"
            onChange={ e=> dispatch(checkoutSliceActions.updateAddress(e.target.value)) }
            onBlur={()=> {dispatch(checkoutSliceActions.blurAddress())
              dispatch(checkoutSliceActions.validateForm())}}
            id="address"
            required="required"
            placeholder="required"
            value={checkoutForm.address.value}
          />
        </div>
        {checkoutForm.zipcode.blur && !checkoutForm.zipcode.valid && (
          <p className={styles.fallbackText}>
            Input a valid zip code
          </p>
        )}
        <div className={styles.inputContainer}>
          <label htmlFor="zipcode">Zip Code:</label>

          <input
            className={`${styles.checkoutFormInput} ${
              checkoutForm.zipcode.blur &&
              !checkoutForm.zipcode.valid &&
              styles.invalid
            }`}
            type="zipcode"
            onChange={ e=> dispatch(checkoutSliceActions.updateZip(e.target.value)) }
            onBlur={()=> {dispatch(checkoutSliceActions.blurZip())
              dispatch(checkoutSliceActions.validateForm())}}
            id="zipcode"
            required="required"
            placeholder="required"
            value={checkoutForm.zipcode.value}
          />
        </div>
      </form>
      <Checkout quantity={quantity} />
      <Button disabled={`${formValid ? "" : true}`} className={styles.EMTbutton}>Pay Via EMT</Button>
    </>
  );
};

export default CheckoutForm;
