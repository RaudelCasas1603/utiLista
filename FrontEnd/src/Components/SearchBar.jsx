import React from "react";

export default function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <div className="flex items-center justify-end mr-8 mt-3">
      <input
        type="text"
        placeholder="Buscar productos..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-120 h-12 p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-primary"
      />
      <button
        className="bg-primary text-white px-4 py-2 h-12 rounded-r-lg hover:bg-blue-700 transition duration-300"
        onClick={() => setSearchTerm(searchTerm.trim())}>
        <i className="fa-solid fa-magnifying-glass fa-2xl"></i>
      </button>
    </div>
  );
}
