const mongoose = require("mongoose")

const Schema = mongoose.Schema

const payannualstu = new Schema ({

    year:{
        type:String,
        required:true
    },
    _idmonth:[{
            type:String,
            required:true
        },
        {
            type:String,
            required:true
        },
        {
            type:String,
            required:true
        },
        {
            type:String,
            required:true
        },
        {
            type:String,
            required:true
        },
        {
            type:String,
            required:true
        },
        {
            type:String,
            required:true
        },
        {
            type:String,
            required:true
        },
        {
            type:String,
            required:true
        },
        {
            type:String,
            required:true
        },
    ],
    _idstudent:{
        type:String,
        required:true
    }
})

const paymonthstu = new Schema ({

    month:{
        type:String,
        required:true
    },
    paid:{
        type:Boolean,
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
    _idstudent:{
        type:String,
        required:true
    },
    _idtariff_head:{
        type:String,
        required:true
    }
})

const PayMonthStu = mongoose.model("PayMonthStu", paymonthstu)
const PayAnnualStu = mongoose.model("PayAnnualStu", payannualstu)
module.exports = {PayAnnualStu,PayMonthStu}
