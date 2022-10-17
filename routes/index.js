
const express = require("express")
const router = express.Router()
const {/*logOut,sendToken,*/loginUsuario,eliminarCookie,verCookie,cerrarSession,verSession,crearSession,vistaGeneral, crearItem, vistaUnitaria, busquedaUnitaria, editarItem,eliminarItem,deleteAll} = require("../controllers/controller")
const {validarid} = require("../middlewares/validarid")
const {check} = require("express-validator")
const auth = require("../middlewares/auth")
//const validarToken = require("")



//get
router.get('/see',vistaGeneral)
router.get('/see/:id',validarid,vistaUnitaria)
router.get('/search/:name',busquedaUnitaria)
router.get('/seesession',auth,verSession) //auth (middleware) 
router.get('/seecookie',verCookie)


//router.get('/sendtoken',sendToken)
//router.get('verifytoken',validarToken)





//post
router.post('/createsession',/*[check("first_name").not().isEmpty().withMessage("please fill the name"),
                              check("second_name").not().isEmpty().withMessage("please fill the age"),
                              check("dni").not().isEmpty().withMessage("please fill the dni"),  
                              check("age").not().isEmpty().withMessage("please fill the dni"),  
                              check("nationality").not().isEmpty().withMessage("please fill the nationality"),  
],*/crearSession)

router.post('/create',/*[check("first_name").not().isEmpty().withMessage("please fill the name"),
                       check("second_name").not().isEmpty().withMessage("please fill the age"),
                       check("dni").not().isEmpty().withMessage("please fill the dni"),  
                       check("age").not().isEmpty().withMessage("please fill the dni"),  
                       check("nationality").not().isEmpty().withMessage("please fill the nationality"),
],*/crearItem)

router.post('/login',/*[check("email").not().isEmpty().withMessage("please fill the email").isEmail().withMessage("The email doesn't exist"),
                      check("password").not().isEmpty().withMessage("please fill the password")
],*/loginUsuario)

/*router.post('/logintoken',[
    check("email").not().isEmpty().withMessage("Falta ingresar Mail").isEmail().withMessage("Mail Inexistente"),
    check("password").not().isEmpty().withMessage("Falta Mail")
], loginToken)*/




//put
router.put('/edit/:id',validarid,[check("first_name").not().isEmpty().withMessage("please fill the name"),
                                check("second_name").not().isEmpty().withMessage("please fill the age"),
                                check("dni").not().isEmpty().withMessage("please fill the dni"),  
                                check("age").not().isEmpty().withMessage("please fill the dni"),  
                                check("nationality").not().isEmpty().withMessage("please fill the nationality"),
],editarItem)




//delete
router.delete('/delete/session',cerrarSession)
router.delete('/delete/:id',eliminarItem)
router.delete('/deletecollection',deleteAll)
router.delete('/deletecookie',eliminarCookie)
//router.delete('/logout',logOut)

module.exports = router  