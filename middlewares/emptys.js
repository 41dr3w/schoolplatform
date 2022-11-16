
const normalizeEmpty = (req, res, next) => {

    err

    try {
        const year = req.params.year
        if(year.toString().length==4){next()}
        else { 
            if(year==""||year==null){ //una es persona y otra es persona
                req.params.year=2022  //Date.year.toString()
            }
        }
    next()
    } catch (error) {
        res.status(500).json(error)
    }
    
}

module.exports = {normalizeEmpty}