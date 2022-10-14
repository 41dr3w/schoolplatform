const mongoose = require("mongoose")

const Schema = mongoose.Schema ({


    incharge:{
        father:{
            _name:{ type:String,
                    required:true
            },
            dni:{type:Number,
                required:true
            }
        },
        mother:{
            _name:{ type:String,
                    required:true
            },
            dni:{type:Number,
                    required:true
            }
        }
    }

})

const InCharge = mongoose.model("InCharge", incharge)
module.exports = {InCharge}
