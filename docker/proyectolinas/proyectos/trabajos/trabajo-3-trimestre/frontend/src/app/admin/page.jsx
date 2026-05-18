'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { productosApi, usuariosApi } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
const EMPTY_FORM = { nombre: '', descripcion: '', precio: '', stock: '' };

export default function AdminPage() {
  const router = useRouter();
  const { user, token } = useAuth();
  const [tab, setTab] = useState('productos'); // 'productos' | 'usuarios'

  // ── PRODUCTOS ──────────────────────────────────────────────────────────────
  const fileInputRef = useRef(null);
  const [productos, setProductos] = useState([]);
  const [form, setForm] = useState(EMPTY_FORM);
  const [imagenUrl, setImagenUrl] = useState('');
  const [imagenPreview, setImagenPreview] = useState('');
  const [subiendoImagen, setSubiendoImagen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [busqueda, setBusqueda] = useState('');

  // ── USUARIOS ───────────────────────────────────────────────────────────────
  const [usuarios, setUsuarios] = useState([]);

  // ── MENSAJES ───────────────────────────────────────────────────────────────
  const [error, setError] = useState('');
  const [exito, setExito] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) { router.push('/login'); return; }
    if (user.perfil !== 'admin') { router.push('/'); return; }
    cargarTodo();
  }, [user]);

  async function cargarTodo() {
    setLoading(true);
    try {
      const [p, u] = await Promise.all([
        productosApi.getAll(),
        usuariosApi.getAll(token),
      ]);
      setProductos(p);
      setUsuarios(u);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function limpiarMensajes() { setError(''); setExito(''); }

  // ── PRODUCTOS: subir imagen ────────────────────────────────────────────────
  async function handleImagenChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImagenPreview(URL.createObjectURL(file));
    setSubiendoImagen(true);
    limpiarMensajes();
    try {
      const fd = new FormData();
      fd.append('file', file);
      const res = await fetch(`${API_URL}/upload/imagen`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: fd,
      });
      if (!res.ok) throw new Error('Error al subir imagen');
      const data = await res.json();
      setImagenUrl(data.url);
    } catch (err) {
      setError(err.message);
      setImagenPreview('');
    } finally {
      setSubiendoImagen(false);
    }
  }

  // ── PRODUCTOS: guardar ─────────────────────────────────────────────────────
  async function handleSubmitProducto(e) {
    e.preventDefault();
    limpiarMensajes();
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
        setExito('Producto actualizado');
      } else {
        await productosApi.create(datos, token);
        setExito('Producto creado');
      }
      cancelarEdicion();
      const p = await productosApi.getAll();
      setProductos(p);
    } catch (err) {
      setError(err.message);
    }
  }

  function editarProducto(p) {
    setEditId(p.id);
    setForm({ nombre: p.nombre, descripcion: p.descripcion || '', precio: String(p.precio), stock: String(p.stock) });
    setImagenUrl(p.imagen || '');
    setImagenPreview(p.imagen || '');
    limpiarMensajes();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function cancelarEdicion() {
    setEditId(null);
    setForm(EMPTY_FORM);
    setImagenUrl('');
    setImagenPreview('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  }

  async function eliminarProducto(id, nombre) {
    if (!confirm(`¿Eliminar "${nombre}"?`)) return;
    try {
      await productosApi.remove(id, token);
      setProductos(productos.filter((p) => p.id !== id));
      setExito(`"${nombre}" eliminado`);
    } catch (err) { setError(err.message); }
  }

  async function handleStockRapido(id, nuevoStock) {
    if (nuevoStock < 0) return;
    try {
      await productosApi.update(id, { stock: nuevoStock }, token);
      setProductos(productos.map((p) => p.id === id ? { ...p, stock: nuevoStock } : p));
    } catch (err) { setError(err.message); }
  }

  // ── USUARIOS ───────────────────────────────────────────────────────────────
  async function handleCambiarPerfil(id, perfilActual) {
    const nuevo = perfilActual === 'admin' ? 'usuario' : 'admin';
    if (!confirm(`¿Cambiar a "${nuevo}"?`)) return;
    try {
      await usuariosApi.updatePerfil(id, nuevo, token);
      setUsuarios(usuarios.map((u) => u.id === id ? { ...u, perfil: nuevo } : u));
      setExito(`Perfil cambiado a "${nuevo}"`);
    } catch (err) { setError(err.message); }
  }

  async function eliminarUsuario(id, email) {
    if (id === user?.id) { alert('No puedes eliminarte a ti mismo'); return; }
    if (!confirm(`¿Eliminar a "${email}"?`)) return;
    try {
      await usuariosApi.remove(id, token);
      setUsuarios(usuarios.filter((u) => u.id !== id));
      setExito(`Usuario eliminado`);
    } catch (err) { setError(err.message); }
  }

  if (loading) return <div className="text-center text-gray-500 py-16">Cargando panel...</div>;

  const productosFiltrados = productos.filter((p) =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div>
      {/* Cabecera */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Panel de Administración</h1>
        <div className="flex gap-2 text-sm text-gray-500">
          <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-medium">
            {productos.length} productos
          </span>
          <span className="bg-purple-50 text-purple-700 px-3 py-1 rounded-full font-medium">
            {usuarios.length} usuarios
          </span>
        </div>
      </div>

      {/* Mensajes */}
      {error && <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 mb-4 text-sm">{error}</div>}
      {exito && <div className="bg-green-50 border border-green-200 text-green-700 rounded-xl px-4 py-3 mb-4 text-sm">{exito}</div>}

      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-gray-100 p-1 rounded-xl w-fit">
        <button
          onClick={() => setTab('productos')}
          className={`px-5 py-2 rounded-lg text-sm font-medium transition-colors ${tab === 'productos' ? 'bg-white shadow text-blue-700' : 'text-gray-500 hover:text-gray-700'}`}
        >
          📦 Productos
        </button>
        <button
          onClick={() => setTab('usuarios')}
          className={`px-5 py-2 rounded-lg text-sm font-medium transition-colors ${tab === 'usuarios' ? 'bg-white shadow text-blue-700' : 'text-gray-500 hover:text-gray-700'}`}
        >
          👥 Usuarios
        </button>
      </div>

      {/* ── TAB PRODUCTOS ────────────────────────────────────────────────── */}
      {tab === 'productos' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Formulario */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-md p-6 sticky top-4">
              <h2 className="font-bold text-gray-700 mb-4">
                {editId !== null ? `✏️ Editando #${editId}` : '➕ Nuevo producto'}
              </h2>
              <form onSubmit={handleSubmitProducto} className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Nombre *</label>
                  <input required value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Precio € *</label>
                    <input required type="number" step="0.01" min="0" value={form.precio}
                      onChange={(e) => setForm({ ...form, precio: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Stock *</label>
                    <input required type="number" min="0" value={form.stock}
                      onChange={(e) => setForm({ ...form, stock: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Descripción</label>
                  <textarea rows={3} value={form.descripcion} onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Imagen</label>
                  <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImagenChange}
                    className="w-full text-sm file:mr-2 file:py-1 file:px-3 file:rounded file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
                  {subiendoImagen && <p className="text-xs text-blue-500 mt-1">Subiendo...</p>}
                  {imagenPreview && !subiendoImagen && (
                    <img src={imagenPreview} alt="preview" className="mt-2 h-20 w-20 object-contain rounded-lg border border-gray-200 p-1" />
                  )}
                </div>
                <div className="flex gap-2 pt-1">
                  <button type="submit" disabled={subiendoImagen}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-sm py-2 rounded-lg transition-colors">
                    {editId !== null ? 'Guardar cambios' : 'Crear producto'}
                  </button>
                  {editId !== null && (
                    <button type="button" onClick={cancelarEdicion}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm px-3 py-2 rounded-lg transition-colors">
                      ✕
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>

          {/* Tabla de productos */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-md overflow-hidden">
              <div className="p-4 border-b border-gray-100">
                <input
                  type="text"
                  placeholder="Buscar producto..."
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Producto</th>
                      <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Precio</th>
                      <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Stock</th>
                      <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productosFiltrados.map((p) => (
                      <tr key={p.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
                              {p.imagen
                                ? <img src={p.imagen} alt="" className="w-full h-full object-contain p-0.5" />
                                : <div className="w-full h-full flex items-center justify-center text-lg">📦</div>
                              }
                            </div>
                            <div>
                              <p className="font-medium text-gray-800 text-sm">{p.nombre}</p>
                              <p className="text-xs text-gray-400 line-clamp-1">{p.descripcion}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-right text-blue-600 font-semibold text-sm">
                          {Number(p.precio).toFixed(2)} €
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-center gap-1">
                            <button onClick={() => handleStockRapido(p.id, p.stock - 1)} disabled={p.stock === 0}
                              className="w-6 h-6 rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-30 font-bold text-sm">−</button>
                            <span className={`text-sm font-medium min-w-[2rem] text-center ${p.stock > 0 ? 'text-green-600' : 'text-red-500'}`}>
                              {p.stock}
                            </span>
                            <button onClick={() => handleStockRapido(p.id, p.stock + 1)}
                              className="w-6 h-6 rounded bg-gray-100 hover:bg-gray-200 font-bold text-sm">+</button>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <button onClick={() => editarProducto(p)} className="text-blue-600 hover:text-blue-800 text-xs mr-2 hover:underline">Editar</button>
                          <button onClick={() => eliminarProducto(p.id, p.nombre)} className="text-red-500 hover:text-red-700 text-xs hover:underline">Eliminar</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {productosFiltrados.length === 0 && (
                  <div className="text-center text-gray-400 py-8 text-sm">No hay productos</div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── TAB USUARIOS ─────────────────────────────────────────────────── */}
      {tab === 'usuarios' && (
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Usuario</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Email</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Perfil</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Registro</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((u) => (
                <tr key={u.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-sm font-bold text-blue-600">
                        {u.nombre.charAt(0).toUpperCase()}
                      </div>
                      <span className="font-medium text-gray-800 text-sm">{u.nombre}</span>
                      {u.id === user?.id && <span className="text-xs text-gray-400">(tú)</span>}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-600 text-sm">{u.email}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${u.perfil === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-600'}`}>
                      {u.perfil}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-400 text-sm">
                    {new Date(u.createdAt).toLocaleDateString('es-ES')}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {u.id !== user?.id ? (
                      <>
                        <button onClick={() => handleCambiarPerfil(u.id, u.perfil)}
                          className="text-blue-600 hover:text-blue-800 text-xs mr-2 hover:underline">
                          {u.perfil === 'admin' ? '→ usuario' : '→ admin'}
                        </button>
                        <button onClick={() => eliminarUsuario(u.id, u.email)}
                          className="text-red-500 hover:text-red-700 text-xs hover:underline">
                          Eliminar
                        </button>
                      </>
                    ) : (
                      <span className="text-gray-300 text-xs">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
