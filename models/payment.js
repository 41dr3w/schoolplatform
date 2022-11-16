const mongoose = require("mongoose")
const { Student } = require("./student")
const Schema = mongoose.Schema


const paymentstu = new Schema ({
    year:{
        type:String,
        required:true
    },
    months:[{
        month:{
            type:String,
            required:false
        },
        quota_number:{
            type:String, 
            required:false
        },
        quota_value:{
            type:String,
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