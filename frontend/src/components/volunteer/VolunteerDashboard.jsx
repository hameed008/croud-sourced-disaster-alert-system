import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FaTasks,
  FaMapMarkerAlt,
  FaBell,
  FaUserCircle,
  FaSearch,
  FaFilter,
  FaCube,
  FaClock,
  FaCheckCircle,
  FaExclamationTriangle
} from 'react-icons/fa';

const VolunteerDashboard = () => {
  const [activeTab, setActiveTab] = useState('assigned');
  const [tasks, setTasks] = useState([]);
  const [updates, setUpdates] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data fetch
  useEffect(() => {
    // In a real app, this would be an API call
    const mockTasks = [
      {
        id: 1,
        title: 'Food Distribution',
        location: 'Central Relief Camp',
        status: 'assigned',
        priority: 'high',
        date: '2023-06-20',
        time: '09:00 - 12:00'
      },
      {
        id: 2,
        title: 'Medical Assistance',
        location: 'Field Hospital A',
        status: 'pending',
        priority: 'urgent',
        date: '2023-06-21',
        time: '14:00 - 17:00'
      },
      {
        id: 3,
        title: 'Shelter Setup',
        location: 'Displaced Persons Camp',
        status: 'completed',
        priority: 'medium',
        date: '2023-06-18',
        time: '10:00 - 15:00'
      }
    ];

    const mockUpdates = [
      {
        id: 1,
        message: 'New volunteers needed at North District',
        type: 'alert',
        time: '2 hours ago'
      },
      {
        id: 2,
        message: 'Training session tomorrow at 10am',
        type: 'info',
        time: '1 day ago'
      }
    ];

    setTasks(mockTasks);
    setUpdates(mockUpdates);
  }, []);

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === 'all' || task.status === activeTab;
    return matchesSearch && matchesTab;
  });

  const handleTaskStatusChange = (taskId, newStatus) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      {/* <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">Volunteer Dashboard</h1>
          <div className="flex items-center space-x-4">
            <button className="p-1 text-gray-500 hover:text-gray-700 relative">
              <FaBell className="h-6 w-6" />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
            </button>
            <div className="flex items-center space-x-2">
              <FaUserCircle className="h-8 w-8 text-gray-400" />
              <span className="text-sm font-medium">Your Profile</span>
            </div>
          </div>
        </div>
      </header> */}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Dashboard Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900">Assigned Tasks</h3>
            <p className="text-3xl font-bold text-blue-600 mt-2">
              {tasks.filter(t => t.status === 'assigned').length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900">Completed This Week</h3>
            <p className="text-3xl font-bold text-green-600 mt-2">
              {tasks.filter(t => t.status === 'completed').length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900">Urgent Requests</h3>
            <p className="text-3xl font-bold text-red-600 mt-2">
              {tasks.filter(t => t.priority === 'urgent').length}
            </p>
          </div>
        </div>

        {/* Task Management Section */}
        <div className="bg-white rounded-lg shadow overflow-hidden mb-8">
          <div className="p-6 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
            <h2 className="text-xl font-bold text-gray-900 flex items-center">
              <FaTasks className="mr-2 text-blue-500" />
              Your Tasks
            </h2>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Search tasks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex border border-gray-300 rounded-md divide-x divide-gray-300">
                <button
                  onClick={() => setActiveTab('all')}
                  className={`px-4 py-2 text-sm font-medium ${activeTab === 'all' ? 'bg-blue-100 text-blue-700' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                >
                  All
                </button>
                <button
                  onClick={() => setActiveTab('assigned')}
                  className={`px-4 py-2 text-sm font-medium ${activeTab === 'assigned' ? 'bg-blue-100 text-blue-700' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                >
                  Assigned
                </button>
                <button
                  onClick={() => setActiveTab('pending')}
                  className={`px-4 py-2 text-sm font-medium ${activeTab === 'pending' ? 'bg-blue-100 text-blue-700' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                >
                  Pending
                </button>
                <button
                  onClick={() => setActiveTab('completed')}
                  className={`px-4 py-2 text-sm font-medium ${activeTab === 'completed' ? 'bg-blue-100 text-blue-700' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                >
                  Completed
                </button>
              </div>
            </div>
          </div>

          {/* Tasks List */}
          <div className="divide-y divide-gray-200">
            {filteredTasks.length > 0 ? (
              filteredTasks.map(task => (
                <div key={task.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                    <div className="flex items-start space-x-4">
                      <div className={`p-2 rounded-full ${getPriorityColor(task.priority)}`}>
                        <FaMapMarkerAlt className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">{task.title}</h3>
                        <p className="text-sm text-gray-500 mt-1 flex items-center">
                          <span>{task.location}</span>
                          <span className="mx-2">•</span>
                          <span>{task.date}</span>
                          <span className="mx-2">•</span>
                          <span className="flex items-center">
                            <FaClock className="mr-1 h-3 w-3" />
                            {task.time}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 sm:mt-0 flex space-x-3">
                      {task.status !== 'completed' && (
                        <button
                          onClick={() => handleTaskStatusChange(task.id, 'completed')}
                          className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                          <FaCheckCircle className="mr-1.5 h-3.5 w-3.5" />
                          Mark Complete
                        </button>
                      )}
                      <Link
                        to={`/tasks/${task.id}`}
                        className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-6 text-center text-gray-500">
                No tasks found matching your criteria
              </div>
            )}
          </div>
        </div>

        {/* Updates and Alerts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 flex items-center">
                <FaBell className="mr-2 text-yellow-500" />
                Recent Updates
              </h2>
            </div>
            <div className="divide-y divide-gray-200">
              {updates.map(update => (
                <div key={update.id} className="p-6">
                  <div className="flex items-start">
                    <div className={`flex-shrink-0 p-1 rounded-full ${update.type === 'alert' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>
                      {update.type === 'alert' ? (
                        <FaExclamationTriangle className="h-5 w-5" />
                      ) : (
                        <FaBell className="h-5 w-5" />
                      )}
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">{update.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{update.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions Panel */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Quick Actions</h2>
            </div>
            <div className="p-6 grid grid-cols-2 gap-4">
              <Link
                to="/report-incident"
                className="p-4 border border-gray-300 rounded-lg text-center hover:bg-gray-50 transition-colors"
              >
                <div className="mx-auto h-10 w-10 flex items-center justify-center rounded-full bg-red-100 text-red-600 mb-2">
                  <FaExclamationTriangle className="h-5 w-5" />
                </div>
                <span className="text-sm font-medium">Report Incident</span>
              </Link>
              <Link
                to="/request-resources"
                className="p-4 border border-gray-300 rounded-lg text-center hover:bg-gray-50 transition-colors"
              >
                <div className="mx-auto h-10 w-10 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 mb-2">
                  <FaCube className="h-5 w-5" />
                </div>
                <span className="text-sm font-medium">Request Resources</span>
              </Link>
              <Link
                to="/availability"
                className="p-4 border border-gray-300 rounded-lg text-center hover:bg-gray-50 transition-colors"
              >
                <div className="mx-auto h-10 w-10 flex items-center justify-center rounded-full bg-green-100 text-green-600 mb-2">
                  <FaClock className="h-5 w-5" />
                </div>
                <span className="text-sm font-medium">Update Availability</span>
              </Link>
              <Link
                to="/training"
                className="p-4 border border-gray-300 rounded-lg text-center hover:bg-gray-50 transition-colors"
              >
                <div className="mx-auto h-10 w-10 flex items-center justify-center rounded-full bg-purple-100 text-purple-600 mb-2">
                  <FaUserCircle className="h-5 w-5" />
                </div>
                <span className="text-sm font-medium">Training Materials</span>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// Helper function for priority colors
function getPriorityColor(priority) {
  switch (priority) {
    case 'urgent':
      return 'bg-red-600';
    case 'high':
      return 'bg-orange-500';
    case 'medium':
      return 'bg-yellow-400';
    default:
      return 'bg-gray-400';
  }
}

export default VolunteerDashboard;