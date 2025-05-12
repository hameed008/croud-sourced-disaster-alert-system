import React, { useState } from 'react';
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
  Typography,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  FormControl,
  InputLabel
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  CheckCircle as ApproveIcon,
  LocalShipping as FulfillIcon
} from '@mui/icons-material';

const ResourceRequests = ({ fullView = false }) => {
  const [requests, setRequests] = useState([
    {
      id: 1,
      type: 'Medical Supplies',
      quantity: 50,
      requester: 'Delhi Hospital',
      location: 'New Delhi',
      status: 'Pending',
      priority: 'High',
      date: '2023-06-15'
    },
    {
      id: 2,
      type: 'Food',
      quantity: 200,
      requester: 'Mumbai Relief Camp',
      location: 'Mumbai',
      status: 'Approved',
      priority: 'Medium',
      date: '2023-06-14'
    },
    {
      id: 3,
      type: 'Water',
      quantity: 500,
      requester: 'Chennai NGO',
      location: 'Chennai',
      status: 'Fulfilled',
      priority: 'Critical',
      date: '2023-06-13'
    }
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [currentRequest, setCurrentRequest] = useState(null);
  const [filter, setFilter] = useState('All');

  const handleStatusChange = (id, newStatus) => {
    setRequests(requests.map(req =>
      req.id === id ? { ...req, status: newStatus } : req
    ));
  };

  const handleEdit = (request) => {
    setCurrentRequest(request);
    setOpenDialog(true);
  };

  const handleDelete = (id) => {
    setRequests(requests.filter(req => req.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentRequest.id) {
      // Update existing
      setRequests(requests.map(req =>
        req.id === currentRequest.id ? currentRequest : req
      ));
    } else {
      // Add new
      setRequests([...requests, {
        ...currentRequest,
        id: Math.max(...requests.map(r => r.id)) + 1
      }]);
    }
    setOpenDialog(false);
  };

  const filteredRequests = filter === 'All'
    ? requests
    : requests.filter(req => req.status === filter);

  return (
    <Paper className="p-4 mt-4">
      <div className="flex justify-between items-center mb-4">
        <Typography variant="h6" className="font-bold">
          {fullView ? 'Resource Requests Management' : 'Recent Resource Requests'}
        </Typography>
        <div className="flex space-x-2">
          <FormControl size="small" className="min-w-[120px]">
            <InputLabel>Filter</InputLabel>
            <Select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              label="Filter"
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="Approved">Approved</MenuItem>
              <MenuItem value="Fulfilled">Fulfilled</MenuItem>
            </Select>
          </FormControl>
          {fullView && (
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => {
                setCurrentRequest({
                  type: '',
                  quantity: 0,
                  requester: '',
                  location: '',
                  status: 'Pending',
                  priority: 'Medium'
                });
                setOpenDialog(true);
              }}
            >
              Add Request
            </Button>
          )}
        </div>
      </div>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Requester</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Priority</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Date</TableCell>
              {fullView && <TableCell>Actions</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRequests.map((request) => (
              <TableRow key={request.id}>
                <TableCell>{request.id}</TableCell>
                <TableCell>{request.type}</TableCell>
                <TableCell>{request.quantity}</TableCell>
                <TableCell>{request.requester}</TableCell>
                <TableCell>{request.location}</TableCell>
                <TableCell>
                  <Chip
                    label={request.priority}
                    color={
                      request.priority === 'Critical' ? 'error' :
                        request.priority === 'High' ? 'warning' : 'info'
                    }
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={request.status}
                    color={
                      request.status === 'Pending' ? 'default' :
                        request.status === 'Approved' ? 'primary' : 'success'
                    }
                    size="small"
                  />
                </TableCell>
                <TableCell>{request.date}</TableCell>
                {fullView && (
                  <TableCell>
                    <div className="flex space-x-1">
                      <Button
                        size="small"
                        startIcon={<EditIcon />}
                        onClick={() => handleEdit(request)}
                      >
                        Edit
                      </Button>
                      {request.status !== 'Fulfilled' && (
                        <Button
                          size="small"
                          startIcon={<ApproveIcon />}
                          color="success"
                          onClick={() => handleStatusChange(request.id, 'Approved')}
                        >
                          Approve
                        </Button>
                      )}
                      {request.status === 'Approved' && (
                        <Button
                          size="small"
                          startIcon={<FulfillIcon />}
                          color="secondary"
                          onClick={() => handleStatusChange(request.id, 'Fulfilled')}
                        >
                          Fulfill
                        </Button>
                      )}
                      <Button
                        size="small"
                        startIcon={<DeleteIcon />}
                        color="error"
                        onClick={() => handleDelete(request.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add/Edit Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>
          {currentRequest?.id ? 'Edit Resource Request' : 'Add New Resource Request'}
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit} className="space-y-4 mt-2">
            <TextField
              label="Resource Type"
              fullWidth
              value={currentRequest?.type || ''}
              onChange={(e) => setCurrentRequest({ ...currentRequest, type: e.target.value })}
              required
            />
            <TextField
              label="Quantity"
              type="number"
              fullWidth
              value={currentRequest?.quantity || 0}
              onChange={(e) => setCurrentRequest({ ...currentRequest, quantity: e.target.value })}
              required
            />
            <TextField
              label="Requester"
              fullWidth
              value={currentRequest?.requester || ''}
              onChange={(e) => setCurrentRequest({ ...currentRequest, requester: e.target.value })}
              required
            />
            <TextField
              label="Location"
              fullWidth
              value={currentRequest?.location || ''}
              onChange={(e) => setCurrentRequest({ ...currentRequest, location: e.target.value })}
              required
            />
            <FormControl fullWidth>
              <InputLabel>Priority</InputLabel>
              <Select
                value={currentRequest?.priority || 'Medium'}
                onChange={(e) => setCurrentRequest({ ...currentRequest, priority: e.target.value })}
                label="Priority"
              >
                <MenuItem value="Critical">Critical</MenuItem>
                <MenuItem value="High">High</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="Low">Low</MenuItem>
              </Select>
            </FormControl>
            {currentRequest?.id && (
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={currentRequest?.status || 'Pending'}
                  onChange={(e) => setCurrentRequest({ ...currentRequest, status: e.target.value })}
                  label="Status"
                >
                  <MenuItem value="Pending">Pending</MenuItem>
                  <MenuItem value="Approved">Approved</MenuItem>
                  <MenuItem value="Fulfilled">Fulfilled</MenuItem>
                </Select>
              </FormControl>
            )}
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {currentRequest?.id ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default ResourceRequests;