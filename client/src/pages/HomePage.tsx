import React, { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import Navbar from '../components/layout/Navbar';
import Hero from '../components/home/Hero';
import CategoryFilter from '../components/home/CategoryFilter';
import ProductGrid from '../components/home/ProductGrid';
import Footer from '../components/layout/Footer';
import type { Product } from '../types/product';

const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (isLoading) {
        setIsLoading(false);
        console.error('Firestore fetch timed out');
      }
    }, 10000); // 10 second timeout

    fetchProducts();

    return () => clearTimeout(timeout);
  }, [activeCategory]);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const productsRef = collection(db, 'products');
      let q;

      if (activeCategory === 'All') {
        q = query(productsRef, orderBy('createdAt', 'desc'));
      } else {
        q = query(
          productsRef, 
          where('category', '==', activeCategory),
          orderBy('createdAt', 'desc')
        );
      }
      
      const querySnapshot = await getDocs(q);
      const fetchedProducts: Product[] = [];
      querySnapshot.forEach((doc) => {
        fetchedProducts.push({ id: doc.id, ...doc.data() } as Product);
      });
      
      setProducts(fetchedProducts);
    } catch (error) {
      console.error('Error fetching products from Firestore:', error);
      // If composite index is missing, fallback to non-sorted if it fails
      if (activeCategory !== 'All') {
        try {
          const qFallback = query(collection(db, 'products'), where('category', '==', activeCategory));
          const snap = await getDocs(qFallback);
          const fallProducts: Product[] = [];
          snap.forEach((doc) => fallProducts.push({ id: doc.id, ...doc.data() } as Product));
          setProducts(fallProducts);
        } catch (innerError) {
          console.error('Fallback query failed:', innerError);
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFBFB] selection:bg-pink-100 selection:text-pink-600">
      <Navbar />
      
      <main>
        <Hero />
        
        <div id="styles-section" className="scroll-mt-32">
          <CategoryFilter 
            activeCategory={activeCategory} 
            onCategoryChange={(cat) => {
              setActiveCategory(cat);
              // Smooth scroll to the products section if needed
              document.getElementById('styles-section')?.scrollIntoView({ behavior: 'smooth' });
            }} 
          />
          
          <div className="min-h-[400px]">
             {isLoading ? (
               <div className="flex items-center justify-center py-40">
                 <div className="w-8 h-8 border-2 border-pink-200 border-t-pink-500 rounded-full animate-spin" />
               </div>
             ) : products.length > 0 ? (
               <ProductGrid products={products} />
             ) : (
               <div className="flex flex-col items-center justify-center py-40 text-center">
                 <p className="text-gray-400 mb-4 font-medium">Could not connect to the database or no styles found.</p>
                 <button 
                  onClick={() => fetchProducts()}
                  className="px-6 py-2 bg-pink-100 text-pink-600 rounded-full font-bold hover:bg-pink-200 transition-all"
                 >
                   Retry Connection
                 </button>
               </div>
             )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;
