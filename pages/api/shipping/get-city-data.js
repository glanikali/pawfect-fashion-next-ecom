import {getToken} from "../../../firebase/access-token";

const handler = async (req, res) =>{
    const token = await getToken();
    let result;
    const {province} = req.body
    const {country} = req.body
   console.log({province, country});
    try {

        if (country === 'Canada'){
            
            const request = await fetch(`${process.env.FIREBBASE_PATH}/Shipping/Canada/cities/${province.toUpperCase()}.json?access_token=${token.access_token}`, {
                method: "GET",
                headers: {
                    'content-type': 'application/json'
                }
            });
            const data = await request.json();
            result = data;   
        }
    
        if (country === 'USA'){
          
            const request = await fetch(`${process.env.FIREBBASE_PATH}/Shipping/USA/cities/${province.toUpperCase()}.json?access_token=${token.access_token}`, {
                method: "GET",
                headers: {
                    'content-type': 'application/json'
                }
            });
            const data = await request.json();
            result = data;   
        }
    } catch (error) {
        result = error
    }
    res.status(400).json(result)
}

export default handler;