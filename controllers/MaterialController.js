const { response } = require("express");
const MaterialModel = require("../models/Materiales");

const materiales =  ((req, res)=>{
    MaterialModel.find()
    .sort({ saldo: 1 })
    .then(Material =>{
        res.status(200).json({
            Material,
            status:true
        })
    })
    .catch(err =>{
        res.status(500).json({ message: "no se puedo obtener los materiales",status:false });
    })
})
const materialesCategoria =  ((req, res)=>{
    const categoria = req.params.categoria;
    MaterialModel.find({ categoria: categoria })
    .sort({ saldo: 1 })
    .then(Material => {
        res.status(200).json({ Material,status:true });
    })
    .catch(err => {
        res.status(500).json({ message: "No se pudo obtener los materiales: " + err, status:false });
    });
})
const materialID =  ((req, res)=>{
    let material_ID = req.params.material_ID;
    MaterialModel.findById(material_ID)
    .then(Material =>{
        if (Material) {
            res.status(200).json({Material});
        } else {
            res.status(404).json({ message: "Material no encontrado",status:false });
        }
    })
    .catch(err =>{
        res.status(500).json({ message: "no se puedo obtener el material por su identificador",status:false });
    })
})

const addMaterial =  ((req, res)=>{
    let material = new MaterialModel({
        nombreMaterial: req.body.nombreMaterial,
        precio: req.body.precio,
        cantidad: req.body.cantidad,
        udm: req.body.udm,
        detalle:  req.body.detalle,
        categoria:  req.body.categoria,
        fecha: req.body.fecha,
        saldo: req.body.cantidad,
        entradas:[{
            fecha: new Date(),
            cantidad: req.body.cantidad,
        }]
    });
    material.save()
    .then(material =>{
        res.status(200).json({ message: "Material registrado",material,status:true })
    })
    .catch(err =>{
        res.status(500).json({ message: "No se puedo guardar el material",status:false });
    })
})

const UpdateMaterial =  (async(req, res)=>{
    let material_ID = req.body.material_ID;

    let updateMaterial = {
        nombreMaterial: req.body.nombreMaterial,
        precio: req.body.precio,
        cantidad: req.body.cantidad,
        udm: req.body.udm,
        saldo: req.body.cantidad,
        detalle:  req.body.detalle,
        categoria:  req.body.categoria,
        fecha: req.body.fecha,
    };
    let nuevaEntrada={
        fecha: new Date(),
        cantidad: req.body.cantidad,
    }
    try {
        let material = await MaterialModel.findById(material_ID);
        if (!material) {
            return res.status(404).json({ message: "Material no encontrado",status:false });
        }
        Object.assign(material, updateMaterial);
        material.entradas.push(nuevaEntrada);

        material = await material.save();
        return res.status(200).json({ message: "Material actualizado con éxito", material,status:true });
        
    } catch (error) {
        return res.status(500).json({ message: "Error al actualizar el material: " + error,status:false });
    }
})
const AddMaterialSalida = (async (req, res)=>{
    let ID=req.body.material_ID;
    let salida = {
        fecha: req.body.salida.fecha,
        nombreTrabajador:req.body.salida.nombreTrabajador,
        cantidad:req.body.salida.cantidad,
        udm:req.body.salida.udm,
        observacion:req.body.salida.observacion
    };
    try {
        
        let material = await MaterialModel.findById(ID)
        if (!material) {
            return res.status(404).json({ message: "Material no encontrado",status:false });
        }
        let cantTotal = (material.saldo - req.body.salida.cantidad);
        const updateMaterial={
            saldo:cantTotal
        }
        Object.assign(material, updateMaterial);
        material.entradas = material.entradas || [];
        if (material.entradas.length === 0) {
            return res.status(404).json({ message: "No hay entradas registradas para este material",status:false });
        }
        const ultimaEntrada = material.entradas[material.entradas.length - 1];
        let valor = req.body.salida.cantidad;
        if(valor>ultimaEntrada.cantidad){
            return res.status(404).json({ message: "El valor esta fuera del límite en el inventario",status:false });
        }else{
            let total = (ultimaEntrada.cantidad - req.body.salida.cantidad)
            let entradaUpdate = {
                cantidad:total
            }
            Object.assign(ultimaEntrada, entradaUpdate);
            ultimaEntrada.salidas = ultimaEntrada.salidas || [];
            ultimaEntrada.salidas.push(salida);
            material = await material.save(); 
            res.status(200).json({ message: "Salida registrada",status:true });
        }        
    } catch (error) {
        res.status(500).json({ message: "Error al obtener la última entrada: " + error,status:false });
    }
})

const allInputs =  ((req, res)=>{
    let material_ID = req.params.material_ID;
    MaterialModel.findById(material_ID)
    .then(material =>{
        if (material) {
            let entradas = material.entradas;
            res.status(200).json({entradas,status:true});
        } else {
            res.status(404).json({ message: "Material no encontrado",status:false });
        }
    })
    .catch(err =>{
        res.status(500).json({ message: "no se puedo obtener el material por su identificador",status:false });
    })
})
const allOutputs =  ((req, res)=>{
    let material_ID = req.params.material_ID;
    let entrada_ID = req.body.entrada_ID;
    MaterialModel.findById(material_ID)
    .then(material =>{
        if (material) {
            const entrada = material.entradas.id(entrada_ID);
            if (!entrada) {
                res.status(404).json({ message: "Entrada no encontrado",status:false });
                return;
            }
            const salidas = entrada.salidas || []
            res.status(200).json({salidas,status:true});
        } else {
            res.status(404).json({ message: "Material no encontrado",status:false });
        }
    })
    .catch(err =>{
        res.status(500).json({ message: "no se puedo obtener el material por su identificador",status:false });
    })
})
const destroyMaterial=(req,res,next)=>{
    let material_ID = req.params.id;
    MaterialModel.findByIdAndDelete(material_ID)
    .then(response =>{
        if (response) {
            res.status(200).json({ message: "Material eliminado",status:true });
        } else {
            res.status(404).json({ message: "Material no encontrado",status:false });
        }
    })
    .catch(err =>{
        res.status(500).json({ message: "No se puedo realizar la eliminación del materials "+err,status:false });
    })
}

module.exports = {
    materiales,materialID,materialesCategoria,addMaterial,UpdateMaterial,destroyMaterial,AddMaterialSalida,allInputs,allOutputs
}