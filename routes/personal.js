const express = require("express")
const router = express.Router()
const {personalctrl} = require("../controllers/personal")
const {validarid} = require("../middlewares/validarid")
const {check} = require("express-validator")
const auth = require("../middlewares/auth")

//crear personal estudiantil
router.get('/createstudent',personalctrl.createStudent)
router.put('/updatestudent',validarid,personalctrl.editStudent) //add middleware
router.delete('/delete/:id',validarid,personalctrl.deleteStudent)  //add middleware

//get //personal estudiantil info 
router.get('/see',personalctrl.seeStudents)
router.get('/see/:id',validarid,personalctrl.seeStudent)
router.get('/search/:name',personalctrl.searchStudent)


