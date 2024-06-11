const exp=require('express')
const commonApp=exp.Router();

commonApp.get('/common',(req,res)=>{
    res.send({message:"this from user"})
})


//export
module.exports=commonApp;
