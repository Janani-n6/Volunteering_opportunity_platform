import React from 'react';
import { Container, Typography, Paper, Box, Grid, Card, CardContent, CardMedia, Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Home.css';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import CommentIcon from '@mui/icons-material/Comment';

const Home = () => {
  const navigate = useNavigate();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    adaptiveHeight: true,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const events = [
    {
      content: 'Join us in making a difference! Our events focus on critical needs such as food distribution and environmental cleanup. Participate and make a positive impact today.',
      link: '/events',
    },
    {
      content: 'Get involved in our upcoming park cleanup event. Meet people, give back to your community, and help improve our parks. No prior experience needed, just bring your enthusiasm!',
      link: '/events',
    },
    {
      content: 'Participate in our beach cleanup day and help protect our coastlines. Enjoy the outdoors while contributing to environmental conservation. Let’s keep our beaches clean!',
      link: '/events',
    },
  ];

  const leaderboard = [
    {
      name: 'Amit Sharma',
      hours: '150',
      badges: '🏅🏅🏅',
      image: 'https://i.pinimg.com/474x/43/98/7c/43987cfe59efb04101d6a1a57672bcbd.jpg',
    },
    {
      name: 'Priya Nair',
      hours: '120',
      badges: '🏅🏅',
      image: 'https://img.freepik.com/free-photo/massage-therapist-working-spa_53876-13604.jpg?t=st=1722348750~exp=1722352350~hmac=65c20ef4ddb42f91e08203666d16bd05930e760498b6ebefd51dc8d07c5c1da8&w=900',
    },
    {
      name: 'Rajesh Patel',
      hours: '110',
      badges: '🏅',
      image: 'https://i.pinimg.com/474x/86/af/9f/86af9fe52737a61835bbfd6a71866478.jpg',
    },
  ];

  const successStories = [
    {
      image: 'https://i.pinimg.com/564x/13/a9/2e/13a92ec7d6655d66a0e4968338db3f08.jpg',
      story: 'Our park cleanup event last month was a huge success! Volunteers removed over 500 pounds of trash, making the park a cleaner and safer place for the community.',
      details: 'Date: June 15, 2024 | Location: Central Park | Volunteers: 50 | Trash Collected: 500 pounds',
    },
    {
      image: 'https://i.pinimg.com/564x/8b/e1/bc/8be1bc8681a14a058b7d1d2640c6a8ec.jpg',
      story: 'Thanks to our beach cleanup volunteers, we managed to clear a significant amount of plastic waste from the coastline, protecting marine life and preserving natural beauty.',
      details: 'Date: July 22, 2024 | Location: Sunset Beach | Volunteers: 30 | Waste Collected: 200 kg',
    },
    {
      image: 'https://i.pinimg.com/564x/60/a8/64/60a8643718772508d3313514e3b9afc5.jpg',
      story: 'Our food distribution event helped provide meals to over 300 families in need, thanks to our dedicated volunteers.',
      details: 'Date: August 5, 2024 | Location: Community Center | Families Served: 300 | Meals Distributed: 1500',
    },
    {
      image: 'https://i.pinimg.com/564x/27/9b/96/279b963a1603813406c3f6efec942fe2.jpg',
      story: 'Volunteers planted over 200 trees in our recent reforestation project, contributing to a greener and healthier environment.',
      details: 'Date: September 10, 2024 | Location: Greenbelt Park | Trees Planted: 200 | Volunteers: 40',
    },
  ];

  const feedbacks = [
    {
      name: 'Priya Nair',
      image: 'https://img.freepik.com/free-photo/massage-therapist-working-spa_53876-13604.jpg?t=st=1722348750~exp=1722352350~hmac=65c20ef4ddb42f91e08203666d16bd05930e760498b6ebefd51dc8d07c5c1da8&w=900',
      feedback: 'The volunteer experience was incredibly rewarding! I felt like my time was truly valued and the community greatly appreciated the effort.',
    },
    {
      name: 'Amit Sharma',
      image: 'https://i.pinimg.com/474x/86/af/9f/86af9fe52737a61835bbfd6a71866478.jpg',
      feedback: 'Joining the beach cleanup was a fantastic experience. It was well-organized, and I loved seeing the immediate impact of our work.',
    },
    {
      name: 'Jaanu',
      image: 'https://img.freepik.com/free-photo/young-female-walking-sidewalk-with-back-clear-blue-sky_181624-2982.jpg?t=st=1722348799~exp=1722352399~hmac=c71958eabb668a3fef8783c8707d4a8d433f50344be1b3872c9799664ed6a327&w=900',
      feedback: 'The food distribution event was heartwarming. Knowing that we helped so many families made the effort worthwhile.',
    },
  ];

  return (
    <Container className="container">
      {/* Intro Container */}
      <Paper className="introContainer" sx={{ border: 'none' }}>
        <div className="introText">
          <Typography variant="h4">"Volunteering is the ultimate exercise in democracy."</Typography>
          <Typography variant="body1" sx={{ marginTop: 1 }}>
            Discover the joy of giving back to your community and making a real impact. Join our volunteer programs and contribute to meaningful causes. Your time and effort can change lives!
          </Typography>
          <button
            className="introButton"
            onClick={() => navigate('/events')}
          >
            Volunteer Now
          </button>
        </div>
        <img
          src='https://img.freepik.com/free-vector/volunteering-concept-illustration_114360-25372.jpg?t=st=1722056566~exp=1722060166~hmac=cd778a454014f2199a18cf34f1ee05865f4991dc6ef501f26255fc1294b84256&w=900'
          alt="Volunteer"
          style={{ maxWidth: '50%' }}
        />
      </Paper>

      {/* Highlight Events Container */}
      <Paper className="eventsContainer" sx={{ border: 'none' }}>
        <Slider {...settings} style={{ width: '100%' }}>
          {events.map((event, index) => (
            <div key={index} className="event">
              <div className="eventContent">
                <Typography variant="h6">{event.content}</Typography>
                <Box sx={{ marginTop: 2 }}>
                  <button 
                    className="eventButton" 
                    onClick={() => navigate(event.link)}
                  >
                    Read More
                  </button>
                </Box>
              </div>
            </div>
          ))}
        </Slider>
      </Paper>

      {/* Statistics Container */}
      <Paper className="statsContainer" sx={{ border: 'none' }}>
        <Box display="flex" justifyContent="space-around" alignItems="center">
          <Box display="flex" flexDirection="column" alignItems="center">
            <Typography variant="h3">1000+</Typography>
            <Typography variant="body1">Volunteers</Typography>
          </Box>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Typography variant="h3">500+</Typography>
            <Typography variant="body1">Events</Typography>
          </Box>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Typography variant="h3">15000+</Typography>
            <Typography variant="body1">Volunteer Hours</Typography>
          </Box>
        </Box>
      </Paper>

      {/* Volunteer Leaderboard */}
      <Paper className="leaderboardContainer" sx={{ border: 'none' }}>
        <Typography variant="h4" gutterBottom>Volunteer Leaderboard</Typography>
        <Grid container spacing={2}>
          {leaderboard.map((volunteer, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <Card>
                <Box display="flex" justifyContent="center" alignItems="center" marginTop={2}>
                  <Avatar alt={volunteer.name} src={volunteer.image} sx={{ width: 100, height: 100 }} />
                </Box>
                <CardContent>
                  <Typography variant="h6" component="div">
                    {volunteer.name}
                  </Typography>
                  <Box display="flex" alignItems="center">
                    <AccessTimeIcon sx={{ marginRight: 0.5, color: '#ff7043' }} />
                    <Typography variant="body1">{volunteer.hours} Hours</Typography>
                  </Box>
                  <Box display="flex" alignItems="center">
                    <EmojiEventsIcon sx={{ marginRight: 0.5, color: '#ff7043' }} />
                    <Typography variant="body1">{volunteer.badges}</Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* Success Stories Container */}
      <Paper className="successStoriesContainer" sx={{ border: 'none' }}>
        <Typography variant="h4" gutterBottom>Success Stories</Typography>
        <Grid container spacing={2}>
          {successStories.map((story, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image={story.image}
                  alt="Story Image"
                />
                <CardContent>
                  <Typography variant="body1" gutterBottom>
                    {story.story}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {story.details}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* Feedback Section */}
      <Paper className="feedbackContainer" sx={{ border: 'none', elevation: 0 }}>
        <Typography variant="h4" gutterBottom>
          What Volunteers Are Saying
        </Typography>
        <Grid container spacing={2}>
          {feedbacks.map((feedback, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card className="feedbackCard">
                <CardContent>
                  <Box display="flex" alignItems="center">
                    <Avatar alt={feedback.name} src={feedback.image} sx={{ marginRight: 2 }} />
                    <Typography variant="h6">{feedback.name}</Typography>
                  </Box>
                  <Typography variant="body1" sx={{ marginTop: 2 }}>
                    <CommentIcon sx={{ marginRight: 1, color: '#ff7043' }} />
                    {feedback.feedback}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Container>
  );
};

export default Home;
