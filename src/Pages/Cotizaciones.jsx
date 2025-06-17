import React, { useState, useEffect } from "react";

export default function Dashboard() {
  const [cotizaciones, setCotizaciones] = useState([]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        Dashboard de Administrador
      </h1>

      {/* Filtros y búsqueda (opcional) */}
      <div className="my-6 flex justify-between items-center">
        <div className="flex items-center">
          <label className="mr-2">Buscar por nombre:</label>
          <input
            type="text"
            placeholder="Ingrese el nombre"
            className="border p-2 rounded"
            // Aquí puedes implementar la búsqueda dinámica
          />
        </div>
        <div className="flex items-center">
          <label className="mr-2">Filtrar por fecha:</label>
          <input
            type="date"
            className="border p-2 rounded"
            // Aquí puedes implementar un filtro por fecha
          />
        </div>
      </div>
      {/* Tabla de Cotizaciones */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full table-auto border-separate rounded-lg">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Nombre</th>
              <th className="border px-4 py-2">Teléfono</th>
              <th className="border px-4 py-2">Total</th>
              <th className="border px-4 py-2">Fecha</th>
              <th className="border px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {cotizaciones.length > 0 ? (
              cotizaciones.map((cotizacion) => (
                <tr key={cotizacion._id}>
                  <td className="border px-4 py-2">{cotizacion._id}</td>
                  <td className="border px-4 py-2">{cotizacion.nombre}</td>
                  <td className="border px-4 py-2">{cotizacion.telefono}</td>
                  <td className="border px-4 py-2">
                    ${cotizacion.total.toFixed(2)}
                  </td>
                  <td className="border px-4 py-2">
                    {new Date(cotizacion.fecha).toLocaleDateString()}
                  </td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => alert("Ver detalles de la cotización")}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300">
                      Ver detalles
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="border text-center py-4">
                  No hay cotizaciones disponibles.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Opcional: Agregar acciones globales */}
      <div className="mt-6 text-center">
        <button className="bg-green-600 text-white px-6 py-3 rounded-lg text-xl font-semibold hover:bg-green-700 transition duration-300">
          Descargar Reporte
        </button>
      </div>
    </div>
  );
}
