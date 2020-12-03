import jwt from 'jsonwebtoken';
import config from '../config'

export default async(req,res,next)=>{
    console.log("checkToken");
    const token=req.headers['authorization'];
    if(!token){
        return next({
            status:403,
                message:"Forbidden!NO token"
        })
    }

    try{
        var tokenObj=jwt.verify(token,config.secret);
    }catch ({message}) {
        return next({
            status:400,
            message
        })
    }
    req.token=tokenObj;
    next();
}