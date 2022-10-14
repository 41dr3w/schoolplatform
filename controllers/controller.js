const {Student} = require("../models/student")
const {User} = require("../models/user")
const bcrypt = require("bcryptjs")
const {validationResult} = require("express-validator")
const { default: mongoose } = require("mongoose")


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



//gets R-ead
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
}




module.exports = {eliminarCookie,verCookie,verSession,crearSession,vistaGeneral,crearItem,vistaUnitaria,busquedaUnitaria, editarItem, eliminarItem,cerrarSession}
 