const express = require("express")
const router = express.Router()
const {student,incharge, admins} = require("../controllers/personal")
const {validaridinc, validaridstu, validaridadm} = require("../middlewares/validarid")
const {searchidinc, searchidpmt} = require("../middlewares/searchid") //PROBAR
const {check} = require("express-validator")
const auth = require("../middlewares/auth")

//-----------------------------------------------------------------------------------------------------------------------

//get //personal estudiantil info 
router

.get('/seestudents',student.seeAll)
.get('/seestudent/:id',validaridstu,student.seeOne)
.get('/searchstudent/:name',student.search)

//crear personal estudiantil
.post('/createstudent',student.create)
.put('/editestudent/:id',validaridstu,student.edit) //add middleware
.delete('/deletestudent/:id',validaridstu,student.delete)  //add middleware

//------------------------------------------------------------------------------------------------------------------------

//get //personal Padres Encargados info 
.get('/seeallincharge',incharge.seeAll)
.get('/seeincharge/:id',validaridinc,incharge.seeOne)
.get('/searchincharge/:name',incharge.search)

//crear personal de Padres Encargados de los alumnos
.post('/createincharge',incharge.create)
.put('/editincharge/:id',validaridinc,incharge.edit) //add middleware
.delete('/deleteincharge/:id',validaridinc,incharge.delete)  //add middleware

//------------------------------------------------------------------------------------------------------------------------

//get //personal Administrativo info 
.get('/seealladmins',admins.seeAll)
.get('/seeadmin/:id',validaridadm,admins.seeOne)
.get('/searchadmin/:name',admins.search)

//crear personal Administrativo 
.post('/createadmin',admins.create)
.put('/editadmin/:id',validaridadm,admins.edit) //add middleware
.delete('/deleteadmin/:id',validaridadm,admins.delete)  //add middleware



module.exports = router 
