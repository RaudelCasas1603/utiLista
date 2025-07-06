import { useCarrito } from "../Context/CarritoContext";
import "../index.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Detalles() {
  const { sku } = useParams();
  const [producto, setProducto] = useState(null);
  const [cantidad, setCantidad] = useState(1);
  const [colorSeleccionado, setColorSeleccionado] = useState(null);
  const [mensaje, setMensaje] = useState("");

  const { agregarAlCarrito } = useCarrito();

  useEffect(() => {
    fetch(`/api/productos/${sku}`)
      .then((res) => res.json())
      .then((data) => {
        setProducto(data);
        const variantes =
          data.variantes?.split(",").map((v) => v.trim().toUpperCase()) || [];
        if (variantes.length > 0) {
          setColorSeleccionado(variantes[0]);
        }
      })
      .catch((error) => console.error("Error cargando producto:", error));
  }, [sku]);

  if (!producto) {
    return (
      <p className="text-center text-gray-600 mt-10">Cargando producto...</p>
    );
  }

  const aumentarCantidad = () => setCantidad(cantidad + 1);
  const disminuirCantidad = () => setCantidad(cantidad > 1 ? cantidad - 1 : 1);

  const handleAgregarAlCarrito = () => {
    const productoConColor = {
      sku: producto.sku,
      nombre: producto.descripcion,
      precio: producto.costo ?? 0,
      imagen: producto.imagen,
      ...(colorSeleccionado && { color: colorSeleccionado }),
      cantidad,
    };

    agregarAlCarrito(productoConColor);

    setMensaje("Producto agregado al carrito con éxito!");
    setTimeout(() => setMensaje(""), 1000);
    setCantidad(1);
    const variantes =
      producto.variantes?.split(",").map((v) => v.trim().toUpperCase()) || [];
    setColorSeleccionado(variantes[0] || null);
  };

  const coloresHex = {
    ROJO: "#FF0000",
    NEGRO: "#000000",
    AZUL: "#0000FF",
    "AZUL CLARO": "#87CEFA",
    "AZUL CELESTE": "#87CEEB",
    "AZUL CIELO": "#87CEEB",
    "AZUL OBSCURO": "#00008B",
    "AZUL PASTEL": "#B0E0E6",
    "AZUL REY": "#0033A0",
    "AZUL ULTRAMAR": "#3F00FF",
    VERDE: "#008000",
    "VERDE LIMON": "#BFFF00",
    "VERDE NEON": "#39FF14",
    AMARILLO: "#FFD700",
    "AMARILLO NEON": "#FFFF33",
    ROSA: "#FFC0CB",
    "ROSA CLARO": "#FFB6C1",
    "ROSA MEXICANO": "#E4007C",
    "ROSA PASTEL": "#FFD1DC",
    MORADO: "#800080",
    LILA: "#C8A2C8",
    FIUSHA: "#D30094",
    VIOLETA: "#8F00FF",
    BLANCO: "#FFFFFF",
    NARANJA: "#FFA500",
    PAPAYA: "#FFEFD5",
    MAGENTA: "#FF00FF",
    CAFE: "#8B4513",
    CAFÉ: "#8B4513",
    GRIS: "#808080",
    CARNE: "#FAD6A5",
    "PLATA ORO": "#D4AF37",
    METÁLICO: "#D4AF37",
    LIMON: "#FDFD96",
    "VARIOS COLORES": "gradient",
    DEFAULT: "#CCCCCC",
  };

  const variantes = producto.variantes
    ? producto.variantes.split(",").map((v) => v.trim().toUpperCase())
    : [];

  const isCuaderno = producto.categoria?.trim().toLowerCase() === "cuadernos";

  return (
    <div className="max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col sm:flex-row gap-8 items-start">
        {/* Imagen */}
        <div className="w-full sm:w-1/2">
          <div className="border-4 border-gray-200 p-2 rounded-lg shadow hover:shadow-lg transition duration-300">
            <img
              src={`/static${producto.imagen}`}
              alt={producto.nombre}
              className="w-full h-auto object-contain"
            />
          </div>
        </div>

        {/* Detalles */}
        <div className="w-full sm:w-1/2 space-y-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            {producto.descripcion}
          </h1>
          <p className="text-xl text-gray-900 font-semibold">
            ${producto.costo}
          </p>
          <p className="text-md text-gray-600">{producto.categoria}</p>
          <p className="text-md text-gray-600">{producto.marca}</p>

          {/* Variantes */}
          {variantes.length > 0 && (
            <div>
              <p className="text-lg font-medium mb-2">
                {isCuaderno ? "Rayado:" : "Colores disponibles:"}
              </p>
              <div
                className={`${
                  isCuaderno ? "flex flex-wrap gap-2" : "grid grid-cols-6 gap-2"
                }`}>
                {variantes.map((color, i) => {
                  if (isCuaderno) {
                    return (
                      <button
                        key={i}
                        onClick={() => setColorSeleccionado(color)}
                        className={`px-3 py-1 rounded-full border text-sm font-medium transition ${
                          colorSeleccionado === color
                            ? "bg-primary text-white"
                            : "bg-gray-200 text-gray-800"
                        }`}>
                        {color}
                      </button>
                    );
                  }

                  const isGradient = coloresHex[color] === "gradient";
                  const bgStyle = isGradient
                    ? {
                        backgroundImage:
                          "linear-gradient(135deg, red, orange, yellow, green, blue, indigo, violet)",
                      }
                    : { backgroundColor: coloresHex[color] || "#ccc" };

                  return (
                    <button
                      key={i}
                      title={color}
                      onClick={() => setColorSeleccionado(color)}
                      className={`w-8 h-8 rounded-full border-2 transition ${
                        colorSeleccionado === color
                          ? "border-gray-800 scale-110"
                          : "border-transparent"
                      }`}
                      style={bgStyle}
                    />
                  );
                })}
              </div>
            </div>
          )}

          {/* Cantidad y botón */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-6">
            <div className="flex items-center gap-3">
              <button
                onClick={disminuirCantidad}
                className="bg-gray-200 px-3 py-1 rounded-full text-xl font-semibold hover:bg-gray-300">
                −
              </button>
              <span className="text-lg font-semibold">{cantidad}</span>
              <button
                onClick={aumentarCantidad}
                className="bg-gray-200 px-3 py-1 rounded-full text-xl font-semibold hover:bg-gray-300">
                +
              </button>
            </div>

            <button
              onClick={handleAgregarAlCarrito}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg text-lg font-medium hover:bg-blue-700 transition">
              Agregar al Carrito
            </button>
          </div>

          {mensaje && (
            <div className="text-green-600 text-center font-medium mt-4">
              {mensaje}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
