import express from "express";
import productRouter from "./router/product.routes.js";
import CartRouter from "./router/cart.routes.js";
import ProductManager from "./controllers/ProductManager.js";
import CartManager from "./controllers/CartManager.js";
import mongoose from "mongoose";
import cartsRouter from "./router/carts.routes.js"
import productsRouter from "./router/products.routes.js"
import messagesRouter from "./router/messages.routes.js"
import uploadRouter from "./router/upload.routes.js"
import { engine } from "express-handlebars";
import { Server } from 'socket.io';
import { createServer } from "http";
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const httpServer = createServer(app);
const PORT = 8080;
const socket = new Server(httpServer);

const product = new ProductManager();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/*mongoose*/

mongoose.connect("mongodb+srv://geastudilloaray:Kekax3E6hriT9VIm@cluster0.y9dzoa8.mongodb.net/?retryWrites=true&w=majority")
.then(()=> {
    console.log("Conectado a la base de datos")
})
.catch(error => {
    console.log("Error al ingrasar a la base de datos, error"+error)
})

//crud con postman
app.use("/api/carts",cartsRouter)
app.use("/api/msg",messagesRouter)
app.use("/api/producto",productsRouter)
//prueba multer
app.use("/api/upload", uploadRouter)

app.use("/products", productRouter);
app.use("/api/cart", CartRouter);



app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", path.resolve(__dirname, "views"));

app.get("/chat", async (req, res) => {
  res.render("chat", {
    title: "Chat Mongoose"

  })
})
// Resto del código de Socket.io

const User = {};

socket.on("connection", (socket) => {
  console.log("Un usuario conectado");

  socket.on("messaje", (data) => {
    console.log(data);
  });

  socket.on("newProduct", (productData) => {
    product.addProducts(productData);
    console.log("Nuevo producto recibido:", productData);
    socket.emit("productAdded", productData);
  });
});

httpServer.listen(PORT, () => {
  console.log(`Servidor express funcionando en el puerto ${PORT}`);
});