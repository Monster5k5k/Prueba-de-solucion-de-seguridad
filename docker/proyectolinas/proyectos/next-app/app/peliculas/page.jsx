'use client';
import { useEffect, useState } from 'react';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export default function PeliculasPage() {
  const [peliculas, setPeliculas] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    fetch(`${API}/peliculas`)
      .then((r) => r.json())
      .then((d) => { setPeliculas(d); setCargando(false); })
      .catch(() => { setError('No se pudo conectar con la API'); setCargando(false); });
  }, []);

  const seed = () =>
    fetch(`${API}/peliculas/seed`, { method: 'POST' })
      .then((r) => r.json())
      .then(() => fetch(`${API}/peliculas`).then((r) => r.json()).then(setPeliculas));

  const filtradas = peliculas.filter((p) =>
    p.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
    p.director.toLowerCase().includes(busqueda.toLowerCase()) ||
    p.genero.toLowerCase().includes(busqueda.toLowerCase())
  );

  if (cargando) return <p className="loading">Cargando películas...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h1 className="page-title">🎬 Películas ({peliculas.length})</h1>
        <button onClick={seed} style={{ background: '#c8aa6e', color: '#000', border: 'none', padding: '0.5rem 1rem', borderRadius: '6px', cursor: 'pointer', fontWeight: 600 }}>
          Seed datos
        </button>
      </div>
      <input
        placeholder="Buscar por título, director o género..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        style={{ width: '100%', maxWidth: '400px', padding: '0.5rem 1rem', marginBottom: '1.5rem', background: '#1a1a1a', border: '1px solid #444', borderRadius: '6px', color: '#fff' }}
      />
      <div className="grid">
        {filtradas.map((p) => (
          <div key={p.id} className="card">
            <span className="badge">{p.genero}</span>
            <h3>{p.titulo}</h3>
            <p>🎥 {p.director}</p>
            <p>📅 {new Date(p.fechaEstreno).getFullYear()}</p>
            <p>⏱️ {p.duracion} min</p>
          </div>
        ))}
      </div>
      {filtradas.length === 0 && <p className="loading">No hay resultados para "{busqueda}"</p>}
    </div>
  );
}
