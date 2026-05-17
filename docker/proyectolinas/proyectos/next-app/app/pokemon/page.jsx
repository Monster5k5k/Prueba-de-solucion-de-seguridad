'use client';
import { useEffect, useState } from 'react';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export default function PokemonPage() {
  const [pokemon, setPokemon] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    fetch(`${API}/pokemon`)
      .then((r) => r.json())
      .then((d) => { setPokemon(d); setCargando(false); })
      .catch(() => { setError('No se pudo conectar con la API'); setCargando(false); });
  }, []);

  const seed = () =>
    fetch(`${API}/pokemon/seed`, { method: 'POST' })
      .then((r) => r.json())
      .then(() => fetch(`${API}/pokemon`).then((r) => r.json()).then(setPokemon));

  const filtrados = pokemon.filter((p) =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    p.tipo.toLowerCase().includes(busqueda.toLowerCase())
  );

  if (cargando) return <p className="loading">Cargando pokemon...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h1 className="page-title">🎮 Pokemon ({pokemon.length})</h1>
        <button onClick={seed} style={{ background: '#c8aa6e', color: '#000', border: 'none', padding: '0.5rem 1rem', borderRadius: '6px', cursor: 'pointer', fontWeight: 600 }}>
          Seed datos
        </button>
      </div>
      <input
        placeholder="Buscar por nombre o tipo..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        style={{ width: '100%', maxWidth: '400px', padding: '0.5rem 1rem', marginBottom: '1.5rem', background: '#1a1a1a', border: '1px solid #444', borderRadius: '6px', color: '#fff' }}
      />
      <div className="grid">
        {filtrados.map((p) => (
          <div key={p.id} className="card">
            <span className="badge">{p.tipo}</span>
            <h3>{p.nombre}</h3>
            <p>❤️ HP: {p.hp}</p>
            <p>⚔️ Ataque: {p.ataque}</p>
            <p>🛡️ Defensa: {p.defensa}</p>
          </div>
        ))}
      </div>
      {filtrados.length === 0 && <p className="loading">No hay resultados para "{busqueda}"</p>}
    </div>
  );
}
