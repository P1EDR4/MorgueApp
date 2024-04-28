import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li><Link to="/Dashboard">Panel Principal</Link></li> 
        <li><Link to="/Tabla">Agregar Información</Link></li> 
        <li><Link to="/perfil">Perfil</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
