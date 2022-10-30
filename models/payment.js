const mongoose = require("mongoose")

const Schema = mongoose.Schema

const payannualstu = new Schema ({

    year:{
        type:String,
        required:true
    },
    _idmouth1:{
        type:String,
        required:true
    },
    _idmouth2:{
        type:String,
        required:true
    },
    _idmouth3:{
        type:String,
        required:true
    },
    _idmouth4:{
        type:String,
        required:true
    },
    _idmouth5:{
        type:String,
        required:true
    },
    _idmouth6:{
        type:String,
        required:true
    },
    _idmouth7:{
        type:String,
        required:true
    },
    _idmouth8:{
        type:String,
        required:true
    },
    _idmouth9:{
        type:String,
        required:true
    },
    _idmouth10:{
        type:String,
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
