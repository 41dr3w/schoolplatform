const mongoose = require("mongoose")
const { Student } = require("./student")
const Schema = mongoose.Schema


const paymentstu = new Schema ({
    year:{
        type:Number,
        required:true
    },
    months:[{
        month:{
            type:String,
            required:false
        },
        quota_number:{
            type:Number, 
            required:false
        },
        quota_value:{
            type:Number,
            required:false
        }
    }],
    _idstudent:{
        type: Schema.Types.ObjectId,
        ref: Student
    }
})

const PaymentStu = mongoose.model("PaymentStu", paymentstu)
module.exports = {PaymentStu}