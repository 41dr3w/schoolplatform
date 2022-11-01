const express = require("express")
const router = express.Router()
const {student,incharge} = require("../controllers/personal")
const {validaridinc, validaridstu} = require("../middlewares/validarid")
const {check} = require("express-validator")
const auth = require("../middlewares/auth")

//-----------------------------------------------------------------------------------------------------------------------

//get //personal estudiantil info 
router.get('/seestudents',student.seeAll)
router.get('/seestudent/:id',validaridstu,student.seeOne)
router.get('/searchstudent/:name',student.search)

//crear personal estudiantil
router.post('/createstudent',student.create)
router.put('/editestudent/:id',validaridstu,student.edit) //add middleware
router.delete('/deletestudent/:id',validaridstu,student.delete)  //add middleware

//------------------------------------------------------------------------------------------------------------------------

//get //personal Padres Encargados info 
router.get('/seeallincharge',incharge.seeAll)
router.get('/seeincharge/:id',validaridinc,incharge.seeOne)
router.get('/searchincharge/:name',incharge.search)

//crear personal de Padres Encargados de los alumnos
router.post('/createincharge',incharge.create)
router.put('/editincharge/:id',validaridinc,incharge.edit) //add middleware
router.delete('/deleteincharge/:id',validaridinc,incharge.delete)  //add middleware

module.exports = router 
