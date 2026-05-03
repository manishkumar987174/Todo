import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../utils/api';
import { CheckCircle2, Clock, FolderKanban, ListTodo, Loader2 } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const StatCard = ({ title, value, icon: Icon, colorClass, bgClass }) => (
  <div className="bg-white rounded-xl p-6 border border-slate-100 shadow-sm flex items-center space-x-4 transition-transform hover:-translate-y-1 duration-200">
    <div className={`p-4 rounded-lg ${bgClass} ${colorClass}`}>
      <Icon className="w-6 h-6" />
    </div>
    <div>
      <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
      <h3 className="text-2xl font-bold text-slate-800">{value}</h3>
    </div>
  </div>
);

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await api.get('/dashboard/stats');
        setStats(data);
      } catch (error) {
        console.error('Error fetching stats', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  const chartData = [
    { name: 'Completed', value: stats?.completedTasks || 0, color: '#10B981' },
    { name: 'In Progress', value: stats?.inProgressTasks || 0, color: '#F59E0B' },
    { name: 'To Do', value: stats?.pendingTasks || 0, color: '#6366F1' },
  ].filter(item => item.value > 0);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Dashboard Overview</h1>
        <p className="text-slate-500 mt-1">Here is a summary of your team's progress.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Projects"
          value={stats?.totalProjects}
          icon={FolderKanban}
          colorClass="text-blue-600"
          bgClass="bg-blue-50"
        />
        <StatCard
          title="Total Tasks"
          value={stats?.totalTasks}
          icon={ListTodo}
          colorClass="text-indigo-600"
          bgClass="bg-indigo-50"
        />
        <StatCard
          title="Completed"
          value={stats?.completedTasks}
          icon={CheckCircle2}
          colorClass="text-emerald-600"
          bgClass="bg-emerald-50"
        />
        <StatCard
          title="In Progress"
          value={stats?.inProgressTasks}
          icon={Clock}
          colorClass="text-amber-600"
          bgClass="bg-amber-50"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <div className="bg-white rounded-xl p-6 border border-slate-100 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-800 mb-6">Task Status Distribution</h3>
          {chartData.length > 0 ? (
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Legend verticalAlign="bottom" height={36}/>
                </PieChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-72 flex items-center justify-center text-slate-400">
              No tasks available to display
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-100 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-800 mb-6">Recent Activity</h3>
          <div className="space-y-6">
            <div className="flex items-start space-x-4 relative">
              <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 z-10 shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div className="absolute top-10 left-5 w-0.5 h-12 bg-slate-100 -ml-px"></div>
              <div>
                <p className="text-sm font-medium text-slate-800">You completed a task</p>
                <p className="text-xs text-slate-500 mt-0.5">Design new landing page • 2 hours ago</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4 relative">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 z-10 shrink-0">
                <FolderKanban className="w-5 h-5" />
              </div>
              <div className="absolute top-10 left-5 w-0.5 h-12 bg-slate-100 -ml-px"></div>
              <div>
                <p className="text-sm font-medium text-slate-800">New project created</p>
                <p className="text-xs text-slate-500 mt-0.5">Mobile App Redesign • 5 hours ago</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 relative">
              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 z-10 shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-800">Task status updated</p>
                <p className="text-xs text-slate-500 mt-0.5">API Integration set to In Progress • 1 day ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
