import React from "react";
import { Link } from "react-router-dom";
import homeImage from "../assets/homeImage.webp";
import "../index.css";

export default function Inicio() {
  return (
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Encabezado principal */}
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-semibold mb-4 text-primary">
          Calidad
        </h1>
        <h2 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight">
          Descubre lo mejor en productos <br />
          <span className="text-primary">escolares</span>
        </h2>
        <p className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto">
          Ofrecemos una amplia variedad de productos escolares para satisfacer
          todas tus necesidades, desde útiles hasta mochilas, todo con la mejor
          calidad y precios competitivos.
        </p>
      </div>

      {/* Beneficios */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          {
            icon: "fa-pencil",
            title: "Variedad",
            desc: "Desde útiles hasta mochilas, tenemos todo lo que necesitas.",
          },
          {
            icon: "fa-circle-check",
            title: "Calidad",
            desc: "Productos de alta calidad para un rendimiento óptimo.",
          },
          {
            icon: "fa-money-bill-wave",
            title: "Precios Competitivos",
            desc: "Ofrecemos precios accesibles sin comprometer la calidad.",
          },
        ].map((item, index) => (
          <div
            key={index}
            className="p-6 rounded-lg shadow-lg flex flex-col items-center text-center border-2 border-primary hover:bg-primary hover:text-white transition duration-300">
            <i className={`fa-solid ${item.icon} fa-2xl mb-6`}></i>
            <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
            <p>{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Sección de beneficios con imagen */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mt-20">
        <div>
          <h2 className="text-3xl font-bold mb-4">
            Descubre los beneficios de comprar en nuestra tienda en línea.
          </h2>
          <p className="text-gray-700 mb-8">
            Nuestra tienda ofrece una experiencia de compra intuitiva y
            accesible. Además, contamos con un equipo de atención al cliente
            disponible para ayudarte en todo momento.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-1">Navegación Fácil</h3>
              <p className="text-gray-600">
                Encuentra lo que necesitas rápidamente con nuestro diseño
                amigable y organizado.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-1">
                Atención al Cliente
              </h3>
              <p className="text-gray-600">
                Nuestro equipo está disponible para resolver tus dudas y
                ofrecerte asesoría.
              </p>
            </div>
          </div>
        </div>

        {/* Imagen */}
        <div
          className="w-full h-64 sm:h-80 lg:h-[400px] rounded-lg shadow-lg bg-cover bg-center"
          style={{ backgroundImage: `url(${homeImage})` }}></div>
      </div>

      {/* Botón CTA */}
      <div className="flex justify-center mt-12">
        <Link to="/catalogo">
          <button className="bg-primary text-white px-8 py-3 rounded-lg text-xl font-semibold hover:bg-secondary transition duration-300">
            Comprar Ahora
          </button>
        </Link>
      </div>
    </div>
  );
}
