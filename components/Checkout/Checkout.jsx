import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import Button from "../../components/UI/Button";
import styles from "./CheckoutButton.module.scss"
import { useSelector } from "react-redux";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const Checkout = (props) => {
const cartInfo = useSelector(state => state.cartReducer);
const customerInfo = useSelector(state => state.checkoutReducer.form.formField);
const formValid = useSelector(state=> state.checkoutReducer.form.formStatus.valid)


const submitHandler = async (e) => {
    e.preventDefault();
    let strippedCustomerInfo = {};
    for (const key in customerInfo){
      strippedCustomerInfo[key] = customerInfo[key].value
      
    }
   

    
 

    const request = await fetch("/api/checkout/sessions", {
      method: "POST",
      body: JSON.stringify({
        quantity: props.quantity,
        price: 10000,
        email: strippedCustomerInfo.email,
        country: strippedCustomerInfo.country,
        state: strippedCustomerInfo.state,
        city: strippedCustomerInfo.city
      }),
      headers: {
          'content-type': 'application/json'
      }
    });
    const data = await request.json();
    const stripe = await stripePromise;



    const reqPaymentIntent = await fetch("/api/checkout/add-payment-intent",{
      method:"POST",
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        cartInfo,
        strippedCustomerInfo,
        id: data.id
      })
    })
    const resPaymentIntent = await reqPaymentIntent.json();

    const requestCheckout = await stripe.redirectToCheckout({
      sessionId: data.id,
    });

    const data2 = await requestCheckout.json();

  
  };
  return (
    <form action="submit" onSubmit={submitHandler.bind(this)}>

        <Button disabled={`${formValid ? "" : true}`} className={styles.checkoutButton} type="submit" role="link">
          Checkout
        </Button>
    </form>

  );
}


export default Checkout;


