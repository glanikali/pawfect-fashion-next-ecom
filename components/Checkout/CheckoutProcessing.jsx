import React, { useEffect } from "react";
import Spinner from "../UI/Spinner";
import { useDispatch } from "react-redux";
import { cartSliceActions } from "../../store/cart";
import { checkoutSliceActions } from "../../store/checkout";
import { useRouter } from "next/router";

const CheckoutProcessing = (props) => {
  const dispatch = useDispatch();

  const router = useRouter();
  const { retry } = router.query;
  useEffect(() => {
    const fetchCookies = async () => {
      const req = await fetch("/api/cookies/cookies", {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      });
      const data = await req.json();

      const {
        address,
        city,
        country,
        email,
        name,
        phoneNumber,
        state,
        zipcode,
      } = data.user;


      const sendCartEmail = await fetch("/api/sendgrid/cart-recapture", {
        method: "POST", 
        headers:{
          'content-type':'application/json'
        },
        body:JSON.stringify({
          name,
          email
        })
      })

      dispatch(
        cartSliceActions.updateFromFetch({
          cart: data.cart.cart,
          quantity: data.cart.quantity,
          total: data.cart.total,
        })
      );
      dispatch(
        checkoutSliceActions.updateFromFetch({
          address,
          city,
          country,
          email,
          name,
          phoneNumber,
          state,
          zipcode,
        })
      );

      router.replace("/cart");
    };

    fetchCookies();
  }, []);

  return (
    <>
      <h2>{props.title}</h2>
      <Spinner />
      {}
    </>
  );
};

export default CheckoutProcessing;
