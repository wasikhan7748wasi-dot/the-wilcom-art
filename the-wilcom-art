import React, { useState, useEffect } from 'react';
import { 
  Scissors, ShoppingBag, Download, User, Key, Lock, 
  ShieldCheck, CreditCard, DollarSign, Plus, Check, Globe, 
  LogOut, Eye, Upload, AlertCircle, FileText
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
  unit: string;
  imageUrl: string;
  fileUrl: string; // Machine file path
}

interface UserProfile {
  id: string;
  name: string;
  email: string;
  purchasedFileIds: string[];
}

interface PaymentSettings {
  stripePublishableKey: string;
  paypalClientId: string;
  wiseEmail: string;
  bankIban: string;
  easypaisaNumber: string;
}

// --- DUMMY INITIAL DATA ---
const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    title: 'Floral Patch Embroidery Design',
    price: 15,
    format: 'DST / PES / ART',
    stitches: 12500,
    width: 4,
    height: 4,
    unit: 'inch',
    imageUrl: 'https://images.unsplash.com/photo-1528458876861-544fd1761a91?auto=format&fit=crop&w=600&q=80',
    fileUrl: 'floral_patch_dst.zip'
  },
  {
    id: '2',
    title: 'Eagle Crest Jacket Back Design',
    price: 25,
    format: 'DST / EXP / JEF',
    stitches: 45000,
    width: 10,
    height: 12,
    unit: 'inch',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
    fileUrl: 'eagle_crest.zip'
  }
];

export default function App() {
  // Navigation & User State
  const [view, setView] = useState<'store' | 'admin' | 'dashboard' | 'checkout'>('store');
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  // Auth Inputs
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authName, setAuthName] = useState('');

  // Store & Selected Items
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Admin Payment Settings State
  const [paymentSettings, setPaymentSettings] = useState<PaymentSettings>({
    stripePublishableKey: 'pk_test_sample_key_12345',
    paypalClientId: 'client_id_sample_paypal_6789',
    wiseEmail: 'payments@wilcomart.com',
    bankIban: 'PK36MEZN0099220101234567',
    easypaisaNumber: '03001234567'
  });

  // Admin New Product Form State
  const [newTitle, setNewTitle] = useState('');
  const [newPrice, setNewPrice] = useState<number>(10);
  const [newFormat, setNewFormat] = useState('DST');
  const [newStitches, setNewStitches] = useState<number>(5000);
  const [newWidth, setNewWidth] = useState<number>(3);
  const [newHeight, setNewHeight] = useState<number>(3);

  // --- AUTH HANDLERS ---
  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (authMode === 'signup') {
      const newUser: UserProfile = {
        id: Date.now().toString(),
        name: authName || 'Valued Client',
        email: authEmail,
        purchasedFileIds: []
      };
      setCurrentUser(newUser);
    } else {
      // Mock Login
      setCurrentUser({
        id: 'u101',
        name: 'John Doe',
        email: authEmail || 'client@example.com',
        purchasedFileIds: ['1'] // Default 1 purchased file for demo
      });
    }
    setIsAuthModalOpen(false);
    setAuthPassword('');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setView('store');
  };

  // --- PURCHASE FLOW ---
  const handleBuyNow = (product: Product) => {
    if (!currentUser) {
      setIsAuthModalOpen(true);
      return;
    }
    setSelectedProduct(product);
    setView('checkout');
  };

  const handlePaymentSuccess = () => {
    if (currentUser && selectedProduct) {
      const updatedUser = {
        ...currentUser,
        purchasedFileIds: [...currentUser.purchasedFileIds, selectedProduct.id]
      };
      setCurrentUser(updatedUser);
      alert('Payment Verified! The embroidery file is now unlocked in your account.');
      setView('dashboard');
    }
  };

  // --- ADMIN ADD PRODUCT ---
  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const createdProduct: Product = {
      id: Date.now().toString(),
      title: newTitle,
      price: newPrice,
      format: newFormat,
      stitches: newStitches,
      width: newWidth,
      height: newHeight,
      unit: 'inch',
      imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=600&q=80',
      fileUrl: `${newTitle.toLowerCase().replace(/\s+/g, '_')}.zip`
    };

    setProducts([createdProduct, ...products]);
    setNewTitle('');
    alert('New Design added to Store!');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      {/* HEADER NAVBAR */}
      <header className="bg-slate-900 text-white sticky top-0 z-40 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div 
            onClick={() => setView('store')} 
            className="flex items-center gap-2 cursor-pointer"
          >
            <Scissors className="w-7 h-7 text-indigo-400" />
            <span className="text-xl font-bold tracking-wide">The Wilcom Art</span>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => setView('store')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium ${view === 'store' ? 'bg-indigo-600' : 'text-slate-300 hover:text-white'}`}
            >
              Design Store
            </button>

            {currentUser && (
              <button 
                onClick={() => setView('dashboard')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium ${view === 'dashboard' ? 'bg-indigo-600' : 'text-slate-300 hover:text-white'}`}
              >
                My Downloads ({currentUser.purchasedFileIds.length})
              </button>
            )}

            <button 
              onClick={() => setView('admin')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium ${view === 'admin' ? 'bg-indigo-600' : 'text-slate-300 hover:text-white'}`}
            >
              Admin Panel
            </button>

            {currentUser ? (
              <button 
                onClick={handleLogout}
                className="p-2 text-red-400 hover:bg-slate-800 rounded-lg flex items-center gap-1 text-sm"
              >
                <LogOut className="w-4 h-4" /> Logout
              </button>
            ) : (
              <button 
                onClick={() => setIsAuthModalOpen(true)}
                className="bg-emerald-600 hover:bg-emerald-700 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-1"
              >
                <User className="w-4 h-4" /> Sign In / Register
              </button>
            )}
          </div>
        </div>
      </header>

      {/* VIEW 1: EMBROIDERY DESIGN STORE */}
      {view === 'store' && (
        <main className="max-w-7xl mx-auto px-4 py-10">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-extrabold text-slate-900">Digitized Embroidery Store</h1>
            <p className="text-slate-600 mt-2">Instant machine file downloads after payment (.DST, .PES, .ART)</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.map((p) => {
              const isPurchased = currentUser?.purchasedFileIds.includes(p.id);
              return (
                <div key={p.id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <img src={p.imageUrl} alt={p.title} className="w-full h-56 object-cover" />
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-lg text-slate-900">{p.title}</h3>
                      <span className="text-xl font-black text-emerald-600">${p.price}</span>
                    </div>

                    <div className="text-xs text-slate-500 space-y-1 mb-4">
                      <p><strong>Format:</strong> {p.format}</p>
                      <p><strong>Stitches:</strong> {p.stitches.toLocaleString()}</p>
                      <p><strong>Dimensions:</strong> {p.width} x {p.height} {p.unit}</p>
                    </div>

                    {isPurchased ? (
                      <button 
                        onClick={() => setView('dashboard')}
                        className="w-full bg-indigo-600 text-white font-bold py-2.5 rounded-xl flex items-center justify-center gap-2"
                      >
                        <Download className="w-4 h-4" /> Download Machine File
                      </button>
                    ) : (
                      <button 
                        onClick={() => handleBuyNow(p)}
                        className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 rounded-xl flex items-center justify-center gap-2"
                      >
                        <ShoppingBag className="w-4 h-4" /> Buy & Download Now
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      )}

      {/* VIEW 2: CHECKOUT & PAYMENT PAGE */}
      {view === 'checkout' && selectedProduct && (
        <main className="max-w-2xl mx-auto px-4 py-12">
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-200 space-y-6">
            <h2 className="text-2xl font-bold text-slate-900 border-b pb-4">Secure Checkout</h2>

            <div className="flex gap-4 items-center bg-slate-50 p-4 rounded-xl border">
              <img src={selectedProduct.imageUrl} alt="" className="w-16 h-16 rounded-lg object-cover" />
              <div className="flex-1">
                <h4 className="font-bold text-slate-900">{selectedProduct.title}</h4>
                <p className="text-xs text-slate-500">{selectedProduct.format} | {selectedProduct.stitches} stitches</p>
              </div>
              <span className="text-2xl font-black text-emerald-600">${selectedProduct.price}</span>
            </div>

            {/* PAYMENT OPTIONS SETUP BY ADMIN */}
            <div className="space-y-4">
              <h3 className="font-semibold text-sm uppercase text-slate-500 tracking-wider">Select Payment Method</h3>
              
              {/* International Card (Stripe / PayPal) */}
              <div className="border border-indigo-200 bg-indigo-50/50 p-4 rounded-xl space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-bold flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-indigo-600" /> Credit / Debit Card (International)
                  </span>
                  <span className="text-xs bg-indigo-200 text-indigo-800 px-2 py-0.5 rounded font-bold">Automated</span>
                </div>
                <p className="text-xs text-slate-600">Supports Stripe & PayPal Instant Gateway Key</p>
                <button 
                  onClick={handlePaymentSuccess}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg shadow mt-2"
                >
                  Pay ${selectedProduct.price} via Card (Instant Unlock)
                </button>
              </div>

              {/* Wise / Wire Bank Transfer */}
              <div className="border border-slate-200 p-4 rounded-xl space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-bold flex items-center gap-2">
                    <Globe className="w-5 h-5 text-emerald-600" /> Wise / International SWIFT
                  </span>
                </div>
                <p className="text-xs text-slate-600">Wise Email: <strong>{paymentSettings.wiseEmail}</strong></p>
                <p className="text-xs text-slate-600">IBAN: <strong>{paymentSettings.bankIban}</strong></p>
              </div>
            </div>

            <button 
              onClick={() => setView('store')} 
              className="text-slate-500 text-sm font-medium w-full text-center hover:underline"
            >
              Cancel & Return to Store
            </button>
          </div>
        </main>
      )}

      {/* VIEW 3: USER DOWNLOADS DASHBOARD */}
      {view === 'dashboard' && (
        <main className="max-w-4xl mx-auto px-4 py-10">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">Welcome, {currentUser?.name}</h1>
              <p className="text-sm text-slate-500">{currentUser?.email}</p>
            </div>
            <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full">Account Active</span>
          </div>

          <h2 className="text-xl font-bold text-slate-900 mb-4">Your Purchased Embroidery Files</h2>
          <div className="space-y-4">
            {products
              .filter((p) => currentUser?.purchasedFileIds.includes(p.id))
              .map((p) => (
                <div key={p.id} className="bg-white p-4 border border-slate-200 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <img src={p.imageUrl} alt="" className="w-14 h-14 rounded-lg object-cover" />
                    <div>
                      <h4 className="font-bold text-slate-900">{p.title}</h4>
                      <span className="text-xs text-indigo-600 font-semibold">{p.format}</span>
                    </div>
                  </div>
                  <a 
                    href={`#${p.fileUrl}`} 
                    onClick={() => alert(`Downloading production file: ${p.fileUrl}`)}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-2.5 rounded-lg flex items-center gap-2 text-sm shadow"
                  >
                    <Download className="w-4 h-4" /> Download File
                  </a>
                </div>
              ))}
          </div>
        </main>
      )}

      {/* VIEW 4: ADMIN PANEL (PAYMENT KEYS + STORE CONTROL) */}
      {view === 'admin' && (
        <main className="max-w-6xl mx-auto px-4 py-10 space-y-10">
          <h1 className="text-3xl font-extrabold text-slate-900">Admin Control Center</h1>

          {/* SECTION A: PAYMENT SETTINGS */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center gap-2 border-b pb-4">
              <Key className="w-6 h-6 text-indigo-600" />
              <h2 className="text-xl font-bold">International & Local Payment Settings</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-1">Stripe Publishable Key</label>
                <input 
                  type="text" 
                  value={paymentSettings.stripePublishableKey}
                  onChange={(e) => setPaymentSettings({...paymentSettings, stripePublishableKey: e.target.value})}
                  className="w-full border p-3 rounded-lg font-mono text-sm bg-slate-50 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">PayPal Client ID</label>
                <input 
                  type="text" 
                  value={paymentSettings.paypalClientId}
                  onChange={(e) => setPaymentSettings({...paymentSettings, paypalClientId: e.target.value})}
                  className="w-full border p-3 rounded-lg font-mono text-sm bg-slate-50 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">Wise Account Email</label>
                <input 
                  type="text" 
                  value={paymentSettings.wiseEmail}
                  onChange={(e) => setPaymentSettings({...paymentSettings, wiseEmail: e.target.value})}
                  className="w-full border p-3 rounded-lg text-sm bg-slate-50 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">Bank IBAN (SWIFT Direct)</label>
                <input 
                  type="text" 
                  value={paymentSettings.bankIban}
                  onChange={(e) => setPaymentSettings({...paymentSettings, bankIban: e.target.value})}
                  className="w-full border p-3 rounded-lg font-mono text-sm bg-slate-50 outline-none"
                />
              </div>
            </div>

            <button 
              onClick={() => alert('Payment Settings Saved Successfully!')}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-2.5 rounded-lg text-sm"
            >
              Save Payment Settings
            </button>
          </div>

          {/* SECTION B: UPLOAD NEW EMBROIDERY DESIGN */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center gap-2 border-b pb-4">
              <Plus className="w-6 h-6 text-emerald-600" />
              <h2 className="text-xl font-bold">Upload New Digitized Design</h2>
            </div>

            <form onSubmit={handleAddProduct} className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-1">Design Title</label>
                <input 
                  type="text" 
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g., Lion Crest Patch"
                  className="w-full border p-3 rounded-lg text-sm outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">Price ($ USD)</label>
                <input 
                  type="number" 
                  required
                  value={newPrice}
                  onChange={(e) => setNewPrice(parseFloat(e.target.value) || 0)}
                  className="w-full border p-3 rounded-lg text-sm outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">Machine Format</label>
                <input 
                  type="text" 
                  value={newFormat}
                  onChange={(e) => setNewFormat(e.target.value)}
                  placeholder="DST, PES, ART, etc."
                  className="w-full border p-3 rounded-lg text-sm outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">Stitch Count</label>
                <input 
                  type="number" 
                  value={newStitches}
                  onChange={(e) => setNewStitches(parseInt(e.target.value) || 0)}
                  className="w-full border p-3 rounded-lg text-sm outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">Width (Inches)</label>
                <input 
                  type="number" 
                  step="0.1"
                  value={newWidth}
                  onChange={(e) => setNewWidth(parseFloat(e.target.value) || 0)}
                  className="w-full border p-3 rounded-lg text-sm outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">Height (Inches)</label>
                <input 
                  type="number" 
                  step="0.1"
                  value={newHeight}
                  onChange={(e) => setNewHeight(parseFloat(e.target.value) || 0)}
                  className="w-full border p-3 rounded-lg text-sm outline-none"
                />
              </div>

              <div className="md:col-span-3">
                <button 
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 py-3 rounded-xl text-sm shadow"
                >
                  Publish Design to Store
                </button>
              </div>
            </form>
          </div>
        </main>
      )}

      {/* AUTHENTICATION MODAL (SIGNUP / LOGIN) */}
      {isAuthModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white max-w-md w-full p-8 rounded-2xl shadow-2xl relative">
            <h3 className="text-2xl font-bold text-slate-900 mb-2">
              {authMode === 'login' ? 'Sign In to Your Account' : 'Create New Account'}
            </h3>
            <p className="text-xs text-slate-500 mb-6">Create an account to manage and download your purchased designs anytime.</p>

            <form onSubmit={handleAuthSubmit} className="space-y-4">
              {authMode === 'signup' && (
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Full Name</label>
                  <input 
                    type="text" 
                    required
                    value={authName}
                    onChange={(e) => setAuthName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full border p-3 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Email Address</label>
                <input 
                  type="email" 
                  required
                  value={authEmail}
                  onChange={(e) => setAuthEmail(e.target.value)}
                  placeholder="client@example.com"
                  className="w-full border p-3 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Password</label>
                <input 
                  type="password" 
                  required
                  value={authPassword}
                  onChange={(e) => setAuthPassword(e.target.value)}
                  className="w-full border p-3 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <button 
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl shadow mt-2"
              >
                {authMode === 'login' ? 'Sign In' : 'Register Account'}
              </button>
            </form>

            <div className="mt-6 text-center text-xs text-slate-500">
              {authMode === 'login' ? (
                <p>Don't have an account? <button onClick={() => setAuthMode('signup')} className="text-indigo-600 font-bold underline">Register</button></p>
              ) : (
                <p>Already have an account? <button onClick={() => setAuthMode('login')} className="text-indigo-600 font-bold underline">Sign In</button></p>
              )}
            </div>

            <button 
              onClick={() => setIsAuthModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 font-bold text-sm"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
