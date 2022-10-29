
const express = require("express")
const router = express.Router()
const {ctrlstudents} = require("../controllers/student")
const {validarid} = require("../middlewares/validarid")
const {check} = require("express-validator")
const auth = require("../middlewares/auth")


//get
router.get('/see',ctrlstudents.verEstudiantes)
router.get('/see/:id',validarid,ctrlstudents.verEstudiante)
router.get('/search/:name',ctrlstudents.busquedaEstudiante)

//post
router.post('/create',[ check("first_name").not().isEmpty().withMessage("please fill the first_name"),
                        check("second_name").not().isEmpty().withMessage("please fill the second_name"),
                        check("age").not().isEmpty().withMessage("please fill the age"),  
                        check("dni").not().isEmpty().withMessage("please fill the dni"),  
                        check("nationality").not().isEmpty().withMessage("please fill the nationality"),
                        check("email").not().isEmpty().withMessage("please fill the email").isEmail().withMessage("The email doesn't exist"),
                        check("password").not().isEmpty().withMessage("please fill the password")  
],ctrlstudents.crearEstudiante)
router.post('/login',[check("email").not().isEmpty().withMessage("please fill the email").isEmail().withMessage("The email doesn't exist"),
                      check("password").not().isEmpty().withMessage("please fill the password")
],ctrlstudents.loginEstudiante)

//put
router.put('/edit/:id',validarid,[check("first_name").not().isEmpty().withMessage("please fill the first_name"),
                                 check("second_name").not().isEmpty().withMessage("please fill the second_name"),
                                 check("age").not().isEmpty().withMessage("please fill the age"),  
                                 check("dni").not().isEmpty().withMessage("please fill the dni"),  
                                 check("nationality").not().isEmpty().withMessage("please fill the nationality"),
                                 check("email").not().isEmpty().withMessage("please fill the email").isEmail().withMessage("The email doesn't exist"),
                                 check("password").not().isEmpty().withMessage("please fill the password")
],ctrlstudents.editarEstudiante)

//delete
router.delete('/delete/:id',ctrlstudents.eliminarEstudiante)
router.delete('/logout',ctrlstudents.logoutEstudiante)

module.exports = router 