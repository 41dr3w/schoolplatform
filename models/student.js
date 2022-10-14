const mongoose = require("mongoose")

const Schema = mongoose.Schema

const student = new Schema ({
    
        first_name:{
            type:String,
            required:true
        },
        second_name:{
            type:String,
            required:true
        },
        age:{
            type:Number,
            required:true
        },
        dni:{
            type:Number,
            required:true
        },
        nationality:{
            type:String,
            required:true
        }
})

const Student = mongoose.model("Student", student)
module.exports = {Student}

