import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AdminDashboard from './pages/AdminDashboard';
import AdminEditProduct from './pages/AdminEditProduct';
import AdminLogin from './pages/AdminLogin';
import { Navigate } from 'react-router-dom';

const RequireAuth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isAdmin = localStorage.getItem('springvibe_admin') === 'true';
  return isAdmin ? <>{children}</> : <Navigate to="/admin2020" replace />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin2020" element={<AdminLogin />} />
        <Route path="/admin2020/dashboard" element={<RequireAuth><AdminDashboard /></RequireAuth>} />
        <Route path="/admin2020/add" element={<RequireAuth><AdminEditProduct /></RequireAuth>} />
        <Route path="/admin2020/edit/:id" element={<RequireAuth><AdminEditProduct /></RequireAuth>} />
      </Routes>
    </Router>
  );
}

export default App;
