const express = require("express")
const router = express.Router()
const {/*logOut,sendToken,*/loginUsuario,eliminarCookie,verCookie,cerrarSession,verSession,crearSession,vistaGeneral, crearItem, vistaUnitaria, busquedaUnitaria, editarItem,eliminarItem,deleteAll} = require("../controllers/controller")
const {validar} = require("../middlewares/validarid")
const {check} = require("express-validator")
const auth = require("../middlewares/auth")


//get
router.get('/see',vistaGeneral)
router.get('/see/:id',validar,vistaUnitaria)
router.get('/search/:name',busquedaUnitaria)
router.get('/seesession',auth,verSession)
router.get('/seecookie',verCookie)

//post
router.post('/createsession',[check("first_name").not().isEmpty().withMessage("please fill the name"),
                              check("second_name").not().isEmpty().withMessage("please fill the age"),
                              check("dni").not().isEmpty().withMessage("please fill the dni"),  
                              check("age").not().isEmpty().withMessage("please fill the dni"),  
                              check("nationality").not().isEmpty().withMessage("please fill the nationality"),  
],crearSession)
router.post('/create',[check("first_name").not().isEmpty().withMessage("please fill the name"),
                       check("second_name").not().isEmpty().withMessage("please fill the age"),
                       check("dni").not().isEmpty().withMessage("please fill the dni"),  
                       check("age").not().isEmpty().withMessage("please fill the dni"),  
                       check("nationality").not().isEmpty().withMessage("please fill the nationality"),
],crearItem)


//put
router.put('/edit/:id',validar,[check("first_name").not().isEmpty().withMessage("please fill the name"),
                                check("second_name").not().isEmpty().withMessage("please fill the age"),
                                check("dni").not().isEmpty().withMessage("please fill the dni"),  
                                check("age").not().isEmpty().withMessage("please fill the dni"),  
                                check("nationality").not().isEmpty().withMessage("please fill the nationality"),
],editarItem)


//delete
router.delete('/delete/session',cerrarSession)
router.delete('/delete/:id',validar,eliminarItem)
router.delete('/deletecookie',eliminarCookie)

module.exports = router  