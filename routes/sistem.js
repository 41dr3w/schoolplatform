
const express = require("express")
const router = express.Router()
const {ctrlsistem} = require("../controllers/sistem")
const {validarid} = require("../middlewares/validarid")
const {check} = require("express-validator")
const auth = require("../middlewares/auth")


