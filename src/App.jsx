import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Usamos Routes en lugar de Switch
import Navbar from "./Components/NavBar";
import Footer from "./Components/Footer";
import Inicio from "./Pages/Inicio";
import Catalogo from "./Pages/Catalogo";
import Detalles from "./Pages/Detalles"; // Asegúrate de importar el componente Detalles si lo necesitas
import Carrito from "./Pages/Carrito";
import { CarritoProvider } from "./Context/CarritoContext"; // Importa el CarritoProvider
import Dashboard from "./Pages/Dashboard";

export default function App() {
  return (
    // Envolvemos toda la aplicación con el CarritoProvider
    <CarritoProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />{" "}
          <div className="flex-grow">
            {" "}
            {/* Contenedor para el contenido principal */}
            {/* Barra de navegación que estará disponible en todas las páginas */}
            <Routes>
              <Route path="/" element={<Inicio />} />{" "}
              {/* Ruta para la página de Inicio */}
              <Route path="/catalogo" element={<Catalogo />} />{" "}
              {/* Ruta para la página de Catálogo */}
              <Route path="/detalles/A1009" element={<Detalles />} />{" "}
              {/* Ruta para la página de Detalles */}
              <Route path="/carrito" element={<Carrito />} />{" "}
              <Route path="/dashboard" element={<Dashboard />} />{" "}
              {/* Ruta para la página del Carrito */}
            </Routes>
          </div>
          <Footer />{" "}
          {/* Pie de página que estará disponible en todas las páginas */}
        </div>
      </Router>
    </CarritoProvider>
  );
}
