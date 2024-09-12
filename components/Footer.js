// components/Footer.js
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-purple-900 text-gray-300 py-6">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
        <div>
          <p>© 2024 Velas Aromáticas. Todos los derechos reservados.</p>
        </div>
        <div>
          <p className="mb-2">Contacto: info@velasaromaticas.com</p>
          <p>Teléfono: +1 234 567 8900</p>
        </div>
        <div className="flex justify-center md:justify-end">
          <a href="#" className="mr-4 text-gray-300 hover:text-white">Instagram</a>
          <a href="#" className="text-gray-300 hover:text-white">Facebook</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
