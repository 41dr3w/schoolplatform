const { Student } = require("../models/student");
const validarid = async (req, res, next) => {
    const item = await Student.findById(req.params.id)
    if (item !== null){
        next();
    } else {
        res.json({msg:"id invalido"})
    }
}

module.exports = {validarid}