import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '../layout/Layout';
import Dashboard from '../Components/Dashboard/Dashboard.jsx';
import Tabla from '../Components/Tabla/Tabla.jsx';

function Rutas() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/Tabla" element={<Tabla />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default Rutas;
