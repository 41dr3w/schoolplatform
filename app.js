const express = require('express')
const cors = require("cors")
const logger = require("morgan")
const cookieParser = require("cookie-parser") //cuando trabajan cookie y session juntos, una de las dos se tiene que iniciar antes que la otra
const session = require("express-session")

const app = express()

const indexRouter = require("./routes/index")
const { conect } = require("./db/db")

//configuraciones
app.use(logger("dev"))
app.use(express.json())
app.use(cors())

app.use('/',indexRouter)
conect()

module.exports = app;