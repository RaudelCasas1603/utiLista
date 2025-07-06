/* src/pages/Carrito.jsx
   — componente completo con:
   1. Validación en tiempo real
   2. Cupón LISTA25
   3. Guarda la cotización en el backend  ➜  /api/cotizaciones
   4. Genera PDF con jsPDF usando el cotizacionId que devuelve el servidor
*/
import React, { useState } from "react";
import { useCarrito } from "../Context/CarritoContext";
import { jsPDF } from "jspdf";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const getImageAsBase64 = (url) =>
  fetch(url)
    .then((r) => r.blob())
    .then(
      (b) =>
        new Promise((res, rej) => {
          const reader = new FileReader();
          reader.onloadend = () => res(reader.result);
          reader.onerror = rej;
          reader.readAsDataURL(b);
        })
    );

export default function Carrito() {
  const { carrito, agregarAlCarrito, eliminarDelCarrito } = useCarrito();

  /* ---------------- estados ---------------- */
  const [codigoPromocional, setCodigoPromocional] = useState("");
  const [descuento, setDescuento] = useState(0);
  const [msgCupon, setMsgCupon] = useState({ texto: "", color: "" });

  const [cliente, setCliente] = useState({
    nombre: "",
    telefono: "",
    direccion: "",
  });

  const [errors, setErrors] = useState({
    nombre: "",
    telefono: "",
    direccion: "",
  });

  /* ---------------- validación ---------------- */
  const validateField = (field, value) => {
    let msg = "";
    switch (field) {
      case "nombre":
        if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{3,}$/.test(value.trim()))
          msg = "Nombre inválido (mín. 3 letras).";
        break;
      case "telefono":
        if (!/^\d{10}$/.test(value.trim()))
          msg = "Teléfono debe contener 10 dígitos.";
        break;
      case "direccion":
        if (value.trim().length < 5) msg = "Dirección demasiado corta.";
        break;
      default:
        break;
    }
    setErrors((e) => ({ ...e, [field]: msg }));
  };

  const handleChange = (field) => (e) => {
    const val = e.target.value;
    setCliente((c) => ({ ...c, [field]: val }));
    validateField(field, val);
  };

  const isFormValid = () =>
    Object.values(errors).every((m) => m === "") &&
    cliente.nombre.trim() &&
    cliente.telefono.trim() &&
    cliente.direccion.trim();

  /* ---------------- cupón ---------------- */
  const aplicarDescuento = () => {
    if (codigoPromocional.trim().toUpperCase() === "LISTA25") {
      setDescuento(0.25);
      setMsgCupon({ texto: "¡Código aplicado!", color: "text-green-600" });
    } else {
      setDescuento(0);
      setMsgCupon({ texto: "Código inválido.", color: "text-red-600" });
    }
    setTimeout(() => setMsgCupon({ texto: "", color: "" }), 3000);
  };

  /* ---------------- cálculos ---------------- */
  const totalSinDescuento = carrito.reduce(
    (t, p) => t + p.precio * p.cantidad,
    0
  );
  const totalConDescuento = totalSinDescuento * (1 - descuento);

  const modificarCantidad = (sku, color, cant) => {
    if (cant <= 0) return;
    const prod = carrito.find((p) => p.sku === sku && p.color === color);
    if (prod) agregarAlCarrito({ ...prod, cantidad: cant });
  };

  const eliminarProducto = (sku, color) => eliminarDelCarrito(sku, color);

  /* ---------------- guardar cotización ---------------- */
  const guardarCotizacion = async () => {
    const res = await fetch("/api/cotizaciones", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        cliente,
        descuento,
        carrito: carrito.map((p) => ({
          producto_id: p.id ?? null, // si en tu contexto ya traes id
          sku: p.sku,
          variante: p.color || null,
          cantidad: p.cantidad,
          precio: p.precio,
        })),
      }),
    });
    const data = await res.json();
    if (!data.ok) throw new Error(data.error);
    return data.cotizacionId;
  };

  /* ---------------- PDF ---------------- */
  const generarPDF = async () => {
    if (!isFormValid()) {
      alert("Corrige los campos marcados en rojo.");
      return;
    }
    if (carrito.length === 0) return;

    let cotizacionId;
    try {
      cotizacionId = await guardarCotizacion();
    } catch (err) {
      alert("Error guardando la cotización en el servidor.");
      return;
    }

    const fecha = new Date().toLocaleDateString("es-MX");
    const doc = new jsPDF();

    const imgData = await getImageAsBase64(logo);
    doc.addImage(imgData, "PNG", 15, 10, 40, 20);

    doc.setFontSize(12);
    doc.text(`Fecha: ${fecha}`, 140, 20);
    doc.text(`Cotización: ${cotizacionId}`, 140, 28);
    doc.text(`Cliente: ${cliente.nombre}`, 15, 40);
    doc.text(`Teléfono: ${cliente.telefono}`, 15, 48);
    doc.text(`Dirección: ${cliente.direccion}`, 15, 56);

    let y = 66;
    doc.setFontSize(13).text("Productos:", 15, y);
    y += 6;
    doc.setFontSize(11).text("Prod.", 20, y);
    doc.text("Var.", 90, y);
    doc.text("Cant.", 110, y);
    doc.text("Precio", 135, y);
    doc.text("Total", 165, y);
    y += 8;

    carrito.forEach((p) => {
      const total = p.precio * p.cantidad;
      doc.setFontSize(10);
      doc.text(doc.splitTextToSize(p.nombre, 65), 20, y);
      doc.text(p.color || "—", 95, y);
      doc.text(String(p.cantidad), 127, y);
      doc.text(`$${p.precio}`, 150, y);
      doc.text(`$${total}`, 172, y);
      y += 10;
      if (y > 270) {
        doc.addPage();
        y = 20;
      }
    });

    y += 6;
    doc.setFontSize(12);
    doc.text(`Total sin desc.: $${totalSinDescuento.toFixed(2)}`, 15, y);
    if (descuento > 0) {
      y += 6;
      doc.text(`Desc.: ${descuento * 100}%`, 15, y);
      y += 6;
      doc.text(`Total neto: $${totalConDescuento.toFixed(2)}`, 15, y);
    }

    doc.save(`cotizacion_${cotizacionId}.pdf`);

    const mensaje = `Hola, deseo detalles de mi cotización #${cotizacionId}`;
    window.location.href = `https://wa.me/3312979829?text=${encodeURIComponent(
      mensaje
    )}`;
  };

  /* ---------------- vista ---------------- */
  return (
    <div className="max-w-screen-lg mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <h1 className="text-3xl font-bold text-center mb-8">
        Carrito de Compras
      </h1>

      {carrito.length === 0 ? (
        <div className="text-center">
          <p className="text-xl">Tu carrito está vacío.</p>
          <Link
            to="/catalogo"
            className="text-blue-600 hover:underline mt-4 block">
            Ir al Catálogo
          </Link>
        </div>
      ) : (
        <>
          {/* Tabla de productos */}
          <div className="overflow-x-auto bg-white shadow-md rounded-lg mb-6">
            <table className="min-w-full text-sm table-auto">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-4 py-2">Producto</th>
                  <th className="border px-4 py-2">Variante</th>
                  <th className="border px-4 py-2">Cant.</th>
                  <th className="border px-4 py-2">Precio</th>
                  <th className="border px-4 py-2">Total</th>
                  <th className="border px-4 py-2">Acción</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {carrito.map((p, i) => (
                  <tr key={i}>
                    <td className="border px-4 py-2">
                      <img
                        src={`/static${p.imagen}`}
                        alt={p.nombre}
                        className="w-16 h-16 mx-auto object-cover"
                      />
                    </td>
                    <td className="border px-4 py-2">{p.color || "—"}</td>
                    <td className="border px-4 py-2">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() =>
                            modificarCantidad(p.sku, p.color, p.cantidad - 1)
                          }
                          className="px-2 bg-gray-300 rounded hover:bg-gray-400">
                          −
                        </button>
                        {p.cantidad}
                        <button
                          onClick={() =>
                            modificarCantidad(p.sku, p.color, p.cantidad + 1)
                          }
                          className="px-2 bg-gray-300 rounded hover:bg-gray-400">
                          +
                        </button>
                      </div>
                    </td>
                    <td className="border px-4 py-2">${p.precio}</td>
                    <td className="border px-4 py-2">
                      ${p.precio * p.cantidad}
                    </td>
                    <td className="border px-4 py-2">
                      <button
                        onClick={() => eliminarProducto(p.sku, p.color)}
                        className="text-red-600 hover:text-red-800">
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <h2 className="text-center text-lg font-semibold mb-4">
            CUALQUIER PRODUCTO NO ENCONTRADO EN ESTE CATALOGO, PUEDE CONSULTADO
            VIA WHATSAPP
          </h2>
          {/* Cupón */}
          <div className="mb-6">
            <label className="block mb-1 font-medium">Código Promocional</label>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                value={codigoPromocional}
                onChange={(e) => setCodigoPromocional(e.target.value)}
                onBlur={aplicarDescuento}
                className="border p-2 rounded flex-grow"
              />
              <button
                onClick={aplicarDescuento}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Aplicar
              </button>
            </div>
            {msgCupon.texto && (
              <p className={`${msgCupon.color} text-sm mt-1`}>
                {msgCupon.texto}
              </p>
            )}
          </div>

          {/* Datos cliente */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {["nombre", "telefono", "direccion"].map((f, idx) => (
              <div
                key={f}
                className={
                  f === "direccion" ? "sm:col-span-2 lg:col-span-1" : ""
                }>
                <label className="block mb-1 capitalize">{f}:</label>
                <input
                  value={cliente[f]}
                  onChange={handleChange(f)}
                  className={`w-full border p-2 rounded ${
                    errors[f] && "border-red-500"
                  }`}
                  placeholder={f}
                />
                {errors[f] && (
                  <p className="text-red-500 text-sm">{errors[f]}</p>
                )}
              </div>
            ))}
          </div>

          {/* Totales */}
          <div className="mt-6 text-right sm:text-left">
            <h3 className="text-lg font-semibold">
              Total sin descuento: ${totalSinDescuento}
            </h3>
            {descuento > 0 && (
              <h3 className="text-lg font-semibold text-green-600">
                Total con descuento: ${totalConDescuento}
              </h3>
            )}
          </div>

          {/* Botón generar */}
          <div className="mt-8 text-center">
            <button
              onClick={generarPDF}
              disabled={!isFormValid() || carrito.length === 0}
              className={`w-full sm:w-auto px-6 py-3 rounded-lg text-lg font-semibold transition
                ${
                  isFormValid() && carrito.length
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-gray-400 cursor-not-allowed"
                }`}>
              Obtener Cotización
            </button>
          </div>
        </>
      )}
    </div>
  );
}
