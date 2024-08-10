import React from 'react';
import { Box, Typography, Grid, Card, CardContent, CardActions, IconButton, Divider, List, ListItem, ListItemText } from '@mui/material';
import { Dashboard as DashboardIcon, VolunteerActivism as VolunteerActivismIcon, Event as EventIcon, CurrencyRupee as CurrencyRupeeIcon, CalendarToday as CalendarTodayIcon, Notifications as NotificationsIcon, Search as SearchIcon, ExitToApp as LogoutIcon } from '@mui/icons-material';
import { Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import './AdminDashboard.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Perform logout logic here if needed (e.g., clearing tokens)
    navigate('/');
  };

  const statistics = {
    totalVolunteers: 120,
    upcomingEvents: 5,
    recentDonations: '₹2,300',
    newFeedbacks: 10
  };

  const lineChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Volunteer Engagement',
        data: [30, 40, 35, 50, 55, 60, 70],
        borderColor: '#ff7043',
        backgroundColor: 'rgba(255, 112, 67, 0.2)',
      },
    ],
  };

  const pieChartData = {
    labels: ['Events', 'Feedbacks', 'Donations'],
    datasets: [
      {
        data: [15, 20, 45],
        backgroundColor: ['#ff7043', '#64b5f6', '#4caf50'],
      },
    ],
  };

  return (
    <div className="admin-dashboard">
      <Sidebar />
      <div className="main-content">
        <header className="dashboard-header">
          <Typography variant="h4" component="h1">
            Admin Dashboard
          </Typography>
          <div className="header-actions">
            <IconButton>
              <DashboardIcon fontSize="small" />
            </IconButton>
            <IconButton>
              <NotificationsIcon fontSize="small" />
            </IconButton>
            <IconButton>
              <SearchIcon fontSize="small" />
            </IconButton>
            <IconButton onClick={handleLogout}>
              <LogoutIcon fontSize="small" />
            </IconButton>
          </div>
        </header>

        <Box padding={3} bgcolor="white" borderRadius={2}>
          <Grid container spacing={3} className="card-container">
            <Grid item xs={12} sm={6} md={3}>
              <Card className="stat-card">
                <CardContent>
                  <Typography variant="h6">
                    Total Volunteers
                  </Typography>
                  <Typography variant="h4">
                    {statistics.totalVolunteers}
                  </Typography>
                </CardContent>
                <CardActions>
                  <VolunteerActivismIcon fontSize="small" />
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card className="stat-card">
                <CardContent>
                  <Typography variant="h6">
                    Upcoming Events
                  </Typography>
                  <Typography variant="h4">
                    {statistics.upcomingEvents}
                  </Typography>
                </CardContent>
                <CardActions>
                  <EventIcon fontSize="small" />
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card className="stat-card">
                <CardContent>
                  <Typography variant="h6">
                    Recent Donations
                  </Typography>
                  <Typography variant="h4">
                    {statistics.recentDonations}
                  </Typography>
                </CardContent>
                <CardActions>
                  <CurrencyRupeeIcon fontSize="small" />
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card className="stat-card">
                <CardContent>
                  <Typography variant="h6">
                    New Feedbacks
                  </Typography>
                  <Typography variant="h4">
                    {statistics.newFeedbacks}
                  </Typography>
                </CardContent>
                <CardActions>
                  <CalendarTodayIcon fontSize="small" />
                </CardActions>
              </Card>
            </Grid>
          </Grid>

          <Divider style={{ margin: '20px 0' }} />

          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Typography variant="h6" gutterBottom>
                Volunteer Engagement Over Time
              </Typography>
              <Card className="chart-card">
                <CardContent>
                  <Line data={lineChartData} />
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom>
                Distribution of Feedbacks
              </Typography>
              <Card className="chart-card">
                <CardContent>
                  <Pie data={pieChartData} />
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Divider style={{ margin: '20px 0' }} />

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Recent Activity
              </Typography>
              <Card>
                <CardContent>
                  <List>
                    <ListItem>
                      <ListItemText primary="Increased volunteer sign-ups by 20% this month." />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Added 10 new events to the calendar." />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Received a ₹5,000 donation for community projects." />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Collected 25 new feedbacks from volunteers." />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Featured Feedbacks and Reviews
              </Typography>
              <Card>
                <CardContent>
                  <List>
                    <ListItem>
                      <ListItemText primary="⭐️ Great experience volunteering at the community center. - Alex" />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="🌟 The event was well organized and fulfilling. - Jamie" />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="👍 Appreciated the support and organization. - Taylor" />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="👏 Wonderful opportunity to give back. - Morgan" />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </div>
    </div>
  );
};

export default AdminDashboard;
