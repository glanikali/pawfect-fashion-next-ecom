import { getToken } from "../../../firebase/access-token";
import Cookies from 'cookies'

const handler = async (req, res) => {
  const token = await getToken();
  const {cartInfo, strippedCustomerInfo, id} = req.body;
  const cookies = new Cookies(req, res)
  const directory = req.body.strippedCustomerInfo.email.replace(
    /[^a-zA-Z0-9]/g,
    ""
  );
  let result;
  // console.log( `${env.process.FIREBBASE_PATH}/${directory}.json?access_token=${token.access_token}`);

  const request = await fetch(
    `${process.env.FIREBBASE_PATH}/paymentIntents/${directory}.json?access_token=${token.access_token}`,
    {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        cart: cartInfo,
        user: strippedCustomerInfo,
        date: new Date().toISOString(),
        paymentStatus: "processing",
        id,
      }),
    }
  );
  const request2 = await fetch(
    `${process.env.FIREBBASE_PATH}/addtocart/${directory}.json?access_token=${token.access_token}`,
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        cart: cartInfo,
        user: strippedCustomerInfo,
        date: new Date().toISOString(),
        id,
      }),
    }
  );

  cookies.set('cart', JSON.stringify(cartInfo),{
    httpOnly: true
  })

  cookies.set('user', JSON.stringify(strippedCustomerInfo),{
    httpOnly: true
  })



  res.status(400).json({});
};

export default handler;

// let result;
// console.log(req.body);
// const userDirectory = req.body.strippedCustomerInfo.email.replace(/[^a-zA-Z0-9]/g, "");
// console.log(userDirectory);

// console.log("in server");

// //add payment intent to db
// const req = await fetch(`${env.process.FIREBBASE_PATH}/${userDirectory}.json?access_token=${token.access_token}`, {
//   method: "POST",
//   headers: {
//     'content-type': 'application/json'
//   },
//   body: JSON.stringify({
//     cart: req.body.cartInfo,
//     user: req.body.strippedCustomerInfo,
//   })
// })

// const data = req.json();
// console.log("data");
// console.log(data)
// result = data;

// res.status(200).json(result)
