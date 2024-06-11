const exp=require('express')
const app=exp();
require('dotenv').config()//process env variables
const mongoclient=require('mongodb').MongoClient;
const path=require('path')

//connect bac and front
app.use(exp.static(path.join(__dirname,'../client/blog-app/build')))

//parse body of request req.body defining
app.use(exp.json())


//db connection

mongoclient.connect(process.env.dburl)
.then(client=>{
    //get db
    const blogdb=client.db('blogApp');
    //get collection obj
    const usercollection=blogdb.collection('usercollection');
    const articlecollection=blogdb.collection('articlecollection');
    const authorcollection=blogdb.collection('authorcollection');
    const admincollection=blogdb.collection('admincollection');
    //share collection with express application
    app.set('usercollection',usercollection);
    app.set('articlecollection',articlecollection);
    app.set('authorcollection',authorcollection);
    app.set('admincollection',admincollection);
    //confirm connection
    console.log("db connection success");

})
.catch(err=>console.log("err in db connection",err))



//import off api
const userApp=require('./apis/user')
const authorApp=require('./apis/author')
const adminApp=require('./apis/admin')

//middleware
//if path starts with user api send to user
app.use('/user-api',userApp)
//if path starts with admin send to admin api;
app.use('/admin-api',adminApp);
//if path starts with author user author
app.use('/author-api',authorApp)



app.use((req,res,next)=>{
    res.sendFile(path.join(__dirname,'../client/blog-app/build/index.html'));
})

//error handler
app.use((err,req,res,next)=>{
    res.send({message:"error",payload:err.message})
})


//assign port number
const port=process.env.PORT||5000;
app.listen(port,()=>console.log(`server on port ${port}`))