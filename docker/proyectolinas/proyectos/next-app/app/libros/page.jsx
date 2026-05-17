'use client';
import { useEffect, useState } from 'react';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export default function LibrosPage() {
  const [libros, setLibros] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    fetch(`${API}/libros`)
      .then((r) => r.json())
      .then((d) => { setLibros(d); setCargando(false); })
      .catch(() => { setError('No se pudo conectar con la API'); setCargando(false); });
  }, []);

  const seed = () =>
    fetch(`${API}/libros/seed`, { method: 'POST' })
      .then((r) => r.json())
      .then(() => fetch(`${API}/libros`).then((r) => r.json()).then(setLibros));

  const filtrados = libros.filter((l) =>
    l.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
    l.autor.toLowerCase().includes(busqueda.toLowerCase()) ||
    l.genero.toLowerCase().includes(busqueda.toLowerCase())
  );

  if (cargando) return <p className="loading">Cargando libros...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h1 className="page-title">📚 Libros ({libros.length})</h1>
        <button onClick={seed} style={{ background: '#c8aa6e', color: '#000', border: 'none', padding: '0.5rem 1rem', borderRadius: '6px', cursor: 'pointer', fontWeight: 600 }}>
          Seed datos
        </button>
      </div>
      <input
        placeholder="Buscar por título, autor o género..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        style={{ width: '100%', maxWidth: '400px', padding: '0.5rem 1rem', marginBottom: '1.5rem', background: '#1a1a1a', border: '1px solid #444', borderRadius: '6px', color: '#fff' }}
      />
      <div className="grid">
        {filtrados.map((l) => (
          <div key={l.id} className="card">
            <span className="badge">{l.genero}</span>
            <h3>{l.titulo}</h3>
            <p>✍️ {l.autor}</p>
            <p>🏢 {l.editorial}</p>
            <p>💰 {Number(l.precio).toFixed(2)} €</p>
            <p>📦 Stock: {l.cantidad}</p>
          </div>
        ))}
      </div>
      {filtrados.length === 0 && <p className="loading">No hay resultados para "{busqueda}"</p>}
    </div>
  );
}
