const mongoose = require("mongoose");
const schema = mongoose.Schema;
const OutPutSchema = new schema({
    fecha:{
        type: Date
    },
    nombreTrabajador:{
        type: String
    },
},{timestamps:true})

module.exports = OutPutSchema;