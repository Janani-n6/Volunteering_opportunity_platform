import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Grid, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton
} from '@mui/material';
import { Search as SearchIcon, Dashboard as DashboardIcon, Notifications as NotificationsIcon, ExitToApp as LogoutIcon } from '@mui/icons-material';
import Sidebar from './Sidebar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const VolunteerManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVolunteer, setSelectedVolunteer] = useState(null);
  const [hoursToAdd, setHoursToAdd] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [volunteers, setVolunteers] = useState([]);

  const navigate = useNavigate();

  // Fetch all volunteers on initial load
  useEffect(() => {
    fetchVolunteers();
  }, []);

  const fetchVolunteers = (query = '') => {
    const url = query ? `http://localhost:9001/volunteers/search?name=${query}` : 'http://localhost:9001/volunteers/all';
    axios.get(url)
      .then(response => {
        setVolunteers(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the volunteers!", error);
      });
  };
  

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    fetchVolunteers(query);  // Fetch filtered volunteers based on search query
  };

  const handleViewDetails = (volunteer) => {
    setSelectedVolunteer(volunteer);
    setDialogOpen(true);
  };

  const handleLogHours = () => {
    if (selectedVolunteer) {
      const updatedVolunteer = {
        ...selectedVolunteer,
        hours: selectedVolunteer.hours + parseInt(hoursToAdd, 10)
      };

      axios.put('http://localhost:9001/volunteers/update', updatedVolunteer)
        .then(response => {
          setVolunteers(prevVolunteers => prevVolunteers.map(vol => vol.id === selectedVolunteer.id ? updatedVolunteer : vol));
          setHoursToAdd('');
          setDialogOpen(false);
        })
        .catch(error => {
          console.error("There was an error logging hours for the volunteer!", error);
        });
    }
  };

  const handleLogout = () => {
    navigate('/');
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
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {volunteers.map(volunteer => (
                    <TableRow key={volunteer.id}>
                      <TableCell>{volunteer.name}</TableCell>
                      <TableCell>{volunteer.email}</TableCell>
                      <TableCell>{volunteer.phone}</TableCell>
                      <TableCell>{volunteer.availability}</TableCell>
                      <TableCell>{volunteer.interests}</TableCell>
                      <TableCell>{volunteer.skills}</TableCell>
                      <TableCell>{volunteer.hours}</TableCell>
                      <TableCell>
                        <Button variant="contained" color="primary" onClick={() => handleViewDetails(volunteer)}>Log Hours</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
              <DialogTitle>Volunteer Details</DialogTitle>
              <DialogContent>
                {selectedVolunteer && (
                  <Box>
                    <Typography>Name: {selectedVolunteer.name}</Typography>
                    <Typography>Email: {selectedVolunteer.email}</Typography>
                    <Typography>Phone: {selectedVolunteer.phone}</Typography>
                    <Typography>Availability: {selectedVolunteer.availability}</Typography>
                    <Typography>Interests: {selectedVolunteer.interests}</Typography>
                    <Typography>Skills: {selectedVolunteer.skills}</Typography>
                    <Typography>Total Hours: {selectedVolunteer.hours}</Typography>
                    <TextField
                      autoFocus
                      margin="dense"
                      label="Hours to Add"
                      type="number"
                      fullWidth
                      variant="outlined"
                      value={hoursToAdd}
                      onChange={(e) => setHoursToAdd(e.target.value)}
                      style={{ marginTop: '20px' }}
                    />
                  </Box>
                )}
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
      </Box>
    </div>
  );
};

export default VolunteerManagement;
