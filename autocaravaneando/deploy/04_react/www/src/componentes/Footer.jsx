import React from 'react';
import { FaTwitter, FaFacebookF, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      
      <div className="social-icons">
        <a href="https://twitter.com/bstategames" target="_blank" rel="noopener noreferrer">
          <FaTwitter />
        </a>
        <a href="https://www.facebook.com/escapefromtarkov" target="_blank" rel="noopener noreferrer">
          <FaFacebookF />
        </a>
        <a href="https://www.instagram.com/escapefromtarkov/" target="_blank" rel="noopener noreferrer">
          <FaInstagram />
        </a>
      </div>

      <div className="footer-text">
        © {new Date().getFullYear()} - Sitio de Fans de Escape From Tarkov.
        <br />
        No afiliado con Battlestate Games.
      </div>

    </footer>
  );
};

export default Footer;