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
      <header className="main-header">
        <div className="logo">&lt;LinasDev /&gt;</div>
        <nav className="nav-menu">
          <a href="#proyectos" className="nav-link">Proyectos</a>
          <a href="#contacto" className="nav-link">Contacto</a>
        </nav>
      </header>

      {/* Sección Principal (Hero) */}
      <section className="hero">
        <p className="institute">{personalData.institute} • {personalData.year}</p>
        <h1 className="hero-title">{personalData.name}</h1>
        <h2 className="hero-subtitle">{personalData.role}</h2>
        <p className="hero-description">
          Especialista en despliegue de arquitecturas Docker seguras, desarrollo React
          y administración de sistemas Linux.
        </p>
        <div className="hero-actions">
          <a href="#proyectos" className="btn btn-primary">Ver Mis Trabajos</a>
        </div>
      </section>

      {/* Sección Proyectos */}
      <section id="proyectos" className="projects-section">
        <h2 className="section-title">Mis Despliegues Activos</h2>
        
        <div className="grid">
          {/* TARJETA 1: PROYECTO TARKOV */}
          <div className="card">
            <div className="card-header">
              <h3>🔫 Tarkov Web</h3>
              <span className="badge badge-blue">PUERTO 1987</span>
            </div>
            <p className="card-desc">
              Aplicación web compleja desplegada sobre arquitectura de 4 capas. 
              Incluye servidor Nginx blindado, backend Node.js y frontend React.
            </p>
            <div className="card-status">
              <span className="status-dot"></span> <span className="status-text">Online</span>
            </div>
            {/* OJO: Este enlace asume que estás en la misma IP */}
            <a href={window.location.protocol + "//" + window.location.hostname + ":1987"} target="_blank" className="card-link link-blue">
              Visitar Proyecto &rarr;
            </a>
          </div>

          {/* TARJETA 2: GESTIÓN DE DATOS */}
          <div className="card">
            <div className="card-header">
              <h3>🗄️ Base de Datos</h3>
              <span className="badge badge-purple">PUERTO 1990</span>
            </div>
            <p className="card-desc">
              Sistema de gestión MariaDB con interfaz phpMyAdmin. 
              Orquestado en red privada Docker para máxima seguridad.
            </p>
            <div className="card-status">
               <span className="status-dot"></span> <span className="status-text">Online</span>
            </div>
            <a href={window.location.protocol + "//" + window.location.hostname + ":1990"} target="_blank" className="card-link link-purple">
              Acceder al Panel &rarr;
            </a>
          </div>

          {/* TARJETA 3: ESTE PORTAFOLIO */}
          <div className="card">
            <div className="card-header">
              <h3>🎨 Este Portafolio</h3>
              <span className="badge badge-green">PUERTO 1974</span>
            </div>
            <p className="card-desc">
              Desarrollado en React + Vite. Demuestra la capacidad de infraestructura modular
              del servidor, corriendo simultáneamente en el puerto 1974.
            </p>
            <div className="card-status">
               <span className="status-dot"></span> <span className="status-text">Active</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contacto" className="main-footer">
        <p>&copy; 2026 {personalData.name} - Todos los derechos reservados.</p>
        <p className="footer-small">Desplegado con Docker Compose</p>
      </footer>
    </div>
  )
}

export default App