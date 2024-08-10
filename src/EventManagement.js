import React, { useState } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Grid, Select, MenuItem } from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon, ViewList as ViewListIcon, Search as SearchIcon, Dashboard as DashboardIcon, Notifications as NotificationsIcon, ExitToApp as LogoutIcon } from '@mui/icons-material';
import Sidebar from './Sidebar'; // Adjust the import path as needed
import { useNavigate } from 'react-router-dom';

const EventManagement = () => {
  const [events, setEvents] = useState([
    {
      title: 'Community Cleanup',
      date: '2024-08-15',
      location: 'Central Park',
      description: 'A community event to clean up the local park. Requirements: gloves, trash bags.',
      timings: { start: '09:00 AM', end: '01:00 PM' },
      volunteers: ['John Doe', 'Jane Smith'],
      status: 'Upcoming',
      image: null
    },
    // Add more events here
  ]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    location: '',
    description: '',
    timings: { start: '', end: '' },
    volunteers: [],
    status: 'Upcoming',
    image: null
  });
  const navigate = useNavigate();

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleStatusChange = (event) => {
    setStatusFilter(event.target.value);
  };

  const handleViewDetails = (event) => {
    setSelectedEvent(event);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedEvent(null);
  };

  const handleAddEvent = () => {
    setEvents([...events, newEvent]);
    setAddDialogOpen(false);
    setNewEvent({
      title: '',
      date: '',
      location: '',
      description: '',
      timings: { start: '', end: '' },
      volunteers: [],
      status: 'Upcoming',
      image: null
    });
  };

  const handleLogout = () => {
    // Perform logout logic here if needed (e.g., clearing tokens)
    navigate('/'); // Redirect to the home page
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setNewEvent({ ...newEvent, image: file });
  };

  return (
    <Box display="flex">
      <Sidebar />
      <Box className="main-content" flex={1} padding={3}>
        <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #ddd' }}>
          <Typography variant="h4" component="h1">Event Management</Typography>
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
          <Button 
            variant="contained" 
            color="primary" 
            startIcon={<AddIcon />} 
            style={{ marginBottom: '20px' }}
            onClick={() => setAddDialogOpen(true)}
          >
            Add Event
          </Button>

          <Grid container spacing={3} style={{ marginBottom: '20px' }}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                placeholder="Search Events"
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
                <MenuItem value="Upcoming">Upcoming</MenuItem>
                <MenuItem value="Past">Past</MenuItem>
              </Select>
            </Grid>
          </Grid>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Timings</TableCell>
                  <TableCell>Volunteers</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {events.filter(event => event.title.includes(searchQuery) && (statusFilter === 'All' || event.status === statusFilter)).map((event, index) => (
                  <TableRow key={index}>
                    <TableCell>{event.title}</TableCell>
                    <TableCell>{event.date}</TableCell>
                    <TableCell>{event.location}</TableCell>
                    <TableCell>{event.description}</TableCell>
                    <TableCell>{event.timings.start} - {event.timings.end}</TableCell>
                    <TableCell>{event.volunteers.join(', ')}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleViewDetails(event)}><ViewListIcon /></IconButton>
                      <IconButton><EditIcon /></IconButton>
                      <IconButton><DeleteIcon /></IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Dialog for event details */}
          <Dialog open={dialogOpen} onClose={handleCloseDialog}>
            <DialogTitle>Event Details</DialogTitle>
            <DialogContent>
              {selectedEvent && (
                <>
                  <Typography variant="h6">Title: {selectedEvent.title}</Typography>
                  <Typography>Date: {selectedEvent.date}</Typography>
                  <Typography>Location: {selectedEvent.location}</Typography>
                  <Typography>Description: {selectedEvent.description}</Typography>
                  <Typography>Timings: {selectedEvent.timings.start} - {selectedEvent.timings.end}</Typography>
                  <Typography>Volunteers: {selectedEvent.volunteers.join(', ')}</Typography>
                  {selectedEvent.image && (
                    <img
                      src={URL.createObjectURL(selectedEvent.image)}
                      alt={selectedEvent.title}
                      style={{ width: '100%', height: 'auto', marginTop: '20px' }}
                    />
                  )}
                </>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog} color="primary">
                Close
              </Button>
            </DialogActions>
          </Dialog>

          {/* Dialog for adding a new event */}
          <Dialog open={addDialogOpen} onClose={() => setAddDialogOpen(false)}>
            <DialogTitle>Add New Event</DialogTitle>
            <DialogContent>
              <TextField
                fullWidth
                label="Title"
                margin="normal"
                variant="outlined"
                value={newEvent.title}
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
              />
              <TextField
                fullWidth
                label="Date"
                margin="normal"
                variant="outlined"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={newEvent.date}
                onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
              />
              <TextField
                fullWidth
                label="Location"
                margin="normal"
                variant="outlined"
                value={newEvent.location}
                onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
              />
              <TextField
                fullWidth
                label="Description"
                margin="normal"
                variant="outlined"
                value={newEvent.description}
                onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
              />
              <TextField
                fullWidth
                label="Start Time"
                margin="normal"
                variant="outlined"
                type="time"
                InputLabelProps={{ shrink: true }}
                value={newEvent.timings.start}
                onChange={(e) => setNewEvent({ ...newEvent, timings: { ...newEvent.timings, start: e.target.value } })}
              />
              <TextField
                fullWidth
                label="End Time"
                margin="normal"
                variant="outlined"
                type="time"
                InputLabelProps={{ shrink: true }}
                value={newEvent.timings.end}
                onChange={(e) => setNewEvent({ ...newEvent, timings: { ...newEvent.timings, end: e.target.value } })}
              />
              <input
                accept="image/*"
                type="file"
                onChange={handleImageChange}
                style={{ marginTop: '20px' }}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setAddDialogOpen(false)} color="primary">
                Cancel
              </Button>
              <Button onClick={handleAddEvent} color="primary">
                Add
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Box>
    </Box>
  );
};

export default EventManagement;
