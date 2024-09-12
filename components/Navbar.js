// components/Navbar.js
import React, { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import { AuthContext } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { totalItems } = useCart();
  const [currentUser, setCurrentUser] = useState(user);

  useEffect(() => {
    setCurrentUser(user);
  }, [user]);

  return (
    <nav className="bg-purple-900 text-gray-300 shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <Link href="/" className="text-white text-2xl font-extrabold tracking-wide">
          Velas Aromáticas
        </Link>
        <div className="flex items-center space-x-6">
          <Link href="/" className="hover:text-white">Inicio</Link>
          <Link href="/cart" className="hover:text-white">
            Carrito ({totalItems})
          </Link>
          <Link href="/about" className="hover:text-white">Sobre Nosotros</Link>
          {currentUser ? (
            <>
              {currentUser.isAdmin && (
                <Link href="/admin/dashboard" className="hover:text-white">Dashboard</Link>
              )}
              <button onClick={logout} className="hover:text-white">
                Cerrar Sesión
              </button>
            </>
          ) : (
            <Link href="/auth/login" className="hover:text-white">Iniciar Sesión</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
