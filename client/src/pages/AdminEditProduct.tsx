import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { db } from '../lib/firebase';
import { 
  collection, 
  addDoc, 
  updateDoc, 
  doc, 
  getDoc, 
  serverTimestamp 
} from 'firebase/firestore';
import { 
  ArrowLeft, Upload, Save, Link as LinkIcon, 
  Type, AlignLeft, Layers, CheckCircle2, AlertCircle
} from 'lucide-react';

const categories = [
  'Gel Polish Sets',
  'Press-On Nails',
  'Nail Art & Decor',
  'Nail Care & Health',
  'Tools & Equipment'
];

const AdminEditProduct: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const isEditMode = !!id;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Gel Polish Sets',
    rating: '',
    affiliateLink: '',
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (isEditMode) {
      fetchProduct();
    }
  }, [id]);

  const fetchProduct = async () => {
    try {
      const docRef = doc(db, 'products', id!);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data();
        setFormData({
          title: data.title,
          description: data.description,
          category: data.category,
          rating: data.rating.toString(),
          affiliateLink: data.affiliateLink,
        });
        setImagePreview(data.imageUrl);
      } else {
        setError('Product not found');
      }
    } catch (err) {
      console.error('Error fetching product:', err);
      setError('Could not fetch product details');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const uploadImage = async (file: File): Promise<string> => {
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !uploadPreset || cloudName === 'YOUR_CLOUD_NAME') {
      throw new Error('Cloudinary configuration is missing. Please check your .env file.');
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        formData,
        {
          onUploadProgress: (progressEvent) => {
            if (progressEvent.total) {
              const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
              setUploadProgress(progress);
            }
          },
        }
      );
      return response.data.secure_url;
    } catch (error: any) {
      console.error('Cloudinary upload error:', error);
      throw new Error(error.response?.data?.error?.message || 'Failed to upload image to Cloudinary');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setSuccess(false);
    setUploadProgress(0);

    let imageUrl = imagePreview;

    try {
      // 1. If there's a new image file, upload it directly to Cloudinary (Unsigned)
      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }

      // 2. Prepare product data with the image URL
      const productData = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        rating: parseFloat(formData.rating),
        affiliateLink: formData.affiliateLink,
        imageUrl: imageUrl,
        updatedAt: serverTimestamp()
      };

      // 3. Save to Firestore
      // 3. Save to Firestore
      console.log('Attempting to save to Firestore...', productData);
      
      if (isEditMode) {
        const productRef = doc(db, 'products', id!);
        await updateDoc(productRef, productData);
        console.log('Document updated successfully');
      } else {
        const docRef = await addDoc(collection(db, 'products'), {
          ...productData,
          createdAt: new Date()
        });
        console.log('Document created with ID:', docRef.id);
      }

      setSuccess(true);
      alert("සාර්ථකව Save කළා!");
      
      if (!isEditMode) {
        // Clear form fields on success for new products
        setFormData({
          title: '',
          description: '',
          category: 'Gel Polish Sets',
          rating: '',
          affiliateLink: '',
        });
        setImageFile(null);
        setImagePreview('');
      }

      setTimeout(() => {
        setSuccess(false);
        if (isEditMode) navigate('/admin2020/dashboard');
      }, 3000);
    } catch (err: any) {
      console.error('Error during upload/save:', err);
      // Detailed error message for the user
      let userMessage = 'Error saving product. Please check your connection.';
      if (err.code === 'permission-denied') userMessage = 'Permission Denied: Check your Firestore Rules.';
      if (err.message?.includes('API key not valid')) userMessage = 'Firebase Error: Your API Key is invalid. Check .env';
      
      setError(userMessage);
    } finally {
      setIsSubmitting(false);
      setUploadProgress(0);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB] pb-20">
       <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 flex items-center h-16 px-6 justify-between">
        <Link to="/admin2020/dashboard" className="text-xl font-serif font-bold text-gray-800 tracking-tight">
          Spring<span className="text-pink-400 font-normal italic">Vibe</span>
        </Link>
        <Link to="/admin2020/dashboard" className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
          <ArrowLeft size={16} />
          Back to Overview
        </Link>
      </nav>

      <main className="pt-28 px-6 max-w-5xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl font-serif font-medium text-gray-900 mb-2">
            {isEditMode ? 'Edit Nail Art Idea' : 'Add New Style'}
          </h1>
          <p className="text-gray-500">Update the curated details for your editorial collection.</p>
        </header>

        {(error || (uploadProgress > 0 && uploadProgress < 100)) && (
          <div className="mb-8 space-y-4">
            {error && (
              <div className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 font-medium">
                <AlertCircle size={20} />
                {error}
              </div>
            )}
            
            {uploadProgress > 0 && uploadProgress < 100 && (
              <div className="p-4 bg-pink-50 border border-pink-100 rounded-2xl space-y-2">
                <div className="flex items-center justify-between text-pink-600 font-bold text-xs uppercase tracking-widest">
                  <span className="flex items-center gap-2">
                    <div className="w-3 h-3 border-2 border-pink-600 border-t-transparent rounded-full animate-spin" />
                    Uploading Image to Storage...
                  </span>
                  <span>{Math.round(uploadProgress)}%</span>
                </div>
                <div className="h-1.5 w-full bg-pink-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-pink-500 transition-all duration-300" 
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {success && (
          <div className="mb-8 p-4 bg-green-50 border border-green-100 rounded-2xl flex items-center gap-3 text-green-600 font-medium animate-bounce">
            <CheckCircle2 size={20} />
            Success! Redirecting back to dashboard...
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Upload Area */}
          <div className="space-y-6">
            <div 
              className={`
                relative aspect-[4/5] bg-white rounded-[48px] border-2 border-dashed transition-all duration-500 overflow-hidden group
                ${imagePreview ? 'border-pink-200' : 'border-gray-200 hover:border-pink-300'}
              `}
            >
              {imagePreview ? (
                <img src={imagePreview} className="w-full h-full object-cover transition-transform group-hover:scale-105" alt="Preview" />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 p-8 text-center">
                  <div className="p-6 bg-pink-50 rounded-full text-pink-400 mb-4 group-hover:scale-110 transition-transform">
                    <Upload size={32} />
                  </div>
                  <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-1">Upload Product Image</p>
                  <p className="text-xs text-gray-400">Recommended: 800x1000px portrait</p>
                </div>
              )}
              <input 
                type="file" 
                onChange={handleImageChange} 
                className="absolute inset-0 opacity-0 cursor-pointer" 
                accept="image/*"
                required={!isEditMode}
              />
              <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                 <button type="button" className="w-full py-4 bg-white/90 backdrop-blur-md text-gray-800 text-xs font-bold uppercase tracking-widest rounded-2xl">
                    Change Image
                 </button>
              </div>
            </div>

            <div className="bg-green-50 border border-green-100 p-6 rounded-3xl flex items-start gap-4">
               <div className="p-2 bg-green-100 text-green-600 rounded-lg"><CheckCircle2 size={20} /></div>
               <div>
                  <p className="text-sm font-bold text-green-800 mb-1">Vibe Check</p>
                  <p className="text-xs text-green-600/80 leading-relaxed">Our curation AI recommends high-contrast imagery with soft natural lighting for the "Spring Vibe" editorial look.</p>
               </div>
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Idea Title</label>
                <div className="relative">
                  <Type className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                  <input 
                    type="text" 
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="e.g., Blossom French Tip"
                    className="w-full pl-12 pr-6 py-4 bg-white border border-gray-100 rounded-2xl focus:ring-2 focus:ring-pink-100 focus:border-pink-300 transition-all text-gray-800 font-medium placeholder:text-gray-300"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Description</label>
                <div className="relative">
                  <AlignLeft className="absolute left-4 top-5 text-gray-300" size={18} />
                  <textarea 
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder="Short catching description about this spring style..."
                    className="w-full pl-12 pr-6 py-4 bg-white border border-gray-100 rounded-2xl focus:ring-2 focus:ring-pink-100 focus:border-pink-300 transition-all text-gray-800 font-medium placeholder:text-gray-300 resize-none"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Rating (1-5)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-yellow-400 font-bold">⭐</span>
                    <input 
                      type="number" 
                      step="0.1"
                      min="1"
                      max="5"
                      name="rating"
                      value={formData.rating}
                      onChange={handleInputChange}
                      placeholder="5.0"
                      className="w-full pl-12 pr-6 py-4 bg-white border border-gray-100 rounded-2xl focus:ring-2 focus:ring-pink-100 focus:border-pink-300 transition-all text-gray-800 font-bold"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Active Tag</label>
                  <div className="relative">
                    <Layers className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-400" size={18} />
                    <select 
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-6 py-4 bg-white border border-gray-100 rounded-2xl focus:ring-2 focus:ring-pink-100 focus:border-pink-300 transition-all text-gray-800 font-medium appearance-none"
                    >
                      {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Affiliate Redirect URL</label>
                <div className="relative">
                  <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                  <input 
                    type="url" 
                    name="affiliateLink"
                    value={formData.affiliateLink}
                    onChange={handleInputChange}
                    placeholder="https://amazon.com/..."
                    className="w-full pl-12 pr-6 py-4 bg-white border border-gray-100 rounded-2xl focus:ring-2 focus:ring-pink-100 focus:border-pink-300 transition-all text-gray-800 font-medium placeholder:text-gray-300"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-6">
              <button 
                type="submit" 
                disabled={isSubmitting}
                className={`
                  flex items-center justify-center gap-2 flex-1 py-4 bg-[#7D5A50] text-white font-bold rounded-2xl shadow-lg transition-all
                  ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-[#634840] hover:-translate-y-0.5'}
                `}
              >
                {isSubmitting ? 'Saving...' : (isEditMode ? 'Save Changes' : 'Publish Style')}
                <Save size={18} />
              </button>
              <button 
                type="button"
                onClick={() => navigate('/admin2020/dashboard')}
                className="px-8 py-4 bg-white border border-gray-100 text-gray-500 font-bold rounded-2xl hover:bg-gray-50 transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};

export default AdminEditProduct;
