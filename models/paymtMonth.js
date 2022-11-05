const mongoose = require("mongoose")
const { PayAnnualStu } = require("./paymtAnnual")
const { Student } = require("./student")
const Schema = mongoose.Schema

const paymonthstu = new Schema ({

    month:{
        type:String,
        required:true
    },
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
    },
    _idstudent:[{
        type: Schema.Types.ObjectId,
        ref: Student
    }],
    _idtariff_head:[{
        type: Schema.Types.ObjectId,
        ref: PayAnnualStu
    }]

})

const PayMonthStu = mongoose.model("PayMonthStu", paymonthstu)
module.exports = {PayMonthStu}

