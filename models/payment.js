const mongoose = require("mongoose")
const { Student } = require("./student")
const Schema = mongoose.Schema


const monthpaid = new Schema({
    paid:{
        type:Boolean,
        default:false,
        required:true
    },
    quota_number:{
        type:Number,
        required:true
    },
    quota_value:{
        type:Number,
        required:true
    }
})

const paymentstu = new Schema ({

    year:{
        type:String,
        required:true
    },
    months:[monthpaid],
    _idstudent:[{
        type: Schema.Types.ObjectId,
        ref: Student
    }]
})

const PaymentStu = mongoose.model("PaymentStu", paymentstu)
module.exports = {PaymentStu}
