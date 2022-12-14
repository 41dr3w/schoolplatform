const {Student} = require("../models/student")
const {InCharge} = require("../models/incharge")
const {PaymentStu} = require("../models/payment")
const { Admins } = require("../models/personal")

const validaridstu = async (req,res,next)=>{
    const item = await Student.findById(req.params.id)
    if(item != null){
        next();
    } else {
        res.json({msg:"id del estudiante invalido"})
    }
}

const validaridinc = async (req,res,next)=>{
    const item = await InCharge.findById(req.params.id)
    if(item != null){
        next();
    } else {
        res.json({msg:"id del responsable invalido"})
    }
}    

const validaridpmt = async (req,res,next)=>{
    const item = await PaymentStu.findById(req.params.id)
    if(item != null){
        next();
    } else {
        res.json({msg:"id de pago invalido"})
    }
}    

const validaridadm = async (req,res,next)=>{
    const item = await Admins.findById(req.params.id)
    if(item != null){
        next();
    } else {
        res.json({msg:"id de admin invalido"})
    }
    next();
}  


module.exports = {validaridpmt,validaridstu,validaridinc,validaridadm}
