const {Student} = require("../models/student")
const {User} = require("../models/user")
const bcrypt = require("bcryptjs")
const axios = require("axios")
const {validationResult} = require("express-validator")
const { default: mongoose } = require("mongoose")
const {routinename, Routine} = require("../helpers/routines")
const { response } = require("express")
const routine = 0;
//const generateToken = require("../helpers/generateJWT")

//vistas

//post C-reate
const crearItem = async (req,res) => {
    try {
        const err = validationResult(req)
        if(err.isEmpty()){
            const item = new User(req.body)
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
            const item = new User(req.body)
            await item.save()
            res.cookie("ItemInSession",item,{maxAge: 60000})
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
    let hash = bcrypt.hashSync(req.body.password, salt)
    let comparation = bcrypt.compareSync(req.body.password, hash)
    let comparation2 = bcrypt.compareSync("987654321", hash)
    res.json({hash, comparation, comparation2})
}
const quoteAPI = async (req,res) => { //consume la api de pokemon y la trae 
    try{
        const respuesta = await axios.get("https://frasedeldia.azurewebsites.net/api/phrase")
        res.status(200).json({status: respuesta.status,data:respuesta.data})
    }catch(error){
        res.status(404).json({status: error.response.status,data:error.response.data})
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
        const respuesta = await axios.post("http://localhost:8080/create",{ name:req.body.name,
                                                                            email:req.body.email,
                                                                            password:req.body.password}) //"https://pokeapi.co/api/v2/pokemon/ditto"
        res.status(200).json({status: respuesta.status,data:respuesta.data})
    }catch(error){
        res.status(404).json({status: error.response.status, 
                        data:error.response.data})
    }
}


const vistaGeneral = async (req, res) => {
    const item = await User.find()
    res.status(200).json({item})
}
const vistaUnitaria = async (req, res) => {
    try {
        const item = await User.findById(req.params.id)
        res.status(200).json({item})
    } catch (error) {
        res.status().json({item})
    }
}
const busquedaUnitaria = async (req, res) => {
    const item = await User.findOne({name: req.params.name})
    if (item !== null) {res.status(200).json({item})} 
    else {res.status(404).json({msg:"search not found"})}
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
            item = await User.findByIdAndDelete(req.params.id)
            res.status(201).json({msg:"User deleted", item})
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
const result = await User.deleteMany({});
    res.status(200).json(`Deleted + ${result.deletedCount} + documents`)
}

//se prueba todos los endpoint del server para corroborar su funcionamiento.

const routineCheck = async(req, res) => {

    const user = {
        name: 'nombre',
        email: 'nombre@gmail.com',
        password: '123456789',
        id:''
    }

    const routines = []
    
    Promise.allSettled([
        axios.post("http://localhost:8080/create",{
            name:user.name,
            email:user.email,
            password:user.password
          }),
        axios.get(`http://localhost:8080/search/${user.name}`).then(value=>user.id=value.data.item._id), //AVERIGUAR COMO CONSEGUIR UN RESULTADO INMEDIATO
        axios.get(`http://localhost:8080/see/${user.id}`),
        axios.get(`http://localhost:8080/delete/${user.id}`),
        axios.post("http://localhost:8080/createsession",{user}),
        axios.get("http://localhost:8080/seesession"),
        axios.delete("http://localhost:8080/delete/session"),
        axios.get("http://localhost:8080/seecookie"),
        axios.get("http://localhost:8080/seesession"),
        axios.delete("http://localhost:8080/deletecookie"),
        axios.get("http://localhost:8080/seecookie")
          
    ])

        .then(values => {        
            values.forEach((value,index) => {
                routines.push(new Routine(routinename[index], 
                value.status=="fulfilled"? "routine succesful" : "routine failure",
                value.status=="fulfilled"? value.value.statusText : value.reason.code,
                value.status=="fulfilled"? value.value.status : value.reason.message))//CONTINUAR CON DISCRIMINACION DE VALORES         
            })
           res.json({msg:"routineCheck succesfully",routines})
           //console.log(values[2])
        })
 
      
     /*
 /////REACOMODAR LOS CHECKS PARA EL MODELO DE ESTUDIANTE PARA QUE AL SER EL MERGE SEA UN POCO MAS FACIL!!


/*
router.post('/create',[check("name").not().isEmpty().withMessage("please fill the name"),
                        check("email").not().isEmpty().withMessage("please fill the email").isEmail().withMessage("please enter a truly email"),
                        check("password").not().isEmpty().withMessage("please fill the dni")
],crearItem)
router.post('/createsession',[check("first_name").not().isEmpty().withMessage("please fill the name"),
                              check("second_name").not().isEmpty().withMessage("please fill the age"),
                              check("dni").not().isEmpty().withMessage("please fill the dni"),  
                              check("age").not().isEmpty().withMessage("please fill the dni"),  
                              check("nationality").not().isEmpty().withMessage("please fill the nationality"),  
],crearSession)
router.get('/search/:name',busquedaUnitaria)
router.get('/see/:id',validar,vistaUnitaria)
router.get('/seesession',auth,verSession) // auth (middleware) 
router.get('/seecookie',verCookie)
router.put('/edit/:id',validar,[check("first_name").not().isEmpty().withMessage("please fill the name"),
                                check("second_name").not().isEmpty().withMessage("please fill the age"),
                                check("dni").not().isEmpty().withMessage("please fill the dni"),  
                                check("age").not().isEmpty().withMessage("please fill the dni"),  
                                check("nationality").not().isEmpty().withMessage("please fill the nationality"),
],editarItem)
router.delete('/delete/session',cerrarSession)
router.get('/seesession',auth,verSession) // auth (middleware) 
router.delete('/deletecookie',eliminarCookie)
router.get('/seecookie',verCookie)
router.delete('/delete/:id',validar,eliminarItem)
*/

}

module.exports = {/*sendToken,logOut,*/
                savewithHash,
                quoteAPI,
                consultAxios1,
                consultAxios2,
                loginUsuario,
                eliminarCookie,
                verCookie,
                verSession,
                crearSession,
                vistaGeneral,
                crearItem,
                vistaUnitaria,
                busquedaUnitaria, 
                editarItem, 
                eliminarItem,
                cerrarSession,
                deleteAll,
                routineCheck}
 