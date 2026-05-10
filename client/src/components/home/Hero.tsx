import React from 'react';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  return (
    <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-white pt-20">
      {/* Background patterns or subtle floating elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 right-20 w-64 h-64 bg-pink-100 rounded-full blur-3xl opacity-50 animate-pulse" />
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-orange-50 rounded-full blur-3xl opacity-60" />
      </div>

      <div className="container mx-auto px-6 relative z-10 flex flex-col items-start text-left">
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="px-4 py-1.5 rounded-full bg-green-100 text-green-700 text-xs font-bold uppercase tracking-widest mb-6"
        >
          Editorial Pick 2026
        </motion.span>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-5xl md:text-7xl font-serif font-medium text-gray-900 leading-[1.1] mb-8 max-w-4xl"
        >
          Trending Spring <br />
          <span className="italic text-gray-600 font-normal">Nail Ideas 2026</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-lg text-gray-500 max-w-xl mb-12"
        >
          Discover the curated collection of soft pastels, floral accents, and minimalist designs that are defining this season's aesthetic.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <button className="px-8 py-4 rounded-full bg-[#7D5A50] text-white font-medium hover:bg-[#634840] transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
            Browse Collection
          </button>
          <button className="px-8 py-4 rounded-full bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition-all">
            View Lookbook
          </button>
        </motion.div>
      </div>

      {/* Decorative Image (Optional placeholder for now or abstract visual) */}
      <motion.div 
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 0.8, x: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-[40%] h-[70%] bg-cover bg-center rounded-l-[100px] shadow-2xl"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1519014816548-bf5fe059798b?q=80&w=1000&auto=format&fit=crop")' }}
      />
    </section>
  );
};

export default Hero;
