const {Student} = require("../models/student")
const {User} = require("../models/user")
const bcrypt = require("bcryptjs")
const {validationResult} = require("express-validator")
const { default: mongoose } = require("mongoose")


//vistas


//post C-reate
const crearEstudiante = async (req,res) => {
    try {

        const err = validationResult(req)
        if(err.isEmpty()){
            let salt = bcrypt.genSaltSync(10)
            let hash = bcrypt.hashSync(req.body.password,salt)
            const user = new User({name:req.body.name,email:req.body.email,password:hash})
            await user.save()
            res.status(201).json({user})
        }
        else {
            res.status(501).json(err)
        }
    } catch(error) {
        res.status(501).json({error})
    }
}
const loginEstudiante = async (req,res) =>{
    try {
        const err = validationResult(req)
        if(err.isEmpty()){
            const usuario = await User.findOne({email:req.body.email})
            
           if(usuario === null){
               res.json({msg:"Mail o Contraseña incorrecta"})
            }

            if(!bcrypt.compareSync(req.body.password,usuario.password)){ 
                res.json({msg:"Mail o Contraseña incorrecta"})
            }
               
            const user = {
                _id: usuario._id,
                name: usuario.name
            }    
            req.session.user = user
            if(req.body.remember){
                res.cookie("UserInSession",req.session.user,{maxAge:60000*60*24}) //SIGUE ACA, VER COMO MODIFICAR VER SESSION Y VER COOKIES PARA VER EL LOGIN
            }
            res.json({msg:"usuario logeado", user})
        }
        else {
            res.status(501).json(err)
        }
    } catch (error) {
        res.status(501).json(error)
    }
}

//gets R-ead
const verEstudiantes = async (req, res) => {
    const user = await User.find()
    res.status(200).json({user})
}
const verEstudiante = async (req, res) => {
    const user = await User.findById(req.params.id)
    res.status(200).json({user})
}
const busquedaEstudiante = async (req, res) => {
    const user = await User.findOne({name:req.params.name})
    res.status(200).json({user})
}


//put U-pdate
const editarEstudiante = async(req, res) => {
    try {
        const err = validationResult(req)
        if(err.isEmpty()){
            await User.findByIdAndUpdate(req.params.id, req.body)
            res.status(201).json({msg:"info updated"})
        }
        else {
            res.status(501).json(err)
        }
    } catch(error) {
        res.status(501).json({error})
    }
}

//delete D-elete
const eliminarEstudiante = async(req, res) => {
    try {
        const err = validationResult(req)
        if(err.isEmpty()){
            user = await User.findByIdAndDelete(req.params.id)
            res.status(201).json({msg:"student deleted", user})
        } else {
            res.status(501).json(err)
        }
    } catch(error) {
        res.status(501).json({error})
    }
}
const logoutEstudiante = (req, res) => {
    res.clearCookie("UserInSession") //cuidado que tiene otro nombre arriba
    req.session.destroy()
    res.json({msg:"Session Closed"}) 
}



module.exports = {
                 logoutEstudiante,   
                 loginEstudiante,
                 verEstudiantes,
                 crearEstudiante,
                 verEstudiante,
                 busquedaEstudiante, 
                 editarEstudiante, 
                 eliminarEstudiante
                }
 