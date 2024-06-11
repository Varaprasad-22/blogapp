const jwt=require('jsonwebtoken')
require('dotenv').config()

function verifyToken(req,res,nest){
    //get bearer token from header of req
    //client send token to verify
    const bearerToken=req.headers.authorization;
    //if token not found
    if(!bearerToken){
        return res.send({message:"unauthorized access.plzz login"})
    }
     //extract token
     const token=bearerToken.split(' ')[1]
     try{
        jwt.verify(token,process.env.secretekey)
     }catch(err){
        next(err)
     }
}

module.exports=verifyToken