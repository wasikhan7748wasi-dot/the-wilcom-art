import React, { useState } from 'react';
import { 
  ShoppingBag, Search, User, Lock, Key, CheckCircle, 
  Download, ArrowRight, Shield, Layers, Cpu, Smartphone, LogOut, Plus
} from 'lucide-react';

// --- TYPES & MODELS ---
interface Product {
  id: string;
  title: string;
  price: number;
  format: string;
  stitches: number;
  width: number;
  height: number;
  category: string;
  imageUrl: string;
  fileUrl: string;
}

export default function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState<'store' | 'admin'>('store');
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  
  // Secret Admin Login Form
  const [adminKeyInput, setAdminKeyInput] = useState('');
  const [adminError, setAdminError] = useState('');

  // Sample Products Data
  const [products, setProducts] = useState<Product[]>([
    {
      id: '1',
      title: 'Precision Floral Patch Embroidery',
      price: 15,
      format: 'EMB / DST / PES',
      stitches: 12500,
      width: 4,
      height: 4,
      category: 'Floral',
      imageUrl: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=600&q=80',
      fileUrl: '#'
    },
    {
      id: '2',
      title: 'Commercial Eagle Crest Emblem',
      price: 25,
      format: 'EMB / DST',
      stitches: 24200,
      width: 5,
      height: 6,
      category: 'Badges',
      imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=600&q=80',
      fileUrl: '#'
    }
  ]);

  // Admin New Product Form State
  const [newTitle, setNewTitle] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newFormat, setNewFormat] = useState('EMB / DST');
  const [newStitches, setNewStitches] = useState('');
  const [newWidth, setNewWidth] = useState('');
  const [newHeight, setNewHeight] = useState('');
  const [newCategory, setNewCategory] = useState('General');
  const [newImage, setNewImage] = useState('');

  // Handle Admin Secret Login
  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Secret Key set to "admin123"
    if (adminKeyInput === 'admin123') {
      setIsAdminLoggedIn(true);
      setAdminError('');
    } else {
      setAdminError('Invalid Passkey! Access Denied.');
    }
  };

  // Add Product Function
  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newPrice) return;

    const item: Product = {
      id: Date.now().toString(),
      title: newTitle,
      price: Number(newPrice),
      format: newFormat,
      stitches: Number(newStitches) || 10000,
      width: Number(newWidth) || 4,
      height: Number(newHeight) || 4,
      category: newCategory,
      imageUrl: newImage || 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=600&q=80',
      fileUrl: '#'
    };

    setProducts([item, ...products]);
    setNewTitle('');
    setNewPrice('');
    setNewStitches('');
    setNewWidth('');
    setNewHeight('');
    setNewImage('');
    alert('New Design Published Successfully!');
  };

  return (
    <div className="min-h-screen bg-[#0b0f17] text-white font-sans selection:bg-amber-500 selection:text-black">
      
      {/* Top Announcement Bar */}
      <div className="bg-amber-500 text-black font-bold text-xs py-2 px-4 flex flex-wrap justify-between items-center tracking-wide">
        <div className="flex items-center gap-2">
          <span className="bg-black text-amber-500 text-[10px] px-2 py-0.5 rounded font-black uppercase">
            WILCOM EMBROIDERYSTUDIO E4.5
          </span>
          <span>Native .EMB + .DST Instant Machine Files</span>
        </div>
        <div className="hidden md:flex gap-4">
          <span>WhatsApp: +923390075018</span>
        </div>
      </div>

      {/* Main Header / Navigation */}
      <header className="border-b border-gray-800 bg-[#0f1522]/90 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          
          {/* Logo */}
          <div 
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => setActiveTab('store')}
          >
            <div className="bg-gradient-to-br from-amber-400 to-amber-600 p-2.5 rounded-xl shadow-lg shadow-amber-500/20 text-black">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold tracking-wider text-white">THE WILCOM ART</h1>
              <p className="text-[10px] text-amber-400/80 uppercase tracking-widest font-semibold">Digitizing Studio</p>
            </div>
          </div>

          {/* Header Action Buttons */}
          <div className="flex items-center gap-3">
            <div className="relative hidden sm:block">
              <input 
                type="text" 
                placeholder="Search designs..." 
                className="bg-[#182030] text-sm text-gray-200 pl-9 pr-4 py-2 rounded-lg border border-gray-700/60 focus:outline-none focus:border-amber-500 w-48 transition-all"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
            </div>

            <button 
              onClick={() => setActiveTab('store')}
              className={`px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition-all ${
                activeTab === 'store' 
                  ? 'bg-amber-500 text-black shadow-md shadow-amber-500/10' 
                  : 'bg-[#182030] text-gray-300 hover:text-white border border-gray-700/50'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              Store
            </button>

            {/* Secret Portal Icon (No Direct "Admin" Text for Public) */}
            <button 
              onClick={() => setActiveTab('admin')}
              className="p-2.5 rounded-lg bg-[#182030] text-gray-400 hover:text-amber-400 border border-gray-700/50 transition-all"
              title="Portal Access"
            >
              <Lock className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Dynamic Content Views */}
      {activeTab === 'store' ? (
        <main>
          {/* Hero Banner Area */}
          <section className="relative overflow-hidden py-16 px-4 bg-gradient-to-b from-[#131b2e] to-[#0b0f17] border-b border-gray-800/60">
            <div className="max-w-4xl mx-auto text-center relative z-10">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-6">
                <Cpu className="w-3.5 h-3.5" /> WILCOM EMB OBJECT FILES & TAJIMA DST MACHINE FORMATS
              </div>
              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight mb-6">
                Precision Embroidery Designs & <span className="text-amber-400">Custom Digitizing</span>
              </h2>
              <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed mb-8">
                Industrial grade embroidery files digitized in Wilcom EmbroideryStudio e4.5. Built with balanced underlays, pull compensation, and clean stitch paths ready for Tajima, Barudan, Brother, and commercial multi-head machines.
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <a href="#marketplace" className="px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-sm flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-all">
                  Browse Marketplace <ArrowRight className="w-4 h-4" />
                </a>
                <a href="https://wa.me/923390075018" target="_blank" rel="noreferrer" className="px-6 py-3.5 rounded-xl bg-[#182030] hover:bg-[#202b40] text-white font-semibold text-sm border border-gray-700 flex items-center gap-2 transition-all">
                  <Smartphone className="w-4 h-4 text-amber-400" /> Request Custom Digitizing
                </a>
              </div>

              {/* Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12 pt-8 border-t border-gray-800/80 text-left">
                <div className="flex items-center gap-2 text-xs text-gray-300">
                  <CheckCircle className="w-4 h-4 text-amber-400 shrink-0" /> Native .EMB Wireframes
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-300">
                  <CheckCircle className="w-4 h-4 text-amber-400 shrink-0" /> Instant Machine Downloads
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-300">
                  <CheckCircle className="w-4 h-4 text-amber-400 shrink-0" /> Commercial Stitch Tested
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-300">
                  <CheckCircle className="w-4 h-4 text-amber-400 shrink-0" /> Zero Thread Break Paths
                </div>
              </div>
            </div>
          </section>

          {/* Product Marketplace Catalog */}
          <section id="marketplace" className="max-w-7xl mx-auto px-4 py-12">
            <div className="flex justify-between items-end mb-8">
              <div>
                <h3 className="text-xl font-bold text-white tracking-wide">Featured Digitized Designs</h3>
                <p className="text-xs text-gray-400 mt-1">Ready to load machine files with full stitch info</p>
              </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((item) => (
                <div 
                  key={item.id} 
                  className="bg-[#121929] border border-gray-800 rounded-2xl overflow-hidden hover:border-amber-500/50 transition-all duration-300 flex flex-col group"
                >
                  <div className="relative h-52 bg-gray-900 overflow-hidden">
                    <img 
                      src={item.imageUrl} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-black/80 backdrop-blur text-amber-400 text-[10px] font-bold uppercase px-2.5 py-1 rounded-md border border-amber-500/30">
                      {item.format}
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2 mb-2">
                        <h4 className="font-bold text-white text-base leading-snug group-hover:text-amber-400 transition-colors">
                          {item.title}
                        </h4>
                        <span className="text-amber-400 font-extrabold text-lg">${item.price}</span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 my-4 bg-[#0b0f17] p-3 rounded-lg text-xs text-gray-400 border border-gray-800/80">
                        <div>
                          <span className="block text-[10px] text-gray-500 uppercase">Stitch Count</span>
                          <span className="font-semibold text-gray-200">{item.stitches.toLocaleString()}</span>
                        </div>
                        <div>
                          <span className="block text-[10px] text-gray-500 uppercase">Dimensions</span>
                          <span className="font-semibold text-gray-200">{item.width}" x {item.height}"</span>
                        </div>
                      </div>
                    </div>

                    <button className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-amber-500/10">
                      <Download className="w-4 h-4" /> Buy & Instant Download
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      ) : (
        /* Secret Admin Portal View */
        <div className="max-w-4xl mx-auto px-4 py-12">
          {!isAdminLoggedIn ? (
            /* Login Lock Box */
            <div className="max-w-md mx-auto bg-[#121929] border border-gray-800 rounded-2xl p-8 shadow-2xl">
              <div className="text-center mb-6">
                <div className="w-12 h-12 bg-amber-500/10 text-amber-400 rounded-full flex items-center justify-center mx-auto mb-3 border border-amber-500/30">
                  <Key className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white">Owner Portal Access</h3>
                <p className="text-xs text-gray-400 mt-1">Enter your admin passkey to manage products</p>
              </div>

              <form onSubmit={handleAdminLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1.5">Admin Passkey</label>
                  <input 
                    type="password"
                    placeholder="Enter passkey (Default: admin123)"
                    value={adminKeyInput}
                    onChange={(e) => setAdminKeyInput(e.target.value)}
                    className="w-full bg-[#0b0f17] text-sm text-white px-4 py-3 rounded-xl border border-gray-700 focus:outline-none focus:border-amber-500"
                  />
                </div>

                {adminError && (
                  <p className="text-red-400 text-xs font-semibold">{adminError}</p>
                )}

                <button 
                  type="submit"
                  className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-sm transition-all"
                >
                  Unlock Admin Dashboard
                </button>
              </form>
            </div>
          ) : (
            /* Admin Upload Dashboard */
            <div>
              <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-800">
                <div>
                  <h2 className="text-2xl font-black text-white">Admin Dashboard</h2>
                  <p className="text-xs text-gray-400">Upload new Wilcom EMB / DST design files</p>
                </div>
                <button 
                  onClick={() => setIsAdminLoggedIn(false)}
                  className="px-4 py-2 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-semibold flex items-center gap-2 hover:bg-red-500/20"
                >
                  <LogOut className="w-4 h-4" /> Lock Panel
                </button>
              </div>

              {/* Upload Form */}
              <div className="bg-[#121929] border border-gray-800 rounded-2xl p-6 mb-8">
                <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                  <Plus className="w-5 h-5 text-amber-400" /> Add New Embroidery Design
                </h3>

                <form onSubmit={handleAddProduct} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Design Title</label>
                    <input 
                      type="text"
                      placeholder="e.g. Royal Crown Crest"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      className="w-full bg-[#0b0f17] text-sm text-white px-3.5 py-2.5 rounded-lg border border-gray-700 focus:border-amber-500 focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Price ($ USD)</label>
                    <input 
                      type="number"
                      placeholder="15"
                      value={newPrice}
                      onChange={(e) => setNewPrice(e.target.value)}
                      className="w-full bg-[#0b0f17] text-sm text-white px-3.5 py-2.5 rounded-lg border border-gray-700 focus:border-amber-500 focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Formats Offered</label>
                    <input 
                      type="text"
                      placeholder="EMB / DST / PES"
                      value={newFormat}
                      onChange={(e) => setNewFormat(e.target.value)}
                      className="w-full bg-[#0b0f17] text-sm text-white px-3.5 py-2.5 rounded-lg border border-gray-700 focus:border-amber-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Total Stitches</label>
                    <input 
                      type="number"
                      placeholder="18500"
                      value={newStitches}
                      onChange={(e) => setNewStitches(e.target.value)}
                      className="w-full bg-[#0b0f17] text-sm text-white px-3.5 py-2.5 rounded-lg border border-gray-700 focus:border-amber-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Width (Inches)</label>
                    <input 
                      type="number"
                      placeholder="4"
                      value={newWidth}
                      onChange={(e) => setNewWidth(e.target.value)}
                      className="w-full bg-[#0b0f17] text-sm text-white px-3.5 py-2.5 rounded-lg border border-gray-700 focus:border-amber-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Height (Inches)</label>
                    <input 
                      type="number"
                      placeholder="5"
                      value={newHeight}
                      onChange={(e) => setNewHeight(e.target.value)}
                      className="w-full bg-[#0b0f17] text-sm text-white px-3.5 py-2.5 rounded-lg border border-gray-700 focus:border-amber-500 focus:outline-none"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs text-gray-400 mb-1">Image URL</label>
                    <input 
                      type="text"
                      placeholder="https://..."
                      value={newImage}
                      onChange={(e) => setNewImage(e.target.value)}
                      className="w-full bg-[#0b0f17] text-sm text-white px-3.5 py-2.5 rounded-lg border border-gray-700 focus:border-amber-500 focus:outline-none"
                    />
                  </div>

                  <div className="sm:col-span-2 mt-2">
                    <button 
                      type="submit"
                      className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-sm transition-all"
                    >
                      Publish Design To Store
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-gray-800 bg-[#080b11] py-8 text-center text-xs text-gray-500">
        <p>© 2026 The Wilcom Art. Digitized for Commercial Embroidery Machines.</p>
      </footer>
    </div>
  );
}
