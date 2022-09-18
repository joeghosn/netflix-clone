import { magicAdmin } from "../../lib/magic-server";

import  Jwt  from "jsonwebtoken";
import { isNewUser, createNewUser } from "../../lib/hasura";
import { setTokenCookie } from "../../lib/cookies";

export default async function login(req,res){
  if(req.method==='POST'){

   


  try{
    const auth=req.headers.authorization;
    const didToken= auth.length!==0? auth.slice(7):'';
    const metaData= await magicAdmin.users.getMetadataByToken(didToken);
    const {issuer,publicAddress,email}=metaData;

    const token=Jwt.sign({
issuer,
publicAddress,
email,
iat: Math.floor(Date.now()/1000),
exp:  Math.floor((Date.now()/1000)+(7*24*60*60)),
"https://hasura.io/jwt/claims": {
    "x-hasura-allowed-roles": [ "user", "admin" ],
    "x-hasura-default-role": "user",
    "x-hasura-user-id": issuer,
    
    
  }


    },process.env.HASURA_SECRET_JWT_KEY);
    
    //Check if user already exists:

    const isNewUserQuery= await isNewUser(token, issuer);
  
 if(!isNewUserQuery){

const createNewUserMutation= await createNewUser(token,issuer,publicAddress, email,);

//set cookie:
const cookie= setTokenCookie(token,res);
res.send({done:true});


 }else{
  //return user
const cookie=setTokenCookie(token, res);



res.send({done:true });


 }


  
 
    

  }

catch(error){
 
res.status(500);
res.send({done:false});


}
  }else{
res.send({done:false})

  }


}
