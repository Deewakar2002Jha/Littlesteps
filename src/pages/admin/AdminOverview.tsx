import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, query, onSnapshot, where } from 'firebase/firestore';
import { 
  Users, 
  Calendar, 
  CheckCircle, 
  TrendingUp, 
  Clock,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { motion } from 'motion/react';

export default function AdminOverview() {
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    completed: 0,
    clients: 0
  });

  useEffect(() => {
    const unsubAppointments = onSnapshot(collection(db, 'appointments'), (snapshot) => {
      const docs = snapshot.docs.map(d => d.data());
      setStats(prev => ({
        ...prev,
        total: docs.length,
        pending: docs.filter(d => d.status === 'pending').length,
        completed: docs.filter(d => d.status === 'completed').length
      }));
    });

    const unsubClients = onSnapshot(collection(db, 'clients'), (snapshot) => {
      setStats(prev => ({ ...prev, clients: snapshot.docs.length }));
    });

    return () => {
      unsubAppointments();
      unsubClients();
    };
  }, []);

  const cards = [
    { label: 'Total Appointments', value: stats.total, icon: Calendar, color: 'bg-blue-500', trend: '+12%', trendUp: true },
    { label: 'Pending Requests', value: stats.pending, icon: Clock, color: 'bg-amber-500', trend: '+5%', trendUp: true },
    { label: 'Completed Sessions', value: stats.completed, icon: CheckCircle, color: 'bg-emerald-500', trend: '+18%', trendUp: true },
    { label: 'Total Clients', value: stats.clients, icon: Users, color: 'bg-purple-500', trend: '+8%', trendUp: true },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-stone-900">Welcome Back, Admin</h1>
          <p className="text-stone-500">Here's what's happening at Little Steps today.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white border border-stone-200 rounded-xl text-sm font-bold text-stone-700 hover:bg-stone-50 transition-all">
            Download Report
          </button>
          <button className="px-4 py-2 bg-emerald-600 rounded-xl text-sm font-bold text-white hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100">
            + New Appointment
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, i) => {
          const Icon = card.icon;
          return (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`w-12 h-12 ${card.color} rounded-xl flex items-center justify-center text-white shadow-lg shadow-stone-100`}>
                  <Icon size={24} />
                </div>
                <div className={`flex items-center gap-1 text-xs font-bold ${card.trendUp ? 'text-emerald-600' : 'text-red-600'}`}>
                  {card.trend} {card.trendUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                </div>
              </div>
              <h3 className="text-stone-500 text-sm font-semibold mb-1">{card.label}</h3>
              <p className="text-3xl font-bold text-stone-900">{card.value}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Charts Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-2xl border border-stone-200 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-lg font-bold text-stone-900">Appointment Trends</h3>
            <select className="bg-stone-50 border border-stone-200 rounded-lg px-3 py-1.5 text-sm font-semibold outline-none">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="h-64 bg-stone-50 rounded-xl flex items-center justify-center border border-dashed border-stone-200">
            <p className="text-stone-400 font-medium">Chart visualization will appear here</p>
          </div>
        </div>
        
        <div className="bg-white p-8 rounded-2xl border border-stone-200 shadow-sm">
          <h3 className="text-lg font-bold text-stone-900 mb-6">Recent Activity</h3>
          <div className="space-y-6">
            {[
              { user: 'Sarah M.', action: 'booked a new appointment', time: '2 mins ago' },
              { user: 'Dr. James', action: 'completed a session', time: '1 hour ago' },
              { user: 'Admin', action: 'approved 3 requests', time: '3 hours ago' },
              { user: 'Emily R.', action: 'rescheduled her visit', time: '5 hours ago' },
            ].map((activity, i) => (
              <div key={i} className="flex gap-4">
                <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="text-sm text-stone-900"><span className="font-bold">{activity.user}</span> {activity.action}</p>
                  <p className="text-xs text-stone-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
