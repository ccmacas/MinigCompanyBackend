const MaterialModel = require("../models/Materials2");
const addMaterial =  ((req, res)=>{
    let material = new MaterialModel({
        nombreMaterial: req.body.nombreMaterial,
        precio: req.body.precio,
        cantidad: req.body.cantidad,
        detalle:  req.body.detalle,
        categoria:  req.body.categoria,
        fecha: req.body.fecha,
        entrada:[]
    });
    material.save()
    .then(response =>{
        res.status(200).json({ message: "Material registrado" })
    })
    .catch(err =>{
        res.status(500).json({ message: "No se puedo guardar el material"+err });
    })
})
const addMaterialEntrada = (async (req, res)=>{
    let ID=req.body.id;
    let entrada = {
        fecha: req.body.entrada.fecha,
        nombreTrabajador:req.body.entrada.nombre,
        calculo: req.body.entrada.calculo,
        cantidad: req.body.entrada.cantidad,
        observacion: req.body.entrada.observacion
    };
    try {
        const material = await MaterialModel.findById(ID)
        if (!material) {
            return res.status(404).json({ message: "Material no encontrado" });
        }
        material.entrada = material.entrada || [];
        material.entrada.push(entrada);
        await material.save(); 
        res.status(200).json({ message: "Entrada registrada" });
    } catch (err) {
        res.status(500).json({ message: "No se pudo guardar la entrada: " + err });
    }
})/*
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
            let resultado = addMaterialEntrada(material_ID,req.body.cantidad);
        } else {
            res.status(404).json({ message: "Material no encontrado" });
        }
    })
    .catch(err =>{
        res.status(500).json({ message: "No se puedo realizar la actualizacion del material"+err });
    })
})
const addMaterialEntrada = (async (ID,cantidadVal)=>{
    let entrada = {
        fecha: new Date(),
        cantidad:cantidadVal,
    };
    try {
        const material = await MaterialModel.findById(ID)
        if (!material) {
            return false;
        }
        material.entradas = material.entrada || [];
        material.entradas.push(entrada);
        await material.save(); 
        return true
    } catch (err) {
        return false;
    }
})

*/
module.exports = {
   addMaterial,addMaterialEntrada
}