import React, { useState, useMemo ,useContext} from 'react';
import { Container, Grid, Card, CardContent, Typography, Button, CardMedia, TextField, InputLabel, MenuItem, FormControl, Select, Divider, Modal, Box } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Events.css'; // Ensure your custom CSS file is imported

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const sampleEvents = [
  {
    id: 1,
    title: 'Beach Cleanup',
    date: 'August 15, 2024',
    location: 'Marina Beach, Chennai',
    description: 'Join us for a day of cleaning up the beach and making a difference.',
    image: 'https://i.pinimg.com/564x/22/aa/10/22aa102dfe778c3c121914eceb024573.jpg',
    link: '#',
    category: 'Environmental',
    timings: '9:00 AM - 1:00 PM',
    exactLocation: 'Marina Beach, Chennai, near the lighthouse',
    requirements: 'Wear comfortable clothes and bring sunscreen.',
  },
  {
    id: 2,
    title: 'Community Garden Planting',
    date: 'August 22, 2024',
    location: 'Semmozhi Poonga, Chennai',
    description: 'Help us plant new flowers and vegetables in our community garden.',
    image: 'https://i.pinimg.com/564x/56/62/07/566207ae429c02fb86e7996363f5f887.jpg',
    link: '#',
    category: 'Community',
    timings: '8:00 AM - 12:00 PM',
    exactLocation: 'Semmozhi Poonga, Chennai, near the entrance gate',
    requirements: 'Bring gardening gloves and a hat.',
  },
  {
    id: 3,
    title: 'Tree Planting',
    date: 'September 5, 2024',
    location: 'Guindy National Park, Chennai',
    description: 'Help us plant trees to improve our urban environment.',
    image: 'https://i.pinimg.com/564x/cc/06/ac/cc06aca3bd1e1584fd0be9a2055551dc.jpg',
    link: '#',
    category: 'Environmental',
    timings: '7:00 AM - 11:00 AM',
    exactLocation: 'Guindy National Park, Chennai, near the main entrance',
    requirements: 'Wear sturdy shoes and bring a water bottle.',
  },
  {
    id: 4,
    title: 'Food Drive',
    date: 'September 12, 2024',
    location: 'Coimbatore Community Center',
    description: 'Join us in collecting and distributing food to those in need.',
    image: 'https://i.pinimg.com/564x/0a/62/f5/0a62f57a29647aa232d438226826ed0e.jpg',
    link: '#',
    category: 'Community',
    timings: '10:00 AM - 3:00 PM',
    exactLocation: 'Coimbatore Community Center, near the main hall',
    requirements: 'Volunteers should be able to lift boxes and sort food.',
  },
  {
    id: 5,
    title: 'Park Cleanup',
    date: 'October 1, 2024',
    location: 'Anna Nagar Tower Park, Chennai',
    description: 'Join us for a day of cleaning up the park and making a difference.',
    image: 'https://i.pinimg.com/564x/d8/f1/69/d8f169f7f3e847a3110d5b64f6194647.jpg',
    link: '#',
    category: 'Environmental',
    timings: '8:00 AM - 12:00 PM',
    exactLocation: 'Anna Nagar Tower Park, Chennai, near the tower',
    requirements: 'Wear comfortable clothes and bring trash bags.',
  },
  {
    id: 6,
    title: 'Community Garden Planting',
    date: 'October 15, 2024',
    location: 'Botanical Garden, Ooty',
    description: 'Help us plant new flowers and vegetables in our community garden.',
    image: 'https://i.pinimg.com/564x/32/42/f3/3242f37052bc4802fbd12ddea28ccc21.jpg',
    link: '#',
    category: 'Community',
    timings: '9:00 AM - 1:00 PM',
    exactLocation: 'Botanical Garden, Ooty, near the visitor center',
    requirements: 'Bring gardening tools and a water bottle.',
  },
  {
    id: 7,
    title: 'Tree Planting',
    date: 'November 5, 2024',
    location: 'Vandalur Zoo, Chennai',
    description: 'Help us plant trees to improve our urban environment.',
    image: 'https://i.pinimg.com/564x/9e/95/4f/9e954f99c77bea627b104862086e05ba.jpg',
    link: '#',
    category: 'Environmental',
    timings: '7:30 AM - 11:30 AM',
    exactLocation: 'Vandalur Zoo, Chennai, near the zoo entrance',
    requirements: 'Wear appropriate clothing and bring gloves.',
  },
  {
    id: 8,
    title: 'Food Drive',
    date: 'November 12, 2024',
    location: 'Madurai Community Center',
    description: 'Join us in collecting and distributing food to those in need.',
    image: 'https://i.pinimg.com/564x/29/b0/df/29b0df9ff7b27c60e03e0373ca8df159.jpg',
    link: '#',
    category: 'Community',
    timings: '9:00 AM - 2:00 PM',
    exactLocation: 'Madurai Community Center, near the main office',
    requirements: 'Volunteers should be comfortable with manual labor.',
  },
  {
    id: 9,
    title: 'Park Cleanup',
    date: 'December 5, 2024',
    location: 'Race Course Park, Coimbatore',
    description: 'Help us clean up and beautify our local park.',
    image: 'https://i.pinimg.com/736x/84/54/4d/84544ddb9b316abce024f217f7843e7b.jpg',
    link: '#',
    category: 'Environmental',
    timings: '8:30 AM - 12:30 PM',
    exactLocation: 'Race Course Park, Coimbatore, near the playground',
    requirements: 'Bring gloves and wear sturdy shoes.',
  },
  {
    id: 10,
    title: 'Book Drive',
    date: 'December 15, 2024',
    location: 'Anna Centenary Library, Chennai',
    description: 'Donate books to support local schools and libraries.',
    image: 'https://i.pinimg.com/564x/9c/47/5c/9c475cb75949a805edc33ff914fc1ef0.jpg',
    link: '#',
    category: 'Community',
    timings: '10:00 AM - 4:00 PM',
    exactLocation: 'Anna Centenary Library, Chennai, near the main entrance',
    requirements: 'Bring gently used books and a willingness to help.',
  },
  {
    id: 11,
    title: 'Homeless Shelter Support',
    date: 'January 10, 2025',
    location: 'Chennai Shelter',
    description: 'Volunteer to support and serve at the local homeless shelter.',
    image: 'https://i.pinimg.com/736x/48/c5/db/48c5db161c9f2ea7c88540a21738c132.jpg',
    link: '#',
    category: 'Community',
    timings: '9:00 AM - 5:00 PM',
    exactLocation: 'Chennai Shelter, near the main hall',
    requirements: 'Ability to handle physical tasks and work with diverse groups.',
  },
  {
    id: 12,
    title: 'Animal Shelter Volunteer',
    date: 'January 20, 2025',
    location: 'Coimbatore Animal Shelter',
    description: 'Help care for animals in need at the local shelter.',
    image: 'https://i.pinimg.com/564x/d3/ee/dc/d3eedc1d6d58711697fdf48fb1662aa4.jpg',
    link: '#',
    category: 'Animal Care',
    timings: '8:00 AM - 12:00 PM',
    exactLocation: 'Coimbatore Animal Shelter, near the front desk',
    requirements: 'Comfortable with animals and able to perform basic care tasks.',
  },
];

const Events = ({ isLoggedIn }) => { // Ensure isLoggedIn is passed as a prop
  const [category, setCategory] = useState('');
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [date, setDate] = useState(new Date());

  const filteredEvents = useMemo(() => {
    return sampleEvents.filter(event =>
      (event.title.toLowerCase().includes(search.toLowerCase())) &&
      (category ? event.category === category : true)
    );
  }, [search, category]);

  const handleOpen = (event) => {
    setSelectedEvent(event);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedEvent(null);
  };

  const handleApply = () => {
    if (isLoggedIn) {
      toast.success("Thank you for applying! We will get in touch with you soon.");
    } else {
      toast.warn("Please log in to apply for this event.");
    }
    handleClose();
  };

  return (
    <Container className="events-container">
      <div className="seven">
        <h1>Discover Exciting Volunteer Opportunities</h1>
      </div>

      <Typography variant="h6" paragraph style={{ textAlign: 'center'}}>
        Join us in making a positive impact. Browse and register for upcoming events to help your community thrive!
      </Typography>

      <Grid container spacing={3} style={{ marginTop: '20px' }}>
        <Grid item xs={12} md={6}>
          <div className="calendar-container">
            <Calendar
              onChange={setDate}
              value={date}
              tileContent={({ date, view }) => {
                const event = sampleEvents.find(e => new Date(e.date).toDateString() === date.toDateString());
                return event ? <div className="event-indicator">{event.title}</div> : null;
              }}
              tileClassName={({ date, view }) => {
                if (sampleEvents.find(e => new Date(e.date).toDateString() === date.toDateString())) {
                  return 'highlight';
                }
                return null;
              }}
            />
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <CardMedia
            component="img"
            alt="Volunteer"
            height="100%"
            image="https://img.freepik.com/free-vector/solidarity-concept-illustration_114360-6286.jpg" // Add your desired image URL here
            className="volunteer-image"
          />
        </Grid>
      </Grid>

      <FormControl fullWidth margin="normal" style={{ marginTop: '20px' }}>
        <InputLabel>Filter by Category</InputLabel>
        <Select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="Environmental">Environmental</MenuItem>
          <MenuItem value="Community">Community</MenuItem>
          <MenuItem value="Animal Care">Animal Care</MenuItem>
        </Select>
      </FormControl>

      <TextField
        label="Search Events"
        variant="outlined"
        fullWidth
        margin="normal"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginTop: '20px' }}
      />

      <Divider className="divider" style={{ marginTop: '20px' }} />

      <Typography variant="h6" paragraph style={{ textAlign: 'center', marginTop: '20px' }}>
        Upcoming Events
      </Typography>

      <Grid container spacing={3} style={{ marginTop: '20px' }}>
        {filteredEvents.map((event) => (
          <Grid item xs={12} sm={6} md={4} key={event.id}>
            <div className="card" onClick={() => handleOpen(event)}>
              <img src={event.image} alt={event.title} />
              <div className="info">
                <Typography variant="h6" component="h1">
                  {event.title}
                </Typography>
                <Typography variant="body2" paragraph>
                  {event.date} - {event.location}
                </Typography>
                <Button onClick={() => handleOpen(event)}>Learn More</Button>
              </div>
            </div>
          </Grid>
        ))}
      </Grid>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="event-modal-title"
        aria-describedby="event-modal-description"
      >
        <Box sx={{ 
          position: 'absolute', 
          top: '50%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)', 
          width: 400, 
          bgcolor: 'background.paper', 
          boxShadow: 24, 
          p: 4, 
          borderRadius: 2
        }}>
          {selectedEvent && (
            <>
              <CardMedia
                component="img"
                alt={selectedEvent.title}
                height="140"
                image={selectedEvent.image}
                sx={{ marginBottom: 2 }}
              />
              <Typography id="event-modal-title" variant="h5" component="div">
                {selectedEvent.title}
              </Typography>
              <Typography id="event-modal-description" variant="body2" color="text.secondary">
                {selectedEvent.date} - {selectedEvent.location}
              </Typography>
              <Typography variant="body1" paragraph>
                {selectedEvent.description}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ marginTop: 2 }}>
                <strong>Timings:</strong> {selectedEvent.timings}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Exact Location:</strong> {selectedEvent.exactLocation}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Requirements:</strong> {selectedEvent.requirements}
              </Typography>
              <Button
                variant="contained"
                sx={{ backgroundColor: '#ff7043', color: '#fff', '&:hover': { backgroundColor: '#ff5722' }, marginTop: 2 }}
                onClick={handleApply}
              >
                Apply
              </Button>
            </>
          )}
        </Box>
      </Modal>

      {/* Toast Container */}
      <ToastContainer />
    </Container>
  );
};

export default Events;