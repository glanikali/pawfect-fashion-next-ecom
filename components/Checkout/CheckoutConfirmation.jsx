import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Bandana from "../../assets/UI/Bandana";
import styles from "./CheckoutConfirmation.module.scss";
import Link from 'next/link'
import Button from "../UI/Button";
import { useRouter } from "next/router";
import { cartSliceActions } from "../../store/cart";

const CheckoutConfirmation = (props) => {
  const { cart, quantity, total } = useSelector((state) => state.cartReducer);
  const formField = useSelector(state => state.checkoutReducer.form.formField)
  const router = useRouter();
  const dispatch = useDispatch();
  
  const handleClick = () =>{
      dispatch(cartSliceActions.clearCart())
      router.replace("/")
  }
  return (
    <>
      <h1 style={{textAlign: "center"}}>Thank you for your order.</h1>
      <p style={{ textAlign: "center" }}>
        Please confirm the order below. Get in touch if you have any questions.</p>
        <p style={{ textAlign: "center" }}><a href="mailto:hello@pawfectfashion.com">hello@pawfectfashion.com</a></p>
      <div className={styles.bandanaContainer}>
        {cart.map((el) => {
          return (
            <Bandana
             width="300" 
              mediaURL={el.mediaURL}
              customText={el.customText}
              id={el.id}
              key={Math.random()}
            />
          );
        })}
      </div>
      <div className={styles.cartInfoContainer}>
        <div className={styles.cartInfoInner}>
          <h2>Quantity:</h2>
          <p>{quantity}</p>
        </div>
        <div className={styles.cartInfoInner}>
          <h2>Total:</h2>
          <p>${total}</p>
        </div>
      </div>
      <div style={{width: "100%", marginBottom:"1em"}}>
          <h2 style={{marginBottom:".5em", textAlign:'center'}}>Shipping Info</h2>
        <p><strong>Email:</strong> {formField.email.value}</p>
        <p><strong>Country:</strong> {formField.country.value}</p>
        <p><strong>Province/State:</strong> {formField.state.value}</p>
        <p><strong>City:</strong> {formField.city.value}</p>
        <p><strong>Address:</strong> {formField.address.value}</p>
        <p><strong>Zipcode:</strong> {formField.zipcode.value}</p>
      </div>
        <Button className={styles.button}onClick={handleClick}>Confirm</Button>
    </>
  );
};

export default CheckoutConfirmation;
