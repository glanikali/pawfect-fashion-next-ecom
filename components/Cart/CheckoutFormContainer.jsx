import React from "react";
import Checkout from "../Checkout/Checkout";
import { useSelector } from "react-redux";
import Button from "../UI/Button";
import Card from '../UI/Card'
import styles from "./CheckoutFormContainer.module.scss";
import CheckoutForm from "./CheckoutForm";

const CheckoutFormContainer = (props) => {
  
  const handleClick = () => {
    props.changeToInitalState();
  };
  return (
    <>
    
      <Card >
        <div className={styles.checkoutFormHead}>
        <h1>Checkout Form</h1>
        <Button type="button" onClick={handleClick}>
          Back
        </Button>
        </div>
      <CheckoutForm />
      </Card>
    </>
  );
};

export default CheckoutFormContainer;
