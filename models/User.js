const mongoose = require("mongoose");
const schema = mongoose.Schema;

const UserSchema = new schema({
    nombres:{
        type: String
    },
    apellidos:{
        type: String
    },
    telefono:{
        type: String
    },
    correo:{
        type: String
    },
    contrasenia:{
        type: String
    }
},{timestamps:true})

const User = mongoose.model('Usuarios', UserSchema);
module.exports = User;