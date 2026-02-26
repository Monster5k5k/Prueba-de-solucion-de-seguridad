
import React, { useState } from 'react'; 


const galleryImages = [
  {
    src: "/gallery/mapa-customs.png",
    alt: "Mapa de Customs",
    title: "Mapa: Customs"
  },
  {
    src: "/gallery/mapa-woods.png",
    alt: "Mapa de Woods",
    title: "Mapa: Woods"
  },
  {
    src: "/gallery/arma-m4.jpg",
    alt: "Arma M4 Full Mod",
    title: "M4A1 Full Mod"
  },
  {
    src: "/gallery/item-ledx.png",
    alt: "Item Raro LedX",
    title: "Item: LedX"
  }
];

const Content = () => {

  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {

    const isFirstImage = currentIndex === 0;
    const newIndex = isFirstImage ? galleryImages.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };


  const goToNext = () => {

    const isLastImage = currentIndex === galleryImages.length - 1;
    const newIndex = isLastImage ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };


  return (
    <main className="content">
      <h1>Eventos y Actualizaciones</h1>

      
      <article className="patch-note">
        <h3>¡NUEVO EVENTO: SIN TRADERS!</h3>
        <p className="date">Publicado el 10 de Noviembre, 2025</p>
        <p>
          ¡Atención PMCs! Todos los traders han cerrado sus tiendas temporalmente.
          Los precios en el Flea Market se han disparado. ¡Buena suerte ahí fuera!
        </p>
      </article>

      <article className="patch-note">
        <h3>Parche 0.14.8.2</h3>
        <p className="date">Publicado el 5 de Noviembre, 2025</p>
        <p>
          - Corregido un error que causaba invisibilidad en Interchange.
          <br />
          - Ajustado el spawn de munición de alta penetración.
          <br />
          - Mejoras de optimización en Streets of Tarkov.
        </p>
      </article>

      <article className="patch-note">
        <h3>Stream de Twitch Drops</h3>
        <p className="date">Publicado el 1 de Noviembre, 2025</p>
        <p>
          Ver streams de Tarkov en Twitch este fin de semana para ganar
          recompensas en el juego. ¡No te lo pierdas!
        </p>
      </article>

      
      <section className="gallery-section">
        <h2>Galería del Caos</h2>
        
        
        <div className="carousel-container">
          
          
          <button className="carousel-button prev" onClick={goToPrevious}>
            &#10094; 
          </button>
          
          
          <div className="carousel-image-container">
            <img 
              src={galleryImages[currentIndex].src} 
              alt={galleryImages[currentIndex].alt} 
              className="carousel-image"
            />
            <p className="carousel-title">
              {galleryImages[currentIndex].title}
            </p>
          </div>
          
       
          <button className="carousel-button next" onClick={goToNext}>
            &#10095; 
          </button>

        </div>
      </section>
      

    </main>
  );
};

export default Content;