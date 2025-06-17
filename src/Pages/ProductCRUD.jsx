import React, { useState } from "react";
import Card from "../Components/card";
import { Link } from "react-router-dom";
import * as XLSX from "xlsx"; // Importamos la librería xlsx

export default function Catalogo() {
  const [productos, setProductos] = useState([]); // Lista de productos

  // Función para cargar los productos desde un archivo Excel
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: "array" });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const productosLeidos = XLSX.utils.sheet_to_json(worksheet, {
          header: 1,
        });

        productosLeidos.shift(); // Eliminamos la fila de encabezado
        const productosConDatos = productosLeidos.map((fila) => ({
          sku: fila[0],
          nombre: fila[1],
          descripcion: fila[2],
          precio: fila[3],
          categoria: fila[4],
          marca: fila[5],
          imagen: fila[6],
        }));

        setProductos(productosConDatos);
      };

      reader.readAsArrayBuffer(file);
    }
  };

  // Función para borrar todos los productos
  const borrarTodosProductos = () => {
    setProductos([]);
  };

  return (
    <div className="p-8">
      {/* Carga masiva desde Excel */}
      <div className="mb-6">
        <input
          type="file"
          accept=".xlsx,.xls"
          onChange={handleFileChange}
          className="border p-2 rounded"
        />
        <p className="text-sm mt-2">Carga un archivo Excel con productos.</p>
      </div>

      {/* Botón para borrar todos los productos */}
      <div className="text-center mb-8">
        <button
          onClick={borrarTodosProductos}
          className="bg-red-600 text-white px-6 py-3 rounded-lg text-xl font-semibold hover:bg-red-700 transition duration-300">
          Borrar Todos los Productos
        </button>
      </div>

      {/* Lista de productos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-2">
        {productos.length > 0 ? (
          productos.map((producto) => (
            <Card key={producto.sku} producto={producto} />
          ))
        ) : (
          <p>No hay productos disponibles.</p>
        )}
      </div>
    </div>
  );
}
