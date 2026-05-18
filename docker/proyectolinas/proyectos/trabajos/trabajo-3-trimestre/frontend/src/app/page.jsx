export default function HomePage() {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-2xl shadow-md p-8 mb-6">
        <div className="flex items-center gap-6 mb-6">
          <div className="w-24 h-24 rounded-full overflow-hidden bg-blue-100 flex-shrink-0">
            <img src="/antonio.jpg" alt="Foto de perfil" className="w-full h-full object-cover" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Linas Cijunskis Dodonovas</h1>
            <p className="text-blue-600 font-medium">ASRI 2º Curso</p>
            <p className="text-gray-500 text-sm mt-1">linascijunskisdodonova4@gmail.com · Almeria, España</p>
          </div>
        </div>
        <p className="text-gray-600 leading-relaxed">
          Estudiante de ASRI con pasión por la seguridad informática. Actualmente desarrollando proyectos con
          <strong> Next.js</strong>, <strong>NestJS</strong> y <strong>PostgreSQL</strong>.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-md p-8 mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">💻 Habilidades Técnicas</h2>
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: 'Frontend', items: 'HTML, CSS, JavaScript, React, Next.js' },
            { label: 'Backend', items: 'Node.js, NestJS, PHP, Java' },
            { label: 'Base de datos', items: 'PostgreSQL, MySQL, TypeORM' },
            { label: 'Herramientas', items: 'Git, Docker, VS Code' },
          ].map((skill) => (
            <div key={skill.label} className="bg-blue-50 rounded-lg p-3">
              <p className="font-semibold text-blue-700 text-sm">{skill.label}</p>
              <p className="text-gray-600 text-sm mt-1">{skill.items}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-md p-8 mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">🚀 Proyectos</h2>
        <div className="space-y-4">
          <div className="border-l-4 border-blue-500 pl-4">
            <h3 className="font-bold text-gray-800">Tienda Online</h3>
            <p className="text-sm text-gray-500">2026 — Trabajo de 3º Trimestre De IAW</p>
            <p className="text-gray-600 text-sm mt-1">
              Aplicación fullstack con Next.js, NestJS, TypeORM y PostgreSQL.
              Sistema completo de autenticación JWT, carrito de compra y panel de administración.
            </p>
          </div>
          <div className="border-l-4 border-green-500 pl-4">
            <h3 className="font-bold text-gray-800">Portfolio Personal</h3>
            <p className="text-sm text-gray-500">2025</p>
            <p className="text-gray-600 text-sm mt-1">
              Sitio web personal desarrollado con HTML, CSS y JavaScript vanilla.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-md p-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">🎓 Formación</h2>
        <div className="space-y-3">
          <div className="flex justify-between items-start">
            <div>
              <p className="font-semibold text-gray-800">Técnico Superior en Administración de Sistemas Informáticos en Red</p>
              <p className="text-gray-500 text-sm">IES Cura Valera</p>
            </div>
            <span className="text-gray-400 text-sm">2024–2026</span>
          </div>
          <div className="flex justify-between items-start">
            <div>
              <p className="font-semibold text-gray-800">Grado Medio en Administración de Sistemas Informáticos en Red</p>
              <p className="text-gray-500 text-sm">IES Cura Valera</p>
            </div>
            <span className="text-gray-400 text-sm">2021–2023</span>
          </div>
        </div>
      </div>
    </div>
  );
}
