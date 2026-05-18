const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

async function apiFetch(endpoint, options = {}, token) {
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const res = await fetch(`${API_URL}${endpoint}`, { ...options, headers });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: 'Error desconocido' }));
    throw new Error(error.message || `Error ${res.status}`);
  }

  const text = await res.text();
  return text ? JSON.parse(text) : null;
}

export const productosApi = {
  getAll: (query) =>
    apiFetch(`/productos${query ? `?query=${encodeURIComponent(query)}` : ''}`),
  getOne: (id) => apiFetch(`/productos/${id}`),
  create: (data, token) =>
    apiFetch('/productos', { method: 'POST', body: JSON.stringify(data) }, token),
  update: (id, data, token) =>
    apiFetch(`/productos/${id}`, { method: 'PUT', body: JSON.stringify(data) }, token),
  remove: (id, token) =>
    apiFetch(`/productos/${id}`, { method: 'DELETE' }, token),
};

export const carritoApi = {
  get: (token) => apiFetch('/carrito', {}, token),
  add: (data, token) =>
    apiFetch('/carrito', { method: 'POST', body: JSON.stringify(data) }, token),
  update: (id, cantidad, token) =>
    apiFetch(`/carrito/${id}`, { method: 'PUT', body: JSON.stringify({ cantidad }) }, token),
  remove: (id, token) =>
    apiFetch(`/carrito/${id}`, { method: 'DELETE' }, token),
  pagar: (token) =>
    apiFetch('/carrito/pagar', { method: 'POST' }, token),
};

export const usuariosApi = {
  getAll: (token) => apiFetch('/usuarios', {}, token),
  updatePerfil: (id, perfil, token) =>
    apiFetch(`/usuarios/${id}`, { method: 'PUT', body: JSON.stringify({ perfil }) }, token),
  remove: (id, token) =>
    apiFetch(`/usuarios/${id}`, { method: 'DELETE' }, token),
};

export const authApi = {
  register: (data) =>
    apiFetch('/auth/register', { method: 'POST', body: JSON.stringify(data) }),
  login: (data) =>
    apiFetch('/auth/login', { method: 'POST', body: JSON.stringify(data) }),
};
