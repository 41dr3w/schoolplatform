
const {Student} = require("../models/student")
const {User} = require("../models/user")
const bcrypt = require("bcryptjs")
const {validationResult} = require("express-validator")
const { default: mongoose, model } = require("mongoose")

const ctrlsistem = {

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
    //delete D-elete
    async cerrarSession(req,res){
        req.session.destroy()
        res.json({msg:"session is close"})
    },
    async eliminarCookie(req, res){
        res.clearCookie("ItemInSession") //cuidado que arriba esta con otro nombre
        res.json({msg:'cookie deleted'})
    }
    
}

module.exports = {ctrlsistem}