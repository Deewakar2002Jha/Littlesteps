import React, { useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import { motion } from 'motion/react';
import { Heart, Lock, Mail, Key, AlertCircle, Sparkles, Eye, EyeOff } from 'lucide-react';

export default function AdminLogin() {
  const [email, setEmail] = useState('admin@gmail.com');
  const [password, setPassword] = useState('admin@123');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      console.error('Login error:', err);
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        setError('Invalid email or password. Please check for typos or click "Initialize Admin" if you haven\'t created the account yet.');
      } else if (err.code === 'auth/operation-not-allowed') {
        setError('Email/Password login is not enabled in Firebase. Please enable it in the Firebase Console under Authentication > Sign-in method.');
      } else {
        setError(`Login failed: ${err.message || 'Please try again.'}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleInitialize = async () => {
    if (!email || !password) {
      return setError('Please enter an email and password to initialize the admin account.');
    }
    
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Create admin document in Firestore
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        email: email,
        role: 'admin',
        createdAt: new Date().toISOString()
      });

      setSuccess(`Admin account (${email}) initialized successfully! You can now sign in.`);
    } catch (err: any) {
      console.error('Init error:', err);
      if (err.code === 'auth/email-already-in-use') {
        setError('This email is already registered. If you forgot the password, you may need to reset it in the Firebase Console.');
      } else if (err.code === 'auth/operation-not-allowed') {
        setError('Email/Password registration is not enabled in Firebase. Please enable it in the Firebase Console.');
      } else {
        setError(`Initialization failed: ${err.message}`);
      }
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
          <p className="text-stone-500">Sign in to manage Little Steps</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium border border-red-100 flex items-center gap-2">
            <AlertCircle size={18} />
            {error}
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 bg-emerald-50 text-emerald-600 rounded-xl text-sm font-medium border border-emerald-100 flex items-center gap-2">
            <Sparkles size={18} />
            {success}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-stone-700 flex items-center gap-2">
              <Mail size={16} /> Email Address
            </label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"
              placeholder="admin@gmail.com"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-stone-700 flex items-center gap-2">
              <Key size={16} /> Password
            </label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all pr-12"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-emerald-600 text-white rounded-xl font-bold text-lg hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100 disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-stone-100 text-center space-y-4">
          <button 
            onClick={handleInitialize}
            disabled={loading}
            className="text-xs text-emerald-600 font-bold hover:underline disabled:opacity-50"
          >
            First time? Initialize Admin Account
          </button>
          <p className="text-xs text-stone-400 flex items-center justify-center gap-1">
            <Lock size={12} /> Authorized Personnel Only
          </p>
          <p className="mt-2 text-[10px] text-stone-300">
            Default: admin@gmail.com / admin@123
          </p>
        </div>
      </motion.div>
    </div>
  );
}


