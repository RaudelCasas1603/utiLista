import React, { useEffect, useState } from "react";
import SearchBar from "../Components/SearchBar";
import Card from "../Components/Card";

export default function Catalogo() {
  const [productos, setProductos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("/api/productos")
      .then((res) => res.json())
      .then((data) => setProductos(data))
      .catch((err) => console.error("Error al cargar productos:", err));
  }, []);

  const productosFiltrados = productos.filter((producto) =>
    producto.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const mostrarProductos = searchTerm ? productosFiltrados : productos;

  return (
    <>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {mostrarProductos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
            {mostrarProductos.map((producto) => (
              <Card key={producto.id} {...producto} />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-600 text-lg sm:text-xl mt-12">
            No se encontraron productos que coincidan con la búsqueda.
          </div>
        )}
      </div>
    </>
  );
}
