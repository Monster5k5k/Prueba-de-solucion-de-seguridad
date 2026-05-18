'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { carritoApi } from '@/lib/api';
import { getToken, isLoggedIn } from '@/lib/auth';
import { useAuth } from '@/context/AuthContext';

export default function CarritoPage() {
  const router = useRouter();
  const { refreshCart } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagando, setPagando] = useState(false);
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    if (!isLoggedIn()) { router.push('/login'); return; }
    cargarCarrito();
  }, []);

  async function cargarCarrito() {
    const token = getToken();
    try {
      const data = await carritoApi.get(token);
      setItems(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleActualizarCantidad(itemId, nuevaCantidad) {
    const token = getToken();
    try {
      await carritoApi.update(itemId, nuevaCantidad, token);
      setItems(items.map((i) => i.id === itemId ? { ...i, cantidad: nuevaCantidad } : i));
    } catch (err) {
      alert(err.message);
    }
  }

  async function handleEliminar(itemId) {
    const token = getToken();
    try {
      await carritoApi.remove(itemId, token);
      setItems(items.filter((i) => i.id !== itemId));
      refreshCart();
    } catch (err) {
      alert(err.message);
    }
  }

  async function handlePagar() {
    const token = getToken();
    setPagando(true);
    try {
      const resultado = await carritoApi.pagar(token);
      setMensaje(`✅ ${resultado.mensaje} Total: ${resultado.total} €`);
      setItems([]);
      refreshCart();
    } catch (err) {
      alert(err.message);
    } finally {
      setPagando(false);
    }
  }

  const total = items.reduce((acc, item) => acc + Number(item.producto.precio) * item.cantidad, 0);

  if (loading) return <div className="text-center text-gray-500 py-16">Cargando carrito...</div>;

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Mi Carrito</h1>

      {mensaje && (
        <div className="bg-green-50 border border-green-200 text-green-700 rounded-xl px-4 py-4 mb-6">{mensaje}</div>
      )}

      {items.length === 0 && !mensaje && (
        <div className="bg-white rounded-2xl shadow-md p-12 text-center">
          <p className="text-5xl mb-4">🛒</p>
          <p className="text-gray-500 mb-4">Tu carrito está vacío</p>
          <button onClick={() => router.push('/productos')} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors">
            Ver productos
          </button>
        </div>
      )}

      {items.length > 0 && (
        <>
          <div className="bg-white rounded-2xl shadow-md overflow-hidden mb-4">
            {items.map((item) => (
              <div key={item.id} className="flex items-center gap-4 p-4 border-b border-gray-100 last:border-0">
                <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                  {item.producto.imagen ? (
                    <img src={item.producto.imagen} alt={item.producto.nombre} className="w-full h-full object-contain p-1" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-2xl">📦</div>
                  )}
                </div>

                <div className="flex-1">
                  <p className="font-semibold text-gray-800">{item.producto.nombre}</p>
                  <p className="text-blue-600 font-medium">{Number(item.producto.precio).toFixed(2)} € / ud.</p>
                </div>

                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                  <button onClick={() => item.cantidad > 1 && handleActualizarCantidad(item.id, item.cantidad - 1)} className="px-2 py-1 bg-gray-100 hover:bg-gray-200 transition-colors">−</button>
                  <span className="px-3 py-1">{item.cantidad}</span>
                  <button onClick={() => handleActualizarCantidad(item.id, item.cantidad + 1)} className="px-2 py-1 bg-gray-100 hover:bg-gray-200 transition-colors">+</button>
                </div>

                <p className="text-gray-700 font-bold min-w-[70px] text-right">
                  {(Number(item.producto.precio) * item.cantidad).toFixed(2)} €
                </p>

                <button onClick={() => handleEliminar(item.id)} className="text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg p-2 transition-colors" title="Eliminar del carrito">
                  🗑
                </button>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold text-gray-700">Total:</span>
              <span className="text-2xl font-bold text-blue-600">{total.toFixed(2)} €</span>
            </div>
            <button onClick={handlePagar} disabled={pagando} className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-bold py-3 rounded-lg transition-colors text-lg">
              {pagando ? 'Procesando pago...' : '💳 Pagar ahora'}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
