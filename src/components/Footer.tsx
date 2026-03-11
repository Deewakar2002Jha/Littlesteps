import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Mail, Phone, MapPin, Instagram, Facebook, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-300 pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white">
                <Heart size={24} fill="currentColor" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-white">Little<span className="text-emerald-600">Steps</span></span>
            </Link>
            <p className="text-stone-400 leading-relaxed mb-8">
              Dedicated to providing the highest quality therapy and development services for children of all ages and abilities.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center hover:bg-emerald-600 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center hover:bg-emerald-600 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center hover:bg-emerald-600 transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-4">
              <li><Link to="/about" className="hover:text-emerald-500 transition-colors">About Us</Link></li>
              <li><Link to="/services" className="hover:text-emerald-500 transition-colors">Our Services</Link></li>
              <li><Link to="/conditions" className="hover:text-emerald-500 transition-colors">Conditions We Treat</Link></li>
              <li><Link to="/blog" className="hover:text-emerald-500 transition-colors">Parent Resources</Link></li>
              <li><Link to="/book" className="hover:text-emerald-500 transition-colors">Book Appointment</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-lg mb-6">Our Services</h4>
            <ul className="space-y-4">
              <li><Link to="/services" className="hover:text-emerald-500 transition-colors">Speech Therapy</Link></li>
              <li><Link to="/services" className="hover:text-emerald-500 transition-colors">Occupational Therapy</Link></li>
              <li><Link to="/services" className="hover:text-emerald-500 transition-colors">ABA Therapy</Link></li>
              <li><Link to="/services" className="hover:text-emerald-500 transition-colors">Physiotherapy</Link></li>
              <li><Link to="/services" className="hover:text-emerald-500 transition-colors">Special Education</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-lg mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <MapPin className="text-emerald-500 flex-shrink-0" size={20} />
                <span>123 Therapy Lane, Child Development Center, City, State 12345</span>
              </li>
              <li className="flex gap-3">
                <Phone className="text-emerald-500 flex-shrink-0" size={20} />
                <span>+1 (234) 567-8900</span>
              </li>
              <li className="flex gap-3">
                <Mail className="text-emerald-500 flex-shrink-0" size={20} />
                <span>hello@littlesteps.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-stone-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-stone-500">
          <p>© 2026 Little Steps Child Development Center. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <Link to="/admin" className="hover:text-white transition-colors">Admin Login</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
