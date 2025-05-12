import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Button,
  Typography
} from '@mui/material';
import { Visibility, Edit, CheckCircle } from '@mui/icons-material';

const RecentReports = ({ fullView = false }) => {
  const reports = [
    { id: 1, type: 'Earthquake', location: 'New Delhi', severity: 'High', status: 'Active', date: '2023-06-15' },
    { id: 2, type: 'Flood', location: 'Mumbai', severity: 'Medium', status: 'Verified', date: '2023-06-14' },
    { id: 3, type: 'Fire', location: 'Bangalore', severity: 'Critical', status: 'Active', date: '2023-06-14' },
    { id: 4, type: 'Cyclone', location: 'Chennai', severity: 'High', status: 'Resolved', date: '2023-06-13' },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'warning';
      case 'Verified': return 'primary';
      case 'Resolved': return 'success';
      default: return 'default';
    }
  };

  return (
    <Paper className="p-4 mt-4">
      <Typography variant="h6" className="mb-4 font-bold">
        {fullView ? 'All Incident Reports' : 'Recent Incidents'}
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Severity</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reports.map((report) => (
              <TableRow key={report.id}>
                <TableCell>{report.id}</TableCell>
                <TableCell>{report.type}</TableCell>
                <TableCell>{report.location}</TableCell>
                <TableCell>{report.severity}</TableCell>
                <TableCell>
                  <Chip
                    label={report.status}
                    color={getStatusColor(report.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell>{report.date}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button size="small" startIcon={<Visibility />}>View</Button>
                    <Button size="small" startIcon={<Edit />}>Edit</Button>
                    {report.status !== 'Resolved' && (
                      <Button size="small" startIcon={<CheckCircle />} color="success">
                        Resolve
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {fullView && (
        <div className="mt-4 flex justify-end">
          <Button variant="contained">Add New Report</Button>
        </div>
      )}
    </Paper>
  );
};

export default RecentReports;