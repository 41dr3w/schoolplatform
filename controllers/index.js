const {Student} = require("../models/student")
const bcrypt = require("bcryptjs")
const {validationResult} = require("express-validator")
const { default: mongoose } = require("mongoose")

const generalctrl = {

    //get de funciones para buscar deudas/aranceles 
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

module.exports = {generalctrl}