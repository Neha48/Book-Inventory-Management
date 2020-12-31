'use strict';
var mongoose = require('mongoose');
var schema = mongoose.Schema;
var UserSchema = new schema({
    userId:String,
    password:String,
    role:String
});
const User= mongoose.model('User',UserSchema);
module.exports=User;