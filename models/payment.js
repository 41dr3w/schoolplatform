const mongoose = require("mongoose")

const Schema = mongoose.Schema

const payannualstu = new Schema ({

    year:{
        type:String,
        required:true
    },
    _idmonth1:{
        type:String,
        required:true
    },
    _idmonth2:{
        type:String,
        required:true
    },
    _idmonth3:{
        type:String,
        required:true
    },
    _idmonth4:{
        type:String,
        required:true
    },
    _idmonth5:{
        type:String,
        required:true
    },
    _idmonth6:{
        type:String,
        required:true
    },
    _idmonth7:{
        type:String,
        required:true
    },
    _idmonth8:{
        type:String,
        required:true
    },
    _idmonth9:{
        type:String,
        required:true
    },
    _idmonth10:{
        type:String,
        required:true
    },
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
