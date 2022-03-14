const express = require("express");
const app = express();

const productsRouter = require("./src/routes/productRouter");

//para usar post hay que usar un middleware
//esto formatea la informacion que me envien desde un cliente
app.use(express.json());

//middlewares es una funcion que se ejecutan primero que todo
//Routes
app.use("/api/products", productsRouter);

const port = 8081;
app.listen(port, () => {
  console.log(`Server escuchando al puerto ${port}`);
});
