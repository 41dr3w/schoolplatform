const {Student} = require("../models/student")
const {User} = require("../models/user")
const bcrypt = require("bcryptjs")
const {validationResult} = require("express-validator")
const { default: mongoose } = require("mongoose")
//const generateToken = require("../helpers/generateJWT")

//vistas

//post C-reate
const crearItem = async (req,res) => {
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
const savewithHash = async (req,res) =>{
    let salt = bcrypt.genSaltSync(10)
    let hash = bcrypt.hashSync(req.body.password, salt)
    let comparation = bcrypt.compareSync(req.body.password, hash)
    let comparation2 = bcrypt.compareSync("987654321", hash)
    res.json({hash, comparation, comparation2})
}
const crearSession = async (req,res) =>{
    try {
        const err = validationResult(req)
        if(err.isEmpty()){
            const preuser = new User(req.body)
            await preuser.save()
            const user = {
                _id: preuser._id,
                name: preuser.name
            }    
            req.session.user = user
            res.cookie("PreuserInSession",req.session.user,{maxAge:60000*60*24})
            res.status(201).json(req.session.user)
        }
        else {
            res.status(501).json(err)
        }
    } catch(error) {
        res.status(501).json({error})
    }   
}
const loginUsuario = async (req,res) =>{
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
/*const loginToken = async (req, res) =>{
    try {
        const err = validationResult(req)
        if(err.isEmpty()){

            const usuario = await User.findOne({email: req.body.email})
            res.status(201).json({msg:"product updated"})
        
            if(usuario==null){  //valida si el usuario existe en la base de datos.
                res.json({msg:"Contraseña o Email Incorrectos"}) //agregar codigo de estado
            }    
            
            if(bcrypt.compareSync(req.body.password, usuario.password)){ //compara con la contraseña guardada en la  base dedatos
                res.json({msg: "Contraseña o Email Incorrectos"})
            }

            const token = await generateToken({id:usuario_id,email:_email})
                _id: usuario._id,
                name: usuario.name
            }
            req.session.user = user

            //checkbox           //si el usuario precisa mantener la sesion activa, guarda en cookie la sesion del usuario, para que al cerrar no se cierre
            if(req.body.remember){ //esto es por si se tiene un checkbox  
                res.cookie("sessionDelUsuario",req.session.user, {maxAge:60000*60*24})
            }
            res.json({email: req.body.email,token})
        } else {
            res.status(501).json(err)
        }
    } catch(error) {
        res.json({error})
    }
}*/



//gets R-ead
const vistaGeneral = async (req, res) => {
    const user = await User.find()
    res.status(200).json({user})
}
const vistaUnitaria = async (req, res) => {
    const user = await User.findById(req.params.id)
    res.status(200).json({user})
}
const busquedaUnitaria = async (req, res) => {
    const user = await User.findOne({name:req.params.name})
    res.status(200).json({user})
}
const verSession = async (req,res) =>{
    res.status(200).json(req.session.user)
}
const verCookie = async (req,res) =>{
    res.json(req.cookies.UserInSession, req.cookies.PreuserInSession)
}
//jwt
/*const sendToken = async (req,res) =>{
    const token = await generateToken(req.body)
}*/




//put U-pdate
const editarItem = async(req, res) => {
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
const cerrarSession = async (req,res) =>{
    req.session.destroy()
    res.json({msg:"session is close"})
}
const eliminarItem = async(req, res) => {
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
const eliminarCookie = async(req, res) => {
    res.clearCookie("PreuserInSession") 
    res.json({msg:'cookie deleted'})
}
const deleteAll = async(req, res) => {
//const colection = mongoose.Collection.collectionName.find(req.params.collectionName)
const result = await User.deleteMany({});
    res.status(200).json(`Deleted + ${result.deletedCount} + documents`)
}
const logOut = (req, res) => {
    res.clearCookie("UserInSession") //cuidado que tiene otro nombre arriba
    req.session.destroy()
    res.json({msg:"Session Closed"}) 
}




module.exports = {loginUsuario,eliminarCookie,verCookie,verSession,crearSession,vistaGeneral,crearItem,vistaUnitaria,busquedaUnitaria, editarItem, eliminarItem,cerrarSession,deleteAll}
 