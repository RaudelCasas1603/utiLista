import react from "react";
import Navbar from "../Components/NavBar";
import Footer from "../Components/Footer";
import Card from "../Components/card";
import SearchBar from "../Components/SearchBar";
import { useState } from "react";

export default function Catalogo() {
  return (
    <>
      <SearchBar />
      <div className="flex flex-col items-center justify-center p-8">
        {/* Aquí puedes agregar los productos del catálogo */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-2">
          {/* Ejemplo de producto */}
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          {/* Repite el bloque anterior para más productos */}
        </div>
      </div>
    </>
  );
}
