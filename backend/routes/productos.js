const express = require("express");
const router = express.Router();
const db = require("../db");

// Obtener todos los productos
router.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM productos ORDER BY id ASC");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener productos" });
  }
});

// Obtener un producto por SKU
router.get("/:sku", async (req, res) => {
  const { sku } = req.params;
  try {
    const result = await db.query("SELECT * FROM productos WHERE sku = $1", [
      sku,
    ]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener producto por SKU" });
  }
});

// GET /api/productos?search=lapiz
router.get("/", async (req, res) => {
  const search = req.query.search || "";
  const result = await db.query(
    "SELECT * FROM productos WHERE descripcion ILIKE $1 ORDER BY id ASC",
    [`%${search}%`]
  );
  res.json(result.rows);
});

module.exports = router;
