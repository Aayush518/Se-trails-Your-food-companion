import React from 'react';
import { AuthProvider } from './context/AuthContext';
import { MainApp } from './components/MainApp';
import { LandingPage } from './components/LandingPage';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AdminLogin } from './components/admin/AdminLogin';
import { useAuth } from './context/AuthContext';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

const AppContent: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  const isAdmin = user?.role === 'admin';

  if (!isAuthenticated) {
    return <LandingPage />;
  }

  if (isAdmin) {
    return <Navigate to="/admin/dashboard" />;
  }

  return <MainApp />;
};

const AdminRoute: React.FC = () => {
  const { login, isAuthenticated, user } = useAuth();
  
  if (isAuthenticated && user?.role === 'admin') {
    return <AdminDashboard onLogout={() => {}} />;
  }

  const handleAdminLogin = async (email: string, password: string) => {
    if (email === 'admin@example.com' && password === 'admin123') {
      await login(email, password, 'admin');
    } else {
      throw new Error('Invalid credentials');
    }
  };

  return <AdminLogin onLogin={handleAdminLogin} />;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/admin/*" element={<AdminRoute />} />
          <Route path="/*" element={<AppContent />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;