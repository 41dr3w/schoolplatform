const express = require("express")
const router = express.Router()
const {payment, adminctrl} = require("../controllers/")
const {validaridpmt} = require("../middlewares/validarid")
const {check} = require("express-validator")
const auth = require("../middlewares/auth")


//get for debts for incharge/parents and admins

//llenar

//funtional endpoint to operation for admins
//get all students from the incharge

router
.get('/studentsof/:id',adminctrl.studentsOf) 
.get('/paymonthstudent/:id/:info',adminctrl.debtOfMonths) 
.get('/paymonthstudent/:id/:month/:info',adminctrl.debtOfMonth) 

//-----------------------------------------------------------------------------------------------------------------------
 
//operar con info de pago/s

.get('/seeallpayments',payment.seeAll)   
.get('/payment/:id',validaridpmt,payment.seeOne)
.get('/searchpayment/:month',payment.search) //probar
.post('/payment',payment.create)
.put('/payment/:id',validaridpmt,payment.edit) //add middleware
.delete('/payment/:id',validaridpmt,payment.delete);  //add middleware

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