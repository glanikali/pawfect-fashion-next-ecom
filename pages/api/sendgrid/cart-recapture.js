const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const handler = async (req, res) => {
  const { name, email } = req.body;

  const msg = {
    to: email,
    from: process.env.ADMIN_EMAIL,
    templateId: "d-3a73aac6e1f540bb916dcaaf64b11529",
    dynamicTemplateData: {
      name,
      shopURL: req.headers.origin,
    },
  };
  sgMail
    .send(msg)
    .then((sentMsg) => {
      res.status(200);
    })
    .catch((err) => console.log(err.response.body));
  res.status(200).json({ message: "server working" });
};

export default handler;
