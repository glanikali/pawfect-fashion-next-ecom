import React, { useState } from "react";
import { useSelector } from "react-redux";
import Button from "../UI/Button";
import Card from "../UI/Card";
import Checkout from "../Checkout/Checkout";
import styles from "./CartCheckout.module.scss";
import CheckoutFormContainer from './CheckoutFormContainer'

const CartCheckout = (props) => {
  const [checkoutState, setCheckoutState] = useState("initial");
  const checkoutObj = useSelector((state) => state.checkoutReducer);
  


  const toShipping = () =>{
      setCheckoutState("shipping")
  }

  const toInitial = () =>{
      setCheckoutState("initial")
  }
  const { total, quantity } = useSelector((state) => state.cartReducer);
  return (
    <div className={styles.sticky}>
    {checkoutState === "initial" && (
        <>
      <Card>
        <h2 style={{ fontSize: "1.9rem" }}>Cart Total</h2>
        <h3>Total: ${total}</h3>
        <h3>Quantity: {quantity}</h3>
      </Card>
      
        <Card className={styles.buttonContainer}>
          <Button type="button" onClick={toShipping} >Checkout</Button>
        </Card>
        </>
      )}
      {checkoutState === "shipping" && <CheckoutFormContainer  changeToInitalState={toInitial}/>}
    </div>
  );
};

export default CartCheckout;
