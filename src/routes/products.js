const express = require("express");
const { Router } = express;
const router = new Router();

const Container = require("../../container");
const container = new Container("productos.json");

router.get("/", (req, res) => {
  res.send("Hola productos");
});

router.get("/getAll", async (req, res) => {
  res.json(await container.getAll());
});
router.get("/:id", async (req, res) => {
  res.json(await container.getById(req.params.id));
});

router.post("/", async (req, res) => {
  await container.save(req.body);
  res.send("Producto guardado");
});
//tengo que ver como hacer el id en string o viceversa

module.exports = router;
