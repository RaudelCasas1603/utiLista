import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Components/NavBar";
import Footer from "./Components/Footer";
import Inicio from "./Pages/Inicio";
import Catalogo from "./Pages/Catalogo";
import Detalles from "./Pages/Detalles";
import Carrito from "./Pages/Carrito";
import { CarritoProvider } from "./Context/CarritoContext";

export default function App() {
  return (
    <CarritoProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<Inicio />} />
              <Route path="/catalogo" element={<Catalogo />} />
              <Route path="/detalles/:sku" element={<Detalles />} />
              <Route path="/carrito" element={<Carrito />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </CarritoProvider>
  );
}
