import React from 'react';
import { Routes, Route } from 'react-router-dom'; 
import Layout from '../layout/Layout';
import Dashboard from '../Components/Dashboard/Dashboard.jsx';
import Tabla from '../Components/Tabla/Tabla.jsx';
import Sidebar from '../Components/BarraMenu/sidebar.jsx';
import LoginForm from '../Components/LoginForm/LoginForm.jsx';

function Rutas({ isAuth, onLogout }) {
  return (
    <Layout>
      <Sidebar onLogout={onLogout} /> 
      <Routes>
        <Route path="/" element={isAuth ? <Dashboard /> : <LoginForm />} />
        <Route path="/Dashboard" element={isAuth ? <Dashboard /> : <LoginForm />} />
        <Route path="/Tabla" element={isAuth ? <Tabla /> : <LoginForm />} />
      </Routes>
    </Layout>
  );
}

export default Rutas;