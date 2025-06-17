import react from "react";
import { Link } from "react-router-dom";

export default function Card() {
  const producto = {
    id: 1,
    sku: "A1009",
    nombre: "Lapiz Mae",
    descripcion: "lapiz de color amarillo con goma de borrar",
    precio: 29.99,
    categoria: "Escritura",
    marca: "Mae",
    imagen: "/assets/productos/Mae/Lapices/A1009.webp",
  };

  const categoriasColores = {
    Escritura: "bg-yellow-200",
    Borradores: "bg-blue-200",
    Adhesivos: "bg-green-200",
    Colores: "bg-purple-200",
    Crayones: "bg-red-200",
  };

  const categoriaColor = categoriasColores[producto.categoria] || "bg-gray-200";

  return (
    <>
      <div className="p-6 rounded-lg shadow-lg border-2 border-primary hover:bg-primary transition duration-600 hover:text-white">
        <Link to={`/detalles/${producto.sku}`}>
          <img
            src={producto.imagen}
            alt="Producto"
            className="w-48 h-48 object-cover"
          />
          <h3 className="text-xl font-bold mt-4">{producto.nombre}</h3>
          <p className="text-lg font-semibold">${producto.precio}</p>
          {/* Solo aplicamos el fondo a la categoría */}
          <p
            className={`text-lg font-semibold rounded-lg w-25 pl-2 ${categoriaColor}`}>
            {producto.categoria}
          </p>
          <p className="text-lg font-semibold">{producto.marca}</p>
        </Link>
      </div>
    </>
  );
}
