import React, { useState } from 'react';
import { Container, TextField, Button, Grid, Typography, Paper, IconButton, Box } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn, LocationOn, Phone, Email, AccessTime, Star, StarBorder } from '@mui/icons-material'; 
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import './ContactUs.css';

const ContactUs = ({ isLoggedIn }) => {
  const iconColor = '#ff7043'; // Assume false for non-logged-in users

  // State to manage form data
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [feedbackForm, setFeedbackForm] = useState({
    name: '',
    email: '',
    feedback: '',
    rating: 0
  });

  const [volunteerForm, setVolunteerForm] = useState({
    name: '',
    email: '',
    phone: '',
    availability: '',
    interests: '',
    skills: ''
  });

  // Handle input change
  const handleInputChange = (e, formSetter) => {
    const { name, value } = e.target;
    formSetter(prevState => ({ ...prevState, [name]: value }));
  };

  // Handle rating change
  const handleRatingChange = (rating) => {
    setFeedbackForm(prevState => ({ ...prevState, rating }));
  };

  // Handle submit for feedback form
  const handleSubmit = (event, formData, formName) => {
    event.preventDefault();
    
    if (!isLoggedIn) {
      toast.warn("Please log in to submit the form.");
      return;
    }
  
    const isEmpty = Object.values(formData).some(field => {
      return typeof field === 'string' && field.trim() === '';
    });
  
    if (isEmpty) {
      toast.error("Please fill out all fields before submitting.");
      return;
    }
  
    if (formName === 'feedback') {
      fetch('http://localhost:9001/feedbacks/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      .then(response => response.json())
      .then(data => {
        toast.success("Your feedback has been submitted successfully!");
        setFeedbackForm({ name: '', email: '', feedback: '', rating: 0 });
      })
      .catch(error => {
        toast.error("An error occurred while submitting your feedback.");
      });
    } else {
      toast.success("Your message has been sent successfully!");
      formName === 'contact' ? setContactForm({ name: '', email: '', phone: '', message: '' }) :
      setVolunteerForm({ name: '', email: '', phone: '', availability: '', interests: '', skills: '' });
    }
  };
  
  const handleSubmitVolunteer = (event) => {
    event.preventDefault();
  
    if (!isLoggedIn) {
      toast.warn("Please log in to submit the form.");
      return;
    }
  
    const isEmpty = Object.values(volunteerForm).some(field => field.trim() === '');
  
    if (isEmpty) {
      toast.error("Please fill out all fields before submitting.");
      return;
    }
  
    const volunteerData = { ...volunteerForm, hours: 0 };
  
    fetch('http://localhost:9001/volunteers/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(volunteerData),
    })
    .then(response => response.json())
    .then(data => {
      toast.success("Your volunteer request has been submitted successfully!");
      setVolunteerForm({ name: '', email: '', phone: '', availability: '', interests: '', skills: '' });
    })
    .catch(error => {
      toast.error("An error occurred while submitting your request.");
    });
  };
  

  return (
    <Container>
      <Typography variant="h4" gutterBottom style={{ textAlign: 'center', margin: '20px 0' }}>
        Get in Touch with Us
      </Typography>

      {/* Combined Image and Contact Form */}
      <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
        <Grid container spacing={3}>
          {/* Left Side - Image */}
          <Grid item xs={12} md={6}>
            <img 
              src="https://img.freepik.com/premium-vector/customer-support-call-center-woman-with-headphones-microphone-with-laptop_528132-544.jpg?ga=GA1.1.760297517.1719292668" 
              alt="Contact Us" 
              style={{ width: '100%', height: '335px', marginBottom: '20px', paddingTop: "90px" }} 
            />
          </Grid>

          {/* Right Side - Contact Form */}
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>Have Questions? Send Us Your Queries!</Typography>
            <form noValidate autoComplete="off" onSubmit={(e) => handleSubmit(e, contactForm, 'contact')}>
              <TextField 
                fullWidth 
                label="Your Name" 
                margin="normal" 
                variant="outlined" 
                name="name"
                value={contactForm.name}
                onChange={(e) => handleInputChange(e, setContactForm)}
              />
              <TextField 
                fullWidth 
                label="Your Email" 
                margin="normal" 
                variant="outlined" 
                name="email"
                value={contactForm.email}
                onChange={(e) => handleInputChange(e, setContactForm)}
              />
              <TextField 
                fullWidth 
                label="Your Phone Number" 
                margin="normal" 
                variant="outlined" 
                name="phone"
                value={contactForm.phone}
                onChange={(e) => handleInputChange(e, setContactForm)}
              />
              <TextField 
                fullWidth 
                label="Your Message" 
                margin="normal" 
                variant="outlined" 
                name="message"
                value={contactForm.message}
                onChange={(e) => handleInputChange(e, setContactForm)}
                multiline rows={4}
              />
              <Button type="submit" variant="contained" color="primary" style={{ backgroundColor: iconColor, marginTop: '20px' }}>Send Message</Button>
            </form>
          </Grid>
        </Grid>
      </Paper>

      {/* Feedback Form */}
      <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
        <Typography variant="h5" gutterBottom style={{ textAlign: 'center', marginBottom: '20px' }}>We Value Your Feedback</Typography>
        <form noValidate autoComplete="off" onSubmit={(e) => handleSubmit(e, feedbackForm, 'feedback')}>
          <TextField 
            fullWidth 
            label="Your Name" 
            margin="normal" 
            variant="outlined" 
            name="name"
            value={feedbackForm.name}
            onChange={(e) => handleInputChange(e, setFeedbackForm)}
          />
          <TextField 
            fullWidth 
            label="Your Email" 
            margin="normal" 
            variant="outlined" 
            name="email"
            value={feedbackForm.email}
            onChange={(e) => handleInputChange(e, setFeedbackForm)}
          />
          <TextField 
            fullWidth 
            label="Your Feedback" 
            margin="normal" 
            variant="outlined" 
            name="feedback"
            value={feedbackForm.feedback}
            onChange={(e) => handleInputChange(e, setFeedbackForm)}
            multiline rows={4}
          />
          <Box display="flex" alignItems="center" marginBottom="10px" marginTop="20px">
            <Typography variant="body1" style={{ marginRight: '10px' }}>Rating:</Typography>
            {[1, 2, 3, 4, 5].map((rating) => (
              <IconButton key={rating} onClick={() => handleRatingChange(rating)}>
                {feedbackForm.rating >= rating ? <Star style={{ color: iconColor }} /> : <StarBorder />}
              </IconButton>
            ))}
          </Box>
          <Button type="submit" variant="contained" color="primary" style={{ backgroundColor: iconColor, marginTop: '20px' }}>Submit Feedback</Button>
        </form>
      </Paper>

      {/* Contact Information */}
      <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
        <Typography variant="h5" gutterBottom style={{ textAlign: 'center', marginBottom: '20px' }}>Connect with Us</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Box display="flex" alignItems="center" marginBottom="10px">
              <LocationOn style={{ color: iconColor, marginRight: '10px' }} />
              <Typography variant="body1">Location: Kovaipudhur, Coimbatore, Tamil Nadu</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box display="flex" alignItems="center" marginBottom="10px">
              <Phone style={{ color: iconColor, marginRight: '10px' }} />
              <Typography variant="body1">Call Us: +91-XXXXXXXXXX</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box display="flex" alignItems="center" marginBottom="10px">
              <Email style={{ color: iconColor, marginRight: '10px' }} />
              <Typography variant="body1">Email: info@example.com</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box display="flex" alignItems="center" marginBottom="10px">
              <AccessTime style={{ color: iconColor, marginRight: '10px' }} />
              <Typography variant="body1">Office Hours: Mon-Fri, 9 AM - 5 PM</Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Social Media Links */}
      <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
        <Typography variant="h5" gutterBottom style={{ textAlign: 'center', marginBottom: '20px' }}>Stay Connected</Typography>
        <Typography variant="body1" style={{ textAlign: 'center', marginBottom: '20px' }}>
          Follow us on social media to stay updated with our latest news, events, and volunteer opportunities. See what we're up to and how you can get involved!
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          <Grid item>
            <IconButton color="primary" component="a" href="https://facebook.com">
              <Facebook style={{ color: iconColor }} />
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton color="primary" component="a" href="https://twitter.com">
              <Twitter style={{ color: iconColor }} />
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton color="primary" component="a" href="https://instagram.com">
              <Instagram style={{ color: iconColor }} />
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton color="primary" component="a" href="https://linkedin.com">
              <LinkedIn style={{ color: iconColor }} />
            </IconButton>
          </Grid>
        </Grid>
      </Paper>

      {/* Volunteer Inquiry Form */}
      <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
        <Typography variant="h5" gutterBottom style={{ textAlign: 'center', marginBottom: '20px' }}>Join Our Volunteer Team</Typography>
        <form noValidate autoComplete="off" onSubmit={(e) => handleSubmitVolunteer(e, volunteerForm, 'volunteer')}>
          <TextField 
            fullWidth 
            label="Your Name" 
            margin="normal" 
            variant="outlined" 
            name="name"
            value={volunteerForm.name}
            onChange={(e) => handleInputChange(e, setVolunteerForm)}
          />
          <TextField 
            fullWidth 
            label="Your Email" 
            margin="normal" 
            variant="outlined" 
            name="email"
            value={volunteerForm.email}
            onChange={(e) => handleInputChange(e, setVolunteerForm)}
          />
          <TextField 
            fullWidth 
            label="Your Phone Number" 
            margin="normal" 
            variant="outlined" 
            name="phone"
            value={volunteerForm.phone}
            onChange={(e) => handleInputChange(e, setVolunteerForm)}
          />
          <TextField 
            fullWidth 
            label="Your Availability" 
            margin="normal" 
            variant="outlined" 
            name="availability"
            value={volunteerForm.availability}
            onChange={(e) => handleInputChange(e, setVolunteerForm)}
          />
          <TextField 
            fullWidth 
            label="Your Interests" 
            margin="normal" 
            variant="outlined" 
            name="interests"
            value={volunteerForm.interests}
            onChange={(e) => handleInputChange(e, setVolunteerForm)}
          />
          <TextField 
            fullWidth 
            label="Your Skills" 
            margin="normal" 
            variant="outlined" 
            name="skills"
            value={volunteerForm.skills}
            onChange={(e) => handleInputChange(e, setVolunteerForm)}
          />
          <Button type="submit" variant="contained" color="primary" style={{ backgroundColor: iconColor, marginTop: '20px' }}>Submit</Button>
        </form>
      </Paper>

      {/* Toast Container */}
      <ToastContainer />
    </Container>
  );
};

export default ContactUs;

