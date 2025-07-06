import { Link } from "react-router-dom";

export default function Card({
  sku,
  descripcion,
  costo,
  categoria,
  marca,
  imagen,
}) {
  const categoriasColores = {
    Arte: "bg-[#D96C75]",
    Borradores: "bg-[#F4D06F]",
    Cuadernos: "bg-emerald-500",
    Cintas: "bg-indigo-500",
    Contac: "bg-gray-300",
    Escritura: "bg-blue-500",
    Extendidos: "bg-[#A569BD]",
    Folders: "bg-[#FFA07A]",
    Geometria: "bg-teal-400",
    Marcadores: "bg-red-400",
    Oficina: "bg-slate-400",
    Pegamentos: "bg-yellow-400",
    Tijeras: "bg-rose-700",
  };

  const categoriaColor = categoriasColores[categoria] || "bg-gray-200";

  return (
    <div className="p-4 sm:p-6 rounded-lg shadow-md border border-primary bg-white hover:bg-primary hover:text-white transition duration-300 h-full">
      <Link to={`/detalles/${sku}`} className="block h-full">
        <img
          src={`/static${imagen}`}
          onError={() => console.warn("No se pudo cargar la imagen:", imagen)}
          alt={descripcion}
          className="w-full max-w-[200px] h-60 object-contain mx-auto mb-4"
        />

        <p className="text-xl font-bold mb-1">
          ${parseFloat(costo).toFixed(2)}
        </p>

        <p
          className={`text-sm font-medium rounded-md w-fit px-2 py-0.5 mb-1 ${categoriaColor}`}>
          {categoria}
        </p>

        <p className="text-sm font-semibold mb-1">{marca}</p>

        <p className="text-sm text-gray-600 line-clamp-2">{descripcion}</p>
      </Link>
    </div>
  );
}
