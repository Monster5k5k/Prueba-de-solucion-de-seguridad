import React from 'react'
import './App.css'

function App() {
  // Aquí puedes cambiar tus datos fácilmente
  const personalData = {
    name: "Linas Cijunskis Dodonovas",
    role: "Full Stack Developer & SysAdmin",
    institute: "IES Cura Valera",
    year: "2025-2026"
  }

  return (
    <div className="container">
      {/* Barra Superior */}
      <header>
        <div className="logo">&lt;LinasDev /&gt;</div>
        <nav style={{display: 'flex', gap: '20px'}}>
          <a href="#proyectos" style={{color: 'white', textDecoration: 'none'}}>Proyectos</a>
          <a href="#contacto" style={{color: 'white', textDecoration: 'none'}}>Contacto</a>
        </nav>
      </header>

      {/* Sección Principal (Hero) */}
      <section className="hero">
        <p className="institute">{personalData.institute} • {personalData.year}</p>
        <h1>{personalData.name}</h1>
        <h2>{personalData.role}</h2>
        <p style={{maxWidth: '600px', margin: '0 auto 2rem auto', color: '#a0a0a0'}}>
          Especialista en despliegue de arquitecturas Docker seguras, desarrollo React
          y administración de sistemas Linux.
        </p>
        <a href="#proyectos" className="btn">Ver Mis Trabajos</a>
      </section>

      {/* Sección Proyectos */}
      <section id="proyectos" className="projects-section">
        <h2 className="section-title">Mis Despliegues Activos</h2>
        
        <div className="grid">
          {/* TARJETA 1: PROYECTO TARKOV */}
          <div className="card">
            <div style={{display:'flex', justifyContent:'space-between', marginBottom:'1rem'}}>
              <h3>🔫 Tarkov Web</h3>
              <span style={{fontSize:'0.8rem', border:'1px solid #00d4ff', padding:'2px 8px', borderRadius:'4px', color:'#00d4ff'}}>PUERTO 1987</span>
            </div>
            <p>
              Aplicación web compleja desplegada sobre arquitectura de 4 capas. 
              Incluye servidor Nginx blindado, backend Node.js y frontend React.
            </p>
            <div style={{marginTop: '1.5rem'}}>
              <span className="status-dot"></span> <span style={{fontSize:'0.9rem'}}>Online</span>
            </div>
            {/* OJO: Este enlace asume que estás en la misma IP */}
            <a href={window.location.protocol + "//" + window.location.hostname + ":1987"} target="_blank" style={{display:'block', marginTop:'1rem', color:'#00d4ff', textDecoration:'none'}}>
              Visitar Proyecto &rarr;
            </a>
          </div>

          {/* TARJETA 2: GESTIÓN DE DATOS */}
          <div className="card">
            <div style={{display:'flex', justifyContent:'space-between', marginBottom:'1rem'}}>
              <h3>🗄️ Base de Datos</h3>
              <span style={{fontSize:'0.8rem', border:'1px solid #9d4edd', padding:'2px 8px', borderRadius:'4px', color:'#9d4edd'}}>PUERTO 1990</span>
            </div>
            <p>
              Sistema de gestión MariaDB con interfaz phpMyAdmin. 
              Orquestado en red privada Docker para máxima seguridad.
            </p>
            <div style={{marginTop: '1.5rem'}}>
               <span className="status-dot"></span> <span style={{fontSize:'0.9rem'}}>Online</span>
            </div>
            <a href={window.location.protocol + "//" + window.location.hostname + ":1990"} target="_blank" style={{display:'block', marginTop:'1rem', color:'#9d4edd', textDecoration:'none'}}>
              Acceder al Panel &rarr;
            </a>
          </div>

          {/* TARJETA 3: ESTE PORTAFOLIO */}
          <div className="card">
            <h3>🎨 Este Portafolio</h3>
            <p>
              Desarrollado en React + Vite. Demuestra la capacidad de infraestructura modular
              del servidor, corriendo simultáneamente en el puerto 1974.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contacto">
        <p>&copy; 2026 {personalData.name} - Todos los derechos reservados.</p>
        <p style={{fontSize: '0.8rem', opacity: 0.6}}>Desplegado con Docker Compose</p>
      </footer>
    </div>
  )
}

export default App