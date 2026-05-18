'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { productosApi, carritoApi } from '@/lib/api';
import { getToken, isLoggedIn } from '@/lib/auth';
import { useAuth } from '@/context/AuthContext';

export default function ProductoDetallePage() {
  const { id } = useParams();
  const router = useRouter();
  const { refreshCart } = useAuth();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cantidad, setCantidad] = useState(1);
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    setLoggedIn(isLoggedIn());
    productosApi
      .getOne(Number(id))
      .then(setProducto)
      .catch(() => router.push('/productos'))
      .finally(() => setLoading(false));
  }, [id]);

  async function handleAddCarrito() {
    const token = getToken();
    if (!token) { router.push('/login'); return; }
    setError('');
    setMensaje('');
    try {
      await carritoApi.add({ productoId: Number(id), cantidad }, token);
      setMensaje(`✅ "${producto?.nombre}" añadido al carrito (x${cantidad})`);
      refreshCart();
    } catch (err) {
      setError(err.message || 'Error al añadir al carrito');
    }
  }

  if (loading) return <div className="text-center text-gray-500 py-16">Cargando...</div>;
  if (!producto) return null;

  return (
    <div className="max-w-4xl mx-auto">
      <button onClick={() => router.back()} className="text-blue-600 hover:underline mb-6 flex items-center gap-1">
        ← Volver
      </button>

      <div className="bg-white rounded-2xl shadow-md overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2 aspect-square bg-gray-100">
            {producto.imagen ? (
              <img src={producto.imagen} alt={producto.nombre} className="w-full h-full object-contain p-4" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-8xl text-gray-200">📦</div>
            )}
          </div>

          <div className="md:w-1/2 p-8 flex flex-col">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">{producto.nombre}</h1>
            <p className="text-3xl font-bold text-blue-600 mb-4">{Number(producto.precio).toFixed(2)} €</p>
            <p className={`text-sm mb-4 font-medium ${producto.stock > 0 ? 'text-green-600' : 'text-red-500'}`}>
              {producto.stock > 0 ? `${producto.stock} unidades disponibles` : 'Sin stock'}
            </p>
            {producto.descripcion && (
              <p className="text-gray-600 mb-6 leading-relaxed flex-1">{producto.descripcion}</p>
            )}

            {loggedIn && producto.stock > 0 && (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <label className="text-sm font-medium text-gray-700">Cantidad:</label>
                  <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                    <button onClick={() => setCantidad(Math.max(1, cantidad - 1))} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 transition-colors">−</button>
                    <span className="px-4 py-2 text-center min-w-[3rem]">{cantidad}</span>
                    <button onClick={() => setCantidad(Math.min(producto.stock, cantidad + 1))} className="px-3 py-2 bg-gray-100 hover:bg-gray-200 transition-colors">+</button>
                  </div>
                </div>
                <button onClick={handleAddCarrito} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-colors">
                  🛒 Añadir al carrito
                </button>
                {mensaje && <p className="text-green-600 text-sm bg-green-50 rounded-lg px-3 py-2">{mensaje}</p>}
                {error && <p className="text-red-600 text-sm bg-red-50 rounded-lg px-3 py-2">{error}</p>}
              </div>
            )}

            {!loggedIn && (
              <div className="bg-blue-50 rounded-lg p-4 text-center">
                <p className="text-gray-600 text-sm mb-2">Inicia sesión para añadir al carrito</p>
                <button onClick={() => router.push('/login')} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                  Iniciar sesión
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
