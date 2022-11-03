
const {Student} = require("../models/student")
const {InCharge} = require("../models/incharge")
const { Admins } = require("../models/personal")
const bcrypt = require("bcryptjs")
const axios = require("axios")
const {validationResult} = require("express-validator")
const { default: mongoose, model } = require("mongoose")
const {routinename, Routine} = require("../helpers/routines")
const { response } = require("express")
const { incharge } = require("./personal")
const routine = 0;

const ctrlsistemstu = {

    //post C-reate
    async crearItem(req,res){
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
    },
    async crearSession(req,res){
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
    },
    

    //gets R-ead
    async vistaGeneral(req, res){
        const item = await Student.find()
        res.status(200).json({item})
    },
    async vistaUnitaria(req, res){
        const item = await Student.findById(req.params.id)
        res.status(200).json({item})
    },
    async busquedaUnitaria(req, res){
        const item = await Student.findOne({name: req.params.name})
        res.status(200).json({item})
    },
    async verSession(req,res){
        res.status(200).json(req.session)
    },
    async verCookie(req,res){
        res.json(req.cookies.ItemInSession)
    },
    async savewithHash(req,res){
    let salt = bcrypt.genSaltSync(10)
    let hash = bcrypt.hashSync(req.body.password, salt)
    let comparation = bcrypt.compareSync(req.body.password, hash)
    let comparation2 = bcrypt.compareSync("987654321", hash)
    res.json({hash, comparation, comparation2})
    },
    async routineCheck(req, res){

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
    },

    //put U-pdate
    async editarItem(req, res){
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
    },

    //delete D-elete
    async eliminarItem(req, res){
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
    },
    async cerrarSession(req,res){
        req.session.destroy()
        res.json({msg:"session is close"})
    },
    async eliminarCookie(req, res){
        res.clearCookie("ItemInSession") //cuidado que arriba esta con otro nombre
        res.json({msg:'cookie deleted'})
    },
    async deleteAll(req, res){
    //const colection = mongoose.Collection.collectionName.find(req.params.collectionName)
    const result = await Student.deleteMany({});
        res.status(200).json(`Deleted + ${result.deletedCount} + documents`)
    }
}

const ctrlsisteminc = {

    async deleteAll(req, res){
        //const colection = mongoose.Collection.collectionName.find(req.params.collectionName)
        const result = await InCharge.deleteMany({});
            res.status(200).json(`Deleted + ${result.deletedCount} + documents`)
        }

}

const ctrlsistemadm = {

    async deleteAll(req, res){
        //const colection = mongoose.Collection.collectionName.find(req.params.collectionName)
        const result = await Admins.deleteMany({});
            res.status(200).json(`Deleted + ${result.deletedCount} + documents`)
        }

}

module.exports = {ctrlsistemstu, ctrlsisteminc, ctrlsistemadm}