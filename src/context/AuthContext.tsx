import React, { createContext, useContext, useState } from 'react';
import { User } from '../types/User';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role?: 'user' | 'admin') => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string, role: 'user' | 'admin' = 'user') => {
    // Dummy login - in production, this would call an API
    if ((email === 'demo@example.com' && password === 'demo123') ||
        (email === 'admin@example.com' && password === 'admin123')) {
      setUser({
        id: '1',
        name: role === 'admin' ? 'Admin User' : 'Demo User',
        email: email,
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde',
        role: role
      });
    } else {
      throw new Error('Invalid credentials');
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};