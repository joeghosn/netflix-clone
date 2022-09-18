import Jwt  from "jsonwebtoken";

export async function verifyToken(token){
if(token){
    const decoded= Jwt.verify(token, process.env.HASURA_SECRET_JWT_KEY);
    const {issuer}=decoded;
    return issuer;
}else{
    return null;
}

}