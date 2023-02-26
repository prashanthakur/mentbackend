const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
    type:String,
    required:true
    },
    email:{
        type:String,
        required:true,
    },
    message:String
})

module.exports = mongoose.model("Ca",userSchema)