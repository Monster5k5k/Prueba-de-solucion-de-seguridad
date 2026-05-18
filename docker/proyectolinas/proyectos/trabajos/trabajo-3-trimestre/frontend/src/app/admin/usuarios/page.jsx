'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { usuariosApi } from '@/lib/api';
import { getToken, getUser, isAdmin, isLoggedIn } from '@/lib/auth';

export default function AdminUsuariosPage() {
  const router = useRouter();
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [exito, setExito] = useState('');
  const currentUser = getUser();

  useEffect(() => {
    if (!isLoggedIn() || !isAdmin()) { router.push('/'); return; }
    cargarUsuarios();
  }, []);

  async function cargarUsuarios() {
    const token = getToken();
    try {
      const data = await usuariosApi.getAll(token);
      setUsuarios(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleCambiarPerfil(id, perfilActual) {
    const nuevoPerfil = perfilActual === 'admin' ? 'usuario' : 'admin';
    if (!confirm(`¿Cambiar el perfil del usuario a "${nuevoPerfil}"?`)) return;
    const token = getToken();
    setError('');
    try {
      await usuariosApi.updatePerfil(id, nuevoPerfil, token);
      setUsuarios(usuarios.map((u) => u.id === id ? { ...u, perfil: nuevoPerfil } : u));
      setExito(`Perfil actualizado a "${nuevoPerfil}"`);
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleEliminar(id, email) {
    if (id === currentUser?.id) { alert('No puedes eliminarte a ti mismo'); return; }
    if (!confirm(`¿Eliminar al usuario "${email}"?`)) return;
    const token = getToken();
    try {
      await usuariosApi.remove(id, token);
      setUsuarios(usuarios.filter((u) => u.id !== id));
      setExito(`Usuario "${email}" eliminado`);
    } catch (err) {
      setError(err.message);
    }
  }

  if (loading) return <div className="text-center text-gray-500 py-16">Cargando...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Gestión de Usuarios</h1>

      {error && <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 mb-4 text-sm">{error}</div>}
      {exito && <div className="bg-green-50 border border-green-200 text-green-700 rounded-xl px-4 py-3 mb-4 text-sm">{exito}</div>}

      <div className="bg-white rounded-2xl shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-4 py-3 text-sm font-semibold text-gray-600">ID</th>
              <th className="text-left px-4 py-3 text-sm font-semibold text-gray-600">Nombre</th>
              <th className="text-left px-4 py-3 text-sm font-semibold text-gray-600">Email</th>
              <th className="text-left px-4 py-3 text-sm font-semibold text-gray-600">Perfil</th>
              <th className="text-left px-4 py-3 text-sm font-semibold text-gray-600">Registro</th>
              <th className="text-center px-4 py-3 text-sm font-semibold text-gray-600">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-4 py-3 text-gray-400 text-sm">{usuario.id}</td>
                <td className="px-4 py-3 font-medium text-gray-800">{usuario.nombre}</td>
                <td className="px-4 py-3 text-gray-600 text-sm">{usuario.email}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${usuario.perfil === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-600'}`}>
                    {usuario.perfil}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-400 text-sm">
                  {new Date(usuario.createdAt).toLocaleDateString('es-ES')}
                </td>
                <td className="px-4 py-3 text-center">
                  {usuario.id !== currentUser?.id ? (
                    <>
                      <button onClick={() => handleCambiarPerfil(usuario.id, usuario.perfil)} className="text-blue-600 hover:text-blue-800 text-sm mr-3 hover:underline">
                        {usuario.perfil === 'admin' ? '→ usuario' : '→ admin'}
                      </button>
                      <button onClick={() => handleEliminar(usuario.id, usuario.email)} className="text-red-500 hover:text-red-700 text-sm hover:underline">
                        Eliminar
                      </button>
                    </>
                  ) : (
                    <span className="text-gray-300 text-sm">(eres tú)</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {usuarios.length === 0 && <div className="text-center text-gray-400 py-8">No hay usuarios</div>}
      </div>
    </div>
  );
}
