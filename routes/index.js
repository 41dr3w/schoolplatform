
const express = require("express")
const router = express.Router()
const {routineCheck,
       savewithHash,
       quoteAPI,
       eliminarCookie,
       verCookie,
       cerrarSession,
       verSession,
       crearSession,
       vistaGeneral, 
       crearItem, 
       vistaUnitaria, 
       busquedaUnitaria, 
       editarItem,
       eliminarItem,
       deleteAll} = require("../controllers/controller")
const {validar} = require("../middlewares/validarid")
const {check} = require("express-validator")
const auth = require("../middlewares/auth")

//get
router.get('/see',vistaGeneral)
router.get('/see/:id',validar,vistaUnitaria)
router.get('/search/:name',busquedaUnitaria)
router.get('/seesession',auth,verSession) // auth (middleware) 
router.get('/seecookie',verCookie)

router.get('/axios/quoteapi',quoteAPI)
router.get('/axios/routineCheck',routineCheck)

//post
router.post('/pass',savewithHash)
router.post('/createsession',[check("first_name").not().isEmpty().withMessage("please fill the name"),
                              check("second_name").not().isEmpty().withMessage("please fill the age"),
                              check("dni").not().isEmpty().withMessage("please fill the dni"),  
                              check("age").not().isEmpty().withMessage("please fill the age"),  
                              check("nationality").not().isEmpty().withMessage("please fill the nationality"),  
],crearSession)
router.post('/create',[check("name").not().isEmpty().withMessage("please fill the name"),
                       check("email").not().isEmpty().withMessage("please fill the email").isEmail().withMessage("please enter a truly email"),
                       check("password").not().isEmpty().withMessage("please fill the password")
],crearItem)

/*router.post('/logintoken',[
    check("email").not().isEmpty().withMessage("Falta ingresar Mail").isEmail().withMessage("Mail Inexistente"),
    check("password").not().isEmpty().withMessage("Falta Mail")
], loginToken)*/




//put
router.put('/edit/:id',validar,[check("first_name").not().isEmpty().withMessage("please fill the first_name"),
                                check("second_name").not().isEmpty().withMessage("please fill the second_name"),
                                check("dni").not().isEmpty().withMessage("please fill the dni"),  
                                check("age").not().isEmpty().withMessage("please fill the age"),  
                                check("nationality").not().isEmpty().withMessage("please fill the nationality"),
],editarItem)

//delete
router.delete('/delete/session',cerrarSession)
router.delete('/delete/:id',validar,eliminarItem)
router.delete('/deletecollection',deleteAll)
router.delete('/delete/cookie',eliminarCookie)
//router.delete('/logout',logOut)

module.exports = router  