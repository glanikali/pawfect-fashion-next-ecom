// This is your Stripe CLI webhook secret for testing your endpoint locally.


const handler = async (request, response) => {
  const sig = request.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(request.body, sig, process.env.STRIPE_ENDPOINT_SECERT);
  } catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }
  let paymentIntent;

  // Handle the event
  switch (event.type) {
    case "payment_intent.canceled":
      paymentIntent = event.data.object;
      // Then define and call a function to handle the event payment_intent.canceled
      break;
    case "payment_intent.payment_failed":
      paymentIntent = event.data.object;
      // Then define and call a function to handle the event payment_intent.payment_failed
      break;
    case "payment_intent.succeeded":
      paymentIntent = event.data.object;
      // Then define and call a function to handle the event payment_intent.succeeded
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  console.log(paymentIntent);
  response.status(200).json({ message: "hello" });
};

export default handler;
