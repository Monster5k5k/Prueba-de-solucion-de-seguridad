import React from 'react'
import './App.css'

function App() {
  const me = {
    name: "Linas Cijunskis",
    role: "SysAdmin & Developer",
    school: "IES Cura Valera"
  }

  // Detectamos la IP automáticamente
  const host = window.location.hostname;

  return (
    // Usamos la nueva clase 'layout' para centrar todo
    <div className="layout">
      
      <header className="header">
        <div className="logo">&lt;LinasDev /&gt;</div>
        <div className="subtitle">{me.role} • {me.school}</div>
      </header>

      <main className="grid-container">
        
        {/* PROYECTO 1: TARKOV */}
        <div className="card">
          <div>
            <span className="badge blue">PUERTO 3000</span>
            <h2>🔫 Tarkov Web</h2>
            <p>
              Aplicación web compleja desplegada sobre arquitectura de 4 capas. 
              Frontend React + Vite servido sobre Nginx.
            </p>
          </div>
          <a href={`http://${host}:3000`} target="_blank" className="btn-link">
            Abrir Proyecto ↗
          </a>
        </div>

        {/* PROYECTO 2: DATABASE */}
        <div className="card">
          <div>
            <span className="badge">PUERTO 5432</span>
            <h2>🗄️ Database</h2>
            <p>
              En este se debe conectarse desde la base de mysql.
            </p>
          </div>
          <a href={`http://${host}:5432`} target="_blank" className="btn-link">
            Abrir Panel ↗
          </a>
        </div>

        {/* PROYECTO 3: PORTAFOLIO */}
        <div className="card">
          <div>
            <span className="badge blue">PUERTO 5000</span>
            <h2>🎨 Portafolio</h2>
            <p>
              Estás aquí. Una SPA (Single Page Application) moderna, responsive 
              y desplegada independientemente.
            </p>
          </div>
          <div className="btn-link" style={{opacity: 0.5, cursor: 'default'}}>
            Estás aquí
          </div>
        </div>

      </main>
      
      <footer style={{marginTop: 'auto', paddingTop: '2rem', color: '#555', fontSize: '0.9rem'}}>
        &copy; 2026 {me.name} - Desplegado con Docker Compose
      </footer>
    </div>
  )
}

export default App