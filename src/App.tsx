import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Contacts, Login, Profile, Register, ResponsiveDrawer } from './components';
import ProtectedRoute from './utils/ProtectedRoute';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} /> 
        <Route path="/register" element={<Register />} />

          <Route element={<ProtectedRoute redirectPath='/login'/>}>
            <Route path="/" element={<ResponsiveDrawer />}>
              <Route path='/contacts' element={<Contacts />} />
              <Route path='/profile' element={<Profile />} />
            </Route>
          </Route>

      </Routes>
    </Router>
  );
}

export default App;