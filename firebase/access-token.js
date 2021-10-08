const {google} = require("googleapis");


//open client
const scopes = [
  "https://www.googleapis.com/auth/userinfo.email",
  "https://www.googleapis.com/auth/firebase.database"
];
 

const jwtClient = new google.auth.JWT(
  process.env.FIREBASE_CLIENT_EMAIL,
  null,
  process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/gm, '\n'),
  scopes
);

//make token
export const getToken = async () =>{
  
  // Use the JWT client to generate an access token.
  return new Promise((resolve, reject) => jwtClient.authorize((err, tokens) => {
    if (err)
      reject(err) // <-- reject the error
    else
      resolve(tokens) // <-- resolve the result
  })
)
}



