const mongoose = require("mongoose")

const Schema = mongoose.Schema

const paymonthstu = new Schema ({

    month:{
        type:String,
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
    _idtariff:{
        type:String,
        required:true
    },
    _idtariff_head:{
        type:String,
        require:true
    }
})

const payannualstu = new Schema ({

    month:{
        type:String,
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
    _idtariff:{
        type:String,
        required:true
    },
    _idtariff_head:{
        type:String,
        require:true
    }
})

const PayMonthStu = mongoose.model("PayMonthStu", paymonthstu)
const PayAnnualStu = mongoose.model("PayAnnualStu", payannualstu)
module.exports = {PayAnnualStu,PayMonthStu}
