const mongoose = require("mongoose")
const { PayMonthStu } = require("./paymtMonth")
const { Student } = require("./student")
const Schema = mongoose.Schema

const payannualstu = new Schema ({

    year:{
        type:String,
        required:true
    },
    _idmonth:[{
            type: Schema.Types.ObjectId,
            ref: "PayMonthStu"
        },
        {
            type: Schema.Types.ObjectId,
            ref: "PayMonthStu"
        },
        {
            type: Schema.Types.ObjectId,
            ref: "PayMonthStu"
        },
        {
            type: Schema.Types.ObjectId,
            ref: "PayMonthStu"
        },
        {
            type: Schema.Types.ObjectId,
            ref: "PayMonthStu"
        },
        {
            type: Schema.Types.ObjectId,
            ref: "PayMonthStu"
        },
        {
            type: Schema.Types.ObjectId,
            ref: "PayMonthStu"
        },
        {
            type: Schema.Types.ObjectId,
            ref: "PayMonthStu"
        },
        {
            type: Schema.Types.ObjectId,
            ref: "PayMonthStu"
        },
        {
            type: Schema.Types.ObjectId,
            ref: "PayMonthStu"
        },
    ],
    _idstudent:[{
        type: Schema.Types.ObjectId,
        ref: Student
    }]
})

const PayAnnualStu = mongoose.model("PayAnnualStu", payannualstu)
module.exports = {PayAnnualStu}
