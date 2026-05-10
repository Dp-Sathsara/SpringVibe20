import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const AdminLogin: React.FC = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simplified security for this requirement
    if (password === 'spring2026') {
      localStorage.setItem('springvibe_admin', 'true');
      navigate('/admin2020/dashboard');
    } else {
      setError('Invalid access code. Please try again.');
      setPassword('');
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB] flex items-center justify-center p-6 selection:bg-pink-100 selection:text-pink-600">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-pink-100/50 rounded-full blur-3xl" />
        <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-peach-100/30 rounded-full blur-3xl" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-[40px] shadow-2xl shadow-pink-100/50 p-10 relative z-10 border border-pink-50"
      >
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-pink-50 rounded-2xl mb-6">
            <Lock className="text-pink-400" size={32} />
          </div>
          <h1 className="text-3xl font-serif font-bold text-gray-900 mb-2">Restricted Access</h1>
          <p className="text-gray-500 text-sm">Please enter your curator password to manage the SpringVibe collection.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <div className="relative">
              <input
                type="password"
                placeholder="Curator Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-pink-200 transition-all placeholder:text-gray-400 text-gray-900 font-medium"
                required
              />
            </div>
            {error && (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-400 text-xs mt-3 ml-2 font-medium"
              >
                {error}
              </motion.p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-[#7D5A50] text-white font-bold rounded-2xl shadow-lg shadow-pink-100 hover:bg-[#634840] transition-all flex items-center justify-center gap-2 group"
          >
            Enter Dashboard
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="mt-10 text-center">
          <button 
            onClick={() => navigate('/')}
            className="text-gray-400 text-xs font-semibold hover:text-gray-600 transition-colors uppercase tracking-wider"
          >
            ← Back to Storefront
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
