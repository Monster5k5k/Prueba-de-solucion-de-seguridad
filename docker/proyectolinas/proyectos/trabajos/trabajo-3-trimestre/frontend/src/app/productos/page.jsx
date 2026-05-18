'use client';

export const dynamic = 'force-dynamic';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { productosApi } from '@/lib/api';

export default function ProductosPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [productos, setProductos] = useState([]);
  const [query, setQuery] = useState(searchParams.get('query') || '');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    productosApi
      .getAll(query || undefined)
      .then(setProductos)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [query]);

  function handleSearch(e) {
    e.preventDefault();
    router.push(`/productos${query ? `?query=${encodeURIComponent(query)}` : ''}`);
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Productos</h1>

      <form onSubmit={handleSearch} className="flex gap-2 mb-8 max-w-md">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar productos..."
          className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
          Buscar
        </button>
        {query && (
          <button
            type="button"
            onClick={() => { setQuery(''); router.push('/productos'); }}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg transition-colors"
          >
            Limpiar
          </button>
        )}
      </form>

      {loading && <div className="text-center text-gray-500 py-16">Cargando productos...</div>}

      {!loading && productos.length === 0 && (
        <div className="text-center text-gray-500 py-16">
          No se encontraron productos{query ? ` para "${query}"` : ''}.
        </div>
      )}

      {!loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {productos.map((producto) => (
            <Link
              key={producto.id}
              href={`/productos/${producto.id}`}
              className="bg-white rounded-xl shadow hover:shadow-md transition-shadow overflow-hidden group"
            >
              <div className="aspect-square bg-gray-100 relative overflow-hidden">
                {producto.imagen ? (
                  <img
                    src={producto.imagen}
                    alt={producto.nombre}
                    className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-5xl text-gray-300">📦</div>
                )}
              </div>
              <div className="p-4">
                <h2 className="font-semibold text-gray-800 mb-1 line-clamp-2">{producto.nombre}</h2>
                <p className="text-blue-600 font-bold text-lg">{Number(producto.precio).toFixed(2)} €</p>
                <p className={`text-xs mt-1 ${producto.stock > 0 ? 'text-green-600' : 'text-red-500'}`}>
                  {producto.stock > 0 ? `${producto.stock} en stock` : 'Sin stock'}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
