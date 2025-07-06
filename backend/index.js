const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const productosRoutes = require("./routes/productos");
const cotizacionesRoutes = require("./routes/cotizaciones");

const app = express();

// 📁 Archivos estáticos (imágenes)
app.use("/static", express.static(path.join(__dirname, "public")));

// 🌐 Middleware
app.use(cors());
app.use(express.json());

// 📦 Rutas de API
app.use("/api/productos", productosRoutes);
app.use("/api/cotizaciones", cotizacionesRoutes); // <-- este iba antes del listen

// 🚀 Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en puerto ${PORT}`);
});
