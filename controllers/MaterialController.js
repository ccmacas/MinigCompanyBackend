const { response } = require("express");
const MaterialModel = require("../models/Materiales");

const materiales =  ((req, res)=>{
    MaterialModel.find()
    .then(Material =>{
        res.status(200).json({
            Material
        })
    })
    .catch(err =>{
        res.status(500).json({ message: "no se puedo obtener los materiales" });
    })
})

const materialID =  ((req, res)=>{
    let material_ID = req.body.material_ID;
    MaterialModel.findById(material_ID)
    .then(response =>{
        res.status(200).json({
            response
        })
    })
    .catch(err =>{
        res.status(500).json({ message: "no se puedo obtener el material por su identificador" });
    })
})

const addMaterial =  ((req, res)=>{
    let material = new MaterialModel({
        nombreMaterial: req.body.nombreMaterial,
        precio: req.body.precio,
        cantidad: req.body.cantidad,
        detalle:  req.body.detalle,
        categoria:  req.body.categoria,
        fecha: req.body.fecha,
    });
    material.save()
    .then(response =>{
        res.status(200).json({ message: "Material registrado" })
    })
    .catch(err =>{
        res.status(500).json({ message: "No se puedo obtener el material por su identificador" });
    })
})

const UpdateMaterial =  ((req, res)=>{
    let material_ID = req.body.material_ID;

    let updateMaterial = new MaterialModel({
        nombreMaterial: req.body.nombreMaterial,
        precio: req.body.precio,
        cantidad: req.body.cantidad,
        detalle:  req.body.detalle,
        categoria:  req.body.categoria,
        fecha: req.body.fecha,
    },{ _id: false });
    //console.log(updateMaterial);
    MaterialModel.findByIdAndUpdate(material_ID,{$set:updateMaterial},{ new: true })
    .then(response =>{
        if (response) {
            res.status(200).json({ message: "Material actualizado" });
        } else {
            res.status(404).json({ message: "Material no encontrado" });
        }
    })
    .catch(err =>{
        res.status(500).json({ message: "No se puedo realizar la actualizacion del material"+err });
    })
})
const destroyMaterial=(req,res,next)=>{
    let material_ID = req.params.id;
    MaterialModel.findByIdAndDelete(material_ID)
    .then(response =>{
        if (response) {
            res.status(200).json({ message: "Material eliminado" });
        } else {
            res.status(404).json({ message: "Material no encontrado" });
        }
    })
    .catch(err =>{
        res.status(500).json({ message: "No se puedo realizar la eliminación del material "+err });
    })
}

module.exports = {
    materiales,materialID,addMaterial,UpdateMaterial,destroyMaterial
}