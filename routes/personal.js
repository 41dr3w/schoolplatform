const express = require("express")
const router = express.Router()
const {ctrlstudents} = require("../controllers/student")
const {validarid} = require("../middlewares/validarid")
const {check} = require("express-validator")
const auth = require("../middlewares/auth")


//crear personal estudiantil

//get //personal estudiantil info 
router.get('/see',ctrlstudents.verEstudiantes)
router.get('/see/:id',validarid,ctrlstudents.verEstudiante)
router.get('/search/:name',ctrlstudents.busquedaEstudiante)

