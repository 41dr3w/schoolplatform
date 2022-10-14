
const express = require("express")
const router = express.Router()
const {vistaGeneral, crearItem, vistaUnitaria, busquedaUnitaria, editarItem,eliminarItem,deleteAll} = require("../controllers/controller")

//post
router.post('/create',crearItem)

//get
router.get('/see',vistaGeneral)
router.get('/see/:id',vistaUnitaria)
router.get('/search/:name',busquedaUnitaria)

//put
router.put('/edit/:id',editarItem)

//delete
router.delete('/delete/:id',eliminarItem)
router.delete('/deletecollection',deleteAll)

module.exports = router  