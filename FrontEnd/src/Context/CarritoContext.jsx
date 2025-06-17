import React, { createContext, useState, useContext } from "react";

// Crear contexto del carrito
const CarritoContext = createContext();

export function CarritoProvider({ children }) {
  const [carrito, setCarrito] = useState([]);

  // Función para agregar o actualizar un producto al carrito
  const agregarAlCarrito = (producto, reemplazarCantidad = true) => {
    const productoExistente = carrito.find(
      (item) => item.sku === producto.sku && item.color === producto.color
    );

    if (productoExistente) {
      setCarrito((prevCarrito) =>
        prevCarrito.map((item) =>
          item.sku === producto.sku && item.color === producto.color
            ? {
                ...item,
                cantidad: reemplazarCantidad
                  ? producto.cantidad
                  : item.cantidad + producto.cantidad,
              }
            : item
        )
      );
    } else {
      setCarrito((prevCarrito) => [
        ...prevCarrito,
        {
          ...producto,
          cantidad: producto.cantidad || 1,
        },
      ]);
    }
  };

  // Función para eliminar un producto del carrito
  const eliminarDelCarrito = (sku, color) => {
    setCarrito((prevCarrito) =>
      prevCarrito.filter(
        (producto) => !(producto.sku === sku && producto.color === color)
      )
    );
  };

  return (
    <CarritoContext.Provider
      value={{ carrito, agregarAlCarrito, eliminarDelCarrito }}>
      {children}
    </CarritoContext.Provider>
  );
}

export const useCarrito = () => {
  return useContext(CarritoContext);
};
