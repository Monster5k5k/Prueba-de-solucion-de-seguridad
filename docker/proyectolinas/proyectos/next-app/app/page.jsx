import Link from 'next/link';

export default function Home() {
  const modulos = [
    { href: '/pokemon', emoji: '🎮', titulo: 'Pokemon', desc: 'Listado completo con búsqueda por nombre, tipo y HP' },
    { href: '/peliculas', emoji: '🎬', titulo: 'Películas', desc: 'Catálogo de películas con filtro por fecha y título' },
    { href: '/tarkov', emoji: '🔫', titulo: 'Items Tarkov', desc: 'Base de datos de items con filtro FIR y categoría' },
    { href: '/libros', emoji: '📚', titulo: 'Libros', desc: 'Biblioteca de libros con búsqueda por autor y título' },
  ];

  return (
    <div className="hero">
      <h1>API Linas — Next.js</h1>
      <p>Frontend Next.js conectado a la API NestJS + PostgreSQL</p>
      <div className="links" style={{ marginBottom: '3rem' }}>
        <a className="btn" href={`${process.env.NEXT_PUBLIC_API_URL}`} target="_blank" rel="noreferrer">
          Ver API REST ↗
        </a>
        <Link className="btn-outline" href="/pokemon">Explorar datos</Link>
      </div>
      <div className="grid" style={{ maxWidth: '900px', margin: '0 auto' }}>
        {modulos.map((m) => (
          <Link key={m.href} href={m.href} style={{ textDecoration: 'none' }}>
            <div className="card">
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{m.emoji}</div>
              <h3>{m.titulo}</h3>
              <p>{m.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
