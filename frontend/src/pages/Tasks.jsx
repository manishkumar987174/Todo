import React, { useState, useEffect, useContext } from 'react';
import api from '../utils/api';
import { AuthContext } from '../context/AuthContext';
import { Loader2, Calendar, Folder, MoreVertical, Search, CheckCircle2, Clock, Circle } from 'lucide-react';

const TaskCard = ({ task, onStatusChange }) => {
  const { user } = useContext(AuthContext);
  
  const statusColors = {
    'Todo': 'bg-slate-100 text-slate-600 border-slate-200',
    'In Progress': 'bg-amber-100 text-amber-700 border-amber-200',
    'Completed': 'bg-emerald-100 text-emerald-700 border-emerald-200'
  };

  const statusIcons = {
    'Todo': Circle,
    'In Progress': Clock,
    'Completed': CheckCircle2
  };
  
  const priorityColors = {
    'Low': 'bg-blue-50 text-blue-600',
    'Medium': 'bg-amber-50 text-amber-600',
    'High': 'bg-red-50 text-red-600'
  };

  const StatusIcon = statusIcons[task.status];
  const canUpdateStatus = user.role === 'Admin' || (user.role === 'Member' && task.assignedTo?._id === user._id);

  return (
    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${priorityColors[task.priority]}`}>
          {task.priority}
        </span>
        <button className="text-slate-400 hover:text-slate-600">
          <MoreVertical className="w-4 h-4" />
        </button>
      </div>
      
      <h4 className="font-semibold text-slate-800 mb-1 leading-snug">{task.title}</h4>
      <p className="text-sm text-slate-500 mb-4 line-clamp-2">{task.description}</p>
      
      <div className="flex flex-col space-y-3 mt-auto">
        {task.projectId && (
          <div className="flex items-center text-xs text-slate-500 font-medium">
            <Folder className="w-3.5 h-3.5 mr-1.5" />
            <span className="truncate">{task.projectId.title}</span>
          </div>
        )}
        
        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
          <div className="flex items-center">
            {task.assignedTo ? (
              <div className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold shrink-0" title={task.assignedTo.name}>
                {task.assignedTo.name.charAt(0).toUpperCase()}
              </div>
            ) : (
              <div className="w-7 h-7 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center text-xs border border-dashed border-slate-300 shrink-0">
                ?
              </div>
            )}
          </div>
          
          {canUpdateStatus ? (
            <select
              value={task.status}
              onChange={(e) => onStatusChange(task._id, e.target.value)}
              className={`text-xs px-2.5 py-1.5 rounded-lg border appearance-none font-medium outline-none cursor-pointer ${statusColors[task.status]}`}
            >
              <option value="Todo">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          ) : (
             <span className={`flex items-center text-xs px-2.5 py-1.5 rounded-lg border font-medium ${statusColors[task.status]}`}>
               <StatusIcon className="w-3.5 h-3.5 mr-1" />
               {task.status}
             </span>
          )}
        </div>
      </div>
    </div>
  );
};

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const { data } = await api.get('/tasks');
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      const { data } = await api.put(`/tasks/${taskId}`, { status: newStatus });
      setTasks(tasks.map((t) => (t._id === taskId ? data : t)));
    } catch (error) {
      console.error('Error updating task status', error);
    }
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || task.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">My Tasks</h1>
        <p className="text-slate-500 mt-1">View and manage all your assigned tasks across projects.</p>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div className="relative w-full md:w-96">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-lg bg-slate-50 focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm transition-colors"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex space-x-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
          {['All', 'Todo', 'In Progress', 'Completed'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                filterStatus === status
                  ? 'bg-slate-800 text-white shadow-md'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {filteredTasks.length === 0 ? (
        <div className="bg-white rounded-xl border border-dashed border-slate-300 p-12 text-center flex flex-col items-center justify-center">
          <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
            <CheckCircle2 className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-medium text-slate-900 mb-1">No tasks found</h3>
          <p className="text-slate-500 max-w-sm mx-auto">
            {searchTerm || filterStatus !== 'All' 
              ? "We couldn't find any tasks matching your current filters."
              : "You don't have any tasks assigned yet."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {filteredTasks.map((task) => (
            <TaskCard key={task._id} task={task} onStatusChange={handleStatusChange} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Tasks;
