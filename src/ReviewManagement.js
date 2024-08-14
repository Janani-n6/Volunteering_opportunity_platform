import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Rating
} from '@mui/material';
import {
  Search as SearchIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  Dashboard as DashboardIcon,
  Notifications as NotificationsIcon,
  ExitToApp as LogoutIcon
} from '@mui/icons-material'; // Add missing icons here
import Sidebar from './Sidebar'; // Import Sidebar component
import { useNavigate } from 'react-router-dom';

const ReviewManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedReview, setSelectedReview] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [reviewData, setReviewData] = useState([]);
  const [newReview, setNewReview] = useState({ volName: '', eventName: '', rating: 1, comment: '' });

  const navigate = useNavigate();

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleAddReview = () => {
    setReviewData([...reviewData, newReview]);
    setNewReview({ volName: '', eventName: '', rating: 1, comment: '' });
    setDialogOpen(false);
  };

  const handleViewDetails = (review) => {
    setSelectedReview(review);
  };

  return (
    <div>
      <Box display="flex">
        <Sidebar />
        <Box className="main-content" flex={1} padding={3}>
          <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #ddd' }}>
            <Typography variant="h4" component="h1">Review Management</Typography>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <IconButton title="Dashboard" onClick={() => navigate('/admin/dashboard')}>
                <DashboardIcon fontSize="small" />
              </IconButton>
              <IconButton>
                <NotificationsIcon fontSize="small" />
              </IconButton>
              <IconButton onClick={() => navigate('/login')}>
                <LogoutIcon fontSize="small" />
              </IconButton>
            </div>
          </header>

          <Box padding={3}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  placeholder="Search Reviews"
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
                <Button variant="contained" startIcon={<AddIcon />} onClick={() => setDialogOpen(true)}>
                  Add Review
                </Button>
              </Grid>
            </Grid>

            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Volunteer Name</TableCell>
                    <TableCell>Event Name</TableCell>
                    <TableCell>Rating</TableCell>
                    <TableCell>Comment</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {reviewData.filter(review => review.volName.includes(searchQuery) || review.eventName.includes(searchQuery)).map((review, index) => (
                    <TableRow key={index}>
                      <TableCell>{review.volName}</TableCell>
                      <TableCell>{review.eventName}</TableCell>
                      <TableCell><Rating value={review.rating} readOnly /></TableCell>
                      <TableCell>{review.comment}</TableCell>
                      <TableCell>
                        <IconButton onClick={() => handleViewDetails(review)}><ViewIcon /></IconButton>
                        <IconButton><EditIcon /></IconButton>
                        <IconButton><DeleteIcon /></IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {selectedReview && (
              <Card style={{ marginTop: '20px' }}>
                <CardContent>
                  <Typography variant="h6">Review Details</Typography>
                  <Typography>Volunteer Name: {selectedReview.volName}</Typography>
                  <Typography>Event Name: {selectedReview.eventName}</Typography>
                  <Typography>Rating: <Rating value={selectedReview.rating} readOnly /></Typography>
                  <Typography>Comment: {selectedReview.comment}</Typography>
                </CardContent>
              </Card>
            )}

            <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
              <DialogTitle>Add New Review</DialogTitle>
              <DialogContent>
                <TextField
                  autoFocus
                  margin="dense"
                  label="Volunteer Name"
                  type="text"
                  fullWidth
                  value={newReview.volName}
                  onChange={(e) => setNewReview({ ...newReview, volName: e.target.value })}
                />
                <TextField
                  margin="dense"
                  label="Event Name"
                  type="text"
                  fullWidth
                  value={newReview.eventName}
                  onChange={(e) => setNewReview({ ...newReview, eventName: e.target.value })}
                />
                <Box marginTop={2}>
                  <Typography>Rating</Typography>
                  <Rating
                    value={newReview.rating}
                    onChange={(event, newValue) => setNewReview({ ...newReview, rating: newValue })}
                  />
                </Box>
                <TextField
                  margin="dense"
                  label="Comment"
                  type="text"
                  fullWidth
                  multiline
                  rows={4}
                  value={newReview.comment}
                  onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setDialogOpen(false)} color="primary">
                  Cancel
                </Button>
                <Button onClick={handleAddReview} color="primary">
                  Add Review
                </Button>
              </DialogActions>
            </Dialog>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default ReviewManagement;
