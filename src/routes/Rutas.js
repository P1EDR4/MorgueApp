import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '../layout/Layout';
import Dashboard from '../Components/Dashboard/Dashboard.jsx';
import Tabla from '../Components/Tabla/Tabla.jsx';
import Sidebar from '../Components/BarraMenu/sidebar.jsx';


function Rutas({ onLogout }) {
  return (
    <Router>
      <Layout>
        <Sidebar onLogout={onLogout} /> 
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Tabla" element={<Tabla />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default Rutas;

