import React from "react";

export default function SearchBar() {
  return (
    <div className="flex items-center justify-end mr-8 mt-3">
      {" "}
      {/* Alinea todo a la izquierda */}
      <input
        type="text"
        placeholder="Buscar productos..."
        className="w-120 h-12 p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-primary" // Ajustamos la altura del input
      />
      <button className="bg-primary text-white px-4 py-2 h-12 rounded-r-lg hover:bg-blue-700 transition duration-300">
        {" "}
        {/* Ajustamos la altura del botón */}
        <i className="fa-solid fa-magnifying-glass fa-2xl"></i>
      </button>
    </div>
  );
}
