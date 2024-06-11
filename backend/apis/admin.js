const exp = require('express');
const adminApp = exp.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const expressAsyncHandler = require('express-async-handler');
require("dotenv").config();

let usercollection;
let authorcollection;
let admincollection;
let articlecollection;

// Middleware to get the database collections
adminApp.use((req, res, next) => {
    usercollection = req.app.get('usercollection');
    authorcollection = req.app.get('authorcollection');
    articlecollection = req.app.get('articlecollection');
    admincollection = req.app.get('admincollection');
    next();
});

// Admin signup
adminApp.post('/admin', expressAsyncHandler(async (req, res) => {
    const newAdmin = req.body;
    const dbAdmin = await admincollection.findOne({ userName: newAdmin.userName });

    if (dbAdmin !== null) {
        res.send({ message: "User existed" });
    } else {
        const hashedPass = await bcrypt.hash(newAdmin.password, 8);
        newAdmin.password = hashedPass;
        await admincollection.insertOne(newAdmin);
        res.send({ message: "User Created" });
    }
}));

// Admin signin
adminApp.post('/login', expressAsyncHandler(async (req, res) => {
    const { userName, password } = req.body;
    const dbAdmin = await admincollection.findOne({ userName },{status:true});

    if (dbAdmin !== null) {
        const isPasswordValid = await bcrypt.compare(password, dbAdmin.password);
        if (isPasswordValid) {
            const token = jwt.sign({ userName: dbAdmin.userName }, process.env.secretekey, { expiresIn: '1d' });
            res.send({ message: "login success", token, user: dbAdmin });
        } else {
            res.send({ message: "invalid password" });
        }
    } else {
        res.send({ message: "user not found" });
    }
}));

// Get all users
adminApp.get('/usercollection', expressAsyncHandler(async (req, res) => {
    const users = await usercollection.find({}).toArray();
    res.send({ message: "userslist", payload: users });
}));

// Get all authors
adminApp.get('/authorcollection', expressAsyncHandler(async (req, res) => {
    const authors = await authorcollection.find({}).toArray();
    res.send({ message: "authorlist", payload: authors });
}));

// Delete a user
adminApp.put('/user/:name', expressAsyncHandler(async (req, res) => {
    const userName = req.params.name;
    const body=req.body;
    if(body.status==true){
    const deletedUser = await usercollection.findOneAndUpdate({ userName:userName },{$set:{...body,status:false}},{returnDocument:"after"});
    res.send({ message: "deleted", payload: deletedUser.status});
}if(body.status==false){
    const deletedUser = await usercollection.findOneAndUpdate({  userName:userName },{$set:{...body,status:true}},{returnDocument:"after"});
    res.send({ message: "restored", payload: deletedUser.status});
}
   
}));

// Delete an author
adminApp.put('/author/:name', expressAsyncHandler(async (req, res) => {
    const userName = req.params.name;
    const body=req.body;
    if(body.status==true){
    const deletedAuthor = await authorcollection.findOneAndUpdate({ userName: userName },{$set:{...body,status:false}},{returnDocument:"after"});
    res.send({ message: "deleted", payload: deletedAuthor.status});
}if(body.status==false){
    const deletedAuthor = await authorcollection.findOneAndUpdate({  userName:userName },{$set:{...body,status:true}},{returnDocument:"after"});
    res.send({ message: "restored", payload: deletedAuthor.status});
}
   
}));

// Get all articles
adminApp.get('/articles', expressAsyncHandler(async (req, res) => {
    const articles = await articlecollection.find({ status: true }).toArray();
    res.send({ message: "article", payload: articles });
}));

// Endpoint to verify the API is working
adminApp.get('/admin-detail', (req, res) => {
    res.send({ message: "This is from admin API" });
});

module.exports = adminApp;
