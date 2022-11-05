const express = require("express")
const router = express.Router()
const {payMonth,payYear, adminctrl} = require("../controllers/")
const {validaridpas,validaridpms} = require("../middlewares/validarid")
const {check} = require("express-validator")
const auth = require("../middlewares/auth")


//get for debts for incharge and admins

//llenar



//funtional endpoint to operation for admins
//get all students from the incharge
router.get('/studentsof/:id',adminctrl.studentsOf) 
router.get('/paymonthstudent/:id',adminctrl.debtOfMonth) 

//-----------------------------------------------------------------------------------------------------------------------

//get //personal estudiantil info 
router.get('/seeallpaymonths',payMonth.seeAll)
router.get('/seepaymonth/:id',validaridpms,payMonth.seeOne)
router.get('/searchpaymonth/:month',payMonth.search)

//crear personal estudiantil
router.post('/createpaymonth',payMonth.create)
router.put('/editpaymonth/:id',validaridpms,payMonth.edit) //add middleware
router.delete('/deletepaymonth/:id',validaridpms,payMonth.delete)  //add middleware

//------------------------------------------------------------------------------------------------------------------------

//get //personal Padres Encargados info 
router.get('/seeallpayyears',payYear.seeAll)
router.get('/seepayyear/:id',validaridpas,payYear.seeOne)
router.get('/searchpayyear/:year',payYear.search)

//crear personal de Padres Encargados de los alumnos
router.post('/createpayyear',payYear.create)
router.put('/editpayyear/:id',validaridpas,payYear.edit) //add middleware
router.delete('/deletepayyear/:id',validaridpas,payYear.delete)  //add middleware


/*
//post el login y logout para los padres encargados de los alumnos y el personal administrativo

router.post('/login',[check("email").not().isEmpty().withMessage("please fill the email").isEmail().withMessage("The email doesn't exist"),
                      check("password").not().isEmpty().withMessage("please fill the password")
],ctrlstudents.loginEstudiante)
//router.delete('/logout',logOut)


//delete
router.delete('/delete/session',cerrarSession)
router.delete('/deletecookie',eliminarCookie)*/

module.exports = router 