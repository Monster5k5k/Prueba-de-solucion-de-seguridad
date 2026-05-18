import { Suspense } from 'react';
import ProductosClient from './ProductosClient';

export const dynamic = 'force-dynamic';

export default function ProductosPage() {
  return (
    <Suspense fallback={<div className="text-center text-gray-500 py-16">Cargando...</div>}>
      <ProductosClient />
    </Suspense>
  );
}
