const fs = require("fs").promises;

class Container {
  constructor(file) {
    this.file = file;
  }

  async getAll() {
    try {
      const allProducts = await fs.readFile(this.file, "utf-8");
      return JSON.parse(allProducts);
    } catch (err) {
      console.log("No hay productos");
      return null;
    }
  }

  async save(product) {
    const arrayProducts = await this.getAll();

    if (!arrayProducts) {
      await fs.writeFile(this.file, "[]");
      return "asignando espacio para almacenamiento";
    }
    if (arrayProducts.length === 0) {
      product.id = 1;
      arrayProducts.push(product);
      await fs.writeFile(this.file, JSON.stringify(arrayProducts));
      return product.id;
    }
    let id = arrayProducts.map((p) => p.id);
    let maxId = Math.max(...id);
    const saveProduct = { ...product, id: maxId + 1 };
    await arrayProducts.push(saveProduct);
    await fs.writeFile(this.file, JSON.stringify(arrayProducts));
    return saveProduct.id;
  }

  async getById(number) {
    let showId = await this.getAll();
    if (!showId) return null;
    let objectSelected = showId.find((obj) => obj.id === number);
    return objectSelected ? objectSelected : null;
  }

  async deleteById(id) {
    const arrayProducts = await this.getAll();
    if (!arrayProducts) return;
    const updateArray = arrayProducts.filter((obj) => obj.id !== id);
    await fs.writeFile(this.file, JSON.stringify(updateArray));
  }

  async deleteAll() {
    await fs.writeFile(this.file, "[]");
  }
}

module.exports = Container;
