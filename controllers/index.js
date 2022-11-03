const {Student} = require("../models/student")
const {PayMonthStu,PayAnnualStu} = require("../models/payment") 
const bcrypt = require("bcryptjs")
const {validationResult} = require("express-validator")
const { default: mongoose } = require("mongoose")
const { incharge } = require("./personal")
const { InCharge } = require("../models/incharge")


//colecciones sobre deudas/aranceles mensuales y anuales
const payMonth = {

    //funciones para crear personal estudiantil
    //post C-reate
    async create(req,res){
    try {

        const err = validationResult(req)
        if(err.isEmpty()){
            const paymonth = new PayMonthStu({
                "month":req.body.month,
                "paid":req.body.paid,
                "quota_number":req.body.quota_number,
                "quota_value":req.body.quota_value,
                "_idstudent":req.body._idstudent, 
                "_idtariff_head":req.body._idtariff_head 
            }) /*password:hash*/
            await paymonth.save()
            res.status(201).json({paymonth})
        }
        else {
            res.status(501).json(err)
        }
    } catch(error) {
        res.status(501).json({error})
    }
    },

    //get //funciones para tomar personal estudiantil info 
    async seeAll(req, res){
    const paymonth = await PayMonthStu.find()
    res.status(200).json({paymonth})
    },
    async seeOne(req, res){
    const paymonth= await PayMonthStu.findById(req.params.id)
    res.status(200).json({paymonth})
    },
    async search(req, res){//arreglar problema de que lo encuentra pero lo muestra como nulo, o status 202 result null
        const paymonth = await PayMonthStu.findOne({month:req.params.month})
    res.status(200).json({paymonth})
    },

    //put U-pdate
    async edit(req, res){
    try {
        const err = validationResult(req)
        if(err.isEmpty()){
            await PayMonthStu.findByIdAndUpdate(req.params.id,{
                "month":req.body.month,
                "paid":req.body.paid,
                "quota_number":req.body.quota_number,
                "quota_value":req.body.quota_value,
                "_idstudent":req.body._idstudent, 
                "_idtariff_head":req.body._idtariff_head
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
            paymonth = await PayMonthStu.findByIdAndDelete(req.params.id)
            res.status(201).json({msg:"paid month deleted", paymonth})
        } else {
            res.status(501).json(err)
        }
    }catch(error){
        res.status(501).json({error})
    }
    },

}

const payYear = {
    //funciones para crear personal estudiantil
    //post C-reate
    async create(req,res){
        try {
            const err = validationResult(req)
            if(err.isEmpty()){
                const payyear = new PayAnnualStu({
                    "year":req.body.year,
                    "_idmonth1":req.body._idmonth1,
                    "_idmonth2":req.body._idmonth2,
                    "_idmonth3":req.body._idmonth3,
                    "_idmonth4":req.body._idmonth4,
                    "_idmonth5":req.body._idmonth5,
                    "_idmonth6":req.body._idmonth6,
                    "_idmonth7":req.body._idmonth7,
                    "_idmonth8":req.body._idmonth8,
                    "_idmonth9":req.body._idmonth9,
                    "_idmonth10":req.body._idmonth10,
                    "_idstudent":req.body._idstudent 
                }) 

                await payyear.save()
                res.status(201).json({payyear})
            }
            else {
                res.status(501).json(err)
            }
        } catch(error) {
            res.status(501).json({error})
        }
    },

    //get //funciones para tomar personal estudiantil info 
    async seeAll(req, res){
    const payyears = await PayAnnualStu.find()
    res.status(200).json({payyears})
    },
    async seeOne(req, res){
    const payyear= await PayAnnualStu.findById(req.params.id)
    res.status(200).json({payyear})
    },
    async search(req, res){
        const payyear = await PayAnnualStu.findOne({year:req.params.year})
    res.status(200).json({payyear})
    },

    //put U-pdate
    async edit(req, res){
    try {
        const err = validationResult(req)
        if(err.isEmpty()){
            await PayAnnualStu.findByIdAndUpdate(req.params.id,{
                    "year":req.body.year,
                    "_idmonth1":req.body._idmonth1,
                    "_idmonth2":req.body._idmonth2,
                    "_idmonth3":req.body._idmonth3,
                    "_idmonth4":req.body._idmonth4,
                    "_idmonth5":req.body._idmonth5,
                    "_idmonth6":req.body._idmonth6,
                    "_idmonth7":req.body._idmonth7,
                    "_idmonth8":req.body._idmonth8,
                    "_idmonth9":req.body._idmonth9,
                    "_idmonth10":req.body._idmonth10,
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
    async delete(req, res){   //REVISAR PORQUE FUNCIONA CUANDO SE BORRA UN FICHERO PERO ANUNCIA ERROR. CUANDO EN REALIDAD FUNCIONA BIEN
    
        try {
            const err = validationResult(req)
            if(err.isEmpty()){
                payyear = await PayAnnualStu.findByIdAndDelete(req.params.id)
                res.status(201).json({msg:"payyear deleted", payyear})
            } else {
                res.status(501).json(payyear)
            }
        }catch(error){
            //res.status(501).json({error})
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
    }

}

//-------------------------------------------------------------

const generalctrl = {
    
    // para los padres encargados de los alumnos y el personal administrativo
    //gets R-ead





    //funciones post para el login y logout para los padres encargados de los alumnos y el personal administrativo
    async login(req,res){
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
    }

}

module.exports = {payMonth,payYear,generalctrl,adminctrl}