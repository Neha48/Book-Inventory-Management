const express=require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const fs = require("fs")
const multer = require('multer');
const path = require('path')
var Book = require('./Book.model');
var User = require('./User.model');
var dbUrl = 'mongodb://localhost/Books';
mongoose.connect(dbUrl);//,{useNewUrlParser: true,useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error',console.error.bind(console,"connection error"));
db.once('open',()=>console.log("connected"));

var storage = multer.diskStorage({
    destination:'./uploads',
    filename:(req,file,cb)=>{cb(null,file.fieldname+'_'+Date.now()+path.extname(file.originalname));
    console.log(file)}
});
var uploads=multer({storage:storage});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
// app.use();
app.use(express.static('public'));
app.listen(8000,function(){
    console.log("started on port");
});

app.get('/',(req,res)=>{
    res.send("hi");
})
app.get('/api/users',(req,res)=>{
    // console.log(req.query.id)
    User.find({$and:[{userId:req.query.id},{password:req.query.psw}]},{role:1}).exec(function(err,data){
        if(err)
            res.send(err);
        if(data)
            res.send(data);
        console.log(data)
    });
})
app.post('/api/user',(req,res)=>{
    var u = new User();
    u.userId=req.body.id;
    u.password=req.body.psw;
    u.role=req.body.role;
    u.save((err,success)=>{
        if(err)
            console.log(err);
        if(success)
            res.send(success);
    })
})
app.get('/api/getBooks',(req,res)=>{
    res.header("Access-Control-Allow-Origin","*");
        res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
    Book.find().exec(function(err,data){
        // res.contentType('jpg');
        if(err)
            res.send(err);
        if(data)
            res.json(data);
    })
})
app.post("/api/saveBooks",uploads.single('cover'),function(req,res){
    console.log(req.body);
    var b= new Book();
    b.title=req.body.title;
    b.author=req.body.author;
    b.publisher=req.body.publisher;
    b.category=req.body.category;
    b.isbn=req.body.isbn;
    b.price=req.body.price;
    b.copies=req.body.copies;
    b.cover.data=new Buffer(fs.readFileSync(path.join(__dirname+'/uploads/'+req.file.filename).toString('base64')))
    b.cover.contentType=req.file.mimetype;
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
    // console.log(b.cover.data);
    b.save((err,succ)=>{
        if(err)
            res.send(err);
        else
            res.send(succ);
    })
})
app.get("/api/books",function(req,res){
    res.contentType('base64')
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
    if(req.query.category!=undefined && req.query.category!="" )
        Book.find(req.query).exec(function(e,d){
            // console.log(req.query.category)
            if(e)
                res.send("Error");
            else
                res.send(d);
        });
    else{
        Book.find({$text:{$search:req.query.title}}).exec((e,d)=>{
            // console.log("title"+req.query.title);
            if(e)
                res.send("Error");
            else{
                res.send(d);                
            }
        });
    }
})
app.put("/api/updateCopies",function(req,res){
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Methods", "GET,DELETE,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
    Book.findOneAndUpdate({_id:req.body.id},{$set:{copies:req.body.newcopies}},{upsert:true},
        function(err,data){
            if(err)
                res.send(err);
            else
                res.send(data);
        });
});
app.put("/api/updatePrice",function(req,res){
    console.log(req.body.price)
    Book.findOneAndUpdate({_id:req.body.id},{$set:{price:req.body.price}},{upsert:true},
        function(err,data){
            if(err)
                res.send(err);
            else
                res.send(data);
        });
});
app.delete('/api/deleteBooks',(req,res)=>{
    console.log(req.query.id)
    Book.findOneAndDelete({_id:req.query.id},function(err,data){
        if(err)
            res.send(err);
        else
            res.send(data);
    });
});
app.get('/api/download',(req,res)=>{
    console.log(req.query.title);
    var path="./uploads/"+req.query.title.toString()+".pdf";
    console.log(path)
    res.download(path, req.query.title+".pdf", (err) => {
        if (err) {
          res.status(500).send({
            message: "Could not download the file. " + err,
          });
        //   res.status(200).sendFile(path);
        }
    });
})