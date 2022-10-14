const {Student} = require("../models/student")
const {User} = require("../models/user")
const bcrypt = require("bcryptjs")
const axios = require("axios")
const {validationResult} = require("express-validator")
const { default: mongoose } = require("mongoose")
//const generateToken = require("../helpers/generateJWT")


//vistas


//post C-reate
const crearItem = async (req,res) => {
    try {
        const err = validationResult(req)
        if(err.isEmpty()){
            const item = new Student(req.body)
            await item.save()
            res.status(201).json({item})
        }
        else {
            res.status(501).json(err)
        }
    } catch(error) {
        res.status(501).json({error})
    }
}
const crearSession = async (req,res) =>{
    try {
        const err = validationResult(req)
        if(err.isEmpty()){
            const item = new Student(req.body)
            await item.save()
            res.cookie("ItemInSession",item.nationality,{maxAge: 60000})
            req.session.item = item
            res.status(201).json(req.session.item)
            
        }
        else {
            res.status(501).json(err)
        }
    } catch(error) {
        res.status(501).json({error})
    }   
}
const loginUsuario = async (req, res) =>{
    try {
        const err = validationResult(req)
        if(err.isEmpty()){

            const usuario = await User.findOne({email: req.body.email})
        
            if(usuario==null){  //valida si el usuario existe en la base de datos en base a la busqueda anterior atraves del email.
                res.status(201).res.json({msg:"Password or email incorrect"}) //agregar codigo de estado
            }    
            if(!bcrypt.compareSync(req.body.password, usuario.password)){ //compara con la contraseña guardada en la  base dedatos
                res.status(201).res.json({msg:"Password or email incorrect"})
            }

            const user = {
                _id: usuario._id,
                name: usuario.name
            }
            req.session.user = user

            //checkbox           //si el usuario precisa mantener la sesion activa, guarda en cookie la sesion del usuario, para que al cerrar no se cierre
            if(req.body.remember){ //esto es por si se tiene un checkbox seleccionado como true para guardar en sesión usuario y contraseña. es decir, en cookie  
                res.cookie("sessionDelUsuario", req.session.user, {maxAge:60000*60*24})
            }
            res.json({msg:"User Logged"})
        } else {
            res.status(501).json(err)
        }
    } catch(error) {
        res.status(501).json({error})
    }
}


//gets R-ead
const savewithHash = async (req,res) =>{
    let salt = bcrypt.genSaltSync(10)
    let hash = bcrypt.hashSync(req.body.pass, salt)
    let comparation = bcrypt.compareSync(req.body.pass, hash)
    let comparation2 = bcrypt.compareSync("987654321", hash)
    res.json({hash, comparation, comparation2})
}
const consultApi = async (req,res) => { //consume la api de pokemon y la trae 
    try{
        const respuesta = await axios.get("https://pokeapi.co/api/v2/pokemon/ditto")
        res.status(200).json({status: respuesta.status,data:respuesta.data})
    }catch(error){
        res.status(404).json({status: error.response.status, 
                        data:error.response.data})
    }
}
const consultAxios1 = async (req,res) => { //consumir la api propia
    try{
        const respuesta = await axios.get("http://localhost:8080/see")
        res.status(200).json({status: respuesta.status,data:respuesta.data})
    }catch(error){
        res.status(404).json({status: error.response.status, 
                        data:error.response.data})
    }
}
const consultAxios2 = async (req,res) => {  //´usando ruta post con axios, 
    try{
        const respuesta = await axios.post("http://localhost:8080/create",{first_name:req.body.first_name,
                                                                        second_name:req.body.second_name,
                                                                        age:req.body.age,
                                                                        dni:req.body.dni,
                                                                        nationality:req.body.nationality}) //"https://pokeapi.co/api/v2/pokemon/ditto"
        res.status(200).json({status: respuesta.status,data:respuesta.data})
    }catch(error){
        res.status(404).json({status: error.response.status, 
                        data:error.response.data})
    }
}


const vistaGeneral = async (req, res) => {
    const item = await Student.find()
    res.status(200).json({item})
}
const vistaUnitaria = async (req, res) => {
    const item = await Student.findById(req.params.id)
    res.status(200).json({item})
}
const busquedaUnitaria = async (req, res) => {
    const item = await Student.findOne({name: req.params.name})
    res.status(200).json({item})
}
const verSession = async (req,res) =>{
    res.status(200).json(req.session)
}
const verCookie = async (req,res) =>{
    res.json(req.cookies.ItemInSession)
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
            await Student.findByIdAndUpdate(req.params.id, req.body)
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
            item = await Student.findByIdAndDelete(req.params.id)
            res.status(201).json({msg:"student deleted", item})
        } else {
            res.status(501).json(err)
        }
    } catch(error) {
        res.status(501).json({error})
    }
}
const eliminarCookie = async(req, res) => {
    res.clearCookie("ItemInSession") //cuidado que arriba esta con otro nombre
    res.json({msg:'cookie deleted'})
}/*
const logOut = (req, res) => {
    res.clearCookie("sessionDelUsuario") //cuidado que tiene otro nombre arriba
    req.session.destroy()
    res.json({msg:"Session Closed"}) 
}*/
const deleteAll = async(req, res) => {
//const colection = mongoose.Collection.collectionName.find(req.params.collectionName)
const result = await Student.deleteMany({});
    res.status(200).json(`Deleted + ${result.deletedCount} + documents`)
}




module.exports = {/*sendToken,logOut,*/savewithHash,consultApi,consultAxios1,consultAxios2,loginUsuario,eliminarCookie,verCookie,verSession,crearSession,vistaGeneral,crearItem,vistaUnitaria,busquedaUnitaria, editarItem, eliminarItem,cerrarSession,deleteAll}
 