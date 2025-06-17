import React, { useState } from "react";
import ProductCRUD from "./ProductCRUD"; // Componente CRUD de productos
import Reportes from "./Reportes"; // Componente de reportes

export default function Dashboard() {
  const [seccionActiva, setSeccionActiva] = useState("productos"); // Controla la sección activa

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        Dashboard de Administrador
      </h1>

      {/* Navegación entre secciones */}
      <div className="flex justify-center space-x-6 mb-6">
        <button
          onClick={() => setSeccionActiva("productos")}
          className={`px-6 py-3 font-semibold text-xl ${
            seccionActiva === "productos"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700"
          } rounded-lg hover:bg-blue-700 transition duration-300`}>
          Gestión de Productos
        </button>
        <button
          onClick={() => setSeccionActiva("reportes")}
          className={`px-6 py-3 font-semibold text-xl ${
            seccionActiva === "reportes"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700"
          } rounded-lg hover:bg-blue-700 transition duration-300`}>
          Reportes
        </button>
      </div>

      {/* Sección de productos CRUD */}
      {seccionActiva === "productos" && <ProductCRUD />}

      {/* Sección de reportes */}
      {seccionActiva === "reportes" && <Reportes />}
    </div>
  );
}
