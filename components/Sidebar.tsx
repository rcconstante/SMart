import React from 'react';
import { LayoutDashboard, Video, HelpCircle, LogOut, ShieldCheck } from 'lucide-react';
import { ViewState } from '../types';

interface SidebarProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setView, onLogout }) => {
  return (
    <div className="w-64 bg-emerald-500 text-white flex flex-col h-screen fixed left-0 top-0 shadow-2xl z-20 transition-all duration-300">
      <div className="p-6 flex items-center gap-3">
        <div className="bg-white p-1 rounded-full">
           <ShieldCheck className="text-emerald-500 w-6 h-6" />
        </div>
        <span className="font-bold text-lg tracking-wide">DLSUD Smart</span>
      </div>

      <div className="px-6 py-4">
        <div className="bg-emerald-600/50 rounded-xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-lg font-bold">
                S
            </div>
            <div>
                <p className="font-medium text-sm">Student</p>
                <p className="text-xs text-emerald-200">BCS43</p>
            </div>
        </div>
      </div>

      <nav className="flex-1 px-4 py-2 space-y-2">
        <button 
          onClick={() => setView('dashboard')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${currentView === 'dashboard' ? 'bg-white/20 font-semibold' : 'hover:bg-white/10 text-emerald-50'}`}
        >
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </button>
        <button 
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${currentView === 'monitor' ? 'bg-white/20 font-semibold' : 'hover:bg-white/10 text-emerald-50'}`}
        >
          <Video size={20} />
          <span>Camera Monitor</span>
        </button>
        <button 
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors hover:bg-white/10 text-emerald-50"
        >
          <HelpCircle size={20} />
          <span>Help</span>
        </button>
      </nav>

      <div className="p-4">
        <button 
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/10 text-emerald-50 transition-colors"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;