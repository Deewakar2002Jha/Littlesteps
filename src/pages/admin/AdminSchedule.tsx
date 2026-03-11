import React, { useState } from 'react';
import { Calendar, Clock, User, Plus, Trash2, Edit2, Save, X } from 'lucide-react';

const therapists = [
  { id: '1', name: 'Dr. Sarah Johnson', specialization: 'Speech Therapy', hours: '9:00 AM - 5:00 PM' },
  { id: '2', name: 'Dr. Michael Chen', specialization: 'Occupational Therapy', hours: '10:00 AM - 6:00 PM' },
  { id: '3', name: 'Dr. Emily Brown', specialization: 'ABA Therapy', hours: '8:00 AM - 4:00 PM' },
];

export default function AdminSchedule() {
  const [selectedTherapist, setSelectedTherapist] = useState(therapists[0]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Therapist List */}
        <div className="lg:w-1/3 space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-stone-900">Therapists</h3>
            <button className="p-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all">
              <Plus size={18} />
            </button>
          </div>
          {therapists.map((t) => (
            <button
              key={t.id}
              onClick={() => setSelectedTherapist(t)}
              className={`w-full text-left p-4 rounded-2xl border transition-all ${
                selectedTherapist.id === t.id 
                  ? 'bg-white border-emerald-500 shadow-md ring-2 ring-emerald-100' 
                  : 'bg-white border-stone-200 hover:border-stone-300 shadow-sm'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-stone-100 rounded-xl flex items-center justify-center text-stone-500 font-bold">
                  {t.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h4 className="font-bold text-stone-900">{t.name}</h4>
                  <p className="text-xs text-stone-500">{t.specialization}</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Schedule View */}
        <div className="lg:w-2/3 bg-white p-8 rounded-3xl border border-stone-200 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-2xl font-bold text-stone-900">{selectedTherapist.name}</h3>
              <p className="text-stone-500">{selectedTherapist.specialization}</p>
            </div>
            <div className="flex gap-2">
              <button className="p-2 text-stone-500 hover:bg-stone-50 rounded-lg transition-all border border-stone-200">
                <Edit2 size={18} />
              </button>
              <button className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all border border-red-100">
                <Trash2 size={18} />
              </button>
            </div>
          </div>

          <div className="space-y-8">
            <section>
              <h4 className="text-sm font-bold text-stone-400 uppercase tracking-wider mb-4">Working Hours</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-stone-50 rounded-xl border border-stone-100 flex items-center gap-3">
                  <Clock size={20} className="text-emerald-600" />
                  <div>
                    <p className="text-xs text-stone-500">Daily Schedule</p>
                    <p className="font-bold text-stone-900">{selectedTherapist.hours}</p>
                  </div>
                </div>
                <div className="p-4 bg-stone-50 rounded-xl border border-stone-100 flex items-center gap-3">
                  <Calendar size={20} className="text-emerald-600" />
                  <div>
                    <p className="text-xs text-stone-500">Working Days</p>
                    <p className="font-bold text-stone-900">Mon - Fri</p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h4 className="text-sm font-bold text-stone-400 uppercase tracking-wider mb-4">Weekly Availability</h4>
              <div className="space-y-3">
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                  <div key={day} className="flex items-center justify-between p-4 border border-stone-100 rounded-xl hover:bg-stone-50 transition-all">
                    <span className="font-bold text-stone-700">{day}</span>
                    <div className="flex items-center gap-4">
                      <span className={`text-xs font-bold px-2 py-1 rounded-md ${day === 'Saturday' || day === 'Sunday' ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-600'}`}>
                        {day === 'Saturday' || day === 'Sunday' ? 'Unavailable' : '9:00 AM - 5:00 PM'}
                      </span>
                      <button className="text-stone-400 hover:text-stone-900">
                        <Edit2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
