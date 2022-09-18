
import  Jwt  from "jsonwebtoken";
import { findVideoIdByUserId, createVideoIdByUserId, updateStats} from "../../lib/hasura";
import { verifyToken } from "../../utils/utils";

const stats=async(req,res)=>{
    if(req.method==='POST'){
try{

const cookie=req.cookies.token;
if(!cookie){
    res.status(403).send({});
}
else{
   const issuer=await  verifyToken(cookie);
    const {videoId,favourited=null,watched=true}=req.body;

    if(videoId){
        const findVideoById=await findVideoIdByUserId(issuer,videoId,cookie);



        if(findVideoById.length!==0 ){
            //return it
            const updatedVideo= await updateStats(cookie, issuer, videoId, favourited, watched );
            res.send({done:true, message:'video already exists and is updated', findVideoById, updatedVideo, foundVideo});
            console.log({updatedVideo});
            
            
            
            
            }else{
            //create it
            const videoCreated= await createVideoIdByUserId(cookie, issuer, videoId, favourited, watched);
            
           
            res.send({done:true, message:'video does not exist and is created', videoCreated});
            }
            
    }
// const videoId= req.query;








    
}





}catch(error){
    res.send({done:false});
    res.status(500);
}

    }else{

        try{

            const cookie=req.cookies.token;
            if(!cookie){
                res.status(403).send({});
            }
            else{
                const decoded= Jwt.verify(cookie, process.env.HASURA_SECRET_JWT_KEY);
                const {issuer}=decoded;
                const {videoId}=req.query;
            
                if(videoId){
                    const findVideoById=await findVideoIdByUserId(issuer,videoId,cookie);
            
            
            
                    if(findVideoById.length!==0 ){
                        //return it
                        res.send({done:true, findVideoById});
                       
                        
                        
                        
                        
                        }else{
                        //Video not found

                    
                        res.send({done: true, findVideoById:[]});
                        
                        }
                        
                }
           
            
            
            
            
            
            
            
            
                
            }
            
            
            
            
            
            }catch(error){
                res.send({done:false, message:'GET request error'});
                res.status(500);
            }


    }

}

export default stats;