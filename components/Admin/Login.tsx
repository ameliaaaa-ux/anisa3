
import React, { useState, useEffect } from 'react';

interface LoginProps {
  onLogin: (username: string) => void;
}

export const AdminLogin: React.FC<LoginProps> = ({ onLogin }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    // Initialize default admin if no users exist
    const users = JSON.parse(localStorage.getItem('amusic_users') || '[]');
    if (users.length === 0) {
      users.push({ username: 'admin', password: 'password123' });
      localStorage.setItem('amusic_users', JSON.stringify(users));
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const users = JSON.parse(localStorage.getItem('amusic_users') || '[]');

    if (isSignUp) {
      if (password !== confirmPassword) {
        setError('Passwords do not match');
        return;
      }
      if (users.find((u: any) => u.username === username)) {
        setError('Username already exists');
        return;
      }
      
      users.push({ username, password });
      localStorage.setItem('amusic_users', JSON.stringify(users));
      setSuccess('Account created! You can now login.');
      setIsSignUp(false);
      setPassword('');
      setConfirmPassword('');
    } else {
      const user = users.find((u: any) => u.username === username && u.password === password);
      if (user) {
        onLogin(username);
      } else {
        setError('Invalid username or password');
      }
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-slate-100 p-10 transition-all duration-300">
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-indigo-600 rounded-2xl flex items-center justify-center text-white mx-auto mb-6 shadow-xl shadow-indigo-100">
            <svg viewBox="0 0 24 24" className="w-10 h-10 fill-current" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 3L4 21H7.5L9.2 17H14.8L16.5 21H20L12 3ZM10.5 14L12 10L13.5 14H10.5Z" />
              <path d="M9 14H15" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="17" cy="14" r="1.5" fill="white" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-slate-900 font-serif">
            {isSignUp ? 'Create Account' : 'Admin Access'}
          </h2>
          <p className="text-slate-500 mt-2">
            {isSignUp ? 'Join the A Music management team' : 'Enter your credentials to manage A Music'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="p-4 bg-rose-50 text-rose-600 rounded-xl text-sm font-medium flex items-center gap-3 animate-shake">
              <i className="fas fa-exclamation-circle"></i> {error}
            </div>
          )}
          {success && (
            <div className="p-4 bg-emerald-50 text-emerald-600 rounded-xl text-sm font-medium flex items-center gap-3">
              <i className="fas fa-check-circle"></i> {success}
            </div>
          )}
          
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Username</label>
            <div className="relative">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 pl-11 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                placeholder="Enter username"
                required
              />
              <i className="fas fa-user absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 pl-11 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                placeholder="••••••••"
                required
              />
              <i className="fas fa-key absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
            </div>
          </div>

          {isSignUp && (
            <div className="animate-fade-in">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Confirm Password</label>
              <div className="relative">
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 pl-11 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  placeholder="••••••••"
                  required
                />
                <i className="fas fa-check-double absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-bold py-4 rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 mt-2"
          >
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </button>
        </form>
        
        <div className="mt-8 text-center">
          <button 
            onClick={() => {
              setIsSignUp(!isSignUp);
              setError('');
              setSuccess('');
            }}
            className="text-indigo-600 text-sm font-semibold hover:underline"
          >
            {isSignUp ? 'Already have an account? Sign In' : 'Need an account? Sign Up'}
          </button>
        </div>
        
        <p className="mt-8 text-center text-slate-400 text-[10px] uppercase tracking-widest">
          Secure A Music Management Gateway
        </p>
      </div>
    </div>
  );
};
