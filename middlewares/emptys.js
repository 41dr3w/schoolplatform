
const normalizeEmpty =  async (req, res, next) => {
    try {
        
        const year = req.params.year
        if(year.toString().length==4){next()}
        else { 
            if(year==""||year==null){ //una es persona y otra es persona
                req.params.year=2022  //Date.year.toString()
            }
        }
        next()    
    } catch (err) {
        res.status(500).json(`msg:${err}`)
    } 
    next() 
}

module.exports = {normalizeEmpty}