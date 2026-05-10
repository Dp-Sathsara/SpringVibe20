import React from 'react';
import { Link } from 'react-router-dom';


const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-100 pt-16 mt-20">
      <div className="max-w-4xl mx-auto space-y-8 pb-16 px-6 text-center">
        <div className="flex flex-col items-center gap-4">
          <Link to="/" className="text-2xl font-serif font-bold text-gray-800 tracking-tight transition-all duration-300 hover:text-pink-500">
            Spring<span className="text-pink-400">Vibe</span>
          </Link>
          <div className="flex items-center gap-6 text-sm font-medium text-gray-500">
            <Link to="/" className="hover:text-pink-500 transition-colors">Privacy Policy</Link>
            <Link to="/" className="hover:text-pink-500 transition-colors">Terms of Service</Link>
            <Link to="/" className="hover:text-pink-500 transition-colors">Contact</Link>
          </div>
        </div>
      </div>

      <div className="bg-[#FFF1F0] w-full py-12 px-6 text-center text-sm text-gray-500">
        <div className="max-w-7xl mx-auto">
          <p className="mb-3 font-bold text-gray-700 uppercase tracking-[0.2em] text-[11px]">Transparency & Support</p>
          <p className="max-w-3xl mx-auto leading-relaxed">
            Every product in our collection is handpicked with care to ensure the highest quality. 
            When you shop with SpringVibe, you're not just buying nail art, you're supporting our mission 
            to bring the most inspiring trends and professional-grade products directly to your fingertips.
          </p>
          <p className="mt-8 font-extrabold text-gray-400 text-[10px] tracking-[0.25em] uppercase">
            © 2026 SPRINGVIBE EDITORIAL. AS AN AMAZON ASSOCIATE I EARN FROM QUALIFYING PURCHASES.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
