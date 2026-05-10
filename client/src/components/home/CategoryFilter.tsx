import React from 'react';

interface CategoryFilterProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const categories = [
  'All',
  'Gel Polish Sets',
  'Press-On Nails',
  'Nail Art & Decor',
  'Nail Care & Health',
  'Tools & Equipment'
];

const CategoryFilter: React.FC<CategoryFilterProps> = ({ activeCategory, onCategoryChange }) => {
  return (
    <div className="sticky top-[72px] z-40 bg-white/95 backdrop-blur-sm border-b border-gray-50 py-4 px-6 mb-8 overflow-x-auto hide-scrollbar">
      <div className="flex items-center gap-3 min-w-max mx-auto justify-center">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`
              px-6 py-2 rounded-full text-sm font-medium transition-all duration-300
              ${activeCategory === category 
                ? 'bg-pink-100 text-pink-600 shadow-sm ring-1 ring-pink-200 scale-105' 
                : 'bg-white text-gray-400 hover:text-gray-600 hover:bg-gray-50 border border-gray-100'
              }
            `}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
