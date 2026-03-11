import React, { useState } from 'react';
import { motion } from 'motion/react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { CheckCircle, Calendar, Clock, User, Phone, Mail, Baby, MessageSquare } from 'lucide-react';

const therapyTypes = [
  'Speech Therapy',
  'Occupational Therapy',
  'ABA Therapy',
  'Behavioral Therapy',
  'Special Education',
  'Physiotherapy',
  'Other Consultation'
];

export default function BookAppointment() {
  const [formData, setFormData] = useState({
    parentName: '',
    phone: '',
    email: '',
    childAge: '',
    therapyType: '',
    appointmentDate: '',
    appointmentTime: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      await addDoc(collection(db, 'appointments'), {
        ...formData,
        childAge: Number(formData.childAge),
        status: 'pending',
        createdAt: serverTimestamp()
      });
      setStatus('success');
      setFormData({
        parentName: '',
        phone: '',
        email: '',
        childAge: '',
        therapyType: '',
        appointmentDate: '',
        appointmentTime: '',
        message: ''
      });
    } catch (error) {
      console.error('Error booking appointment:', error);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="pt-32 pb-24 container mx-auto px-6 max-w-2xl text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-12 rounded-3xl shadow-xl border border-emerald-100"
        >
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle size={48} />
          </div>
          <h2 className="text-3xl font-bold mb-4">Appointment Requested!</h2>
          <p className="text-stone-600 mb-8 text-lg">
            Thank you for reaching out. Our team will review your request and contact you within 24 hours to confirm the schedule.
          </p>
          <button 
            onClick={() => setStatus('idle')}
            className="px-8 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-all"
          >
            Book Another Appointment
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 bg-stone-50">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-16">
          <div className="lg:w-1/3">
            <h1 className="text-4xl font-bold mb-6">Book a Consultation</h1>
            <p className="text-stone-600 mb-8 leading-relaxed">
              Take the first step towards supporting your child's development. Fill out the form and our clinical coordinator will get in touch with you.
            </p>
            <div className="space-y-6">
              <div className="flex gap-4 p-4 bg-white rounded-2xl shadow-sm border border-stone-100">
                <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone size={20} />
                </div>
                <div>
                  <h4 className="font-bold">Call Us</h4>
                  <p className="text-stone-500">+1 (234) 567-8900</p>
                </div>
              </div>
              <div className="flex gap-4 p-4 bg-white rounded-2xl shadow-sm border border-stone-100">
                <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail size={20} />
                </div>
                <div>
                  <h4 className="font-bold">Email Us</h4>
                  <p className="text-stone-500">hello@littlesteps.com</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:w-2/3">
            <form onSubmit={handleSubmit} className="bg-white p-8 lg:p-12 rounded-3xl shadow-xl border border-stone-100">
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-stone-700 flex items-center gap-2">
                    <User size={16} /> Parent Name
                  </label>
                  <input 
                    required
                    type="text"
                    value={formData.parentName}
                    onChange={(e) => setFormData({...formData, parentName: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-stone-700 flex items-center gap-2">
                    <Phone size={16} /> Phone Number
                  </label>
                  <input 
                    required
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-stone-700 flex items-center gap-2">
                    <Mail size={16} /> Email Address
                  </label>
                  <input 
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"
                    placeholder="john@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-stone-700 flex items-center gap-2">
                    <Baby size={16} /> Child's Age
                  </label>
                  <input 
                    required
                    type="number"
                    min="0"
                    max="18"
                    value={formData.childAge}
                    onChange={(e) => setFormData({...formData, childAge: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"
                    placeholder="e.g. 5"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-stone-700">Therapy Type</label>
                  <select 
                    required
                    value={formData.therapyType}
                    onChange={(e) => setFormData({...formData, therapyType: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all bg-white"
                  >
                    <option value="">Select Therapy</option>
                    {therapyTypes.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-stone-700 flex items-center gap-2">
                    <Calendar size={16} /> Preferred Date
                  </label>
                  <input 
                    required
                    type="date"
                    value={formData.appointmentDate}
                    onChange={(e) => setFormData({...formData, appointmentDate: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-stone-700 flex items-center gap-2">
                    <Clock size={16} /> Preferred Time
                  </label>
                  <select 
                    required
                    value={formData.appointmentTime}
                    onChange={(e) => setFormData({...formData, appointmentTime: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all bg-white"
                  >
                    <option value="">Select Time</option>
                    <option value="morning">Morning (9 AM - 12 PM)</option>
                    <option value="afternoon">Afternoon (12 PM - 4 PM)</option>
                    <option value="evening">Evening (4 PM - 7 PM)</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2 mb-8">
                <label className="text-sm font-bold text-stone-700 flex items-center gap-2">
                  <MessageSquare size={16} /> Additional Message
                </label>
                <textarea 
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-stone-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all h-32 resize-none"
                  placeholder="Tell us about your child's needs..."
                ></textarea>
              </div>
              
              <button 
                type="submit"
                disabled={status === 'submitting'}
                className="w-full py-4 bg-emerald-600 text-white rounded-xl font-bold text-lg hover:bg-emerald-700 transition-all disabled:opacity-50 shadow-lg shadow-emerald-100"
              >
                {status === 'submitting' ? 'Submitting...' : 'Confirm Appointment Request'}
              </button>
              
              {status === 'error' && (
                <p className="mt-4 text-red-500 text-center font-medium">Something went wrong. Please try again later.</p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
