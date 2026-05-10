import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../lib/firebase';
import { collection, query, orderBy, getDocs, deleteDoc, doc } from 'firebase/firestore';
import type { Product } from '../types/product';
import { 
  Plus, Edit2, Trash2, LayoutDashboard, Package, BarChart3, Settings, 
  Search, Filter, ChevronLeft, ChevronRight,
  TrendingUp, MousePointer2, Star
} from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const productsRef = collection(db, 'products');
      const q = query(productsRef, orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      
      const fetchedProducts: Product[] = [];
      querySnapshot.forEach((doc) => {
        fetchedProducts.push({ id: doc.id, ...doc.data() } as Product);
      });
      
      setProducts(fetchedProducts);
    } catch (error) {
      console.error('Error fetching products from Firestore:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (productId: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteDoc(doc(db, 'products', productId));
        setProducts(products.filter(p => (p.id || p._id) !== productId));
      } catch (error) {
        console.error('Error deleting product from Firestore:', error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB]">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 flex items-center h-16 px-6">
        <Link to="/" className="text-xl font-serif font-bold text-gray-800 tracking-tight mr-12 text-decoration-none">
          Spring<span className="text-pink-400 font-normal italic">Vibe</span>
        </Link>
        
        <div className="flex items-center gap-6 text-sm font-medium text-gray-500 flex-1">
          <Link to="/" className="hover:text-gray-900 transition-colors text-decoration-none">Trending</Link>
          <Link to="/" className="hover:text-gray-900 transition-colors text-decoration-none">Ideas</Link>
          <Link to="/admin2020/dashboard" className="text-gray-900 border-b-2 border-gray-900 pb-0.5 text-decoration-none">Admin</Link>
        </div>

        <div className="flex items-center gap-4">
          <Search size={18} className="text-gray-400" />
          <div className="w-8 h-8 rounded-full bg-pink-100 border border-pink-200" />
        </div>
      </nav>

      <div className="pt-16 flex min-h-screen">
        {/* Sidebar */}
        <aside className="w-64 border-r border-gray-100 bg-white p-6 hidden lg:block fixed h-full pt-12">
          <div className="space-y-1 mb-8">
            <h2 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-3 mb-4">Admin Panel</h2>
            <Link to="/admin2020/dashboard" className="flex items-center gap-3 px-3 py-2 bg-pink-50 text-pink-600 rounded-xl font-medium text-decoration-none">
              <LayoutDashboard size={18} />
              Dashboard
            </Link>
            <Link to="/admin2020/dashboard" className="flex items-center gap-3 px-3 py-2 text-gray-500 hover:bg-gray-50 rounded-xl font-medium transition-colors text-decoration-none">
              <Package size={18} />
              Products
            </Link>
            <a href="#" className="flex items-center gap-3 px-3 py-2 text-gray-500 hover:bg-gray-50 rounded-xl font-medium transition-colors text-decoration-none">
              <BarChart3 size={18} />
              Analytics
            </a>
            <a href="#" className="flex items-center gap-3 px-3 py-2 text-gray-500 hover:bg-gray-50 rounded-xl font-medium transition-colors text-decoration-none">
              <Settings size={18} />
              Settings
            </a>
          </div>

          <Link to="/admin2020/add" className="flex items-center justify-center gap-2 w-full py-3 bg-[#7D5A50] text-white text-sm font-bold rounded-2xl shadow-lg shadow-pink-100 hover:bg-[#634840] transition-all text-decoration-none">
            <Plus size={18} />
            Add New Style
          </Link>
        </aside>

        {/* Main Content */}
        <main className="flex-1 lg:ml-64 p-8 pt-12">
          <div className="max-w-6xl mx-auto">
            <header className="mb-10">
              <h1 className="text-3xl font-serif font-medium text-gray-900 mb-2">Storefront Overview</h1>
              <p className="text-gray-500">Track your curated spring collections and affiliate performance across all active channels.</p>
            </header>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
               <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm flex flex-col justify-between">
                 <div className="flex items-center justify-between mb-8">
                   <div className="p-3 bg-pink-50 text-pink-500 rounded-2xl">
                     <TrendingUp size={24} />
                   </div>
                   <div className="text-right">
                     <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total Products</p>
                     <p className="text-3xl font-serif font-bold text-gray-800 tracking-tighter">
                        {isLoading ? '...' : products.length}
                     </p>
                   </div>
                 </div>
                 <div className="h-12 w-full bg-gray-50 rounded-xl flex items-end gap-1 px-4 py-2">
                   {[40, 70, 45, 90, 65, 80, 55].map((h, i) => (
                     <div key={i} className="flex-1 rounded-t-sm" style={{ height: `${h}%`, backgroundColor: i === 3 ? '#FBCFE8' : '#F3F4F6' }} />
                   ))}
                 </div>
               </div>

               <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm">
                 <div className="flex items-center justify-between mb-8">
                   <div className="p-3 bg-green-50 text-green-500 rounded-2xl">
                     <MousePointer2 size={24} />
                   </div>
                   <div className="text-right">
                     <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total Clicks</p>
                     <p className="text-3xl font-serif font-bold text-gray-800 tracking-tighter">8.2k</p>
                   </div>
                 </div>
                 <div className="text-sm font-medium text-gray-500 flex items-center justify-center gap-1.5 p-4 bg-gray-50 rounded-2xl">
                   <span className="text-green-500 font-bold">+12.4%</span> traffic growth this week
                 </div>
               </div>

               <div className="bg-[#FFB7B2]/20 p-8 rounded-[32px] border border-[#FFB7B2]/30 relative overflow-hidden group pointer-events-none">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFB7B2]/40 rounded-bl-[100%] transition-transform group-hover:scale-110" />
                 <h3 className="text-lg font-serif font-bold text-gray-800 mb-2">Curator Tips</h3>
                 <p className="text-sm text-gray-600 italic leading-relaxed">
                   "Pastel lavender is trending in Paris this week. Consider adding more 'Floral Mist' styles to your storefront."
                 </p>
                 <button className="mt-6 text-xs font-bold text-gray-900 border-b border-gray-900 pb-0.5">Read more →</button>
               </div>
            </div>

            {/* Product Table Section */}
            <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-8 py-6 border-b border-gray-50 flex items-center justify-between">
                <h2 className="text-xl font-serif font-medium text-gray-800">Manage Styles</h2>
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-50 text-gray-500 text-xs font-bold rounded-lg uppercase tracking-wider">
                  <Filter size={14} />
                  Filter
                </button>
              </div>

              <div className="overflow-x-auto min-h-[300px]">
                {isLoading ? (
                  <div className="flex items-center justify-center py-20">
                     <div className="w-8 h-8 border-2 border-pink-200 border-t-pink-500 rounded-full animate-spin" />
                  </div>
                ) : (
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50 font-bold text-[10px] text-gray-400 uppercase tracking-widest">
                        <th className="px-8 py-4 text-left">Product Title</th>
                        <th className="px-8 py-4 text-left">Affiliate Link</th>
                        <th className="px-8 py-4 text-left font-bold text-[10px] text-gray-400 uppercase tracking-widest flex items-center gap-1.5 pt-[22px]">
                          <Star size={10} className="fill-yellow-400 text-yellow-400" />
                          Rating
                        </th>
                        <th className="px-8 py-4 text-left">Category</th>
                        <th className="px-8 py-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {products.map((product) => (
                        <tr key={product.id || product._id} className="hover:bg-gray-50/50 transition-colors">
                          <td className="px-8 py-4">
                            <div className="flex items-center gap-4">
                              <img src={product.imageUrl} className="w-10 h-10 rounded-xl object-cover ring-2 ring-pink-50 shadow-sm" />
                              <div>
                                <p className="font-semibold text-gray-800">{product.title}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-8 py-4 font-mono text-[10px] text-pink-500 bg-pink-50/20 px-2 rounded-full overflow-hidden whitespace-nowrap text-ellipsis max-w-[150px]">
                            {product.affiliateLink}
                          </td>
                          <td className="px-8 py-4 text-sm font-bold text-gray-700">
                            <span className="flex items-center gap-1">
                              <Star size={12} className="fill-yellow-400 text-yellow-400" />
                              {product.rating?.toFixed(1) || '0.0'}
                            </span>
                          </td>
                          <td className="px-8 py-4">
                            <span className="px-2 py-0.5 bg-green-50 text-green-600 rounded text-[10px] font-bold uppercase tracking-wider border border-green-100">
                              {product.category}
                            </span>
                          </td>
                          <td className="px-8 py-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                               <Link to={`/admin2020/edit/${product.id || product._id}`} className="p-2 text-gray-400 hover:text-pink-500 transition-colors">
                                 <Edit2 size={16} />
                               </Link>
                               <button 
                                 onClick={() => handleDelete((product.id || product._id)!)}
                                 className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                               >
                                 <Trash2 size={16} />
                               </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>

              {!isLoading && (
                <div className="px-8 py-6 bg-gray-50 border-t border-gray-50 flex items-center justify-between text-sm">
                  <p className="text-gray-400 text-xs font-medium uppercase tracking-widest">Showing 1-{products.length} of {products.length} products</p>
                  <div className="flex items-center gap-4 font-bold text-gray-400 uppercase text-[10px] tracking-widest">
                    <button className="hover:text-gray-800 flex items-center gap-1 opacity-50"><ChevronLeft size={14} /> Previous</button>
                    <button className="text-gray-900 flex items-center gap-1">Next Page <ChevronRight size={14} /></button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
