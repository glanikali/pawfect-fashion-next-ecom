import Stripe from "stripe";
import { getToken } from "../../../firebase/access-token";

const stripe = new Stripe(`${process.env.STRIPE_SECRET_KEY}`, {
  apiVersion: "2020-08-27",
});

const handler = async (req, res) => {
  const id = req.body;
  const token = await getToken();
  let getData;
  const session = await stripe.checkout.sessions.retrieve(id, {
    expand: ["payment_intent"],
  });
  const directory = session.customer_email.replace(
    /[^a-zA-Z0-9]/g,
    ""
  );
  //db stuff
  //update payment intent PUT
 

      const getPaymentIntent = await fetch(`${process.env.FIREBBASE_PATH}/paymentIntents/${directory}.json?access_token=${token.access_token}`, {
          method: "GET",
          headers:{
              'content-type': 'application/json'
          }
      })
       getData = await getPaymentIntent.json();
      if (getData.id === session.id){
      getData.paymentStatus = session.payment_intent.status}


      if(session.payment_intent.status === "succeeded"){

        const reqOrderNumber = await fetch (`${process.env.FIREBBASE_PATH}/order/orderCounter.json?access_token=${token.access_token}`,
        {
          method: "GET",
          headers:{
            'content-type': 'application/json'
          }
        })

        const orderNumber = await reqOrderNumber.json();
        console.log("order number "+orderNumber);
        const createOrder = await fetch(`${process.env.FIREBBASE_PATH}/order/${session.id}.json?access_token=${token.access_token}`, {
          method: "PUT",
          headers:{
              'content-type': 'application/json'
          },
          body: JSON.stringify({
            receiptSent:false,
            data: getData,
            orderNumber,
          })
      })


      const updateOrderNumber = await fetch (`${process.env.FIREBBASE_PATH}/order/orderCounter.json?access_token=${token.access_token}`,
      {
        method: "PUT",
        headers:{
          'content-type': 'application/json'
        },
        body: JSON.stringify(Number(orderNumber) + 1)
      })


      }
      const updatePaymentIntent = await fetch(`${process.env.FIREBBASE_PATH}/paymentIntents/${directory}.json?access_token=${token.access_token}`, {
        method: "PUT",
        headers:{
            'content-type': 'application/json'
        },
        body: JSON.stringify(getData)
    })

    
   
  
  
  // send back cart info
  res.status(200).json({session, directory, getData});
};

export default handler;
