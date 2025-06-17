export default function Footer() {
  return (
    <>
      <div className="bg-primary text-white py-4 mt-auto">
        <h1 className="text-center p-2 text-2xl sm:text-xl">Contactanos</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-4 px-8 sm:px-16 text-lg sm:text-xl">
          {/* Correo */}
          <div className="flex flex-col items-center hover:text-black transition duration-500">
            <i className="fa-regular fa-envelope fa-lg pt-4 pb-6"></i>
            <p className="text-center">cotizaciones@gmail.com</p>
          </div>
          {/* Teléfono */}
          <div className="flex flex-col items-center hover:text-black transition duration-500">
            <i className="fa-solid fa-phone fa-lg pt-4 pb-6"></i>
            <p className="text-center">+52 1 (33) 23783945</p>
          </div>
          {/* WhatsApp */}
          <div className="flex flex-col items-center hover:text-black transition duration-500">
            <i className="fa-brands fa-whatsapp fa-beat fa-lg pb-6 pt-4"></i>
            <a href="https://wa.me/3323783945">
              <h3 className="text-center">WhatsApp</h3>
            </a>
          </div>
        </div>
        <div className="text-center text-lg sm:text-xl mb-4">
          <p>© 2025 Todos los derechos reservados</p>
        </div>
      </div>
    </>
  );
}
