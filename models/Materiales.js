const mongoose = require("mongoose");
const schema = mongoose.Schema;

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
    detalle:{
        type: String
    },
    categoria:{
        type: String
    },
    fecha:{
        type: Date
    },
    inventario:{
        type: String
    }
},{timestamps:true})

const material = mongoose.model('Material', materialSchema);
module.exports = material;
