const {Student} = require("../models/student")
const {InCharge} = require("../models/incharge")
const {PayAnnualStu} = require("../models/payment")
const {PayMonthStu} = require("../models/payment")

const validaridstu = async (req,res,next)=>{
    const item = await Student.findById(req.params.id)
    if(item != null){
        next();
    } else {
        res.json({msg:"id invalido"})
    }
}

const validaridinc = async (req,res,next)=>{
    const item = await InCharge.findById(req.params.id)
    if(item != null){
        next();
    } else {
        res.json({msg:"id invalido"})
    }
}    

const validaridpas = async (req,res,next)=>{
    const item = await PayAnnualStu.findById(req.params.id)
    if(item != null){
        next();
    } else {
        res.json({msg:"id invalido"})
    }
}    

const validaridpms = async (req,res,next)=>{
    const item = await PayMonthStu.findById(req.params.id)
    if(item != null){
        next();
    } else {
        res.json({msg:"id invalido"})
    }
}    

module.exports = {validaridpas,validaridpms,validaridstu,validaridinc}
