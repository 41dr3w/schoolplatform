const express = require("express")
const router = express.Router()
const {ctrlsistem} = require("../controllers/sistem")
const {validarid} = require("../middlewares/validarid")
const {check} = require("express-validator")
const auth = require("../middlewares/auth")

//get          //get de todos los modelos y esquemas
router.get('/see',ctrlstudents.verEstudiantes)
router.get('/see/:id',validarid,ctrlstudents.verEstudiante)
router.get('/search/:name',ctrlstudents.busquedaEstudiante)

//post        //todos los endpoint para pruebas y demases
router.post('/pass',savewithHash)

//delete
router.delete('/delete/session',cerrarSession)
router.delete('/delete/:id',eliminarItem)
router.delete('/deletecollection',deleteAll)
router.delete('/delete/cookie',eliminarCookie)
//router.delete('/logout',logOut)