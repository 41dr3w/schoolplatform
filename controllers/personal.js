const {Student} = require("../models/student")
const { InCharge } = require("../models/incharge")
const bcrypt = require("bcryptjs")
const {validationResult} = require("express-validator")
const { default: mongoose } = require("mongoose")


const student = {

    //funciones para crear personal estudiantil
    //post C-reate
    async create(req,res){
    try {

        const err = validationResult(req)
        if(err.isEmpty()){
            //let salt = bcrypt.genSaltSync(10)
            //let hash = bcrypt.hashSync(req.body.password,salt)
            const incharge = new Student({first_name:req.body.first_name,
                                    last_name:req.body.last_name,
                                    dni:req.body.dni,
                                    dateofbirth:req.body.dateofbirth,
                                    sex:req.body.sex,
                                    nationality: req.body.nationality,
                                    relation_InCharge:req.body.relation_InCharge,
                                    _idInCharge1:"-",
                                    _idInCharge2:"-"
                                    }) /*password:hash*/
            await incharge.save()
            res.status(201).json({incharge})
        }
        else {
            res.status(501).json(err)
        }
    } catch(error) {
        res.status(501).json({error})
    }
    },

    //get //funciones para tomar personal estudiantil info 
    async seeAll(req, res){
    const user = await Student.find()
    res.status(200).json({user})
    },
    async seeOne(req, res){
    const student= await Student.findById(req.params.id)
    res.status(200).json({student})
    },
    async search(req, res){
    const user = await Student.findOne({last_name:req.params.name/*||req.params.first_name*/})
    res.status(200).json({user})
    },

    //put U-pdate
    async edit(req, res){
    try {
        const err = validationResult(req)
        if(err.isEmpty()){
            await Student.findByIdAndUpdate(req.params.id,{first_name:req.body.first_name,
                                                        last_name:req.body.last_name,
                                                        dni:req.body.dni,
                                                        dateofbirth:req.body.dateofbirth,
                                                        sex:req.body.sex,
                                                        nationality: req.body.nationality,
                                                        relation_InCharge:req.body.relation_InCharge,
                                                        _idInCharge1:"-",
                                                        _idInCharge2:"-"
                                                        /*email:req.body.email,
                                                        password:password*/})
            res.status(201).json({msg:"info updated"})
        } else {
            res.status(501).json(err)
        }
    } catch(error) {
        res.status(501).json({error})
    }
    },

    //delete D-elete
    async delete(req, res){
    try {
        const err = validationResult(req)
        if(err.isEmpty()){
            student = await Student.findByIdAndDelete(req.params.id)
            res.status(201).json({msg:"student deleted", student})
        } else {
            res.status(501).json(err)
        }
    }catch(error){
        res.status(501).json({error})
    }
    },

}

const incharge = {
    //funciones para crear personal estudiantil
    //post C-reate
    async create(req,res){
        try {
    
            const err = validationResult(req)
            if(err.isEmpty()){
                let salt = bcrypt.genSaltSync(10)
                let hash = bcrypt.hashSync(req.body.password,salt)
                const incharge = new InCharge({
                    parent_relation:req.body.parent_relation,
                    first_name:req.body.first_name,
                    last_name:req.body.last_name,
                    dni:req.body.dni,
                    dateofbirth:req.body.dateofbirth,
                    sex:req.body.sex,
                    nationality: req.body.nationality,
                    address:req.body.address,
                    city:req.body.city,
                    postalcode:req.body.postalcode,
                    phonenumber:req.body.phonenumber,
                    email:req.body.email,
                    password:hash,
                    idstudent1:"-"}) 

                await incharge.save()
                res.status(201).json({incharge})
            }
            else {
                res.status(501).json(err)
            }
        } catch(error) {
            res.status(501).json({error})
        }
    },

    //get //funciones para tomar personal estudiantil info 
    async seeAll(req, res){
    const incharges = await InCharge.find()
    res.status(200).json({incharges})
    },
    async seeOne(req, res){
    const incharge= await InCharge.findById(req.params.id)
    res.status(200).json({incharge})
    },
    async search(req, res){
    const incharge = await InCharge.findOne({last_name:req.params.name/*||req.params.first_name*/})
    res.status(200).json({incharge})
    },

    //put U-pdate
    async edit(req, res){
    try {
        const err = validationResult(req)
        if(err.isEmpty()){
            let salt = bcrypt.genSaltSync(10)
            let hash = bcrypt.hashSync(req.body.password,salt)
            await InCharge.findByIdAndUpdate(req.params.id,{parent_relation:req.body.parent_relation,
                                            first_name:req.body.first_name,
                                            last_name:req.body.last_name,
                                            dni:req.body.dni,
                                            dateofbirth:req.body.dateofbirth,
                                            sex:req.body.sex,
                                            nationality: req.body.nationality,
                                            address:req.body.address,
                                            city:req.body.city,
                                            postalcode:req.body.postalcode,
                                            phonenumber:req.body.phonenumber,
                                            email:req.body.email,
                                            password:hash,
                                            idstudent1:"-"})
            res.status(201).json({msg:"info updated"})
        } else {
            res.status(501).json(err)
        }
    } catch(error) {
        res.status(501).json({error})
    }
    },

    //delete D-elete
    async delete(req, res){   //REVISAR PORQUE FUNCIONA CUANDO SE BORRA UN FICHERO PERO ANUNCIA ERROR. CUANDO EN REALIDAD FUNCIONA BIEN
    
        try {
            const err = validationResult(req)
            if(err.isEmpty()){
                incharge = await InCharge.findByIdAndDelete(req.params.id)
                res.status(201).json({msg:"incharge deleted", incharge})
            } else {
                res.status(501).json(incharge)
            }
        }catch(error){
            //res.status(501).json({error})
        }
    },
}

module.exports = {student,incharge}