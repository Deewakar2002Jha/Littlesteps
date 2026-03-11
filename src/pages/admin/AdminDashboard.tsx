import React from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { User } from 'firebase/auth';
import { auth } from '../../firebase';
import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  Clock, 
  Settings, 
  LogOut,
  Heart,
  Bell
} from 'lucide-react';
import AdminOverview from './AdminOverview';
import AdminAppointments from './AdminAppointments';
import AdminClients from './AdminClients';
import AdminSchedule from './AdminSchedule';

interface AdminDashboardProps {
  user: User;
}

export default function AdminDashboard({ user }: AdminDashboardProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.signOut();
    navigate('/');
  };

  const navItems = [
    { name: 'Overview', path: '/admin', icon: LayoutDashboard },
    { name: 'Appointments', path: '/admin/appointments', icon: Calendar },
    { name: 'Clients', path: '/admin/clients', icon: Users },
    { name: 'Schedule', path: '/admin/schedule', icon: Clock },
  ];

  return (
    <div className="flex min-h-screen bg-stone-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-stone-200 flex flex-col fixed h-full z-20">
        <div className="p-6 border-b border-stone-100">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white">
              <Heart size={18} fill="currentColor" />
            </div>
            <span className="text-xl font-bold tracking-tight text-stone-900">Little<span className="text-emerald-600">Steps</span></span>
          </Link>
        </div>
        
        <nav className="flex-grow p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all ${
                  isActive 
                    ? 'bg-emerald-50 text-emerald-600' 
                    : 'text-stone-500 hover:bg-stone-50 hover:text-stone-900'
                }`}
              >
                <Icon size={20} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-stone-100">
          <div className="flex items-center gap-3 px-4 py-3 mb-4">
            <img src={user.photoURL || ''} alt="" className="w-10 h-10 rounded-full border border-stone-200" />
            <div className="overflow-hidden">
              <p className="text-sm font-bold text-stone-900 truncate">{user.displayName}</p>
              <p className="text-xs text-stone-500 truncate">{user.email}</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-stone-500 hover:text-red-600 hover:bg-red-50 rounded-xl font-semibold transition-all"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow ml-64 min-h-screen flex flex-col">
        {/* Header */}
        <header className="h-20 bg-white border-b border-stone-200 px-8 flex items-center justify-between sticky top-0 z-10">
          <h2 className="text-xl font-bold text-stone-900">
            {navItems.find(i => i.path === location.pathname)?.name || 'Dashboard'}
          </h2>
          <div className="flex items-center gap-4">
            <button className="w-10 h-10 rounded-full bg-stone-50 flex items-center justify-center text-stone-500 hover:bg-stone-100 transition-all relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-8 flex-grow">
          <Routes>
            <Route path="/" element={<AdminOverview />} />
            <Route path="/appointments" element={<AdminAppointments />} />
            <Route path="/clients" element={<AdminClients />} />
            <Route path="/schedule" element={<AdminSchedule />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}
