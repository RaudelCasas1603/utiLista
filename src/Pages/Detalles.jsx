import React, { useState } from "react";
import { useCarrito } from "../Context/CarritoContext"; // Importamos el hook del contexto
import "../index.css";
import logo from "../assets/logo.webp";
import { Link } from "react-router-dom";

export default function Detalles() {
  const producto = {
    id: 1,
    sku: "A1009",
    nombre: "Lapiz Mae",
    descripcion: "Lápiz de color amarillo con goma de borrar",
    precio: 29.99,
    categoria: "Escritura",
    marca: "Mae",
    imagen: "/assets/productos/Mae/Lapices/A1006.webp",
    colores: ["#FFD700", "#FF6347", "#32CD32"], // Ejemplo de colores
  };

  const [cantidad, setCantidad] = useState(1);
  const [colorSeleccionado, setColorSeleccionado] = useState(
    producto.colores[0]
  );
  const [mensaje, setMensaje] = useState("");

  // Usamos el hook del contexto para acceder a la función agregarAlCarrito
  const { agregarAlCarrito } = useCarrito();

  // Funciones para aumentar y disminuir la cantidad
  const aumentarCantidad = () => setCantidad(cantidad + 1);
  const disminuirCantidad = () => setCantidad(cantidad > 1 ? cantidad - 1 : 1);

  // Función para manejar la acción de agregar al carrito
  const handleAgregarAlCarrito = () => {
    const productoConColor = {
      ...producto, // Copiamos todas las propiedades del producto
      color: colorSeleccionado, // Agregamos el color seleccionado
      cantidad, // Agregamos la cantidad seleccionada
    };

    // Llamamos a la función agregarAlCarrito del contexto
    agregarAlCarrito(productoConColor);

    setMensaje("Producto agregado al carrito con éxito!");
    setTimeout(() => {
      setMensaje(""); // Limpiamos el mensaje después de 3 segundos
    }, 1000);

    // Reiniciamos la cantidad y el color seleccionado
    setCantidad(1);
    setColorSeleccionado(producto.colores[0]);
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row p-6 space-x-6 items-center justify-between max-w-screen-lg mx-auto">
        {/* Imagen del producto */}
        <div className="w-full sm:w-1/2 mb-8 sm:mb-0">
          <div className="border-4 border-gray-300 p-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
            <img
              src={producto.imagen}
              alt={producto.nombre}
              className="w-full h-auto"
            />
          </div>
        </div>

        {/* Detalles del producto */}
        <div className="w-full sm:w-1/2 space-y-4">
          <h1 className="text-3xl font-bold">{producto.nombre}</h1>
          <p className="text-lg text-gray-700">{producto.descripcion}</p>
          <p className="text-xl text-gray-900 font-semibold">{`$${producto.precio.toFixed(
            2
          )}`}</p>
          <p className="text-lg text-gray-600">{producto.categoria}</p>
          <p className="text-lg text-gray-600">{producto.marca}</p>

          {/* Opciones de color */}
          <div className="flex items-center space-x-4">
            <p className="text-lg font-semibold">Color:</p>
            <div className="flex space-x-2">
              {producto.colores.map((color, index) => (
                <div
                  key={index}
                  className={`w-8 h-8 rounded-full border-2 ${
                    color === colorSeleccionado
                      ? "border-gray-800"
                      : "border-transparent"
                  } cursor-pointer`}
                  style={{ backgroundColor: color }}
                  onClick={() => setColorSeleccionado(color)}></div>
              ))}
            </div>
          </div>

          {/* Cantidad y botón */}
          <div className="flex items-center space-x-4 mt-4">
            <div className="flex items-center space-x-2">
              <button
                onClick={disminuirCantidad}
                className="bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition">
                -
              </button>
              <span className="text-lg font-semibold">{cantidad}</span>
              <button
                onClick={aumentarCantidad}
                className="bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition">
                +
              </button>
            </div>

            <button
              onClick={handleAgregarAlCarrito} // Llamada a la función aquí
              className="bg-blue-600 text-white px-6 py-2 rounded-lg text-xl font-semibold hover:bg-blue-700 transition duration-300">
              Agregar al Carrito
            </button>
          </div>

          {/* Mensaje de confirmación */}
          {mensaje && (
            <div className="mt-4 text-center text-green-600 font-semibold">
              {mensaje}
            </div>
          )}

          <div></div>
        </div>
      </div>
    </>
  );
}
