import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { Search, User, Phone, Mail, Baby, Calendar, ChevronRight, Filter } from 'lucide-react';

interface Client {
  id: string;
  parentName: string;
  phone: string;
  email: string;
  childAge: number;
  notes?: any[];
  appointmentHistory?: string[];
}

export default function AdminClients() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const q = query(collection(db, 'clients'), orderBy('parentName'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Client));
      setClients(docs);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const filteredClients = clients.filter(c => 
    c.parentName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.phone.includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white p-4 rounded-2xl border border-stone-200 shadow-sm">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
          <input 
            type="text" 
            placeholder="Search clients by name, email or phone..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-xl focus:border-emerald-500 outline-none transition-all"
          />
        </div>
        <button className="px-4 py-2 bg-stone-900 text-white rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-stone-800 transition-all">
          <Filter size={16} /> Advanced Filter
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full py-12 text-center text-stone-500">Loading clients...</div>
        ) : filteredClients.length === 0 ? (
          <div className="col-span-full py-12 text-center text-stone-500">No clients found.</div>
        ) : filteredClients.map((client) => (
          <div key={client.id} className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm hover:shadow-md transition-all group">
            <div className="flex justify-between items-start mb-6">
              <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center text-xl font-bold">
                {client.parentName.charAt(0)}
              </div>
              <button className="p-2 text-stone-400 hover:bg-stone-50 rounded-lg transition-all">
                <ChevronRight size={20} />
              </button>
            </div>
            
            <h3 className="text-xl font-bold text-stone-900 mb-1">{client.parentName}</h3>
            <p className="text-sm text-stone-500 mb-6 flex items-center gap-1">
              <Baby size={14} /> Child Age: {client.childAge} years
            </p>

            <div className="space-y-3 pt-4 border-t border-stone-100">
              <div className="flex items-center gap-3 text-sm text-stone-600">
                <Phone size={16} className="text-stone-400" />
                {client.phone}
              </div>
              <div className="flex items-center gap-3 text-sm text-stone-600">
                <Mail size={16} className="text-stone-400" />
                {client.email}
              </div>
              <div className="flex items-center gap-3 text-sm text-stone-600">
                <Calendar size={16} className="text-stone-400" />
                Last Visit: Oct 12, 2025
              </div>
            </div>

            <div className="mt-6 flex gap-2">
              <button className="flex-grow py-2 bg-stone-50 text-stone-700 rounded-lg text-xs font-bold hover:bg-stone-100 transition-all">
                View History
              </button>
              <button className="flex-grow py-2 bg-emerald-50 text-emerald-700 rounded-lg text-xs font-bold hover:bg-emerald-100 transition-all">
                Add Note
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
