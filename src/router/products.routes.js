import { Router } from "express";
import { productsModel } from "../models/products.model.js";

const router = Router();

//get traer resultados

router.get('/', async (req, res) => {
    try {
        let products = await productsModel.find();
        res.send({ result: "success", payload: products });
    } catch (error) {
        console.log(error);
    }
});

//post debe seguir los pasos del moderado en la validacion de la creacion del dato en este caso stream

router.post("/", async (req,res) => {
    let { nombre, descripcion, precio, imagen} = req.body
    if(!nombre || !descripcion || !precio || !imagen){
        res.send({status: "error", error: "Faltan datos"})
    }
    let result = await productsModel.create({nombre, descripcion, precio, imagen})
    res.send({result:"success", payload: result})
})
//put
router.put("/:id_producto", async (req, res) => {
    let { id_producto } = req.params;

    let productsToReplace = req.body;
    if (!productsToReplace.nombre || !productsToReplace.descripcion || !productsToReplace.precio || !productsToReplace.imagen) {
        res.send({ status: "error", error: "No existe el dato en los parametros" });
    }

    let result = await productsModel.updateOne({ _id: id_producto }, productsToReplace);
    res.send({ result: "success", payload: result });
});

//delete
router.delete("/:id_producto", async (req, res) => {
    let {id_producto} = req.params
    let result = await productsModel.deleteOne({ _id: id_producto})
    res.send({ result: "success", payload: result})
})

export default router
