import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCarrito } from "../Context/CarritoContext";
import logo from "../assets/logo.webp";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { carrito } = useCarrito();

  // Total de artículos
  const total = carrito.reduce((sum, p) => sum + p.cantidad, 0);

  return (
    <header className="bg-primary text-white">
      {/* Barra principal */}
      <nav className="container mx-auto flex items-center justify-between p-3 md:p-4">
        {/* Logo */}
        <Link to="/" className="flex-shrink-0">
          <img src={logo} alt="Logo" className="h-10 w-auto md:h-12" />
        </Link>

        {/* Links desktop */}
        <ul className="hidden sm:flex gap-8 text-lg md:text-xl lg:text-2xl font-medium tracking-wide">
          <li>
            <Link to="/" className="hover:text-gray-200 transition">
              Inicio
            </Link>
          </li>
          <li>
            <Link to="/catalogo" className="hover:text-gray-200 transition">
              Productos
            </Link>
          </li>
        </ul>

        {/* Carrito */}
        <Link
          to="/carrito"
          aria-label={`Carrito con ${total} artículo${total !== 1 ? "s" : ""}`}
          className="relative text-2xl md:text-3xl hover:text-gray-200 transition">
          <i className="fa-solid fa-cart-shopping" />
          {total > 0 && (
            <span className="absolute -top-1.5 -right-2 w-5 h-5 flex items-center justify-center rounded-full bg-red-600 text-xs leading-none">
              {total}
            </span>
          )}
        </Link>

        {/* Hamburguesa móvil */}
        <button
          onClick={() => setOpen(!open)}
          className="sm:hidden text-3xl focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}>
          {open ? (
            <i className="fa-solid fa-xmark" />
          ) : (
            <i className="fa-solid fa-bars" />
          )}
        </button>
      </nav>

      {/* Menú móvil */}
      {open && (
        <div className="sm:hidden bg-primary/95 backdrop-blur-md">
          <ul className="flex flex-col items-center gap-4 py-4 text-lg">
            <li>
              <Link to="/" onClick={() => setOpen(false)}>
                Inicio
              </Link>
            </li>
            <li>
              <Link to="/catalogo" onClick={() => setOpen(false)}>
                Productos
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
