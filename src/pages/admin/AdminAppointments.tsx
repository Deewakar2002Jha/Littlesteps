import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, query, orderBy, onSnapshot, updateDoc, doc, Timestamp } from 'firebase/firestore';
import { format } from 'date-fns';
import { 
  Search, 
  Filter, 
  MoreVertical, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Calendar as CalendarIcon,
  ChevronRight,
  User,
  Phone,
  Mail,
  Baby
} from 'lucide-react';

interface Appointment {
  id: string;
  parentName: string;
  phone: string;
  email: string;
  childAge: number;
  therapyType: string;
  appointmentDate: string;
  appointmentTime: string;
  status: 'pending' | 'approved' | 'rejected' | 'completed' | 'rescheduled';
  createdAt: Timestamp;
  message?: string;
}

export default function AdminAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const q = query(collection(db, 'appointments'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Appointment));
      setAppointments(docs);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    try {
      await updateDoc(doc(db, 'appointments', id), { status });
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  const filteredAppointments = appointments.filter(app => {
    const matchesFilter = filter === 'all' || app.status === filter;
    const matchesSearch = app.parentName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          app.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-amber-100 text-amber-700';
      case 'approved': return 'bg-emerald-100 text-emerald-700';
      case 'rejected': return 'bg-red-100 text-red-700';
      case 'completed': return 'bg-stone-100 text-stone-700';
      case 'rescheduled': return 'bg-blue-100 text-blue-700';
      default: return 'bg-stone-100 text-stone-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white p-4 rounded-2xl border border-stone-200 shadow-sm">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
          <input 
            type="text" 
            placeholder="Search by parent name or email..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:border-emerald-500 outline-none transition-all"
          />
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
          {['all', 'pending', 'approved', 'completed', 'rejected'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-xl text-sm font-bold capitalize whitespace-nowrap transition-all ${
                filter === f ? 'bg-stone-900 text-white' : 'bg-stone-50 text-stone-500 hover:bg-stone-100'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Appointments List */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-stone-50 border-b border-stone-200">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-stone-500 uppercase tracking-wider">Client</th>
                <th className="px-6 py-4 text-xs font-bold text-stone-500 uppercase tracking-wider">Therapy</th>
                <th className="px-6 py-4 text-xs font-bold text-stone-500 uppercase tracking-wider">Schedule</th>
                <th className="px-6 py-4 text-xs font-bold text-stone-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-stone-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {loading ? (
                <tr><td colSpan={5} className="px-6 py-12 text-center text-stone-500">Loading appointments...</td></tr>
              ) : filteredAppointments.length === 0 ? (
                <tr><td colSpan={5} className="px-6 py-12 text-center text-stone-500">No appointments found.</td></tr>
              ) : filteredAppointments.map((app) => (
                <tr key={app.id} className="hover:bg-stone-50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-stone-100 rounded-full flex items-center justify-center text-stone-500 font-bold">
                        {app.parentName.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-stone-900">{app.parentName}</p>
                        <p className="text-xs text-stone-500">{app.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-stone-100 text-stone-700 rounded-full text-xs font-bold">
                      {app.therapyType}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      <p className="font-semibold text-stone-900">{format(new Date(app.appointmentDate), 'MMM dd, yyyy')}</p>
                      <p className="text-xs text-stone-500 capitalize">{app.appointmentTime}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold capitalize ${getStatusColor(app.status)}`}>
                      {app.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      {app.status === 'pending' && (
                        <>
                          <button 
                            onClick={() => updateStatus(app.id, 'approved')}
                            className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                            title="Approve"
                          >
                            <CheckCircle size={18} />
                          </button>
                          <button 
                            onClick={() => updateStatus(app.id, 'rejected')}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Reject"
                          >
                            <XCircle size={18} />
                          </button>
                        </>
                      )}
                      {app.status === 'approved' && (
                        <button 
                          onClick={() => updateStatus(app.id, 'completed')}
                          className="p-2 text-stone-600 hover:bg-stone-100 rounded-lg transition-colors"
                          title="Mark as Completed"
                        >
                          <CheckCircle size={18} />
                        </button>
                      )}
                      <button className="p-2 text-stone-400 hover:bg-stone-100 rounded-lg transition-colors">
                        <ChevronRight size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
