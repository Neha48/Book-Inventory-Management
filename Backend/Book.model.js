'use strict';
var mongoose = require('mongoose');
var schema = mongoose.Schema;
var BookSchema = new schema({
    title:String,
    author:String,
    publisher:String,
    category:String,
    isbn:{type:String,unique:true},
    price:Number,
    copies:Number,
    cover:{data:Buffer,contentType:String}
    // keywords:Array,
    // author:{
    //     type:Schema.ObjectId, //Another schema
    //     ref:User                //reference
    // },
    // detail:{
    //     modelNo:Number,
    //     hardcover:Boolean,
    //     reviews:Number,
    //     rank:Number
    // }
});
const Book= mongoose.model('Book',BookSchema);
module.exports=Book;