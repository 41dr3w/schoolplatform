const mongoose = require("mongoose")

const Schema = mongoose.Schema

const incharge = new Schema ({

    parent_relation:{
        type:String,
        required:true
    },
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
    sex:{
        type:"String",
        enum:["male","female"],
        required:true
    },
    nationality:{
        type:String,
        required:true
    },
    address:{
        type:String,
        require:true
    },
    city:{
        type:String,
        require:true
    },
    postalcode:{
        type:String,
        require:true
    },
    phonenumber:{
        type:Number,
        require:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const InCharge = mongoose.model("Incharge", incharge)
module.exports = {InCharge}
