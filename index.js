const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const Container = require("./Container");
const container = new Container("products.json");

app.set("views", "./src/views");
app.set("view engine", "pug");

const productsRouter = require("./src/routes/productRouter");

//Routes
app.use("/api/products", productsRouter);

//Estaticos
app.use("/static", express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.render("index");
});
app.get("/products", async (req, res) => {
  res.render("products", { data: await container.getAll() });
});

app.post("/products", async (req, res) => {
  const newProduct = {
    title: req.body.title,
    price: Number(req.body.price),
    thumbnail: req.body.thumbnail,
  };
  await container.save(newProduct);
  res.render("index");
});

const port = 8081;
const server = app.listen(port, () => {
  console.log(`Server escuchando al puerto ${port}`);
});

server.on("error", (error) => console.log(`Error en el servidor ${error}`));
