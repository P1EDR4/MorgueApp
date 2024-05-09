import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom'; // Importa BrowserRouter
import LoginForm from './Components/LoginForm/LoginForm';
import Rutas from './routes/Rutas';

function App() {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const storedAuth = localStorage.getItem('isAuth');
    if (storedAuth === 'true') {
      setIsAuth(true);
    }
  }, []);

  const handleLogin = () => {
    setIsAuth(true);
    localStorage.setItem('isAuth', 'true');
  };

  const handleLogout = () => {
    setIsAuth(false);
    localStorage.removeItem('isAuth');
  };

  return (
    <Router> 
      <div>
        {isAuth ? (
          <Rutas isAuth={isAuth} onLogout={handleLogout} />
        ) : (
          <LoginForm onLogin={handleLogin} />
        )}
      </div>
    </Router>
  );
}

export default App;

