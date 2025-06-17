import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCarrito } from "../Context/CarritoContext"; // Importamos el hook del contexto
import "../index.css";
import logo from "../assets/logo.webp";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false); // Estado para el menú móvil
  const { carrito } = useCarrito(); // Obtenemos el carrito desde el contexto

  const toggleMenu = () => setMenuOpen(!menuOpen);

  // Contar la cantidad total de artículos en el carrito
  const cantidadTotal = carrito.reduce(
    (total, producto) => total + producto.cantidad,
    0
  );

  return (
    <>
      <div className="bg-primary inline-flex p-2 w-full justify-between items-center">
        {/* Logo en la esquina izquierda */}
        <Link to={"/"}>
          <img src={logo} alt="Logo" className="w-60 h-30 ml-4" />
        </Link>

        {/* Botón de menú en dispositivos pequeños */}
        <div className="sm:hidden">
          <button className="text-3xl" onClick={toggleMenu}>
            &#9776; {/* Ícono de hamburguesa */}
          </button>
        </div>

        {/* Contenedor para los textos, centrado */}
        <div className="text-4xl flex-grow flex justify-center space-x-10 sm:flex pr-10">
          <Link
            to="/"
            className="hover:text-white transform transition duration-300">
            Inicio
          </Link>
          <Link
            to="/catalogo"
            className="hover:text-white transform transition duration-300">
            Productos
          </Link>
        </div>

        {/* Íconos de cuenta en la esquina derecha */}
        <ul className="flex space-x-4">
          <li className="relative">
            {/* Ícono de carrito */}
            <Link to="/carrito">
              <i className="fa-solid fa-cart-shopping text-5xl cursor-pointer pr-10 hover:text-white transform transition duration-600"></i>
              {/* Notificación circular con la cantidad de artículos */}
              {cantidadTotal > 0 && (
                <div className="absolute top-1 right-13 bg-red-600 text-white text-x rounded-full w-5 h-5 flex items-center justify-center">
                  {cantidadTotal}
                </div>
              )}
            </Link>
          </li>
        </ul>
      </div>

      {/* Menú de navegación móvil */}
      <div
        className={`${
          menuOpen ? "block" : "hidden"
        } sm:hidden bg-primary text-white text-center space-y-4 py-4`}>
        <Link to="/" className="block">
          Inicio
        </Link>
        <Link to="/catalogo" className="block">
          Productos
        </Link>
      </div>
    </>
  );
}
