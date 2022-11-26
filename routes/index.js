const express = require("express")
const router = express.Router()
const {payment, adminctrl} = require("../controllers/")
const {validaridpmt, validaridstu} = require("../middlewares/validarid")
const {searchidpas} = require("../middlewares/searchid")
const {check} = require("express-validator")
const auth = require("../middlewares/auth")


//get for debts for incharge/parents and admins

//llenar

//funtional endpoint to operation for admins

router
.get('/studentsof/:id',adminctrl.studentsOf)//get all students from the incharge
.get('/paymentstudent/:id/:info/:year',[check("year").isNumeric().isLength({min:4,max:4})],adminctrl.debtOfYear) 
.get('/paymentstudent/:id/:month/:info',adminctrl.debtOfMonth) 

//-----------------------------------------------------------------------------------------------------------------------
 
//operar con info de pago/s

.get('/seeallpayments',payment.seeAll)   
.get('/payment/:id',validaridpmt,payment.seeOne)
.get('/searchpayment/:month',payment.search) 

.post('/payment',[check("year").isNumeric().isLength({min:4,max:4}),
                  check("_idstudent").isAlphanumeric().isLength({min:24,max:24})],searchidpas,payment.create)

.put('/payment/:id',validaridpmt,payment.edit) /* ,[check("year").isNumeric().isLength({min:4,max:4}),
check("_idstudent").isAlphanumeric().isLength({min:24,max:24})],searchidpas*/

.delete('/payment/:id',validaridpmt,payment.delete); 

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