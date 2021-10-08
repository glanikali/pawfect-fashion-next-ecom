const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const handler = async (req, res) => {
   const {name, email, message} = req.body;
  const msg = {
    to: process.env.ADMIN_EMAIL, // Change to your recipient
    from: process.env.ADMIN_EMAIL, // Change to your verified sender
    subject: `${name} is contacting you`,
    html: `<p>${name}</p><p>${email}</p><p>${message}</p>`,
  };
  sgMail
    .send(msg)
    .then(() => {
        console.log("message sent");
      res.status(200).json(true);
    })
    .catch((error) => {
      console.error(error);
    });

 
};

export default handler;
