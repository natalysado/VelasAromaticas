import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { AuthContext } from '../../contexts/AuthContext';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ProductCard from '../../components/ProductCard';

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', description: '', price: '', image: '' });
  const [showForm, setShowForm] = useState(false);
  const { user } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!user || !user.isAdmin) {
      router.push('/');
    } else {
      fetchProducts();
    }
  }, [user]);

  const fetchProducts = async () => {
    const res = await fetch('/api/products');
    const data = await res.json();
    setProducts(data);
  };

  const handleInputChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/products/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProduct),
    });
    if (res.ok) {
      setNewProduct({ name: '', description: '', price: '', image: '' });
      fetchProducts();
      setShowForm(false);  // Ocultar el formulario después de agregar el producto
    }
  };

  const handleDelete = async (id) => {
    const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
    if (res.ok) {
      fetchProducts();
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Dashboard de Administrador</h1>
          <button onClick={() => setShowForm(!showForm)} className="bg-green-500 text-white p-2 rounded">
            {showForm ? 'Cancelar' : 'Añadir nuevo producto'}
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="mb-8">
            <input
              type="text"
              name="name"
              value={newProduct.name}
              onChange={handleInputChange}
              placeholder="Nombre del producto"
              className="mb-2 p-2 w-full"
              required
            />
            <textarea
              name="description"
              value={newProduct.description}
              onChange={handleInputChange}
              placeholder="Descripción"
              className="mb-2 p-2 w-full"
              required
            />
            <input
              type="number"
              name="price"
              value={newProduct.price}
              onChange={handleInputChange}
              placeholder="Precio"
              className="mb-2 p-2 w-full"
              required
            />
            <input
              type="text"
              name="image"
              value={newProduct.image}
              onChange={handleInputChange}
              placeholder="URL de la imagen"
              className="mb-2 p-2 w-full"
              required
            />
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">Añadir Producto</button>
          </form>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} onDelete={handleDelete} isAdmin={true}/>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
