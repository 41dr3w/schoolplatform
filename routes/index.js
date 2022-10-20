
const express = require("express")
const router = express.Router()
const {editarEstudiante,
       eliminarEstudiante,
       logoutEstudiante,
       loginEstudiante,
       crearEstudiante,
       verEstudiantes,
       verEstudiante, 
       busquedaEstudiante} = require("../controllers/controller")
const {validarid} = require("../middlewares/validarid")
const {check} = require("express-validator")
const auth = require("../middlewares/auth")


//get
router.get('/see',verEstudiantes)
router.get('/see/:id',validarid,verEstudiante)
router.get('/search/:name',busquedaEstudiante)

//post
router.post('/create',[ check("first_name").not().isEmpty().withMessage("please fill the name"),
                        check("second_name").not().isEmpty().withMessage("please fill the age"),
                        check("dni").not().isEmpty().withMessage("please fill the dni"),  
                        check("age").not().isEmpty().withMessage("please fill the dni"),  
                        check("nationality").not().isEmpty().withMessage("please fill the nationality"),
                        check("email").not().isEmpty().withMessage("please fill the email").isEmail().withMessage("The email doesn't exist"),
                        check("password").not().isEmpty().withMessage("please fill the password")  
], crearEstudiante)
router.post('/login',[check("email").not().isEmpty().withMessage("please fill the email").isEmail().withMessage("The email doesn't exist"),
                      check("password").not().isEmpty().withMessage("please fill the password")
],loginEstudiante)

//put
router.put('/edit/:id',validarid,[check("first_name").not().isEmpty().withMessage("please fill the name"),
                                check("second_name").not().isEmpty().withMessage("please fill the age"),
                                check("dni").not().isEmpty().withMessage("please fill the dni"),  
                                check("age").not().isEmpty().withMessage("please fill the dni"),  
                                check("nationality").not().isEmpty().withMessage("please fill the nationality"),
                                check("email").not().isEmpty().withMessage("please fill the email").isEmail().withMessage("The email doesn't exist"),
                                check("password").not().isEmpty().withMessage("please fill the password")
],editarEstudiante)

//delete
router.delete('/delete/:id',eliminarEstudiante)
router.delete('/logout',logoutEstudiante)

module.exports = router  