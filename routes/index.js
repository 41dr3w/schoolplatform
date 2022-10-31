const express = require("express")
const router = express.Router()
const {ctrlstudents} = require("../controllers/student")
const {validarid} = require("../middlewares/validarid")
const {check} = require("express-validator")
const auth = require("../middlewares/auth")



//get de deudas para los padres encargados de los alumnos y el personal administrativo

//post el login y logout para los padres encargados de los alumnos y el personal administrativo

router.post('/login',[check("email").not().isEmpty().withMessage("please fill the email").isEmail().withMessage("The email doesn't exist"),
                      check("password").not().isEmpty().withMessage("please fill the password")
],ctrlstudents.loginEstudiante)
//router.delete('/logout',logOut)


//delete
router.delete('/delete/session',cerrarSession)
router.delete('/deletecookie',eliminarCookie)

module.exports = router 