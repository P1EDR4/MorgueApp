import React,{useState} from 'react';
import LoginForm from './Components/LoginForm/LoginForm'; 
import Rutas from './routes/Rutas';

function App() {
  const [isAuth, setIsAuth] = useState(false);

  const handleLogin = () => {
    setIsAuth(true);
  };

  return (
    isAuth ? (
      <Rutas/>
    ) : (
      <LoginForm onLogin={handleLogin}/>
    )
  );
}

export default App;