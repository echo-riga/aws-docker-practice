const express = require("express");

const app = express();
app.use(express.json());

let products = [
  { id: 1, name: "Notebook", price: 50, stock: 20 },
  { id: 2, name: "Pen", price: 15, stock: 100 },
];

let nextId = 3;

function validateProduct(body) {
  return (
    typeof body.name === "string" &&
    body.name.trim().length > 0 &&
    typeof body.price === "number" &&
    Number.isFinite(body.price) &&
    body.price >= 0 &&
    Number.isInteger(body.stock) &&
    body.stock >= 0
  );
}

// List all products.
app.get("/products", (req, res) => {
  res.json(products);
});

// Retrieve one product.
app.get("/products/:id", (req, res) => {
  const product = products.find(
    (item) => item.id === Number(req.params.id)
  );

  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  res.json(product);
});

// Create a product.
app.post("/products", (req, res) => {
  if (!validateProduct(req.body || {})) {
    return res.status(400).json({
      error:
        "Provide a nonempty name, a nonnegative numeric price, and a nonnegative integer stock.",
    });
  }

  const product = {
    id: nextId++,
    name: req.body.name.trim(),
    price: req.body.price,
    stock: req.body.stock,
  };

  products.push(product);

  res.status(201).json(product);
});

// Replace a product's editable fields.
app.put("/products/:id", (req, res) => {
  const product = products.find(
    (item) => item.id === Number(req.params.id)
  );

  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  if (!validateProduct(req.body || {})) {
    return res.status(400).json({
      error:
        "Provide a nonempty name, a nonnegative numeric price, and a nonnegative integer stock.",
    });
  }

  product.name = req.body.name.trim();
  product.price = req.body.price;
  product.stock = req.body.stock;

  res.json(product);
});

// Delete a product.
app.delete("/products/:id", (req, res) => {
  const index = products.findIndex(
    (item) => item.id === Number(req.params.id)
  );

  if (index === -1) {
    return res.status(404).json({ error: "Product not found" });
  }

  const [deletedProduct] = products.splice(index, 1);

  res.json({
    message: "Product deleted",
    product: deletedProduct,
  });
});

const port = process.env.PORT || 3001;

app.listen(port, "0.0.0.0", () => {
  console.log(`Product service running on port ${port}`);
});