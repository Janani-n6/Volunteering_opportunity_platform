import React, { useState } from 'react';
import {
  Box, Typography, Grid, Card, CardContent, IconButton, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, TextField, Button, MenuItem, Select, Dialog, DialogActions, DialogContent, DialogTitle
} from '@mui/material';
import {
  Search as SearchIcon, Edit as EditIcon, Visibility as ViewIcon, Delete as DeleteIcon,
  Dashboard as DashboardIcon, Notifications as NotificationsIcon, ExitToApp as LogoutIcon
} from '@mui/icons-material';
import Sidebar from './Sidebar'; // Import Sidebar component
import { useNavigate } from 'react-router-dom';

const VolunteerManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedVolunteer, setSelectedVolunteer] = useState(null);
  const [hoursToAdd, setHoursToAdd] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [volunteers, setVolunteers] = useState([
    { name: 'John Doe', email: 'john@example.com', phone: '123-456-7890', availability: 'Weekdays', interests: 'Teaching', skills: 'Communication', hours: 50, status: 'Active' },
    // Add more volunteers here
  ]);

  const navigate = useNavigate();

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleStatusChange = (event) => {
    setStatusFilter(event.target.value);
  };

  const handleViewDetails = (volunteer) => {
    setSelectedVolunteer(volunteer);
  };

  const handleLogHours = () => {
    if (selectedVolunteer) {
      setVolunteers(prevVolunteers => prevVolunteers.map(vol => {
        if (vol.email === selectedVolunteer.email) {
          return { ...vol, hours: vol.hours + parseInt(hoursToAdd, 10) };
        }
        return vol;
      }));
      setHoursToAdd('');
      setDialogOpen(false);
    }
  };

  const handleLogout = () => {
    navigate('/'); // Redirect to the home page
  };

  return (
    <div>
      <Box display="flex">
        <Sidebar />
        <Box className="main-content" flex={1} padding={3}>
          <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #ddd' }}>
            <Typography variant="h4" component="h1">Volunteer Management</Typography>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <IconButton title="Dashboard" onClick={() => navigate('/admin/dashboard')}>
                <DashboardIcon fontSize="small" />
              </IconButton>
              <IconButton>
                <NotificationsIcon fontSize="small" />
              </IconButton>
              <IconButton onClick={handleLogout}>
                <LogoutIcon fontSize="small" />
              </IconButton>
            </div>
          </header>

          <Box padding={3}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  placeholder="Search Volunteers"
                  variant="outlined"
                  size="small"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  InputProps={{
                    endAdornment: <SearchIcon />,
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Select
                  fullWidth
                  value={statusFilter}
                  onChange={handleStatusChange}
                  variant="outlined"
                  size="small"
                >
                  <MenuItem value="All">All</MenuItem>
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="Inactive">Inactive</MenuItem>
                </Select>
              </Grid>
            </Grid>

            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Phone Number</TableCell>
                    <TableCell>Availability</TableCell>
                    <TableCell>Interests</TableCell>
                    <TableCell>Skills</TableCell>
                    <TableCell>Total Hours</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {volunteers
                    .filter(volunteer =>
                      volunteer.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
                      (statusFilter === 'All' || volunteer.status === statusFilter)
                    )
                    .map(volunteer => (
                      <TableRow key={volunteer.email}>
                        <TableCell>{volunteer.name}</TableCell>
                        <TableCell>{volunteer.email}</TableCell>
                        <TableCell>{volunteer.phone}</TableCell>
                        <TableCell>{volunteer.availability}</TableCell>
                        <TableCell>{volunteer.interests}</TableCell>
                        <TableCell>{volunteer.skills}</TableCell>
                        <TableCell>{volunteer.hours}</TableCell>
                        <TableCell>{volunteer.status}</TableCell>
                        <TableCell>
                          <IconButton onClick={() => handleViewDetails(volunteer)}><ViewIcon /></IconButton>
                          <IconButton><EditIcon /></IconButton>
                          <IconButton><DeleteIcon /></IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>

            {selectedVolunteer && (
              <Card style={{ marginTop: '20px' }}>
                <CardContent>
                  <Typography variant="h6">Volunteer Details</Typography>
                  <Typography>Name: {selectedVolunteer.name}</Typography>
                  <Typography>Email: {selectedVolunteer.email}</Typography>
                  <Typography>Phone: {selectedVolunteer.phone}</Typography>
                  <Typography>Availability: {selectedVolunteer.availability}</Typography>
                  <Typography>Interests: {selectedVolunteer.interests}</Typography>
                  <Typography>Skills: {selectedVolunteer.skills}</Typography>
                  <Typography>Total Hours: {selectedVolunteer.hours}</Typography>
                  <Button variant="contained" color="primary" onClick={() => setDialogOpen(true)}>Log Hours</Button>
                </CardContent>
              </Card>
            )}
          </Box>

          <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
            <DialogTitle>Log Volunteer Hours</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                label="Hours to Add"
                type="number"
                fullWidth
                variant="outlined"
                value={hoursToAdd}
                onChange={(e) => setHoursToAdd(e.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setDialogOpen(false)} color="primary">
                Cancel
              </Button>
              <Button onClick={handleLogHours} color="primary">
                Log Hours
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Box>
    </div>
  );
};

export default VolunteerManagement;
