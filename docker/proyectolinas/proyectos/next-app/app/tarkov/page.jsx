'use client';
import { useEffect, useState } from 'react';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export default function TarkovPage() {
  const [items, setItems] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [soloFIR, setSoloFIR] = useState(false);
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    fetch(`${API}/tarkov`)
      .then((r) => r.json())
      .then((d) => { setItems(d); setCargando(false); })
      .catch(() => { setError('No se pudo conectar con la API'); setCargando(false); });
  }, []);

  const seed = () =>
    fetch(`${API}/tarkov/seed`, { method: 'POST' })
      .then((r) => r.json())
      .then(() => fetch(`${API}/tarkov`).then((r) => r.json()).then(setItems));

  const filtrados = items.filter((i) => {
    const coincide =
      i.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      i.categoria.toLowerCase().includes(busqueda.toLowerCase());
    return coincide && (!soloFIR || i.encontradoEnIncursion);
  });

  if (cargando) return <p className="loading">Cargando items...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h1 className="page-title">🔫 Items Tarkov ({items.length})</h1>
        <button onClick={seed} style={{ background: '#c8aa6e', color: '#000', border: 'none', padding: '0.5rem 1rem', borderRadius: '6px', cursor: 'pointer', fontWeight: 600 }}>
          Seed datos
        </button>
      </div>
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <input
          placeholder="Buscar por nombre o categoría..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          style={{ flex: 1, minWidth: '200px', padding: '0.5rem 1rem', background: '#1a1a1a', border: '1px solid #444', borderRadius: '6px', color: '#fff' }}
        />
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
          <input type="checkbox" checked={soloFIR} onChange={(e) => setSoloFIR(e.target.checked)} />
          Solo FIR
        </label>
      </div>
      <div className="grid">
        {filtrados.map((i) => (
          <div key={i.id} className="card">
            <span className="badge">{i.categoria}</span>
            {i.encontradoEnIncursion && <span className="badge" style={{ marginLeft: '0.5rem', borderColor: '#4caf50', color: '#4caf50' }}>FIR</span>}
            <h3>{i.nombre}</h3>
            <p>💰 {Number(i.precio).toLocaleString()} ₽</p>
            <p>⚖️ {i.peso} kg</p>
            {i.descripcion && <p style={{ marginTop: '0.5rem', fontSize: '0.78rem' }}>{i.descripcion}</p>}
          </div>
        ))}
      </div>
      {filtrados.length === 0 && <p className="loading">No hay resultados</p>}
    </div>
  );
}
