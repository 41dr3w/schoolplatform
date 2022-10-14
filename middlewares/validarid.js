const {Student} = require("../models/student")
const validar = async (req, res, next) => {
    const item = await Student.findById(req.params.id)
    if (item !== null) {next()} 
    else {res.status(500).json({msg:"id invalido"})}
}

module.exports = {validar}