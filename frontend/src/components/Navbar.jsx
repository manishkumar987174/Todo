import React, { useContext } from 'react';
import { Menu, Bell } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user } = useContext(AuthContext);

  return (
    <header className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-10">
      <div className="flex items-center md:hidden">
        <button className="text-slate-500 hover:text-slate-700">
          <Menu className="w-6 h-6" />
        </button>
        <span className="ml-3 text-lg font-bold text-slate-800">TaskFlow</span>
      </div>
      
      <div className="hidden md:flex items-center text-slate-500 text-sm font-medium">
        Welcome back, {user?.name.split(' ')[0]} 👋
      </div>

      <div className="flex items-center space-x-4">
        <button className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors rounded-full hover:bg-slate-100">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
