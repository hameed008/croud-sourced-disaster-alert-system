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
  InputLabel,
  Avatar,
  IconButton
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Lock as LockIcon,
  LockOpen as UnlockIcon
} from '@mui/icons-material';

const UserManagement = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'Admin User',
      email: 'admin@example.com',
      role: 'Admin',
      status: 'Active',
      lastLogin: '2023-06-15 09:30',
      avatar: '/avatars/admin.png'
    },
    {
      id: 2,
      name: 'Responder Lead',
      email: 'responder@example.com',
      role: 'Responder',
      status: 'Active',
      lastLogin: '2023-06-15 08:45',
      avatar: '/avatars/responder.png'
    },
    {
      id: 3,
      name: 'Volunteer',
      email: 'volunteer@example.com',
      role: 'Volunteer',
      status: 'Inactive',
      lastLogin: '2023-06-10 14:20',
      avatar: '/avatars/volunteer.png'
    }
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStatusToggle = (id) => {
    setUsers(users.map(user =>
      user.id === id ? {
        ...user,
        status: user.status === 'Active' ? 'Inactive' : 'Active'
      } : user
    ));
  };

  const handleRoleChange = (id, newRole) => {
    setUsers(users.map(user =>
      user.id === id ? { ...user, role: newRole } : user
    ));
  };

  const handleEdit = (user) => {
    setCurrentUser(user);
    setOpenDialog(true);
  };

  const handleDelete = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentUser.id) {
      // Update existing
      setUsers(users.map(user =>
        user.id === currentUser.id ? currentUser : user
      ));
    } else {
      // Add new
      setUsers([...users, {
        ...currentUser,
        id: Math.max(...users.map(u => u.id)) + 1,
        status: 'Active',
        lastLogin: new Date().toISOString()
      }]);
    }
    setOpenDialog(false);
  };

  return (
    <Paper className="p-4 mt-4">
      <div className="flex justify-between items-center mb-4">
        <Typography variant="h6" className="font-bold">
          User Management
        </Typography>
        <div className="flex space-x-2">
          <TextField
            label="Search Users"
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => {
              setCurrentUser({
                name: '',
                email: '',
                role: 'Volunteer',
                avatar: '/avatars/default.png'
              });
              setOpenDialog(true);
            }}
          >
            Add User
          </Button>
        </div>
      </div>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Last Login</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Avatar src={user.avatar} />
                    <span>{user.name}</span>
                  </div>
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                    size="small"
                  >
                    <MenuItem value="Admin">Admin</MenuItem>
                    <MenuItem value="Responder">Responder</MenuItem>
                    <MenuItem value="Volunteer">Volunteer</MenuItem>
                  </Select>
                </TableCell>
                <TableCell>
                  <Chip
                    label={user.status}
                    color={user.status === 'Active' ? 'success' : 'default'}
                    size="small"
                  />
                </TableCell>
                <TableCell>{user.lastLogin}</TableCell>
                <TableCell>
                  <div className="flex space-x-1">
                    <IconButton
                      size="small"
                      onClick={() => handleStatusToggle(user.id)}
                    >
                      {user.status === 'Active' ?
                        <LockIcon color="warning" /> :
                        <UnlockIcon color="success" />}
                    </IconButton>
                    <Button
                      size="small"
                      startIcon={<EditIcon />}
                      onClick={() => handleEdit(user)}
                    >
                      Edit
                    </Button>
                    {user.role !== 'Admin' && (
                      <Button
                        size="small"
                        startIcon={<DeleteIcon />}
                        color="error"
                        onClick={() => handleDelete(user.id)}
                      >
                        Delete
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add/Edit Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          {currentUser?.id ? 'Edit User' : 'Add New User'}
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit} className="space-y-4 mt-2">
            <TextField
              label="Full Name"
              fullWidth
              value={currentUser?.name || ''}
              onChange={(e) => setCurrentUser({ ...currentUser, name: e.target.value })}
              required
            />
            <TextField
              label="Email"
              type="email"
              fullWidth
              value={currentUser?.email || ''}
              onChange={(e) => setCurrentUser({ ...currentUser, email: e.target.value })}
              required
            />
            {!currentUser?.id && (
              <TextField
                label="Password"
                type="password"
                fullWidth
                value={currentUser?.password || ''}
                onChange={(e) => setCurrentUser({ ...currentUser, password: e.target.value })}
                required
              />
            )}
            <FormControl fullWidth>
              <InputLabel>Role</InputLabel>
              <Select
                value={currentUser?.role || 'Volunteer'}
                onChange={(e) => setCurrentUser({ ...currentUser, role: e.target.value })}
                label="Role"
              >
                <MenuItem value="Admin">Admin</MenuItem>
                <MenuItem value="Responder">Responder</MenuItem>
                <MenuItem value="Volunteer">Volunteer</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Avatar URL"
              fullWidth
              value={currentUser?.avatar || ''}
              onChange={(e) => setCurrentUser({ ...currentUser, avatar: e.target.value })}
              placeholder="/avatars/default.png"
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {currentUser?.id ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default UserManagement;