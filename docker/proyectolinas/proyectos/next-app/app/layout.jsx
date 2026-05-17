import './globals.css';
import Link from 'next/link';

export const metadata = {
  title: 'Linas Next App',
  description: 'App Next.js conectada a la API NestJS de Linas',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <nav>
          <Link href="/" style={{ fontWeight: 700, fontSize: '1.1rem' }}>⚡ LinasNext</Link>
          <Link href="/pokemon">Pokemon</Link>
          <Link href="/peliculas">Películas</Link>
          <Link href="/tarkov">Tarkov</Link>
          <Link href="/libros">Libros</Link>
        </nav>
        {children}
      </body>
    </html>
  );
}
