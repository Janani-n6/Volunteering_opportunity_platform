import React, { useState } from 'react';
import { Box, Typography, Grid, Card, CardContent, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, MenuItem, Select } from '@mui/material';
import { Search as SearchIcon, Edit as EditIcon, Visibility as ViewIcon, Delete as DeleteIcon, Dashboard as DashboardIcon, Notifications as NotificationsIcon, ExitToApp as LogoutIcon } from '@mui/icons-material';
import Sidebar from './Sidebar'; // Import Sidebar component
import { useNavigate } from 'react-router-dom';

const DonateManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  
  const navigate = useNavigate();

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleStatusChange = (event) => {
    setStatusFilter(event.target.value);
  };

  const handleViewDetails = (donation) => {
    setSelectedDonation(donation);
  };

  const handleLogout = () => {
    // Perform logout logic here if needed (e.g., clearing tokens)
    navigate('/'); // Redirect to the home page
  };
  return (
    <div>
      <Box display="flex">
        <Sidebar/>
        <Box className="main-content" flex={1} padding={3}>
          <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #ddd' }}>
            <Typography variant="h4" component="h1">Donate Management</Typography>
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
                  placeholder="Search Donations"
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
                  <MenuItem value="Processed">Processed</MenuItem>
                  <MenuItem value="Pending">Pending</MenuItem>
                </Select>
              </Grid>
            </Grid>

            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Volunteer Name</TableCell>
                    <TableCell>Donate Amount</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* Mock data */}
                  {[
                    { name: 'John Doe', amount: 100, status: 'Processed' },
                    { name: 'Jane Smith', amount: 150, status: 'Pending' },
                    // Add more donations here
                  ].filter(donation => donation.name.includes(searchQuery) && (statusFilter === 'All' || donation.status === statusFilter)).map(donation => (
                    <TableRow key={donation.name}>
                      <TableCell>{donation.name}</TableCell>
                      <TableCell>{donation.amount}</TableCell>
                      <TableCell>{donation.status}</TableCell>
                      <TableCell>
                        <IconButton onClick={() => handleViewDetails(donation)}><ViewIcon /></IconButton>
                        <IconButton><EditIcon /></IconButton>
                        <IconButton><DeleteIcon /></IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {selectedDonation && (
              <Card style={{ marginTop: '20px' }}>
                <CardContent>
                  <Typography variant="h6">Donation Details</Typography>
                  <Typography>Name: {selectedDonation.name}</Typography>
                  <Typography>Donate Amount: {selectedDonation.amount}</Typography>
                  <Typography>Status: {selectedDonation.status}</Typography>
                </CardContent>
              </Card>
            )}
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default DonateManagement;
