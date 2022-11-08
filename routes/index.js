const express = require("express")
const router = express.Router()
const {payment, adminctrl} = require("../controllers/")
const {validaridpmt} = require("../middlewares/validarid")
const {check} = require("express-validator")
const auth = require("../middlewares/auth")


//get for debts for incharge and admins

//llenar



//funtional endpoint to operation for admins
//get all students from the incharge
router.get('/studentsof/:id',adminctrl.studentsOf) 
router.get('/paymonthstudent/:id/:info',adminctrl.debtOfMonths) 
router.get('/paymonthstudent/:id/:month/:info',adminctrl.debtOfMonth) 
//-----------------------------------------------------------------------------------------------------------------------

//get //personal estudiantil info 
router.get('/seeallpaymonths',payment.seeAll)
router.get('/seepaymonth/:id',validaridpmt,payment.seeOne)
router.get('/searchpaymonth/:month',payment.search)

//crear personal estudiantil
router.post('/createpaymonth',payment.create)
router.put('/editpaymonth/:id',validaridpmt,payment.edit) //add middleware
router.delete('/deletepaymonth/:id',validaridpmt,payment.delete)  //add middleware

//------------------------------------------------------------------------------------------------------------------------
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