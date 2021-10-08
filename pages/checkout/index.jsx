import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { checkoutSliceActions } from "../../store/checkout";
import { cartSliceActions } from "../../store/cart";
import Modal from "../../components/UI/Modal";
import CheckoutProcessing from "../../components/Checkout/CheckoutProcessing";
import ModalLayout from "../../components/UI/ModalLayout";
import CartItem from "../../components/Cart/CartItem";
import CheckoutConfirmation from "../../components/Checkout/CheckoutConfirmation";

export default function PreviewPage(props) {
  const router = useRouter();
  const { session_id } = router.query;
  const { canceled } = router.query;
  const {retry} = router.query;
  const dispatch = useDispatch();
  const [paymentStatus, setPaymentStatus] = useState("loading");
  const {cart, quantity, total} = useSelector(state => state.cartReducer)
  console.log(cart, quantity, total);
  

  useEffect(() => {
    const checkStatus = async () => {
      const req = await fetch("/api/checkout/check-status", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(session_id),
      });
      const data = await req.json();
      console.log("check status: ");
      console.log(data);

      const paymentStatus = data.session.payment_intent.status;
      console.log({paymentStatus});
      const {
        address,
        city,
        country,
        email,
        name,
        phoneNumber,
        state,
        zipcode,
      } = data.getData.user;

      dispatch(
        cartSliceActions.updateFromFetch({
          cart: data.getData.cart.cart,
          quantity: data.getData.cart.quantity,
          total: data.getData.cart.total,
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

      if (paymentStatus === "succeeded") {
        setPaymentStatus(true);

        const sendSucceededEmail = await fetch('/api/sendgrid/email', {
          method: "POST",
          headers:{
            'content-type': 'application/json'
          },
       
          body:JSON.stringify({
            status: 'succeeded',
            date: new Date().toISOString(),
            items: data.getData.cart.cart,
            total:data.getData.cart.total,
            quantity: data.getData.cart.quantity,
            user:data.getData.user,
            id: data.session.id,
          })
        })
       
      }     
    };
    if (session_id) {
      checkStatus();
    }
    else{
      setPaymentStatus(false);
      console.log("payment set to false");
    }
  }, [session_id, canceled]);

  return (
    <>
      {!paymentStatus && (
        <Modal selector="#modal">
          <ModalLayout>
            {paymentStatus === "processing" && (
              <CheckoutProcessing title="Processing your payment. Thank you for waiting!" />
            )}
            {canceled && <CheckoutProcessing title="Cancelling your payment..." />}
            {retry && <CheckoutProcessing title="Heading to cart..." />} 
          </ModalLayout>
        </Modal>
      )}
      {paymentStatus === true && <CheckoutConfirmation />}
    </>
  );
}

// map cart from json
// show customer info
//show success or failed
