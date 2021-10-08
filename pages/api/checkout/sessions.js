import Stripe from "stripe";

const freeShippingAreas= ['toronto', 'markham', 'scarborough', 'stouffville']
const stripe = new Stripe(
  `${process.env.STRIPE_SECRET_KEY}`,
  {
    apiVersion: "2020-08-27",
  }
);
export default async function handler(req, res) {
 
  const data = req.body;
  const {quantity,city, state, country} = data;
  let shippingRate;

  if(country.toLowerCase() === "usa"){
    shippingRate = process.env.STRIPE_INTERNATIONAL_SHIPPING;
  }

  if(country.toLowerCase() === 'canada' && state.toLowerCase() === 'ontario' && freeShippingAreas.some(el=> el === city.toLowerCase())){
    shippingRate = process.env.STRIPE_FREE_SHIPPING;
  }
  else{
    shippingRate = process.env.STRIPE_NATIONAL_SHIPPING;
  }


  if (req.method === "POST") {
    try {



      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create({
        customer_email: req.body.email,
        shipping_rates: [`${shippingRate}`],
        shipping_address_collection: {
        allowed_countries: ['US', 'CA']},
        line_items: [
          {
            // TODO: replace this with the `price` of the product you want to sell
            price: "price_1JVYR4KFpTMj81WgrqUFFZ8D",
            quantity
          },
        ],
        payment_method_types: ["card"],
        mode: "payment",
        success_url: `${req.headers.origin}/checkout?success=true&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/checkout?canceled=true`,
      });

      res.status(200).json(session);
    } catch (err) {
      res.status(err.statusCode || 500).json(err);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}

// import Stripe from "stripe";
// const stripe = new Stripe(process.env.STRIPE_SECERT_KEY);

// const handler = async (req, res) => {
//   const { quantity } = req.body;
//   console.log(quantity);
//   const session = await stripe.checkout.sessions
//     .create({
//       line_items: [
//         {
//           // TODO: replace this with the `price` of the product you want to sell
//           price: 1000,
//           quantity,
//         },
//       ],
//       payment_method_types: ["card"],
//       mode: "payment",
//       success_url: `${req.headers.origin}/?success=true&session_id={CHECKOUT_SESSION_ID}`,
//       cancel_url: `${req.headers.origin}/?canceled=true`,
//     })
//     .catch((err) => {
//       JSON.stringify(err);
//     });
//   res.status(400).json({ session });
// };

// export default handler;
