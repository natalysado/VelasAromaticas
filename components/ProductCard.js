import React from 'react';
import { useCart } from '../contexts/CartContext';

const ProductCard = ({ product, onDelete, isAdmin }) => {
  const { addToCart } = useCart();

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 m-4 max-w-sm">
      <div className="relative h-48 w-full">
        {/* Ajustar la imagen para que mantenga la relación de aspecto */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center"
        />
      </div>
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800">{product.name}</h2>
        <p className="text-gray-600 mt-2">{product.description}</p>
        <p className="text-lg font-bold text-purple-800 mt-4">${product.price.toFixed(2)}</p>

        {!isAdmin && addToCart && (
          <button
            onClick={() => addToCart(product)}
            className="mt-4 w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition-colors"
          >
            Añadir al carrito
          </button>
        )}

        {onDelete && isAdmin && (
          <button
            onClick={() => onDelete(product._id)}
            className="mt-4 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition-colors"
          >
            Eliminar
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;