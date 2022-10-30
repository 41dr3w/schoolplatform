const mongoose = require("mongoose")

const Schema = mongoose.Schema

const admin = new Schema ({

    first_name:{
        type:String,
        required:true
    },
    last_name:{
        type:String,
        required:true
    },
    dni:{
        type:Number,
        required:true
    },
    dateofbirth:{
        type:Date,
        required:true
    },
    sector:{
        type:String,
        require:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
})

const InCharge = mongoose.model("Incharge", incharge)
module.exports = {InCharge}