// pages/auth/login.js
import React, { useState, useContext } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { AuthContext } from '../../contexts/AuthContext';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function Login() {
  const { login } = useContext(AuthContext);  // Usar el contexto de autenticación
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        const { user, token } = await res.json();
        login(user);  // Actualizar el contexto con los datos del usuario
        localStorage.setItem('token', token);
        router.push('/');
      } else {
        const error = await res.json();
        setError(error.message || 'Error al iniciar sesión');
      }
    } catch (error) {
      setError('Error al conectar con el servidor');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Head>
        <title>Iniciar Sesión - Velas Aromáticas</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar cartItemsCount={0} />

      <main className="flex-grow container mx-auto px-4 py-8 flex items-center justify-center">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Iniciar Sesión</h1>
          {error && <p className="text-red-500 text-center mb-4 animate-bounce">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Correo Electrónico</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">Contraseña</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
            <button type="submit" className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors">
              Iniciar Sesión
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
