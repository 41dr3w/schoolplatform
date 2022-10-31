const {Student} = require("../models/student")
const bcrypt = require("bcryptjs")
const {validationResult} = require("express-validator")
const { default: mongoose } = require("mongoose")

const personalctrl = {

    //funciones para crear personal estudiantil
    //post C-reate
    async createStudent(req,res){
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

    //get //funciones para tomar personal estudiantil info 
    async seeStudents(req, res){
    const user = await Student.find()
    res.status(200).json({user})
    },
    async seeStudent(req, res){
    const user = await Student.findById(req.params.id)
    res.status(200).json({user})
    },
    async searchStudent(req, res){
    const user = await Student.findOne({second_name:req.params.name})
    res.status(200).json({user})
    },

    //put U-pdate
    async editStudent(req, res){
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
    async deleteStudent(req, res){
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

}

module.exports = {personalctrl}