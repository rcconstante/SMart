import React, { useState } from 'react';
import { ViewState } from './types';
import Login from './components/Login';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Chatbot from './components/Chatbot';
import { ClassroomProvider } from './context/ClassroomContext';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('login');

  const handleLogin = (role: 'student' | 'admin') => {
    // In a real app, auth logic here.
    setView('dashboard');
  };

  const handleLogout = () => {
    setView('login');
  };

  if (view === 'login') {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <ClassroomProvider>
      <div className="flex min-h-screen bg-gray-50 font-sans">
        <Sidebar currentView={view} setView={setView} onLogout={handleLogout} />
        
        <main className="flex-1 ml-64 transition-all duration-300">
           {view === 'dashboard' && <Dashboard />}
           {view === 'monitor' && (
             <div className="flex items-center justify-center h-full text-gray-400 text-lg">
               Camera Monitor Feed Placeholder
             </div>
           )}
        </main>

        <Chatbot />
      </div>
    </ClassroomProvider>
  );
};

export default App;