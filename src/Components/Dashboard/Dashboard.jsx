import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';
import Clock from './Clock';

const Dashboard = () => {
  const [totalInfo, setTotalInfo] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api-morgueapp.onrender.com/info');
        const data = response.data;
        setTotalInfo(data.totalInfo);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    return () => {
      document.body.classList.remove('dashboard-background');
    };
  }, []);

  useEffect(() => {
    document.body.classList.add('dashboard-background');

    return () => {
      document.body.classList.remove('dashboard-background');
    };
  }, []);

  return (
    <div className="container">
      <div className="info-box">
        <span className="title">Bienvenido a MorgueApp</span>
        <div>
        </div>
        <p>Total de información: {totalInfo}</p>
      </div>
      <Clock />
    </div>
  );
};

export default Dashboard;
