const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const Container = require("./Container");
const container = new Container("products.json");

const productsRouter = require("./src/routes/productRouter");

//Routes
app.use("/api/products", productsRouter);

//Estaticos
app.use("/static", express.static(__dirname + "/public"));

app.get("/form", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/", async (req, res) => {
  const newProduct = {
    title: req.body.title,
    price: Number(req.body.price),
    thumbnail: req.body.thumbnail,
  };
  res.json(await container.addProduct(newProduct));
});

const port = 8081;
const server = app.listen(port, () => {
  console.log(`Server escuchando al puerto ${port}`);
});

server.on("error", (error) => console.log(`Error en el servidor ${error}`));
