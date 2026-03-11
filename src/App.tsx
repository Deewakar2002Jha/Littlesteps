import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from './firebase';
import { 
  Home, 
  About, 
  Services, 
  Conditions, 
  Blog, 
  BookAppointment, 
  Contact,
  AdminDashboard,
  AdminLogin,
  AdminAppointments,
  AdminClients,
  AdminSchedule
} from './pages';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen flex flex-col font-sans text-stone-900 bg-stone-50">
        <Routes>
          {/* Admin Routes */}
          <Route path="/admin/login" element={user ? <Navigate to="/admin" /> : <AdminLogin />} />
          <Route path="/admin/*" element={user ? <AdminDashboard user={user} /> : <Navigate to="/admin/login" />} />

          {/* Public Routes */}
          <Route path="/*" element={
            <>
              <Navbar />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/conditions" element={<Conditions />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/book" element={<BookAppointment />} />
                  <Route path="/contact" element={<Contact />} />
                </Routes>
              </main>
              <Footer />
              <WhatsAppButton />
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}
