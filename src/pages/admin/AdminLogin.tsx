import React, { useState } from 'react';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../../firebase';
import { motion } from 'motion/react';
import { Heart, Lock, ArrowRight } from 'lucide-react';

export default function AdminLogin() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (err: any) {
      console.error('Login error:', err);
      setError('Failed to sign in. Please ensure you are an authorized admin.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-50 px-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white p-10 rounded-3xl shadow-2xl border border-stone-100"
      >
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-emerald-600 rounded-2xl flex items-center justify-center text-white mx-auto mb-6 shadow-lg shadow-emerald-100">
            <Heart size={32} fill="currentColor" />
          </div>
          <h1 className="text-3xl font-bold text-stone-900 mb-2">Admin Portal</h1>
          <p className="text-stone-500">Secure access for Little Steps staff</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium border border-red-100">
            {error}
          </div>
        )}

        <button 
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 py-4 bg-white border-2 border-stone-100 rounded-xl font-bold text-stone-700 hover:bg-stone-50 hover:border-stone-200 transition-all shadow-sm"
        >
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-6 h-6" />
          {loading ? 'Signing in...' : 'Sign in with Google'}
        </button>

        <div className="mt-8 pt-8 border-t border-stone-100 text-center">
          <p className="text-xs text-stone-400 flex items-center justify-center gap-1">
            <Lock size={12} /> Authorized Personnel Only
          </p>
        </div>
      </motion.div>
    </div>
  );
}
