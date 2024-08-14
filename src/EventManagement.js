import React, { useState, useEffect } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Grid, Snackbar } from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon, ViewList as ViewListIcon, Search as SearchIcon, Dashboard as DashboardIcon, Notifications as NotificationsIcon, ExitToApp as LogoutIcon } from '@mui/icons-material';
import Sidebar from './Sidebar'; // Adjust the import path as needed
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const EventManagement = () => {
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false); // State for edit dialog
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    location: '',
    description: '',
    timings: '',
    exactLocation: '',
    requirements: '',
    category: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch events from the backend
    axios.get('http://localhost:9001/events')
      .then(response => setEvents(response.data))
      .catch(error => console.error('Error fetching events:', error));
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
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
    const formData = new FormData();
    Object.entries(newEvent).forEach(([key, value]) => formData.append(key, value));

    axios.post('http://localhost:9001/events/add', formData)
      .then(response => {
        setEvents([...events, response.data]);
        setAddDialogOpen(false);
        setNewEvent({
          title: '',
          date: '',
          location: '',
          description: '',
          timings: '',
          exactLocation: '',
          requirements: '',
          category: '',
        });
      })
      .catch(error => console.error('Error adding event:', error));
  };

  const handleEditEvent = (event) => {
    setSelectedEvent(event);
    setNewEvent(event);
    setEditDialogOpen(true);
  };

  const handleSaveEditEvent = () => {
    // Make sure the selectedEvent is defined
    if (!selectedEvent) {
      console.error('No event selected for editing.');
      return;
    }
  
    // Prepare the updated event object
    const updatedEvent = { ...selectedEvent, ...newEvent };
  
    axios.put(`http://localhost:9001/events/${selectedEvent.id}`, updatedEvent)
      .then(response => {
        // Update the events list with the edited event
        setEvents(events.map(event => event.id === selectedEvent.id ? response.data : event));
        setEditDialogOpen(false);
        setSelectedEvent(null);
      })
      .catch(error => {
        console.error('Error updating event:', error);
        // Optionally, you can add an error message to the UI
      });
  };
  

  const handleDeleteEvent = (id) => {
    axios.delete(`http://localhost:9001/events/${id}`)
      .then(() => {
        setEvents(events.filter(event => event.id !== id));
      })
      .catch(error => console.error('Error deleting event:', error));
  };

  const handleLogout = () => {
    // Perform logout logic here if needed (e.g., clearing tokens)
    navigate('/'); // Redirect to the home page
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
                {events.filter(event => event.title.includes(searchQuery)).map((event, index) => (
                  <TableRow key={index}>
                    <TableCell>{event.title}</TableCell>
                    <TableCell>{event.date}</TableCell>
                    <TableCell>{event.location}</TableCell>
                    <TableCell>{event.description}</TableCell>
                    <TableCell>{event.timings}</TableCell>
                    <TableCell>{event.volunteers ? event.volunteers.map(v => v.name).join(', ') : 'None'}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleViewDetails(event)}><ViewListIcon /></IconButton>
                      <IconButton onClick={() => handleEditEvent(event)}><EditIcon /></IconButton>
                      <IconButton onClick={() => handleDeleteEvent(event.id)}><DeleteIcon /></IconButton>
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
                  <Typography>Timings: {selectedEvent.timings}</Typography>
                  <Typography>Volunteers: {selectedEvent.volunteers ? selectedEvent.volunteers.map(v => v.name).join(', ') : 'None'}</Typography>
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
                multiline
                rows={4}
                value={newEvent.description}
                onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
              />
              <TextField
                fullWidth
                label="Timings"
                margin="normal"
                variant="outlined"
                value={newEvent.timings}
                onChange={(e) => setNewEvent({ ...newEvent, timings: e.target.value })}
              />
              <TextField
                fullWidth
                label="Exact Location"
                margin="normal"
                variant="outlined"
                value={newEvent.exactLocation}
                onChange={(e) => setNewEvent({ ...newEvent, exactLocation: e.target.value })}
              />
              <TextField
                fullWidth
                label="Requirements"
                margin="normal"
                variant="outlined"
                value={newEvent.requirements}
                onChange={(e) => setNewEvent({ ...newEvent, requirements: e.target.value })}
              />
              <TextField
                fullWidth
                label="Category"
                margin="normal"
                variant="outlined"
                value={newEvent.category}
                onChange={(e) => setNewEvent({ ...newEvent, category: e.target.value })}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setAddDialogOpen(false)} color="secondary">
                Cancel
              </Button>
              <Button onClick={handleAddEvent} color="primary">
                Save
              </Button>
            </DialogActions>
          </Dialog>

          {/* Dialog for editing an event */}
          <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
            <DialogTitle>Edit Event</DialogTitle>
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
                multiline
                rows={4}
                value={newEvent.description}
                onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
              />
              <TextField
                fullWidth
                label="Timings"
                margin="normal"
                variant="outlined"
                value={newEvent.timings}
                onChange={(e) => setNewEvent({ ...newEvent, timings: e.target.value })}
              />
              <TextField
                fullWidth
                label="Exact Location"
                margin="normal"
                variant="outlined"
                value={newEvent.exactLocation}
                onChange={(e) => setNewEvent({ ...newEvent, exactLocation: e.target.value })}
              />
              <TextField
                fullWidth
                label="Requirements"
                margin="normal"
                variant="outlined"
                value={newEvent.requirements}
                onChange={(e) => setNewEvent({ ...newEvent, requirements: e.target.value })}
              />
              <TextField
                fullWidth
                label="Category"
                margin="normal"
                variant="outlined"
                value={newEvent.category}
                onChange={(e) => setNewEvent({ ...newEvent, category: e.target.value })}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setEditDialogOpen(false)} color="secondary">
                Cancel
              </Button>
              <Button onClick={handleSaveEditEvent} color="primary">
                Save
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Box>
    </Box>
  );
};

export default EventManagement;
