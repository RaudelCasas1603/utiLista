export default function Footer() {
  return (
    <footer className="bg-primary text-white mt-auto">
      <div className="py-6 px-4 sm:px-8 lg:px-16">
        <h1 className="text-center text-2xl sm:text-3xl mb-6">Contáctanos</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-base sm:text-lg">
          {/* Correo */}
          <div className="flex flex-col items-center hover:text-black transition duration-500 text-center">
            <i className="fa-regular fa-envelope fa-xl mb-4"></i>
            <p>uutilista@gmail.com</p>
          </div>

          {/* Teléfono */}
          <div className="flex flex-col items-center hover:text-black transition duration-500 text-center">
            <i className="fa-solid fa-phone fa-xl mb-4"></i>
            <p>+52 1 (33) 12979829</p>
          </div>

          {/* WhatsApp */}
          <div className="flex flex-col items-center hover:text-black transition duration-500 text-center">
            <i className="fa-brands fa-whatsapp fa-beat fa-xl mb-4"></i>
            <a
              href="https://wa.me/3312979829"
              target="_blank"
              rel="noopener noreferrer">
              <p>WhatsApp</p>
            </a>
          </div>
        </div>

        <div className="text-center text-sm sm:text-base mt-8">
          <p>© 2025 Todos los derechos reservados</p>
        </div>
      </div>
    </footer>
  );
}
