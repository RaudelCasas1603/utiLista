import react from "react";
import { Link } from "react-router-dom";
import homeImage from "../assets/homeImage.webp";
import "../index.css";

export default function Inicio() {
  return (
    <>
      <div className="flex flex-col items-center justify-center p-8">
        <h1 className="text-4xl mb-4 mt-8">Calidad</h1>
        <h1 className="text-6xl font-bold mb-8 text-center">
          Descubre lo mejor en productos <br />
          <p className="text-center">escolares</p>
        </h1>
        <h2 className="text-2xl mb-4">
          Ofrecemos una amplia variedad de productos escolares para satisfacer
          todas tus <br />
        </h2>
        <h2 className="text-2xl mb-4">
          necesidades, desde útiles hasta mochilas, todo con la mejor calidad y
          precios competitivos.
        </h2>

        {/* Beneficios de Comprar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-4 ">
          <div className="p-4 rounded-lg shadow-lg flex flex-col items-center border-2 border-primary hover:bg-primary transition duration-600 hover:text-white ">
            <i className="fa-solid fa-pencil fa-2xl py-8"></i>
            <h3 className="text-2xl font-bold mb-2">Variedad</h3>
            <p className="text-center">
              Desde útiles hasta mochilas, tenemos todo lo que necesitas.
            </p>
          </div>
          <div className="p-6 rounded-lg shadow-lg flex flex-col items-center border-2 border-primary hover:bg-primary transition duration-600 hover:text-white">
            <i className="fa-solid fa-circle-check fa-2xl pb-8 pt-8"></i>
            <h3 className="text-2xl font-bold mb-2">Calidad</h3>
            <p className="text-center">
              Productos de alta calidad para un rendimiento óptimo.
            </p>
          </div>
          <div className="p-6 rounded-lg shadow-lg flex flex-col items-center border-2 border-primary hover:bg-primary transition duration-600 hover:text-white">
            <i className="fa-solid fa-money-bill-wave fa-2xl pb-8 pt-8"></i>
            <h3 className="text-2xl font-bold mb-2">Precios Competitivos</h3>
            <p className="text-center">
              Ofrecemos precios accesibles sin comprometer la calidad.
            </p>
          </div>
        </div>

        {/* Beneficios Tienda */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-20 mb-8">
          <div className="flex flex-col justify-center items-start">
            <h1 className="text-4xl font-bold mb-4 ">
              Descubre los beneficios de comprar en nuestra tienda en línea.
            </h1>
            <p>
              Nuestra tienda ofrece una experiencia de compra intuitiva y
              accesible. <br />
              Además, contamos con un equipo de atención al cliente disponible
              para ayudarte en todo momento.
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-8">
              <div>
                <h2 className="text-2xl font-bold mb-2">Navegación Fácil</h2>
                <p>
                  Encuentra lo que necesitas rápidamente con nuestro diseño
                  amigable y organizado.
                </p>
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-2">Atención al Cliente</h2>
                <p>
                  Nuestro equipo está disponible para resolver tus dudas y
                  ofrecerte asesoría.
                </p>
              </div>
            </div>
          </div>
          <div
            className="bg-cover bg-center w-full h-full rounded-lg shadow-lg"
            style={{
              backgroundImage: `url(${homeImage})`,
              height: "400px", // Ajusta la altura según necesites
            }}></div>
        </div>
        {/* Botón de Compra */}
        <div className="flex justify-center mt-8">
          <button className="bg-primary text-white px-6 py-3 rounded-lg text-2xl hover:bg-secondary transition duration-300">
            <Link to="/catalogo" className="text-white">
              <h2 href="/Catalogo">Comprar Ahora</h2>
            </Link>
          </button>
        </div>
      </div>
    </>
  );
}
