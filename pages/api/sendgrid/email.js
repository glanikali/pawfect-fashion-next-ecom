const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

import { getToken } from "../../../firebase/access-token";

const handler = async (req, res) => {
  let template_id;
  let dynamicTemplateData;
  let isReceiptSent = false;

  const { status, date, items, total, user, id } = req.body;
  const token = await getToken();


 
  if (status === "succeeded") {
    template_id = "d-7c84a447041f4a47867b0aed4fbd7b43";
    const {orderNumber, receiptSent}= await fetch (`${process.env.FIREBBASE_PATH}/order/${id}.json?access_token=${token.access_token}`,{
      headers:{
        'content-type':'application/json',
      },
      method: "GET"
    }).then(result => result.json());

    isReceiptSent = receiptSent;

    dynamicTemplateData = {
      receipt: true,
      total: total,
      name: user.name,
      country: user.country,
      state: user.state,
      zip: user.zipcode,
      order_date: date,
      dateFormat: "YY/MM/DD",
      address: user.address,
      items: items,
      order_number: orderNumber,
    }
  }






if (!isReceiptSent){
  const msg = {
    to: user.email,
    from: process.env.ADMIN_EMAIL,
    templateId: template_id, 
    dynamicTemplateData,
  };
  sgMail
    .send(msg)
    .then((sentMsg) => {
      if (status === "succeeded") {
        fetch(`${process.env.FIREBBASE_PATH}/order/${id}/receiptSent.json?access_token=${token.access_token}`, {
          headers:{
            'content-type':'application/json'
          },
          method: "PUT",
          body: JSON.stringify(true)
        }).then(res=> console.log("Message Sent"))
      }
        
    })
    .catch((err) => console.log(err.response.body));
}
  


if (!isReceiptSent){
  const msg = {
    to: process.env.ADMIN_EMAIL,
    from: process.env.ADMIN_EMAIL,
    templateId: template_id, 
    dynamicTemplateData,
  };
  sgMail
    .send(msg)
    .then((sentMsg) => {
      if (status === "succeeded") {
        fetch(`${process.env.FIREBBASE_PATH}/order/${id}/receiptSent.json?access_token=${token.access_token}`, {
          headers:{
            'content-type':'application/json'
          },
          method: "PUT",
          body: JSON.stringify(true)
        }).then(res=> console.log("Message Sent"))
      }
        
    })
    .catch((err) => console.log(err.response.body));
}
  

res.status(200).json({ message: "server working" });
};

export default handler;
