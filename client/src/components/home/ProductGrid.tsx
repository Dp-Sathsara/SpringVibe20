import React from 'react';
import Masonry from 'react-masonry-css';
import type { Product } from '../../types/product';
import ProductCard from './ProductCard';
import { AnimatePresence } from 'framer-motion';

interface ProductGridProps {
  products: Product[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1
  };

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <span className="text-2xl">🌸</span>
        </div>
        <h3 className="text-xl font-serif font-medium text-gray-800">No styles found</h3>
        <p className="text-gray-500 max-w-xs mt-2">Try selecting a different category to discover more spring vibes.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 mb-20">
      <AnimatePresence mode="popLayout">
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="masonry-grid"
          columnClassName="masonry-grid_column"
        >
          {products.map((product) => (
            <ProductCard key={product.id || product._id} product={product} />
          ))}
        </Masonry>
      </AnimatePresence>
    </div>
  );
};

export default ProductGrid;
