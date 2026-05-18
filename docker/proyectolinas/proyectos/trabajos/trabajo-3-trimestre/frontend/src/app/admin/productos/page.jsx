'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { productosApi } from '@/lib/api';
import { getToken, isAdmin, isLoggedIn } from '@/lib/auth';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

const EMPTY_FORM = { nombre: '', descripcion: '', precio: '', stock: '' };

export default function AdminProductosPage() {
  const router = useRouter();
  const fileInputRef = useRef(null);
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(EMPTY_FORM);
  const [imagenUrl, setImagenUrl] = useState('');
  const [imagenPreview, setImagenPreview] = useState('');
  const [subiendoImagen, setSubiendoImagen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState('');
  const [exito, setExito] = useState('');

  useEffect(() => {
    if (!isLoggedIn() || !isAdmin()) {
      router.push('/');
      return;
    }
    cargarProductos();
  }, []);

  async function cargarProductos() {
    try {
      const data = await productosApi.getAll();
      setProductos(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleImagenChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    setImagenPreview(URL.createObjectURL(file));
    setSubiendoImagen(true);
    setError('');

    try {
      const token = getToken();
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch(`${API_URL}/upload/imagen`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || 'Error al subir la imagen');
      }

      const data = await res.json();
      setImagenUrl(data.url);
    } catch (err) {
      setError(err.message || 'Error al subir la imagen');
      setImagenPreview('');
    } finally {
      setSubiendoImagen(false);
    }
  }

  function handleEditar(producto) {
    setEditId(producto.id);
    setForm({
      nombre: producto.nombre,
      descripcion: producto.descripcion || '',
      precio: String(producto.precio),
      stock: String(producto.stock),
    });
    setImagenUrl(producto.imagen || '');
    setImagenPreview(producto.imagen || '');
    setError('');
    setExito('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleCancelar() {
    setEditId(null);
    setForm(EMPTY_FORM);
    setImagenUrl('');
    setImagenPreview('');
    setError('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setExito('');
    const token = getToken();

    const datos = {
      nombre: form.nombre,
      descripcion: form.descripcion,
      precio: parseFloat(form.precio),
      imagen: imagenUrl,
      stock: parseInt(form.stock),
    };

    try {
      if (editId !== null) {
        await productosApi.update(editId, datos, token);
        setExito('Producto actualizado correctamente');
      } else {
        await productosApi.create(datos, token);
        setExito('Producto creado correctamente');
      }
      handleCancelar();
      cargarProductos();
    } catch (err) {
      setError(err.message || 'Error al guardar el producto');
    }
  }

  async function handleEliminar(id, nombre) {
    if (!confirm(`¿Eliminar el producto "${nombre}"?`)) return;
    const token = getToken();
    try {
      await productosApi.remove(id, token);
      setProductos(productos.filter((p) => p.id !== id));
      setExito(`Producto "${nombre}" eliminado`);
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleStockRapido(id, nuevoStock) {
    if (nuevoStock < 0) return;
    const token = getToken();
    try {
      await productosApi.update(id, { stock: nuevoStock }, token);
      setProductos(productos.map((p) => p.id === id ? { ...p, stock: nuevoStock } : p));
    } catch (err) {
      setError(err.message);
    }
  }

  if (loading) {
    return <div className="text-center text-gray-500 py-16">Cargando...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Gestión de Productos</h1>

      <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
        <h2 className="text-lg font-bold text-gray-700 mb-4">
          {editId !== null ? `Editando producto #${editId}` : 'Nuevo Producto'}
        </h2>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-2 mb-4 text-sm">{error}</div>
        )}
        {exito && (
          <div className="bg-green-50 border border-green-200 text-green-700 rounded-lg px-4 py-2 mb-4 text-sm">{exito}</div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre *</label>
            <input
              required
              value={form.nombre}
              onChange={(e) => setForm({ ...form, nombre: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Precio (€) *</label>
            <input
              required
              type="number"
              step="0.01"
              min="0"
              value={form.precio}
              onChange={(e) => setForm({ ...form, precio: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Stock *</label>
            <input
              required
              type="number"
              min="0"
              value={form.stock}
              onChange={(e) => setForm({ ...form, stock: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Imagen</label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImagenChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm file:mr-3 file:py-1 file:px-3 file:rounded file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {subiendoImagen && (
              <p className="text-xs text-blue-500 mt-1">Subiendo imagen...</p>
            )}
            {imagenPreview && !subiendoImagen && (
              <img
                src={imagenPreview}
                alt="Preview"
                className="mt-2 h-24 w-24 object-contain rounded-lg border border-gray-200 p-1"
              />
            )}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
            <textarea
              value={form.descripcion}
              onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
              rows={3}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="md:col-span-2 flex gap-3">
            <button
              type="submit"
              disabled={subiendoImagen}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-2 rounded-lg transition-colors"
            >
              {editId !== null ? 'Guardar cambios' : 'Crear producto'}
            </button>
            {editId !== null && (
              <button
                type="button"
                onClick={handleCancelar}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2 rounded-lg transition-colors"
              >
                Cancelar
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="bg-white rounded-2xl shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-4 py-3 text-sm font-semibold text-gray-600">ID</th>
              <th className="text-left px-4 py-3 text-sm font-semibold text-gray-600">Producto</th>
              <th className="text-right px-4 py-3 text-sm font-semibold text-gray-600">Precio</th>
              <th className="text-right px-4 py-3 text-sm font-semibold text-gray-600">Stock</th>
              <th className="text-center px-4 py-3 text-sm font-semibold text-gray-600">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((producto) => (
              <tr key={producto.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-4 py-3 text-gray-500 text-sm">{producto.id}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    {producto.imagen ? (
                      <img
                        src={producto.imagen}
                        alt=""
                        className="w-10 h-10 object-contain rounded p-0.5"
                      />
                    ) : (
                      <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center text-lg">📦</div>
                    )}
                    <div>
                      <p className="font-medium text-gray-800">{producto.nombre}</p>
                      <p className="text-xs text-gray-400 line-clamp-1">{producto.descripcion}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-right text-blue-600 font-semibold">
                  {Number(producto.precio).toFixed(2)} €
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      onClick={() => handleStockRapido(producto.id, producto.stock - 1)}
                      disabled={producto.stock === 0}
                      className="w-6 h-6 rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-30 text-sm font-bold"
                    >
                      −
                    </button>
                    <span className={`text-sm font-medium min-w-[2rem] text-center ${producto.stock > 0 ? 'text-green-600' : 'text-red-500'}`}>
                      {producto.stock}
                    </span>
                    <button
                      onClick={() => handleStockRapido(producto.id, producto.stock + 1)}
                      className="w-6 h-6 rounded bg-gray-100 hover:bg-gray-200 text-sm font-bold"
                    >
                      +
                    </button>
                  </div>
                </td>
                <td className="px-4 py-3 text-center">
                  <button
                    onClick={() => handleEditar(producto)}
                    className="text-blue-600 hover:text-blue-800 text-sm mr-3 hover:underline"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleEliminar(producto.id, producto.nombre)}
                    className="text-red-500 hover:text-red-700 text-sm hover:underline"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {productos.length === 0 && (
          <div className="text-center text-gray-400 py-8">No hay productos</div>
        )}
      </div>
    </div>
  );
}
