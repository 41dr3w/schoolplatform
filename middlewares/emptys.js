const { validationResult } = require("express-validator")

const normalizeEmpty = (req, res, next) => {

    const error = validationResult(req.params)

    try {
        if(error.isEmpty()){
            const year = req.query.year 
                if(year==="0"){ //una es persona y otra es persona
                    req.params.year=2022  //Date.year.toString()
                }
            next(); return
        }
        else res.status(500).json({error})
    } catch (error) {
        res.status(500).json({error})
    } 
    next() 
    return
}

module.exports = {normalizeEmpty}