const {Student} = require("../models/student")
const {PaymentStu} = require("../models/payment") 
//const {MonthPaid} = require("../models/payment") 
const { InCharge } = require("../models/incharge")
const {validationResult} = require("express-validator")
const { default: mongoose } = require("mongoose")


//colecciones sobre deudas/aranceles mensuales y anuales
const payment = {

    //funciones para crear personal estudiantil
    //post C-reate
    async create(req,res){
        try {

            //nodes:[{id:req.body.nodes.id}],

            const err = validationResult(req)
            if(err.isEmpty()){

                const payment = new PaymentStu(req.body)
                await payment.save()
                res.status(201).json({payment})
            }
            else {
                res.status(501).json(err)
            }
        }catch(error) {
            res.status(501).json({error})
        }
    },

    //get //funciones para tomar personal estudiantil info 
    async seeAll(req, res){
    const payment = await PaymentStu.find()
    res.status(200).json({payment})
    },
    async seeOne(req, res){
    const payment= await PaymentStu.findById(req.params.id)
    res.status(200).json({payment})
    },
    async search(req, res){//arreglar problema de que lo encuentra pero lo muestra como nulo, o status 202 result null
        const payment = await PaymentStu.findOne({month})
    res.status(200).json({payment})
    },

    //put U-pdate
    async edit(req, res){
    try {
        const err = validationResult(req)
        if(err.isEmpty()){
            await PaymentStu.findByIdAndUpdate(req.params.id,{
                "year":req.body.year,
                "months":[{
                "paid":req.body.paid,
                "quota_number":req.body.quota_number,
                "quota_value":req.body.quota_value,
                }],
                "_idstudent":req.body._idstudent
            })
            res.status(201).json({msg:"info updated"})
        } else {
            res.status(501).json(err)
        }
    } catch(error) {
        res.status(501).json({error})
    }
    },

    //delete D-elete
    async delete(req, res){
    try {
        const err = validationResult(req)
        if(err.isEmpty()){
            payment = await PaymentStu.findByIdAndDelete(req.params.id)
            res.status(201).json({msg:"paid month deleted", payment})
        } else {
            res.status(501).json(err)
        }
    }catch(error){
        res.status(501).json({error})
    }
    },

}

//-------------------------------------------------------------

//get de funciones para buscar los alumnos pertenecientes a un mismo padre

const adminctrl = {

    async studentsOf(req, res){
        const students = await Student.find({_idInCharge:req.params.id})
        const incharge = await InCharge.findById(req.params.id)
        res.status(200).json({incharge,students})
    },
    
    async debtOfMonth(req, res){   
        const student_paymonth = await PaymentStu.find({_idstudent:req.params.id, month:req.params.month},`${req.params.info}`) 
        res.status(200).json({student_paymonth})  
    },

    async debtOfMonths(req, res){  
        const student_paymonth = await PaymentStu.find({_idstudent:req.params.id},`${req.params.info}`) 
        res.status(200).json({student_paymonth})  
    }
    
}

//-------------------------------------------------------------

const generalctrl = {
    
    // para los padres encargados de los alumnos y el personal administrativo
    //gets R-ead

    //funciones post para el login y logout para los padres encargados de los alumnos y el personal administrativo
   /* async login(req,res){
        try {
            const err = validationResult(req)
            if(err.isEmpty()){
                const usuario = await Student.findOne({email:req.body.email})
            
            if(usuario === null||!bcrypt.compareSync(req.body.password, usuario.password)){
                res.json({msg:"Mail o Contraseña incorrecta"})
                }

                const user = {
                    _id: usuario._id,
                    dni: usuario.dni
                }    
                req.session.user = user

                if(req.body.remember){
                        res.cookie("UserInSession",req.session.user,{maxAge:60000*60*24}) //SIGUE ACA, VER COMO MODIFICAR VER SESSION Y VER COOKIES PARA VER EL LOGIN
                    }
        
                res.json({msg:"usuario logeado", user})
            }
        } catch(error){
        res.status(505)
        }
    },

    logout(req, res){
        res.clearCookie("UserInSession") //cuidado que tiene otro nombre arriba
        req.session.destroy()
        res.json({msg:"Session Closed"}) 
    }*/

}

module.exports = {payment,generalctrl,adminctrl}