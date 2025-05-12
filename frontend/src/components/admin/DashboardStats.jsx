import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import {
  Emergency as EmergencyIcon,
  LocalHospital as HospitalIcon,
  People as PeopleIcon,
  Assignment as AssignmentIcon
} from '@mui/icons-material';

const DashboardStats = () => {
  const stats = [
    { title: 'Active Incidents', value: '24', icon: <EmergencyIcon fontSize="large" />, color: 'bg-red-100 text-red-600' },
    { title: 'Resource Requests', value: '56', icon: <AssignmentIcon fontSize="large" />, color: 'bg-blue-100 text-blue-600' },
    { title: 'Responders Online', value: '18', icon: <PeopleIcon fontSize="large" />, color: 'bg-green-100 text-green-600' },
    { title: 'Resolved Today', value: '7', icon: <HospitalIcon fontSize="large" />, color: 'bg-purple-100 text-purple-600' }
  ];

  return (
    <Grid container spacing={3}>
      {stats.map((stat, index) => (
        <Grid item xs={12} sm={6} lg={3} key={index}>
          <Card className="shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="flex items-center justify-between">
              <div>
                <Typography variant="h6" className="text-gray-500">
                  {stat.title}
                </Typography>
                <Typography variant="h4" className="font-bold">
                  {stat.value}
                </Typography>
              </div>
              <div className={`p-3 rounded-full ${stat.color}`}>
                {stat.icon}
              </div>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default DashboardStats;