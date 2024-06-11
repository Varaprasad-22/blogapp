//create user api
const exp=require('express');
const authorApp=exp.Router();
const commonapp=require('./commonapi')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const expressAsyncHandler=require('express-async-handler')
const verifyToken=require('../middleware/verifytoken')


//from server.js import
authorApp.get('/author-details',(req,res)=>{
    res.send({message:"this from author api"})
})


//get collections

//article collection

let articlecollection
let authorcollections
authorApp.use((req,res,next)=>{
    authorcollections=req.app.get('authorcollection')
    articlecollection=req.app.get('articlecollection')
    next()
})


//register
authorApp.post('/register',expressAsyncHandler(async(req,res)=>{
    const newAuthor=req.body
    const dbUser= await authorcollections.findOne({userName:newAuthor.userName})
    if(dbUser!==null){
        res.send({message:"user exist"})
    }else{
        const hashedpassword= await bcrypt.hash(newAuthor.password,8)
        newAuthor.password=hashedpassword
        newAuthor.status = true;
        await authorcollections.insertOne(newAuthor)
        res.send({message:"User Created"})
    }
}))


//login
authorApp.post('/login',expressAsyncHandler(async(req,res)=>{
    const newAuthor=req.body
    const dbAuthor=await authorcollections.findOne({userName:newAuthor.userName},{status:true})
    if(dbAuthor===null){
        res.send({message:"author invalid"})
    }else{
        const passwordcheck= await bcrypt.compare(newAuthor.password,dbAuthor.password)
        if(passwordcheck===false){
            res.send({message:"invalid password"})
        }else{
            const ktoken=jwt.sign({userName:dbAuthor.userName},process.env.secretekey,{expiresIn:'1d'})
            res.send({message:"login success",token:ktoken,author:dbAuthor})
        }
    }
}))

//add author articles
authorApp.post('/article',expressAsyncHandler(async(req,res)=>{
    //get article
    const newArticle=req.body;
    //post to article collection
    await articlecollection.insertOne(newArticle)
    res.send({message:"article inserted"})
}))

//modify
authorApp.put('/article',expressAsyncHandler(async(req,res)=>{
    const modifyArticle=req.body;
    console.log(modifyArticle)
    //update
    let result=await articlecollection.updateOne({id:modifyArticle.id},{$set:{...modifyArticle}})
    console.log(result)
    let latestArticle=await articlecollection.findOne({articleId:modifyArticle.id})
    res.send({message:"updated",article:latestArticle})
}))


//delete an article by article ID
authorApp.put('/article/:id',expressAsyncHandler(async(req,res)=>{
    //get articleId from url
    const artileIdFromUrl=(+req.params.id);
    //get article 
    const articleToDelete=req.body;

    if(articleToDelete.status===true){
       let modifiedArt= await articlecollection.findOneAndUpdate({id:artileIdFromUrl},{$set:{...articleToDelete,status:false}},{returnDocument:"after"})
       res.send({message:"deleted",payload:modifiedArt.status})
    }
    if(articleToDelete.status===false){
        let modifiedArt= await articlecollection.findOneAndUpdate({id:artileIdFromUrl},{$set:{...articleToDelete,status:true}},{returnDocument:"after"})
        res.send({message:"restored",payload:modifiedArt.status})
    }
   
   
}))

//view articles
authorApp.get('/view/:username',expressAsyncHandler(async(req,res)=>{
    //get name
    const authorName=req.params.username;

    const articleList=await articlecollection.find({username:authorName}).toArray()
    res.send({message:"articles",payload:articleList})

}))


//export
module.exports=authorApp;