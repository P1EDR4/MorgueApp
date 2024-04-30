import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Clock from './Clock'; // Importa el componente Clock
import './Dashboard.css';

const Dashboard = () => {
  const [totalInfo, setTotalInfo] = useState(0);
  const [deletedInfo, setDeletedInfo] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api-morgueapp.onrender.com/info');
        const data = response.data;
        setTotalInfo(data.totalInfo);
        setDeletedInfo(data.deletedInfo);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="dashboard-container">
      <h2>Bienvenido a Morgue App</h2>
      <div>
        <p>Total de información: {totalInfo}</p>
        <p>Información eliminada: {deletedInfo}</p>
      </div>
      <Clock /> {/* Agrega el componente Clock aquí */}
    </div>
  );
};

export default Dashboard;

