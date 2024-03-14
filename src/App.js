import { LoginForm } from './Components/Login/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Tabla from './Components/Tabla/Tabla';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/Tabla" element={<Tabla />} />
      </Routes>
    </Router>
  );
}

export default App;