import React from "react";

import Card from "../../components/UI/Card";
import { useSelector, useDispatch } from "react-redux";
import Bandana from "../../assets/UI/Bandana";
import styles from "./CartPage.module.scss";
import Button from "../../components/UI/Button";
import { useRouter } from "next/router";
import CartItem from "../../components/Cart/CartItem";
import CartCheckout from "../../components/Cart/CartCheckout";
import { checkoutSliceActions } from "../../store/checkout";

const Cart = (props) => {
  const { cart, quantity, total } = useSelector((state) => state.cartReducer);
  

 
  const dispatch = useDispatch();
  dispatch(checkoutSliceActions.setProvinces(props.provinces))
  dispatch(checkoutSliceActions.setStates(props.states))
 
  const router = useRouter();
  const clickHandler = (props) => {
    router.replace("/");
  };

  if (cart.length === 0) {
    return (
      <>
        <Card className={styles.emptyCartContainer}>
          <h2>Your bag is empty</h2>
          <Button onClick={clickHandler}>Build a Bandana</Button>
        </Card>
      </>
    );
  }

  return (
    <>
      <div className={styles.cartContainer}>
        <Card>
          <h1>My Bag</h1>
          <div className={styles.cartItem}>
           
              {cart.map((el) => {
                return (
                  <CartItem
                    key={Math.random()}
                    mediaURL={el.mediaURL}
                    customText={el.customText}
                    id={el.id}
                    item={el}
                  />
                );
              })}
            
          </div>
        </Card>
        <Card>
          <CartCheckout />
        </Card>
      </div>
    </>
  );
};

export default Cart;


export const getServerSideProps = async (context) =>{ 
  let result;
  let httpProtocol; 
  if (context.req.headers.host.includes("localhost")){
    httpProtocol = 'http';
  }
  else{
    httpProtocol = 'https';
  }
  try {
    const req = await fetch(`${httpProtocol}://${context.req.headers.host}/api/shipping/get-geo-data`, {
      method: "GET",
      headers:{
        'content-type': 'application/json'
      }
    })
    result = await req.json();
  } catch (error) {
    result = error;
  }
  
  
  return {props: result}};