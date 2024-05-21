const mongoose = require("mongoose");
const schema = mongoose.Schema;
const InPut = require("./InPut");
const materialSchema = new schema({
    nombreMaterial:{
        type: String
    },
    precio:{
        type: mongoose.Decimal128
    },
    cantidad:{
        type: Number
    },
    udm:{
        type: String
    },
    saldo:{
        type:Number
    },
    detalle:{
        type: String
    },
    categoria:{
        type: String
    },
    fecha:{
        type: Date
    },
    entradas:[InPut]
},{timestamps:true})

const material = mongoose.model('Material', materialSchema);
module.exports = material;
