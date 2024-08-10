import React from 'react';
import { Container, Grid, Card, CardContent, Typography, Avatar, Box, IconButton } from '@mui/material';
import BarChartIcon from '@mui/icons-material/BarChart';
import StarIcon from '@mui/icons-material/Star';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import BadgeIcon from '@mui/icons-material/Badge';
import Chart from 'react-apexcharts';
import './VolunteerDashboard.css';

const VolunteerDashboard = () => {
    const volunteer = {
        name: "Janani",
        skills: ["Fundraising", "Event Planning", "Community Outreach"],
        interests: ["Environmental Protection", "Animal Welfare"],
        hours: 120,
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
        colors: ['#ff7043'] // Setting the bar color
    };

    return (
        <Container className="dashboard-container">
            <Box className="section">
                <Card className="detail-card">
                    <CardContent>
                        <Avatar alt={volunteer.name} src="/static/images/avatar/1.jpg" className="avatar" />
                        <Typography variant="h5">{volunteer.name}</Typography>
                        <Typography variant="body1"><strong>Skills:</strong> {volunteer.skills.join(", ")}</Typography>
                        <Typography variant="body1"><strong>Interests:</strong> {volunteer.interests.join(", ")}</Typography>
                    </CardContent>
                </Card>
            </Box>
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
                                    <IconButton>{achievement.icon}</IconButton>
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
                                    <IconButton>{goal.icon}</IconButton>
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
                                    <IconButton>{badge.icon}</IconButton>
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
