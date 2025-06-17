import React, { useState } from "react";

export default function Reportes() {
  const [reportes, setReportes] = useState([
    {
      id: 1,
      nombre: "Reporte 1",
      estatus: "En proceso",
      detalles: "Detalles del reporte 1...",
    },
    {
      id: 2,
      nombre: "Reporte 2",
      estatus: "Completado",
      detalles: "Detalles del reporte 2...",
    },
  ]);
  const [nuevoEstatus, setNuevoEstatus] = useState("");

  // Función para actualizar el estatus del reporte
  const actualizarEstatus = (id) => {
    const reportesActualizados = reportes.map((reporte) =>
      reporte.id === id ? { ...reporte, estatus: nuevoEstatus } : reporte
    );
    setReportes(reportesActualizados);
    setNuevoEstatus("");
  };

  // Función para ver detalles
  const verDetalles = (detalles) => {
    alert(detalles); // Aquí puedes mostrar los detalles en un modal o página
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Reportes</h2>

      <table className="min-w-full table-auto border-separate rounded-lg">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Nombre</th>
            <th className="border px-4 py-2">Estatus</th>
            <th className="border px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {reportes.map((reporte) => (
            <tr key={reporte.id}>
              <td className="border px-4 py-2">{reporte.id}</td>
              <td className="border px-4 py-2">{reporte.nombre}</td>
              <td className="border px-4 py-2">
                <input
                  type="text"
                  value={nuevoEstatus}
                  onChange={(e) => setNuevoEstatus(e.target.value)}
                  className="border p-2 rounded"
                  placeholder="Actualizar estatus"
                />
              </td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => actualizarEstatus(reporte.id)}
                  className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700">
                  Actualizar Estatus
                </button>
                <button
                  onClick={() => verDetalles(reporte.detalles)}
                  className="ml-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                  Ver Detalles
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
