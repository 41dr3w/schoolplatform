const {User} = require("../models/user")
const validarid = async (req, res, next) => {
    const item = await User.findById(req.params.id)
    if (item !== null){
        next();
    } else {
        res.json({msg:"id invalido"})
    }
}

module.exports = {validarid}