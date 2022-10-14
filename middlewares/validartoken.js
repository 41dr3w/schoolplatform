const generateJWT = require("../helpers/generateJWT");
const {User} = require("../models/user")
require("dotenv").config

module.exports = validarJWT = async (req,res,next) => {
    const token = req.header("x-token")
    if(!token){
        res.status(401).json({msg:"There is no token request"})
    }
    try {
        const {body} = generateJWT.verify(token,process.env.JWT_SECRET)
        const user = await User.findById(body.id)
        if (!user){
            return res.status(401).json({
                msg:"invalide token 0 - DB"
            })
        }
        next()    
    } catch (error){
        res.status(401).json({msg:"invalide token", error
        })
    }
}
