import React from 'react';
import { Link } from 'react-router-dom';
import { Search, User, Menu } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-8">
        <Link to="/" className="text-2xl font-serif font-bold text-gray-800 tracking-tight">
          Spring<span className="text-pink-400">Vibe</span>
        </Link>
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-500">
          <Link to="/" className="hover:text-pink-500 transition-colors">Trending</Link>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
          <Search size={20} />
        </button>
        <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
          <User size={20} />
        </button>
        <button className="md:hidden p-2 text-gray-400 hover:text-gray-600 transition-colors">
          <Menu size={20} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
