const {Student} = require("../models/student")
const bcrypt = require("bcryptjs")
const {validationResult} = require("express-validator")
const { default: mongoose } = require("mongoose")


const controllers = {

    //post C-reate
    async crearEstudiante(req,res){
        try {

            const err = validationResult(req)
            if(err.isEmpty()){
                let salt = bcrypt.genSaltSync(10)
                let hash = bcrypt.hashSync(req.body.password,salt)
                const user = new Student({first_name:req.body.first_name,
                                        second_name:req.body.second_name,
                                        dni:req.body.dni,
                                        age:req.body.age,
                                        nationality: req.body.nationality,
                                        email:req.body.email,
                                        password:hash})
                await user.save()
                res.status(201).json({user})
            }
            else {
                res.status(501).json(err)
            }
        } catch(error) {
            res.status(501).json({error})
        }
    },
    async loginEstudiante(req,res){
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

    //gets R-ead
    async verEstudiantes(req, res){
        const user = await Student.find()
        res.status(200).json({user})
    },
    async verEstudiante(req, res){
        const user = await Student.findById(req.params.id)
        res.status(200).json({user})
    },
    async busquedaEstudiante(req, res){
        const user = await Student.findOne({second_name:req.params.name})
        res.status(200).json({user})
    },

    //put U-pdate
    async editarEstudiante(req, res){
        try {
            const err = validationResult(req)
            if(err.isEmpty()){
                await Student.findByIdAndUpdate(req.params.id,{first_name:req.body.first_name,
                                                            second_name:req.body.second_name,
                                                            age:req.body.age,
                                                            dni:req.body.dni,
                                                            nationality: req.body.nationality,
                                                            email:req.body.email,
                                                            password:password})
                res.status(201).json({msg:"info updated"})
            } else {
                res.status(501).json(err)
            }
        } catch(error) {
            res.status(501).json({error})
        }
    },

    //delete D-elete
    async eliminarEstudiante(req, res){
        try {
            const err = validationResult(req)
            if(err.isEmpty()){
                user = await Student.findByIdAndDelete(req.params.id)
                res.status(201).json({msg:"student deleted", user})
            } else {
                res.status(501).json(err)
            }
        } catch(error) {
            res.status(501).json({error})
        }
    },
    logoutEstudiante(req, res){
        res.clearCookie("UserInSession") //cuidado que tiene otro nombre arriba
        req.session.destroy()
        res.json({msg:"Session Closed"}) 
    }
}

module.exports = {controllers}
