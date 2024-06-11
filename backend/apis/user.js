//create user api
const exp=require('express');
const userApp=exp.Router();
const commonapp=require('./commonapi')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const expressAsyncHandler=require('express-async-handler')
const verifyToken=require('../middleware/verifytoken')
require("dotenv").config();

let usercollection;
let articlecollection;
let authorcollection;
//get user collection
userApp.use((req,res,next)=>{
    usercollection=req.app.get('usercollection')
    articlecollection=req.app.get('articlecollection')
    authorcollection=req.app.get('authorcollection')
    next()
})


// //for getting input from server.js
// userApp.get('/user-detail',(req,res)=>{
//     res.send({message:"Ths from user api"})
// }) 

userApp.post('/user',expressAsyncHandler(async(req,res)=>{
    //get user from client
   const newUser=req.body
   //check for duplicates
   const dbUser=await usercollection.findOne({userName:newUser.userName})
   if(dbUser!==null){
   //if conditions
    res.send({message:"User existed"})
   }
   else{
    //hash pasword
    //replace plain with hash pasword
    //create user import bcrypt
    const hashedpass=await bcrypt.hash(newUser.password,8)
    newUser.password=hashedpass;
    //create user
    newUser.status = true;
    await usercollection.insertOne(newUser)
    //send res
    res.send({message:"User Created"});
   }
}))


//user login
userApp.post('/login',expressAsyncHandler(async(req,res)=>{
    //get from client
    const x=req.body
    //check for unique user
    const y=await usercollection.findOne({userName:x.userName},{status:true})
    //if condition
    if(y!==null){
        //check for password
        const status=await bcrypt.compare(x.password,y.password)
        if(status===false){
        res.send({message:"invalid password"})
        }else{
        const stoken=jwt.sign({userName:y.userName},process.env.secretekey,{expiresIn:'1d'})
        res.send({message:"login success",token:stoken,user:y})
        }
    }else{
        res.send({message:"user not found"})
    }
}))

//get articles of all users
userApp.get('/articles',expressAsyncHandler(async(req,res)=>{

    //get all articles
    let articles=await articlecollection.find({status:true}).toArray()
    let activeArticles = [];
    for (let article of articles) {
        let author = await authorcollection.findOne({ userName: article.username });
        if (author&&author.status === true) {
            activeArticles.push(article);
        }
    }

    res.send({ message: "Articles retrieved", payload: activeArticles });
}));

//comments
//article id ,username,comment data
// Comments route
userApp.post('/comment/:id', expressAsyncHandler(async (req, res) => {
    // Get the comment data from the request body
    const comment = req.body;
    const articleId = +req.params.id;
  
    // Update the article document with the new comment
    const result = await articlecollection.updateOne(
      { id: articleId },
      { $addToSet: { comments: comment } }
    );
  
    console.log(result);
  
    // Check if the comment was added successfully
    if (result.modifiedCount > 0) {
      res.send({ message: "comment added successfully" });
    } else {
      res.send({ message: "comment not added, article not found" });
    }
  }));

//export
module.exports=userApp;