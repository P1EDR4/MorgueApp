import React, { useState, useEffect } from 'react';
import './Clock.css';

const Clock = () => {
  const [time, setTime] = useState('');
  const [period, setPeriod] = useState('');
  const [day, setDay] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const currentDate = new Date();
      const hours = currentDate.getHours() % 12 || 12; // Formato de 12 horas
      const minutes = currentDate.getMinutes();
      const newPeriod = currentDate.getHours() >= 12 ? 'PM' : 'AM'; // Determinar si es AM o PM
      const formattedTime = `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
      setTime(formattedTime);
      setPeriod(newPeriod);
      setDay(currentDate.toLocaleString('es-ES', { weekday: 'long' }));
      setDate(currentDate.toLocaleString('es-ES', { month: 'long', day: 'numeric' }));
    };

    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="card">
      <p className="time-text"><span>{time}</span><span className="time-sub-text">{period}</span></p>
      <p className="day-text">{day}, {date}</p>
      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16" strokewidth="0" fill="currentColor" stroke="currentColor" className="moon"><path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z"></path><path d="M10.794 3.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387a1.734 1.734 0 0 0-1.097 1.097l-.387 1.162a.217.217 0 0 1-.412 0l-.387-1.162A1.734 1.734 0 0 0 9.31 6.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387a1.734 1.734 0 0 0 1.097-1.097l.387-1.162zM13.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732l-.774-.258a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732L13.863.1z"></path></svg>
    </div>
  );
};

export default Clock;