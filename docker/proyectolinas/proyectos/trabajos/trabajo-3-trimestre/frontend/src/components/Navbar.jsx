'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
  const router = useRouter();
  const { user, cartCount, logout } = useAuth();
  const loggedIn = !!user;
  const isAdmin = user?.perfil === 'admin';

  function handleLogout() {
    logout();
    router.push('/');
  }

  return (
    <nav className="bg-blue-700 text-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4 py-3 flex flex-wrap items-center gap-4">
        <Link href="/" className="text-xl font-bold tracking-tight hover:text-blue-200">
          🛒 Tienda Online
        </Link>

        <div className="flex-1" />

        <Link href="/" className="hover:text-blue-200 transition-colors">Inicio</Link>
        <Link href="/productos" className="hover:text-blue-200 transition-colors">Productos</Link>

        {loggedIn && (
          <>
            {/* Carrito con contador */}
            <Link href="/carrito" className="relative hover:text-blue-200 transition-colors">
              🛍 Carrito
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount > 9 ? '9+' : cartCount}
                </span>
              )}
            </Link>

            {isAdmin && (
              <Link href="/admin" className="hover:text-blue-200 transition-colors">
                Panel Admin
              </Link>
            )}

            <span className="text-blue-200 text-sm">{user.nombre} ({user.perfil})</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-sm transition-colors"
            >
              Cerrar sesión
            </button>
          </>
        )}

        {!loggedIn && (
          <>
            <Link href="/login" className="hover:text-blue-200 transition-colors">Login</Link>
            <Link href="/registro" className="bg-white text-blue-700 hover:bg-blue-100 px-3 py-1 rounded text-sm font-medium transition-colors">
              Registro
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
