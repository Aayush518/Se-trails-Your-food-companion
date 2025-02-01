import React, { useState } from 'react';
import { Mail, Lock } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface Props {
  onSignUpClick: () => void;
  onForgotClick: () => void;
}

export const LoginForm: React.FC<Props> = ({ onSignUpClick, onForgotClick }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
    } catch (err) {
      setError('Invalid credentials. Try demo@example.com / demo123');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Welcome Back!</h2>
        <p className="text-gray-300">
          Sign in to continue your food journey
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-lg">
            <p className="text-sm text-red-400">{error}</p>
          </div>
        )}

        <div className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              required
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10 w-full p-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-400"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="password"
              required
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-10 w-full p-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-400"
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={onForgotClick}
            className="text-sm text-purple-400 hover:text-purple-300"
          >
            Forgot password?
          </button>
        </div>

        <button
          type="submit"
          className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-purple-500/50"
        >
          Sign in
        </button>
      </form>

      <div className="text-center">
        <p className="text-sm text-gray-400">
          Don't have an account?{' '}
          <button
            onClick={onSignUpClick}
            className="text-purple-400 hover:text-purple-300 font-medium"
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
};