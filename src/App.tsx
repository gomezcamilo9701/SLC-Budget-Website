import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

//import Home from './components/home/Home.tsx';
//import RegistrationForm from './components/register/WorkerRegister.tsx';


const App = () => {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Home />} /> 
        <Route path="/home" element={<Home />} />  */}
        {/* <Route path="/register" element={<RegistrationForm />} />  */}
      </Routes>
    </Router>
  );
}

export default App;
