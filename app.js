const express = require('express')
const cors = require("cors")
const logger = require("morgan")
const cookieParser = require("cookie-parser") //cuando trabajan cookie y session juntos, una de las dos se tiene que iniciar antes que la otra
const session = require("express-session")

const app = express()

const indexRouter = require("./routes")
//const sistemRouter = require("./routes/ctrlsistem")
const personalRouter = require("./routes/personal")
const { conect } = require("./db/db")

//configuraciones
app.use(logger("dev"))
app.use(express.json())
app.use(cors())
app.use(cookieParser())  //si entro en mi pagina y ya quiero entrar a mi usuario, tiene que guardarse la sesion en cookie
app.use(session({     //si quiero mantener un usuario en sesion, se guarda la sesion en cookie
    secret: process.env.SESSION_SECRET, //se puede hashear esta palabra secret
    resave: true,
    saveUninitialized: true
}))


app.use('/',indexRouter)
//app.use('/',sistemRouter)
app.use('/',personalRouter)
conect()

module.exports = app;