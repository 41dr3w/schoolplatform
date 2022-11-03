const mongoose = require("mongoose")

const Schema = mongoose.Schema

const admins = new Schema ({

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
        type:String,
        enum:["male","female"],
        required:true
    },
    sector:{
        type:String,
        enum:["cobranzas","administrativo","secretaria","direccion"],
        required:true
    },
    phonenumber:{
        type:Number,
        required:true
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

const Admins = mongoose.model("Admins", admins)
module.exports = {Admins}
