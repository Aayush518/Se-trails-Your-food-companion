import React from 'react';
import { Mountain, Users, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Header: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 text-white">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/10 rounded-xl backdrop-blur-sm group hover:bg-white/20 transition-all duration-300">
              <Mountain className="h-8 w-8 transform group-hover:scale-110 transition-transform" />
            </div>
            <h1 className="text-2xl font-bold">SE-Trails Pokhara</h1>
          </div>
          <div className="flex items-center gap-4">
            {user && (
              <>
                <div className="flex items-center gap-3 bg-white/10 px-4 py-2 rounded-xl backdrop-blur-sm">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="h-8 w-8 rounded-full ring-2 ring-white/20"
                  />
                  <span className="font-medium">{user.name}</span>
                </div>
                <button
                  onClick={logout}
                  className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl backdrop-blur-sm hover:bg-white/20 transition-all duration-300"
                >
                  <LogOut size={20} />
                  <span>Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};