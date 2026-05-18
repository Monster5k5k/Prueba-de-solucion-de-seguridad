'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { getToken, getUser, saveAuth, clearAuth as clearAuthStorage } from '@/lib/auth';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [cartCount, setCartCount] = useState(0);

  // Cargar sesión guardada al montar
  useEffect(() => {
    const savedToken = getToken();
    const savedUser = getUser();
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(savedUser);
      fetchCartCount(savedToken);
    }
  }, []);

  // Obtiene el número de ítems en el carrito
  async function fetchCartCount(tkn) {
    try {
      const res = await fetch(`${API_URL}/carrito`, {
        headers: { Authorization: `Bearer ${tkn}` },
      });
      if (res.ok) {
        const items = await res.json();
        setCartCount(items.length);
      }
    } catch {
      setCartCount(0);
    }
  }

  // Llamado desde la página de login
  function login(newToken, newUser) {
    saveAuth(newToken, newUser);
    setToken(newToken);
    setUser(newUser);
    fetchCartCount(newToken);
  }

  // Llamado desde el botón de cerrar sesión
  function logout() {
    clearAuthStorage();
    setToken(null);
    setUser(null);
    setCartCount(0);
  }

  // Llamado desde carrito o detalle de producto para actualizar el contador
  function refreshCart() {
    if (token) fetchCartCount(token);
  }

  return (
    <AuthContext.Provider value={{ user, token, cartCount, login, logout, refreshCart }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
