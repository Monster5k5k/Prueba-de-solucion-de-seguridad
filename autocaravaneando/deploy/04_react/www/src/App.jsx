import React from 'react';
import './App.css'; 
import Header from './componentes/Header';
import Navigation from './componentes/Navigation';
import Sidebar from './componentes/Sidebar.jsx';
import Content from './componentes/Content';
import Footer from './componentes/Footer';

function App() {
  return (
    <div className="app-container">
      <Header />
      <Navigation />
      
      <div className="main-content">
        <Sidebar />
        <Content />
      </div>
      
      <Footer />
    </div>
  );
}

export default App;