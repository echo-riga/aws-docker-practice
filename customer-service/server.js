const express = require("express");

const app = express();
app.use(express.json());

let customers = [
  { id: 1, name: "Sample Customer", email: "customer@example.com" },
];

let nextId = 2;

function validateCustomer(body) {
  return (
    typeof body.name === "string" &&
    body.name.trim().length > 0 &&
    typeof body.email === "string" &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email.trim())
  );
}

app.get("/customers", (req, res) => {
  res.json(customers);
});

app.get("/customers/:id", (req, res) => {
  const customer = customers.find(
    (item) => item.id === Number(req.params.id)
  );

  if (!customer) {
    return res.status(404).json({ error: "Customer not found" });
  }

  res.json(customer);
});

app.post("/customers", (req, res) => {
  if (!validateCustomer(req.body || {})) {
    return res.status(400).json({
      error: "Provide a nonempty name and a valid email address.",
    });
  }

  const customer = {
    id: nextId++,
    name: req.body.name.trim(),
    email: req.body.email.trim(),
  };

  customers.push(customer);
  res.status(201).json(customer);
});

app.put("/customers/:id", (req, res) => {
  const customer = customers.find(
    (item) => item.id === Number(req.params.id)
  );

  if (!customer) {
    return res.status(404).json({ error: "Customer not found" });
  }

  if (!validateCustomer(req.body || {})) {
    return res.status(400).json({
      error: "Provide a nonempty name and a valid email address.",
    });
  }

  customer.name = req.body.name.trim();
  customer.email = req.body.email.trim();

  res.json(customer);
});

app.delete("/customers/:id", (req, res) => {
  const index = customers.findIndex(
    (item) => item.id === Number(req.params.id)
  );

  if (index === -1) {
    return res.status(404).json({ error: "Customer not found" });
  }

  const [deletedCustomer] = customers.splice(index, 1);

  res.json({
    message: "Customer deleted",
    customer: deletedCustomer,
  });
});

const port = process.env.PORT || 3002;

app.listen(port, "0.0.0.0", () => {
  console.log(`Customer service running on port ${port}`);
});