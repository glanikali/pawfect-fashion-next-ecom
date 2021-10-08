import {getToken} from "../../../firebase/access-token";
const handler = async (req, res) => {
  const token = await getToken();

  let result;
  let array = [];
  let array2 = [];
  
  try {
    //fetch provinces
    const request = await fetch(
      `${process.env.FIREBBASE_PATH}/Shipping/Canada/provinces.json?access_token=${token.access_token}`,
      { method: "GET", headers: { "content-type": "application/json" } }
    );
    const data = await request.json();
   

    for (const key in data) {
      array.push(...data[key]);
    }

    // fetch states
    const req2 = await fetch(`${process.env.FIREBBASE_PATH}/Shipping/USA/States.json?access_token=${token.access_token}`, {method: "GET", headers:{'content-type': 'application/json'}})

    const data2 = await req2.json();
    
    for (const key in data2) {
        array2.push(...data2[key]);
      }

    //combine results
    result = { provinces: array, states: array2 };
    
  } catch (error) {
    result = error;
  }
  res.status(400).json(result);
};

export default handler;
