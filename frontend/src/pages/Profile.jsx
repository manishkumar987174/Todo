import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { User, Mail, Shield, Calendar } from 'lucide-react';

const Profile = () => {
  const { user } = useContext(AuthContext);

  if (!user) return null;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">My Profile</h1>
        <p className="text-slate-500 mt-1">Manage your personal information and settings.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-indigo-500 to-purple-600"></div>
        <div className="px-8 pb-8 relative">
          <div className="flex justify-between items-end mb-8 -mt-12">
            <div className="w-24 h-24 rounded-2xl bg-white p-1.5 shadow-md">
              <div className="w-full h-full bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600 text-4xl font-bold">
                {user.name.charAt(0).toUpperCase()}
              </div>
            </div>
            <button className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-lg font-medium transition-colors text-sm">
              Edit Profile
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-slate-500 mb-1 flex items-center">
                  <User className="w-4 h-4 mr-1.5" /> Full Name
                </h3>
                <p className="text-slate-800 font-medium">{user.name}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-slate-500 mb-1 flex items-center">
                  <Mail className="w-4 h-4 mr-1.5" /> Email Address
                </h3>
                <p className="text-slate-800 font-medium">{user.email}</p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-slate-500 mb-1 flex items-center">
                  <Shield className="w-4 h-4 mr-1.5" /> Role & Permissions
                </h3>
                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                  user.role === 'Admin' ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-700'
                }`}>
                  {user.role}
                </span>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-slate-500 mb-1 flex items-center">
                  <Calendar className="w-4 h-4 mr-1.5" /> Account Created
                </h3>
                <p className="text-slate-800 font-medium">Recently</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
