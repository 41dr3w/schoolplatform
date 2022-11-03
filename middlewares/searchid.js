const {Student} = require("../models/student")
const {InCharge} = require("../models/incharge")
const {PayAnnualStu} = require("../models/payment")
const {PayMonthStu} = require("../models/payment")

const searchidinc = async (req,res,next)=>{
    const item = await InCharge.findById(req.body._idInCharge1)/*||req.body._idInCharge2)*/
    if(item != null){
        next();
    } else {
        res.json({msg:"id invalido"})
    }
}

const searchidpas = async (req,res,next)=>{
    const item = await Student.findById(req.body._idstudent)/*||anotheroption)*/
    if(item != null){
        next();
    } else {
        res.json({msg:"id invalido"})
    }
}

const searchidpms = async (req,res,next)=>{
    const item = await PayAnnualStu.findById(req.body._idmonth)/*||anotheroption)*/
    if(item != null){
        next();
    } else {
        res.json({msg:"id invalido"})
    }
}

module.exports = {searchidpas,searchidpms,searchidinc}