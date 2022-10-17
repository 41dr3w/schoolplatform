const { User } = require("../models/user")
const validar = async (req, res, next) => {
    const item = await User.findById(req.params.id)
    if (item !== null) {next()} 
    else {res.status(500).json({msg:"id invalido"})}
}

module.exports = {validar}