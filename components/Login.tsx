import React from 'react';
import { ViewState } from '../types';
import { User, ShieldCheck } from 'lucide-react';

interface LoginProps {
  onLogin: (role: 'student' | 'admin') => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  return (
    <div className="flex h-screen w-full bg-white overflow-hidden">
      {/* Left Panel - Green */}
      <div className="hidden lg:flex w-1/2 bg-emerald-500 flex-col justify-center items-start px-16 relative">
        <div className="z-10 text-white">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
              <ShieldCheck className="text-emerald-500 w-8 h-8" />
            </div>
            <h1 className="text-3xl font-bold tracking-wide">DLSUD Smart</h1>
          </div>
          <h2 className="text-5xl font-bold mb-6 leading-tight">
            Welcome to Smart<br />Classroom
          </h2>
          <p className="text-emerald-100 text-lg max-w-md leading-relaxed mb-8">
            Advanced AI-powered classroom monitoring and management system with computer vision technology for enhanced learning experiences.
          </p>
        </div>
        {/* Decorative Circle */}
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-emerald-400 rounded-full opacity-50 blur-3xl"></div>
        <div className="absolute top-10 right-10 w-64 h-64 bg-emerald-400 rounded-full opacity-50 blur-3xl"></div>
      </div>

      {/* Right Panel - Login Card */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-gray-50 p-6">
        <div className="bg-white rounded-2xl shadow-xl p-10 max-w-md w-full border border-gray-100">
          
          {/* Tab Switcher Simulation */}
          <div className="flex bg-gray-100 p-1 rounded-xl mb-8">
            <button className="flex-1 bg-white text-emerald-600 shadow-sm py-2 rounded-lg text-sm font-semibold transition-all">
              Student
            </button>
            <button className="flex-1 text-gray-500 py-2 rounded-lg text-sm font-medium hover:text-gray-700 transition-all">
              Teacher/Admin
            </button>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-2">Student Portal</h3>
          <p className="text-gray-500 text-sm mb-8">Quick access to classroom view</p>

          <div className="flex flex-col items-center mb-8">
             <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mb-4">
               <User className="text-emerald-500 w-10 h-10" />
             </div>
             <p className="text-gray-900 font-medium">Student Access</p>
             <p className="text-xs text-gray-400">No credentials required for demo</p>
          </div>

          <button
            onClick={() => onLogin('student')}
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-4 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <span>Proceed to Login</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>

          <div className="mt-6 text-center">
            <p className="text-xs text-gray-400">View classroom analytics in real-time</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;