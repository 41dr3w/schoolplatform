const mongoose = require("mongoose")
//const { options } = require("../routes")

const Schema = mongoose.Schema

const student = new Schema ({
    
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
        grade:{
            type:String,
            required:true
        },
        dateofbirth:{
            type:Date,
            required:true
        },
        sex:{
            type:String,
            required:true
        },
        nationality:{
            type:String,
            required:true
        },
        relation_InCharge:{
            type:String,
            required:true
        },
        _idInCharge1:[{
            type: Schema.Types.ObjectId, 
            ref: 'InCharge' 
        }],
        _idInCharge2:[{
            type: Schema.Types.ObjectId, 
            ref: 'InCharge' 
        }],
})

const Student = mongoose.model("Student", student)
module.exports = {Student}

