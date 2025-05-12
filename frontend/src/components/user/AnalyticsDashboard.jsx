import React from 'react';
import {
  BarChart, LineChart, PieChart, Pie, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, Cell, ScatterChart, Scatter, ZAxis
} from 'recharts';

const AnalyticsDashboard = () => {
  // Sample data - replace with your actual data
  const overviewStats = {
    totalReports: 1245,
    resolvedReports: 892,
    activeRequests: 353,
    volunteerParticipation: 287,
    avgResponseTime: '2.4h',
    mostAffectedRegion: 'Coastal Area'
  };

  const disasterTypeData = [
    { name: 'Flood', reports: 420 },
    { name: 'Earthquake', reports: 350 },
    { name: 'Wildfire', reports: 280 },
    { name: 'Hurricane', reports: 195 }
  ];

  const trendData = [
    { date: 'Jan 1', reports: 12 },
    { date: 'Jan 2', reports: 19 },
    { date: 'Jan 3', reports: 15 },
    { date: 'Jan 4', reports: 28 },
    { date: 'Jan 5', reports: 32 },
    { date: 'Jan 6', reports: 42 },
    { date: 'Jan 7', reports: 35 }
  ];

  const severityData = [
    { name: 'Low', value: 45 },
    { name: 'Medium', value: 30 },
    { name: 'High', value: 25 }
  ];

  const volunteerData = [
    { name: 'John D.', completed: 42 },
    { name: 'Sarah M.', completed: 38 },
    { name: 'Alex P.', completed: 35 },
    { name: 'Maria G.', completed: 28 },
    { name: 'Tom B.', completed: 25 }
  ];

  const requestCategoryData = [
    { name: 'Food', requests: 320 },
    { name: 'Shelter', requests: 280 },
    { name: 'Water', requests: 210 },
    { name: 'Medical', requests: 150 },
    { name: 'Clothing', requests: 90 }
  ];

  const requestStatusData = [
    { name: 'Fulfilled', value: 65 },
    { name: 'Pending', value: 25 },
    { name: 'Expired', value: 10 }
  ];

  const geoData = [
    { x: 34.05, y: -118.24, z: 50 }, // LA
    { x: 40.71, y: -74.00, z: 30 },  // NYC
    { x: 41.87, y: -87.62, z: 40 },  // Chicago
    { x: 29.76, y: -95.36, z: 35 },  // Houston
    { x: 39.95, y: -75.16, z: 20 }   // Philadelphia
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  return (
    <div className="p-5 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Disaster Response Analytics Dashboard</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6 p-4 bg-white rounded-lg shadow-sm">
        <div className="w-full sm:w-auto">
          <label className="block text-sm font-medium text-gray-700 mb-1">Disaster Type</label>
          <select className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
            <option value="all">All Types</option>
            <option value="flood">Flood</option>
            <option value="earthquake">Earthquake</option>
            <option value="wildfire">Wildfire</option>
          </select>
        </div>

        <div className="w-full sm:w-auto">
          <label className="block text-sm font-medium text-gray-700 mb-1">Region</label>
          <select className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
            <option value="all">All Regions</option>
            <option value="coastal">Coastal Area</option>
            <option value="north">Northern Region</option>
            <option value="south">Southern Region</option>
          </select>
        </div>

        <div className="w-full sm:w-auto">
          <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
          <div className="flex gap-2">
            <input
              type="date"
              className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Start Date"
            />
            <span className="self-center text-gray-500">to</span>
            <input
              type="date"
              className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="End Date"
            />
          </div>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
        {[
          { title: 'Total Reports', value: overviewStats.totalReports },
          { title: 'Resolved Reports', value: overviewStats.resolvedReports },
          { title: 'Active Requests', value: overviewStats.activeRequests },
          { title: 'Volunteers', value: overviewStats.volunteerParticipation },
          { title: 'Avg Response Time', value: overviewStats.avgResponseTime },
          { title: 'Most Affected Region', value: overviewStats.mostAffectedRegion }
        ].map((stat, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-sm font-medium text-gray-500">{stat.title}</h3>
            <p className="text-2xl font-semibold text-gray-800 mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Main Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Reports by Disaster Type */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Reports by Disaster Type</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={disasterTypeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                <XAxis dataKey="name" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                  }}
                />
                <Legend />
                <Bar dataKey="reports" fill="#8884d8" name="Number of Reports" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Report Trend Over Time */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Report Trend Over Time</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                <XAxis dataKey="date" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="reports"
                  stroke="#82ca9d"
                  strokeWidth={2}
                  name="Daily Reports"
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Main Charts Row 2 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Report Severity Distribution */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Report Severity Distribution</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={severityData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {severityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top 5 Active Volunteers */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Top 5 Active Volunteers</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={volunteerData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                <XAxis type="number" stroke="#666" />
                <YAxis dataKey="name" type="category" stroke="#666" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                  }}
                />
                <Legend />
                <Bar
                  dataKey="completed"
                  fill="#82ca9d"
                  name="Tasks Completed"
                  radius={[0, 4, 4, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Request Status */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Request Status</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={requestStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {requestStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Additional Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Requests by Category */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Requests by Category</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={requestCategoryData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                <XAxis dataKey="name" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                  }}
                />
                <Legend />
                <Bar
                  dataKey="requests"
                  fill="#8884d8"
                  name="Number of Requests"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Affected Regions Heatmap */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Affected Regions Heatmap</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart
                margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                <XAxis
                  type="number"
                  dataKey="y"
                  name="longitude"
                  unit="°"
                  stroke="#666"
                />
                <YAxis
                  type="number"
                  dataKey="x"
                  name="latitude"
                  unit="°"
                  stroke="#666"
                />
                <ZAxis type="number" dataKey="z" range={[60, 400]} name="reports" />
                <Tooltip
                  cursor={{ strokeDasharray: '3 3' }}
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                  }}
                />
                <Scatter
                  name="Affected Areas"
                  data={geoData}
                  fill="#8884d8"
                  shape="circle"
                />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
