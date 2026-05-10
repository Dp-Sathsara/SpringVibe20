import React from 'react';
import { motion } from 'framer-motion';
import { Star, ExternalLink, Heart } from 'lucide-react';

import type { Product } from '../../types/product';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const handleRedirect = () => {
    if (product.affiliateLink) {
      window.open(product.affiliateLink, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      className="group relative bg-white rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-500 border border-transparent hover:border-pink-100 mb-6"
    >
      <div className="relative aspect-auto overflow-hidden">
        <img 
          src={product.imageUrl || (product as any).image} 
          alt={product.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
        />
        <div className="absolute top-4 right-4 z-10">
          <button className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-pink-500 transition-all shadow-sm">
            <Heart size={18} />
          </button>
        </div>
        <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 px-2.5 py-1 bg-white/80 backdrop-blur-md rounded-full text-gray-700 shadow-sm border border-white/40">
          <Star size={10} className="fill-yellow-400 text-yellow-400" />
          <span className="text-[10px] font-bold tracking-tight">{product.rating?.toFixed(1) || '0.0'}</span>
        </div>
        <div className="absolute bottom-4 left-4 z-10">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-bold text-gray-700 uppercase tracking-widest border border-white/50">
            {product.category}
          </span>
        </div>
      </div>

      <div className="p-6 space-y-4">
        <div>
          <h3 className="text-lg font-serif font-semibold text-gray-800 mb-1 group-hover:text-pink-600 transition-colors">
            {product.title}
          </h3>
          <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between text-[11px] font-medium text-gray-400 border-t border-gray-50 pt-4 mb-2">
            <span className="flex items-center gap-1">⭐ RATING: <span className="font-bold text-gray-700">{product.rating?.toFixed(1) || '0.0'} / 5.0</span></span>
          </div>
          
          <button 
            onClick={handleRedirect}
            className="flex items-center justify-center gap-2 w-full py-3 bg-[#7D5A50] text-white text-sm font-semibold rounded-2xl hover:bg-[#634840] transition-colors shadow-lg hover:shadow-xl active:scale-[0.98]"
          >
            View Style
            <ExternalLink size={14} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
