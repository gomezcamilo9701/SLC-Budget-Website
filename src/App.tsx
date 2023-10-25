import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home, Login, Register } from './components';


const App = () => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('userToken');
    if (storedToken) {
      console.log({storedToken});
      setToken(storedToken);
    }
  }, []);
  
  if(!token) {
    return <LoginForm setToken={setToken} />
  }
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} /> 
        <Route path="/login" element={<Login />} /> 
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home/>} />
      </Routes>
    </Router>
  );
}

export default App;

