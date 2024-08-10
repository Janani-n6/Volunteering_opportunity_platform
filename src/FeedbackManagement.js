import React, { useState } from 'react';
import {
  Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Button,
  Dialog, DialogActions, DialogContent, DialogTitle, TextField, Grid, Select, MenuItem
} from '@mui/material';
import {
  Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon, ViewList as ViewListIcon,
  Search as SearchIcon, Dashboard as DashboardIcon, Notifications as NotificationsIcon,
  ExitToApp as LogoutIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar'; // Adjust the import path as needed
import './AdminDashboard.css'; // Make sure to use the same CSS file for consistency

const FeedbackManagement = () => {
  const [feedbacks, setFeedbacks] = useState([
    {
      feedback: 'Great event, well organized!',
      volunteerName: 'John Doe',
      rating: 5,
      status: 'Visible'
    },
    // Add more feedbacks here
  ]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleStatusChange = (event) => {
    setStatusFilter(event.target.value);
  };

  const handleViewDetails = (feedback) => {
    setSelectedFeedback(feedback);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedFeedback(null);
  };

  const handleLogout = () => {
    // Perform logout logic here if needed (e.g., clearing tokens)
    navigate('/'); // Redirect to the home page
  };

  return (
    <Box display="flex">
      <Sidebar />
      <Box className="main-content">
        <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #ddd' }}>
          <Typography variant="h4" component="h1">Feedback Management</Typography>
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

        <Box padding={3}> {/* Add padding here */}
          <Grid container spacing={3} style={{ marginBottom: '20px' }}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                placeholder="Search Feedbacks"
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
                <MenuItem value="Visible">Visible</MenuItem>
                <MenuItem value="Hidden">Hidden</MenuItem>
              </Select>
            </Grid>
          </Grid>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Feedback</TableCell>
                  <TableCell>Volunteer Name</TableCell>
                  <TableCell>Rating</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {feedbacks.filter(feedback => feedback.feedback.includes(searchQuery) && (statusFilter === 'All' || feedback.status === statusFilter)).map((feedback, index) => (
                  <TableRow key={index}>
                    <TableCell>{feedback.feedback}</TableCell>
                    <TableCell>{feedback.volunteerName}</TableCell>
                    <TableCell>{feedback.rating}</TableCell>
                    <TableCell>{feedback.status}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleViewDetails(feedback)}><ViewListIcon /></IconButton>
                      <IconButton><EditIcon /></IconButton>
                      <IconButton><DeleteIcon /></IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Dialog for feedback details */}
          <Dialog open={dialogOpen} onClose={handleCloseDialog}>
            <DialogTitle>Feedback Details</DialogTitle>
            <DialogContent>
              {selectedFeedback && (
                <>
                  <Typography variant="h6">Feedback: {selectedFeedback.feedback}</Typography>
                  <Typography>Volunteer Name: {selectedFeedback.volunteerName}</Typography>
                  <Typography>Rating: {selectedFeedback.rating}</Typography>
                  <Typography>Status: {selectedFeedback.status}</Typography>
                </>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog} color="primary">
                Close
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Box>
    </Box>
  );
};

export default FeedbackManagement;
