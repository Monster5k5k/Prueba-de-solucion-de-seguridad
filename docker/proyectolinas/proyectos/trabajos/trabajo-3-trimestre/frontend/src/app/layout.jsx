import './globals.css';
import Navbar from '@/components/Navbar';
import { AuthProvider } from '@/context/AuthContext';

export const metadata = {
  title: 'Tienda Online',
  description: 'Proyecto Trabajo de 3º Trimestre',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="bg-gray-50 min-h-screen">
        <AuthProvider>
          <Navbar />
          <main className="max-w-6xl mx-auto px-4 py-8">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
