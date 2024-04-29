import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ onLogout }) => { 
  return (
    <div className="sidebar">
      <ul>
        <li><Link to="/Dashboard">Panel Principal</Link></li> 
        <li><Link to="/Tabla">Agregar Información</Link></li> 
        <li><Link to="#" onClick={onLogout}>Cerrar Sesión</Link></li> 
      </ul>
    </div>
  );
};

export default Sidebar;
