// pages/cart.js
import React, { useContext } from 'react';
import { useCart } from '../contexts/CartContext';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Cart() {
  const { cartItems, removeItem, updateQuantity, totalItems } = useCart();

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Head>
        <title>Carrito - Velas Aromáticas</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">Tu Carrito</h1>
        {cartItems.length === 0 ? (
          <p className="text-center text-xl text-gray-600">Tu carrito está vacío</p>
        ) : (
          <div>
            {cartItems.map(item => (
              <div key={item._id} className="flex justify-between items-center mb-4 bg-white p-4 rounded shadow-lg">
                <div>
                  <h2 className="text-xl font-semibold">{item.name}</h2>
                  <p className="text-gray-600">${item.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center">
                  <button onClick={() => updateQuantity(item._id, Math.max(1, item.quantity - 1))} className="bg-gray-200 px-2 py-1 rounded">-</button>
                  <span className="mx-2">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item._id, item.quantity + 1)} className="bg-gray-200 px-2 py-1 rounded">+</button>
                  <button onClick={() => removeItem(item._id)} className="ml-4 text-red-500">Eliminar</button>
                </div>
              </div>
            ))}
            <div className="mt-8 text-right">
              <p className="text-2xl font-bold">Total: ${total.toFixed(2)}</p>
              <button className="mt-4 bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700 transition-colors">Proceder al pago</button>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
