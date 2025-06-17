import React, { useState } from "react";
import { useCarrito } from "../Context/CarritoContext"; // Usamos el hook del contexto
import { jsPDF } from "jspdf";
import { Link } from "react-router-dom";

export default function Carrito() {
  const { carrito, agregarAlCarrito, eliminarDelCarrito } = useCarrito();

  // Estado para el código promocional, descuento y mensaje
  const [codigoPromocional, setCodigoPromocional] = useState("");
  const [descuento, setDescuento] = useState(0);
  const [mensajeDescuento, setMensajeDescuento] = useState("");
  const [mensajeColor, setMensajeColor] = useState("");

  // Estado para los datos de contacto del cliente
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");

  // Función para aplicar el descuento
  const aplicarDescuento = () => {
    if (codigoPromocional === "LISTA15") {
      setDescuento(0.15); // Descuento del 15%
      setMensajeColor("text-green-500");
      setMensajeDescuento("¡Código promocional aplicado con éxito!");
      setCodigoPromocional(""); // Limpiar el campo de código
    } else {
      setDescuento(0); // No hay descuento si el código es incorrecto
      setMensajeColor("text-red-500");
      setMensajeDescuento("Código promocional inválido.");
    }

    setTimeout(() => {
      setMensajeDescuento(""); // Limpiar el mensaje después de 3 segundos
    }, 3000);
  };

  // Calcular el total antes del descuento
  const calcularTotalSinDescuento = () => {
    return carrito.reduce(
      (total, producto) => total + producto.precio * producto.cantidad,
      0
    );
  };

  // Calcular el total con descuento
  const calcularTotalConDescuento = () => {
    const totalSinDescuento = calcularTotalSinDescuento();
    return totalSinDescuento - totalSinDescuento * descuento;
  };

  // Modificar la cantidad de un producto
  const modificarCantidad = (sku, color, cantidad) => {
    if (cantidad <= 0) return; // Prevenir cantidades negativas
    const producto = carrito.find(
      (producto) => producto.sku === sku && producto.color === color
    );

    if (producto) {
      agregarAlCarrito({ ...producto, cantidad });
    }
  };

  // Eliminar producto del carrito
  const eliminarProducto = (sku, color) => {
    eliminarDelCarrito(sku, color); // Llamamos a la función para eliminar el producto
  };

  // Función para generar PDF de la cotización
  const generarPDF = () => {
    if (!nombre || !telefono) {
      alert("Por favor, ingrese su nombre y número de teléfono.");
      return; // Prevenir la generación de PDF si los datos de contacto están vacíos
    }

    // Generamos un ID de cotización aleatorio (en un sistema real se puede generar en la base de datos)
    const cotizacionId = Math.floor(Math.random() * 10000);

    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Cotización de productos", 20, 20);
    doc.text(`Nombre: ${nombre}`, 20, 30);
    doc.text(`Teléfono: ${telefono}`, 20, 40);
    doc.text(
      `Total sin descuento: $${calcularTotalSinDescuento().toFixed(2)}`,
      20,
      50
    );
    doc.text(`Descuento aplicado: ${descuento * 100}%`, 20, 60);
    doc.text(
      `Total con descuento: $${calcularTotalConDescuento().toFixed(2)}`,
      20,
      70
    );

    // Agregar productos al PDF
    let yPosition = 80;
    carrito.forEach((producto) => {
      doc.text(
        `${producto.nombre} - Cantidad: ${
          producto.cantidad
        } - Precio: $${producto.precio.toFixed(2)}`,
        20,
        yPosition
      );
      yPosition += 10;
    });

    // Guardamos el PDF
    doc.save(`cotizacion_${cotizacionId}.pdf`);

    // Simulamos guardar en la base de datos (lo haremos en el backend más tarde)
    console.log(
      "Cotización guardada en la base de datos con ID:",
      cotizacionId
    );

    // Redirigir a WhatsApp con el mensaje de cotización
    const mensajeWhatsApp = `Hola, me gustaría obtener más detalles de mi cotización #${cotizacionId}`;
    const enlaceWhatsApp = `https://wa.me/3323800249?text=${encodeURIComponent(
      mensajeWhatsApp
    )}`;

    // Redirigimos al chat de WhatsApp
    window.location.href = enlaceWhatsApp;
  };

  return (
    <div className="max-w-screen-lg mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">
        Carrito de Compras
      </h1>

      {/* Si el carrito está vacío */}
      {carrito.length === 0 ? (
        <div className="text-center">
          <p className="text-xl text-gray-700">Tu carrito está vacío.</p>
          <Link
            to="/catalogo"
            className="text-blue-600 hover:underline mt-4 inline-block">
            Ir al Catálogo y agregar productos
          </Link>
        </div>
      ) : (
        <>
          {/* Tabla de productos en el carrito */}
          <div className="overflow-x-auto bg-white shadow-md rounded-lg mb-6">
            <table className="min-w-full table-auto border-separate rounded-lg">
              <thead>
                <tr>
                  <th className="border px-4 py-2 rounded-tl-lg">Producto</th>
                  <th className="border px-4 py-2">Color</th>
                  <th className="border px-4 py-2">Cantidad</th>
                  <th className="border px-4 py-2">Precio</th>
                  <th className="border px-4 py-2">Total</th>
                  <th className="border px-4 py-2 rounded-tr-lg">Acciones</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {carrito.map((producto, index) => (
                  <tr key={index}>
                    <td className="border px-4 py-2">{producto.nombre}</td>
                    <td className="border px-4 py-2">
                      <div
                        className="w-8 h-8 rounded-full align-center mx-auto"
                        style={{ backgroundColor: producto.color }}></div>
                    </td>
                    <td className="border px-4 py-2">
                      <button
                        onClick={() =>
                          modificarCantidad(
                            producto.sku,
                            producto.color,
                            producto.cantidad - 1
                          )
                        }
                        className="px-2 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400">
                        -
                      </button>
                      <span className="mx-2">{producto.cantidad}</span>
                      <button
                        onClick={() =>
                          modificarCantidad(
                            producto.sku,
                            producto.color,
                            producto.cantidad + 1
                          )
                        }
                        className="px-2 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400">
                        +
                      </button>
                    </td>
                    <td className="border px-4 py-2">
                      ${producto.precio.toFixed(2)}
                    </td>
                    <td className="border px-4 py-2">
                      ${(producto.precio * producto.cantidad).toFixed(2)}
                    </td>
                    <td className="border px-4 py-2">
                      <button
                        onClick={() =>
                          eliminarProducto(producto.sku, producto.color)
                        }
                        className="text-red-600 hover:text-red-800">
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Campo para el código promocional */}
          <div className="mb-4">
            <label htmlFor="codigoPromocional" className="block mb-2">
              Código Promocional:
            </label>
            <input
              type="text"
              id="codigoPromocional"
              value={codigoPromocional}
              onChange={(e) => setCodigoPromocional(e.target.value)}
              placeholder="Ingrese su código"
              className="border p-2"
            />
            <button
              onClick={aplicarDescuento}
              className="ml-2 bg-blue-600 text-white px-4 py-2 rounded">
              Aplicar
            </button>
            <p className={`text-sm ${mensajeColor}`}>{mensajeDescuento}</p>
          </div>

          {/* Formulario de Datos de Contacto */}
          <div className="mb-6">
            <label className="block mb-2">Nombre:</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="border p-2 mb-4 w-full"
              placeholder="Ingrese su nombre"
            />
            <label className="block mb-2">Teléfono:</label>
            <input
              type="text"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              className="border p-2 mb-4 w-full"
              placeholder="Ingrese su número de teléfono"
            />
          </div>

          {/* Mostrar total sin descuento y total con descuento */}
          <div className="mt-6 text-right">
            <h3 className="text-xl">
              Total sin descuento: ${calcularTotalSinDescuento().toFixed(2)}
            </h3>
            {descuento > 0 && (
              <h3 className="text-xl">
                Total con descuento: ${calcularTotalConDescuento().toFixed(2)}
              </h3>
            )}
          </div>

          {/* Botón para generar el PDF y redirigir a WhatsApp */}
          <div className="mt-8 text-center">
            <button
              onClick={generarPDF}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg text-xl font-semibold hover:bg-blue-700 transition duration-300">
              Obtener Cotización
            </button>
          </div>
        </>
      )}
    </div>
  );
}
