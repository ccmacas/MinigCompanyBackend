const mongoose = require("mongoose");
const schema = mongoose.Schema;
const OutPutUniform = require("./OutPutUniform");
const EntranceUniformSchema = new schema({
    fecha:{
        type: Date
    },
    cantidad:{
        type: Number
    },
    salidas:[OutPutUniform]
},{timestamps:true})

module.exports = EntranceUniformSchema;