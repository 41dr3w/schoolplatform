const {Student} = require("../models/student")
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
const deleteAll = async(req, res) => {
//const colection = mongoose.Collection.collectionName.find(req.params.collectionName)
const result = await Student.deleteMany({});
    res.status(200).json(`Deleted + ${result.deletedCount} + documents`)
}


module.exports = {vistaGeneral,crearItem,vistaUnitaria,busquedaUnitaria,editarItem, eliminarItem,deleteAll}
 