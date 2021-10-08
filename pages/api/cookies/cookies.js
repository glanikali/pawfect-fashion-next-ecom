import Cookies from "cookies";

const handler = async(req, res) =>{
const cookies = new Cookies(req, res);
const cart = JSON.parse(cookies.get('cart'))
const user = JSON.parse(cookies.get('user'))

res.status(400).json({
    cart, user
})

}

export default handler;