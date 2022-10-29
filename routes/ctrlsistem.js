
const express = require("express")
const router = express.Router()
const {ctrlsistem} = require("../controllers/sistem")
const {validarid} = require("../middlewares/validarid")
const {check} = require("express-validator")
const auth = require("../middlewares/auth")




router.post('/pass',savewithHash)

router.delete('/delete/session',cerrarSession)
router.delete('/delete/:id',eliminarItem)
router.delete('/deletecollection',deleteAll)
router.delete('/delete/cookie',eliminarCookie)
//router.delete('/logout',logOut)


/*router.post('/logintoken',[
    check("email").not().isEmpty().withMessage("Falta ingresar Mail").isEmail().withMessage("Mail Inexistente"),
    check("password").not().isEmpty().withMessage("Falta Mail")
], loginToken)*/