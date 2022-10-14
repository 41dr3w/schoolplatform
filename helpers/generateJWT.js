const jwt = require("jsonwebtoken")
const { token } = require("morgan")
require("dotenv").config

module.exports = doToken = (body) =>{
    return new Promise ((res, rec)=>{    //resolve, rec
        const payload = {body}
        jwt.sign(payload, process.env.JWT_SECRET,{
            expiresIn:'7m'
        },(error,token)=>{
            if(error){}
        })
    })
}