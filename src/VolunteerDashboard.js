import React, { useEffect, useState } from 'react';
import { Container, Grid, Card, CardContent, Typography, Avatar, Box, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import BarChartIcon from '@mui/icons-material/BarChart';
import StarIcon from '@mui/icons-material/Star';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import Chart from 'react-apexcharts';
import './VolunteerDashboard.css';
import axios from 'axios';

const VolunteerDashboard = ({ userData }) => {
    const [volunteer, setVolunteer] = useState({
        name: "",
        skills: "",
        interests: "",
        hours: 0,
        achievements: [
            {
                title: "Top Volunteer of the Month",
                description: "Awarded for exceptional performance and dedication during the month of July.",
                icon: <StarIcon sx={{ fontSize: 60, color: 'gold' }} />
            },
            {
                title: "Outstanding Service Award",
                description: "Recognized for outstanding service and contribution to the community.",
                icon: <EmojiEventsIcon sx={{ fontSize: 60, color: 'green' }} />
            }
        ],
        goals: [
            {
                title: "Complete 200 volunteer hours",
                description: "Aim to achieve a milestone of 200 volunteer hours by the end of the year.",
                icon: <BarChartIcon sx={{ fontSize: 60, color: 'blue' }} />
            },
            {
                title: "Lead a major event",
                description: "Plan and execute a major fundraising event for the organization.",
                icon: <TrackChangesIcon sx={{ fontSize: 60, color: 'red' }} />
            }
        ],
        badges: [
            {
                title: "Bronze Volunteer",
                description: "Awarded for completing 50 volunteer hours.",
                icon: <StarIcon sx={{ fontSize: 60, color: 'bronze' }} />
            },
            {
                title: "Silver Volunteer",
                description: "Awarded for completing 100 volunteer hours.",
                icon: <StarIcon sx={{ fontSize: 60, color: 'silver' }} />
            }
        ]
    });

    const [openDialog, setOpenDialog] = useState(false);
    const [editFields, setEditFields] = useState({
        name: "",
        skills: "",
        interests: ""
    });

    useEffect(() => {
        if (userData && userData.name) {
            axios.get(`http://localhost:9001/volunteers/search?name=${userData.name}`)
                .then(response => {
                    const { name, skills, interests } = response.data[0]; // Assuming response data is an array
                    setVolunteer(prevState => ({
                        ...prevState,
                        name,
                        skills,
                        interests
                    }));
                })
                .catch(error => {
                    console.error("There was an error fetching the volunteer data!", error);
                });
        }
    }, [userData]);

    const handleUpdate = () => {
        const url = `http://localhost:9001/volunteers/update/${volunteer.id}`;
        const payload = {
            name: editFields.name,
            skills: editFields.skills,
            interests: editFields.interests
        };

        axios.patch(url, payload)
            .then(response => {
                setVolunteer(prevState => ({
                    ...prevState,
                    ...response.data
                }));
                setOpenDialog(false);
            })
            .catch(error => {
                console.error("There was an error updating the volunteer data!", error);
            });
    };

    const openEditDialog = () => {
        setEditFields({
            name: volunteer.name,
            skills: volunteer.skills,
            interests: volunteer.interests
        });
        setOpenDialog(true);
    };

    const chartOptions = {
        chart: {
            type: 'bar'
        },
        series: [{
            name: 'Volunteer Hours',
            data: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120]
        }],
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        colors: ['#ff7043']
    };

    return (
        <Container className="dashboard-container">
            <Box className="section">
                <Card className="detail-card">
                    <CardContent>
                        <Avatar alt={volunteer.name} src="/static/images/avatar/1.jpg" className="avatar" />
                        <Typography variant="h6">{volunteer.name}</Typography>
                        <Typography variant="body1">
                            <strong>Skills:</strong> {volunteer.skills}
                        </Typography>
                        <Typography variant="body1">
                            <strong>Interests:</strong> {volunteer.interests}
                        </Typography>
                        <Button onClick={openEditDialog} variant="outlined" sx={{ marginTop: 2 }}>Edit Profile</Button>
                    </CardContent>
                </Card>
            </Box>

            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Name"
                        variant="outlined"
                        value={editFields.name}
                        onChange={(e) => setEditFields({ ...editFields, name: e.target.value })}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Skills"
                        variant="outlined"
                        value={editFields.skills}
                        onChange={(e) => setEditFields({ ...editFields, skills: e.target.value })}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Interests"
                        variant="outlined"
                        value={editFields.interests}
                        onChange={(e) => setEditFields({ ...editFields, interests: e.target.value })}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
                    <Button onClick={handleUpdate} variant="contained">Save</Button>
                </DialogActions>
            </Dialog>

            <Box className="section">
                <Card className="chart-card">
                    <CardContent>
                        <Typography variant="h4" className="chart-title">
                            Volunteer Hours Performance
                        </Typography>
                        <Chart options={chartOptions} series={chartOptions.series} type="bar" height={350} />
                    </CardContent>
                </Card>
            </Box>
            <Box className="section">
                <Typography variant="h4" className="section-title">
                    Achievements
                </Typography>
                <Grid container spacing={2}>
                    {volunteer.achievements.map((achievement, index) => (
                        <Grid item xs={12} sm={6} key={index}>
                            <Card className="achievement-card">
                                <CardContent>
                                    {achievement.icon}
                                    <Typography variant="h6">{achievement.title}</Typography>
                                    <Typography variant="body1">{achievement.description}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
            <Box className="section">
                <Typography variant="h4" className="section-title">
                    Goals
                </Typography>
                <Grid container spacing={2}>
                    {volunteer.goals.map((goal, index) => (
                        <Grid item xs={12} sm={6} key={index}>
                            <Card className="goal-card">
                                <CardContent>
                                    {goal.icon}
                                    <Typography variant="h6">{goal.title}</Typography>
                                    <Typography variant="body1">{goal.description}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
            <Box className="section">
                <Typography variant="h4" className="section-title">
                    Badges
                </Typography>
                <Grid container spacing={2}>
                    {volunteer.badges.map((badge, index) => (
                        <Grid item xs={12} sm={6} key={index}>
                            <Card className="badge-card">
                                <CardContent>
                                    {badge.icon}
                                    <Typography variant="h6">{badge.title}</Typography>
                                    <Typography variant="body1">{badge.description}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Container>
    );
}

export default VolunteerDashboard;
