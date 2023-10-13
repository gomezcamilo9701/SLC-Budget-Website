import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

//import Home from './components/home/Home.tsx';
import RegisterForm from './components/register/Register';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RegisterForm />} /> {/* Este ruta es momentanea mientras se hace el home
        <Route path="/home" element={<Home />} /> */}
        <Route path="/register" element={<RegisterForm />} />
      </Routes>
    </Router>
  );
}

export default App;
