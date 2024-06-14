const uniformeModel = require("../models/Uniform");

const uniforms =  ((req, res)=>{
    uniformeModel.find()
    .sort({ saldo: 1 })
    .then(Uniformes =>{
        res.status(200).json({
            Uniformes,
            status:true
        })
    })
    .catch(err =>{
        res.status(500).json({ message: "no se puedo obtener los uniformes",status:false });
    })
})
const uniformID =  ((req, res)=>{
    let uniforme_ID = req.params.uniforme_ID;
    uniformeModel.findById(uniforme_ID)
    .then(Uniforme =>{
        if (Uniforme) {
            res.status(200).json({Uniforme});
        } else {
            res.status(404).json({ message: "Uniforme no encontrado",status:false });
        }
    })
    .catch(err =>{
        res.status(500).json({ message: "no se puedo obtener el Uniforme por su identificador",status:false });
    })
})
const addUniform =  ((req, res)=>{
    let uniforme = new uniformeModel({
        nombreUniforme: req.body.nombreUniforme,
        cantidad: req.body.cantidad,
        udm: req.body.udm,
        detalle:  req.body.detalle,
        fecha: req.body.fecha,
        saldo: req.body.cantidad,
        categoria:  req.body.categoria,
        entradas:[{
            fecha: new Date(),
            cantidad: req.body.cantidad,
        }]
    });
    uniforme.save()
    .then(uniforme =>{
        res.status(200).json({ message: "Uniforme registrado",uniforme,status:true })
    })
    .catch(err =>{
        res.status(500).json({ message: "No se puedo guardar el uniforme",status:false });
    })
})
const updateUniform =  (async(req, res)=>{
    let uniforme_ID = req.body.uniforme_ID;

    let updateUniforme = {
        nombreUniforme: req.body.nombreUniforme,
        cantidad: req.body.cantidad,
        udm: req.body.udm,
        categoria:  req.body.categoria,
        detalle:  req.body.detalle,
        fecha: req.body.fecha,
        saldo: req.body.cantidad
    };
    let nuevaEntrada={
        fecha: new Date(),
        cantidad: req.body.cantidad,
    }
    try {
        let uniform = await uniformeModel.findById(uniforme_ID);
        if (!uniform) {
            return res.status(404).json({ message: "Uniforme no encontrado",status:false });
        }
        Object.assign(uniform, updateUniforme);
        uniform.entradas.push(nuevaEntrada);

        uniform = await uniform.save();
        return res.status(200).json({ message: "Uniforme actualizado con éxito", uniform,status:true });
        
    } catch (error) {
        return res.status(500).json({ message: "Error al actualizar el uniforme: " + error,status:false });
    }
})
const addUniformSalida = (async (req, res)=>{
    let ID=req.body.uniforme_ID;
    let salida = {
        fecha: req.body.salida.fecha,
        nombreTrabajador:req.body.salida.nombreTrabajador,
        cantidad:req.body.salida.cantidad,
        udm:req.body.salida.udm,
        observacion:req.body.salida.observacion
    };
    try {
        
        let uniform = await uniformeModel.findById(ID)
        if (!uniform) {
            return res.status(404).json({ message: "Uniforme no encontrado",status:false });
        }
        let cantTotal = (uniform.saldo - req.body.salida.cantidad);
        const updateUniform={
            saldo:cantTotal
        }
        Object.assign(uniform, updateUniform);
        uniform.entradas = uniform.entradas || [];
        if (uniform.entradas.length === 0) {
            return res.status(404).json({ message: "No hay entradas registradas para este uniform",status:false });
        }
        const ultimaEntrada = uniform.entradas[uniform.entradas.length - 1];
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
            uniform = await uniform.save(); 
            res.status(200).json({ message: "Salida registrada",status:true });
        }        
    } catch (error) {
        res.status(500).json({ message: "Error al obtener la última entrada: " + error,status:false });
    }
})
const destroyUniform=(req,res,next)=>{
    let uniforme_ID = req.params.id;
    uniformeModel.findByIdAndDelete(uniforme_ID)
    .then(response =>{
        if (response) {
            res.status(200).json({ message: "Uniforme eliminado",status:true });
        } else {
            res.status(404).json({ message: "Uniforme no encontrado",status:false });
        }
    })
    .catch(err =>{
        res.status(500).json({ message: "No se puedo realizar la eliminación del uniforme "+err,status:false });
    })
}

module.exports = {
    uniforms,addUniform,updateUniform,addUniformSalida,destroyUniform
}