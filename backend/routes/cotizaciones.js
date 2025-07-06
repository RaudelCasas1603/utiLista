const express = require("express");
const router = express.Router();
const pool = require("../db"); // <-- usa tu pool en CommonJS

/*
  Body esperado:
  {
    cliente: { nombre, telefono, direccion },
    carrito: [
      { producto_id, sku, variante, cantidad, precio }
    ],
    descuento: 0.25        // opcional
  }
*/
router.post("/", async (req, res) => {
  const client = await pool.connect();

  try {
    const { cliente, carrito, descuento } = req.body;

    /* 1️⃣  total */
    const totalBruto = carrito.reduce((t, p) => t + p.precio * p.cantidad, 0);
    const totalNeto = descuento ? totalBruto * (1 - descuento) : totalBruto;

    await client.query("BEGIN");

    /* 2️⃣  cotizaciones */
    const cotRes = await client.query(
      `INSERT INTO cotizaciones (fecha, total, estado)
       VALUES (NOW(), $1, 'PENDIENTE')
       RETURNING id`,
      [totalNeto]
    );
    const cotizacionId = cotRes.rows[0].id;

    /* 3️⃣  clientes */
    await client.query(
      `INSERT INTO clientes (cotizacion_id, nombre, telefono, direccion)
       VALUES ($1, $2, $3, $4)`,
      [
        cotizacionId,
        cliente.nombre,
        cliente.telefono,
        cliente.direccion, // <-- usa tu propio campo email si lo tienes
      ]
    );

    /* 4️⃣  cotizacion_items — construimos query dinámica */
    const valueStrings = [];
    const values = [cotizacionId];

    carrito.forEach((p, idx) => {
      const base = idx * 5 + 2; // porque $1 ya es cotizacionId
      valueStrings.push(
        `($1, $${base}, $${base + 1}, $${base + 2}, $${base + 3}, $${base + 4})`
      );
      values.push(
        p.producto_id, // o busca por SKU dentro del backend
        p.variante || null,
        p.cantidad,
        p.precio,
        p.precio * p.cantidad
      );
    });

    if (valueStrings.length) {
      const itemsSQL = `
        INSERT INTO cotizacion_items
        (cotizacion_id, producto_id, variante, cantidad, precio_unitario, subtotal)
        VALUES ${valueStrings.join(", ")}
      `;
      await client.query(itemsSQL, values);
    }

    await client.query("COMMIT");
    res.json({ ok: true, cotizacionId });
  } catch (err) {
    await client.query("ROLLBACK");
    console.error(err);
    res.status(500).json({ ok: false, error: "Error guardando cotización" });
  } finally {
    client.release();
  }
});

module.exports = router;
