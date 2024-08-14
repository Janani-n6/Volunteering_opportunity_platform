import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { Search as SearchIcon, Edit as EditIcon, Visibility as ViewIcon, Delete as DeleteIcon, Dashboard as DashboardIcon, Notifications as NotificationsIcon, ExitToApp as LogoutIcon } from '@mui/icons-material';
import Sidebar from './Sidebar'; // Import Sidebar component
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const DonateManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [donations, setDonations] = useState([]);
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  
  const navigate = useNavigate();

  useEffect(() => {
    fetchDonations();
  }, []);
  
  const fetchDonations = async () => {
    try {
      const response = await axios.get('http://localhost:9001/donations');
      console.log('API Response:', response.data); // Log API response
      setDonations(response.data);
    } catch (error) {
      console.error('Error fetching donations:', error);
    }
  };
  

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleViewDetails = (donation) => {
    setSelectedDonation(donation);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedDonation(null);
  };

  const handleEditDonation = async (donation) => {
    // Implement your edit logic here. For example:
    const updatedDonation = { ...donation, amount: donation.amount + 100 }; // Modify the amount for demonstration
    try {
      await axios.put(`http://localhost:9001/donations/${donation.id}`, updatedDonation);
      fetchDonations(); // Refresh the list
    } catch (error) {
      console.error('Error editing donation:', error);
    }
  };

  const handleDeleteDonation = async (donationId) => {
    try {
      await axios.delete(`http://localhost:9001/donations/${donationId}`);
      fetchDonations(); // Refresh the list after deletion
    } catch (error) {
      console.error('Error deleting donation:', error);
    }
  };

  const handleLogout = () => {
    // Perform logout logic here if needed (e.g., clearing tokens)
    navigate('/'); // Redirect to the home page
  };

  return (
    <div>
      <Box display="flex">
        <Sidebar />
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
              <Grid item xs={12}>
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
            </Grid>

            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Volunteer Name</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Details</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {donations
                    .filter(donation => donation.donarname?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false) // Handle null values
                    .map(donation => (
                      <TableRow key={donation.id}>
                        <TableCell>{donation.donarname || 'N/A'}</TableCell>
                        <TableCell>{donation.donationType || 'N/A'}</TableCell>
                        <TableCell>
                          {donation.donationType === 'money'
                            ? `Amount: ₹${donation.amount || 'N/A'}`
                            : `Product: ${donation.productType || 'N/A'}`}
                        </TableCell>
                        <TableCell>
                          <IconButton onClick={() => handleViewDetails(donation)}><ViewIcon /></IconButton>
                          <IconButton onClick={() => handleEditDonation(donation)}><EditIcon /></IconButton>
                          <IconButton onClick={() => handleDeleteDonation(donation.id)}><DeleteIcon /></IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Dialog open={dialogOpen} onClose={handleCloseDialog}>
              <DialogTitle>Donation Details</DialogTitle>
              <DialogContent>
  {selectedDonation && (
    <>
      <Typography>Name: {selectedDonation.donarname || 'N/A'}</Typography>
      {selectedDonation.donationType === 'money' ? (
        <>
          <Typography>Donate Amount: ₹{selectedDonation.amount || 'N/A'}</Typography>
          <Typography>Payment Method: {selectedDonation.paymentMethod || 'N/A'}</Typography>
        </>
      ) : selectedDonation.donationType === 'product' ? (
        <>
          <Typography>Product Type: {selectedDonation.productType || 'N/A'}</Typography>
          <Typography>Address: {selectedDonation.address || 'N/A'}</Typography>
        </>
      ) : (
        <Typography>Details not available</Typography>
      )}
    </>
  )}
</DialogContent>

              <DialogActions>
                <Button onClick={handleCloseDialog} color="primary">Close</Button>
              </DialogActions>
            </Dialog>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default DonateManagement;
