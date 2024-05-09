const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = (req, res, next)=>{
    bcrypt.hash(req.body.contrasenia, 10, function(err,hashedPass){
        if(err){
            res.status(500).json({
                error: err
            })
        }
        let user = new User({
            nombres: req.body.nombres,
            apellidos: req.body.apellidos,
            telefono: req.body.telefono,
            correo: req.body.correo,
            contrasenia: hashedPass
        })
        user.save()
        .then(user=>{
            res.status(200).json({
                message: "Usuario registrado"
            })
        })
        .catch(err =>{
            res.status(500).json({ message: "Ha ocurrido un error"+err });
        })
    })

    
}

const login = (req, res, next)=>{
    var emailUser = req.body.correo;
    var contraseniaUser = req.body.contrasenia;

    User.findOne({$or: [{correo:emailUser},{telefono:emailUser}]})
    .then(user=>{
        if(user){
            bcrypt.hash(contraseniaUser, user.contrasenia, function(err,result){
                if(err){
                    res.status(500).json({ message: "Ha ocurrido un error"+err });
                }
                if(result==user.contrasenia){
                    let nombre =user.nombres;
                    let apellido =user.apellidos;
                    let id =user._id;
                    let usuario = {nombre,apellido,id}
                    let token = jwt.sign({nombres:user.nombres},"verySecretValue",{expiresIn: "1h"})
                    res.status(200).json({
                        message: "Inicio de sesión exitoso!!",
                        token,
                        usuario,
                        status:true
                    })
                }else{
                    res.status(500).json({ message: "Contraseña incorrecto!!",status:false});
                }
            })
        }
        else{
            res.status(500).json({
                message: "Usuario incrorrecto!!"
            })
        }
    })
}

module.exports = {
    register,login
}