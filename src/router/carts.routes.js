import { Router } from "express";
import { cartsModel } from "../models/carts.model.js";

const router = Router();

//get traer resultados

router.get('/', async (req, res) => {
    try {
        let carts = await cartsModel.find();
        res.send({ result: "success", payload: carts });
    } catch (error) {
        console.log(error);
    }
});

//post debe seguir los pasos del moderado en la validacion de la creacion del dato en este caso stream

router.post("/", async (req,res) => {
    let { nombre, descripcion, precio} = req.body
    if(!nombre || !descripcion || !precio){
        res.send({status: "error", error: "Faltan datos"})
    }
    let result = await cartsModel.create({nombre, descripcion, precio})
    res.send({result:"success", payload: result})
})
//put
router.put("/:id_cart", async (req, res) => {
    let { id_cart } = req.params;

    let cartsToReplace = req.body;
    if (!cartsToReplace.nombre || !cartsToReplace.descripcion || !cartsToReplace.precio) {
        res.send({ status: "error", error: "No existe el dato en los parametros" });
    }

    let result = await cartsModel.updateOne({ _id: id_cart }, cartsToReplace);
    res.send({ result: "success", payload: result });
});

//delete
router.delete("/:id_cart", async (req, res) => {
    let {id_cart} = req.params
    let result = await cartsModel.deleteOne({ _id: id_cart})
    res.send({ result: "success", payload: result})
})

export default router

