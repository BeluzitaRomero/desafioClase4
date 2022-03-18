const express = require("express");
const app = express();
const { engine } = require("express-handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const Container = require("./Container");
const container = new Container("products.json");

//Config para handlebars
app.set("views", "./src/views");
app.set("view engine", "hbs");

app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    defaultLayout: "main.hbs",
  })
);

//Routes
const productsRouter = require("./src/routes/productRouter");
app.use("/api/products", productsRouter);

//Estaticos
app.use("/static", express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});
app.get("/products", async (req, res) => {
  res.render("index", { data: await container.getAll() });
});

app.post("/products", async (req, res) => {
  const newProduct = {
    title: req.body.title,
    price: Number(req.body.price),
    thumbnail: req.body.thumbnail,
  };
  await container.save(newProduct);
  res.sendFile(__dirname + "/public/index.html");
});

const port = 8081;
const server = app.listen(port, () => {
  console.log(`Server escuchando al puerto ${port}`);
});

server.on("error", (error) => console.log(`Error en el servidor ${error}`));
