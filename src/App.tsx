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
  const { isAuthenticated, user } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" />;
  }

  if (user?.role !== 'admin') {
    return <Navigate to="/" />;
  }

  return <AdminDashboard onLogout={() => {}} />;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/admin/login" element={<AdminLogin onLogin={() => {}} />} />
          <Route path="/admin/dashboard" element={<AdminRoute />} />
          <Route path="/admin" element={<Navigate to="/admin/dashboard" />} />
          <Route path="/*" element={<AppContent />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;