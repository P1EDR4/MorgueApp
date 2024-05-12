import React, { useState, useEffect } from 'react';
import './Clock.css';

const Clock = () => {
  const [dateTime, setDateTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const currentDate = new Date();
      const formattedDateTime = currentDate.toLocaleString('es-ES', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false // 24-hour format
      });
      setDateTime(formattedDateTime);
    };

    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="card">
      <p className="time-text">{dateTime}</p>
    </div>
  );
};


// Exportamos las funciones como propiedades
Clock.getHours = () => {
  const currentDate = new Date();
  return currentDate.getHours() % 12 || 12;
};

Clock.getMinutes = () => {
  const currentDate = new Date();
  return currentDate.getMinutes();
};

Clock.getDay = () => {
  const currentDate = new Date();
  return currentDate.toLocaleString('es-ES', { weekday: 'long' });
};

Clock.getDate = () => {
  const currentDate = new Date();
  return currentDate.toLocaleString('es-ES', { month: 'long', day: 'numeric' });
};

export default Clock;

