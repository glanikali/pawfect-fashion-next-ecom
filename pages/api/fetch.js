// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getToken } from "../../firebase/access-token";

const handler = async (req, res) => {
  const token = await getToken();

  if (req.body.type === "FETCH_PRODUCTS") {
    try {

      const request = await fetch(
        `${process.env.FIREBASE_PRODUCTS}?access_token=${token.access_token}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await request.json();

      let result = [];

      for (const key in data) {
        result.push({
          id: key,
          color: data[key].color,
          img: data[key].img,
        });
      }

      res.status(500).json(result);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  } else {
    res.status(500).json({ message: "not handled" });
  }
};

export default handler;
