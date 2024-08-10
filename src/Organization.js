import React from 'react';
import { Grid, Typography, Box, Card, CardContent, CardMedia, Avatar } from '@mui/material';
import { Event, People, AssignmentInd, SocialDistance, Star, Favorite } from '@mui/icons-material';
import Carousel from 'react-material-ui-carousel';
import './Organization.css';

const Organization = () => {
  return (
    <div className="organization-container">
      <Grid container spacing={3}>
        {/* Organization Overview */}
        <Grid item xs={12} md={8}>
          <Box className="overview-section">
            <Typography variant="h5" className="section-title" style={{ fontWeight: 'bold' }}>Empowering Communities</Typography>
            <Typography variant="body1" className="section-content">
              Our mission is to empower communities by connecting passionate volunteers with meaningful opportunities. We believe in the power of volunteerism to drive positive change and build a better future for all.
            </Typography>

            <Typography variant="h5" className="section-title" style={{ fontWeight: 'bold' }}>Our Story</Typography>
            <Typography variant="body1" className="section-content">
              Founded in 2022, our organization began as a small initiative to support local charities and nonprofits. Over the years, we have grown into a leading platform for real-time volunteering opportunities, connecting thousands of volunteers with causes that matter most to them.
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <img src='./hello.png' alt="Organization" className="organization-image" />
        </Grid>
        <Grid item xs={12}>
          <Box className="impact-section">
          <Typography variant="h5" className="section-title" style={{ fontWeight: 'bold' }}>Making a Difference</Typography>
            <Typography variant="body1" className="section-content">
              Through our platform, we've facilitated [Number] hours of volunteer work, impacted [Number] lives, and supported [Number] causes. Our volunteers have shared inspiring success stories, from mentoring youth to organizing community clean-ups. Together, we're making a tangible difference in the world.
            </Typography>
          </Box>
        </Grid>
        
        {/* Current Opportunities */}
        <Grid item xs={12} >
          <Box className="opportunities-section">
          <Typography variant="h5" className="section-title opportunities-title" style={{ fontWeight: 'bold' }}>Join Our Mission</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <Card className="role-card">
                  <CardContent className="role-card-content">
                    <Avatar className="role-icon" style={{ backgroundColor: '#ff7043' }}>
                      <Event />
                    </Avatar>
                    <Typography variant="h6" className="role-title" style={{ fontWeight: 'bold' }}>Community Organizer</Typography>
                    <Typography variant="body2" className="role-description">
                      Help coordinate local events and connect with community members.
                    </Typography>
                    <Typography variant="body2" className="role-skills">
                      Required Skills: Communication, Organization
                    </Typography>
                    <Typography variant="body2" className="role-commitment">
                      Time Commitment: 5 hours/week
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Card className="role-card">
                  <CardContent className="role-card-content">
                    <Avatar className="role-icon" style={{ backgroundColor: '#ff7043' }}>
                      <People />
                    </Avatar>
                    <Typography variant="h6" className="role-title" style={{ fontWeight: 'bold' }}>Youth Mentor</Typography>
                    <Typography variant="body2" className="role-description">
                      Provide guidance and support to young people.
                    </Typography>
                    <Typography variant="body2" className="role-skills">
                      Required Skills: Mentoring, Patience
                    </Typography>
                    <Typography variant="body2" className="role-commitment">
                      Time Commitment: 3 hours/week
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Card className="role-card">
                  <CardContent className="role-card-content">
                    <Avatar className="role-icon" style={{ backgroundColor: '#ff7043' }}>
                      <AssignmentInd />
                    </Avatar>
                    <Typography variant="h6" className="role-title" style={{ fontWeight: 'bold' }}>Event Planner</Typography>
                    <Typography variant="body2" className="role-description">
                      Plan and execute events for various causes.
                    </Typography>
                    <Typography variant="body2" className="role-skills">
                      Required Skills: Planning, Coordination
                    </Typography>
                    <Typography variant="body2" className="role-commitment">
                      Time Commitment: 7 hours/week
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Card className="role-card">
                  <CardContent className="role-card-content">
                    <Avatar className="role-icon" style={{ backgroundColor: '#ff7043' }}>
                      <SocialDistance />
                    </Avatar>
                    <Typography variant="h6" className="role-title" style={{ fontWeight: 'bold' }}>Social Media Manager</Typography>
                    <Typography variant="body2" className="role-description">
                      Manage social media accounts and campaigns.
                    </Typography>
                    <Typography variant="body2" className="role-skills">
                      Required Skills: Social Media, Creativity
                    </Typography>
                    <Typography variant="body2" className="role-commitment">
                      Time Commitment: 4 hours/week
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </Grid>

        {/* Events & Activities */}
        <Grid item xs={12}>
          <Box className="events-section">
          <Typography variant="h5" className="section-title" style={{ fontWeight: 'bold' }}>Celebrating Success: Our Past Events</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={6}>
                <Card className="event-card">
                  <CardMedia
                    component="img"
                    height="140"
                    image="https://img.freepik.com/premium-photo/volunteer-team-with-garbage-bags-cleaning-park-pigs-volunteer-team-loves-environment_697211-3637.jpg?ga=GA1.1.1936856017.1719208771&semt=ais_user"
                    alt="Community Cleanup Drive"
                  />
                  <CardContent>
                  <Typography variant="h6" className="event-title" style={{ fontWeight: 'bold' }}>Community Cleanup Drive</Typography>
                    <Typography variant="body2" className="event-description">
                      Volunteers gathered to clean up local parks and public spaces, making our community cleaner and greener.
                    </Typography>
                    <Typography variant="body2" className="event-impact">
                      <Star style={{ color: '#ff7043', marginRight: '5px' }} />
                      Impact: 200 volunteers, 50 bags of trash collected
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <Card className="event-card">
                  <CardMedia
                    component="img"
                    height="140"
                    image="https://img.freepik.com/free-photo/students-cafe-reading-materials_23-2147655931.jpg?ga=GA1.1.1936856017.1719208771&semt=ais_user"
                    alt="Youth Mentoring Workshop"
                  />
                  <CardContent>
                  <Typography variant="h6" className="event-title" style={{ fontWeight: 'bold' }}>Youth Mentoring Workshop</Typography>
                    <Typography variant="body2" className="event-description">
                      A workshop focused on providing guidance and support to young individuals, fostering personal growth and development.
                    </Typography>
                    <Typography variant="body2" className="event-impact">
                      <Star style={{ color: '#ff7043', marginRight: '5px' }} />
                      Impact: 100 youths mentored, 20 mentors involved
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <Card className="event-card">
                  <CardMedia
                    component="img"
                    height="140"
                    image="https://img.freepik.com/free-photo/close-up-volunteers-working-together_23-2149182025.jpg?ga=GA1.1.1936856017.1719208771&semt=ais_user"
                    alt="Food Drive"
                  />
                  <CardContent>
                  <Typography variant="h6" className="event-title" style={{ fontWeight: 'bold' }}>Food Drive</Typography>
                    <Typography variant="body2" className="event-description">
                      Collecting and distributing food to families in need, ensuring no one goes hungry in our community.
                    </Typography>
                    <Typography variant="body2" className="event-impact">
                      <Star style={{ color: '#ff7043', marginRight: '5px' }} />
                      Impact: 300 families served, 1,000 meals distributed
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <Card className="event-card">
                  <CardMedia
                    component="img"
                    height="140"
                    image="https://img.freepik.com/free-photo/business-people-teamwork_23-2148827006.jpg?t=st=1722146194~exp=1722149794~hmac=afb346210a97e9b1e485733369331b70186b0f99881d03eb016dc4bf8b2445a7&w=1060"
                    alt="Health Fair"
                  />
                  <CardContent>
                  <Typography variant="h6" className="event-title" style={{ fontWeight: 'bold' }}>Health Fair</Typography>
                    <Typography variant="body2" className="event-description">
                      Providing free health screenings and information on healthy living to community members.
                    </Typography>
                    <Typography variant="body2" className="event-impact">
                      <Star style={{ color: '#ff7043', marginRight: '5px' }} />
                      Impact: 500 health checks, 100+ participants educated on health
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </Grid>

        {/* Feedback & Reviews */}
        <Grid item xs={12}>
          <Box className="feedback-section">
          <Typography variant="h5" className="section-title" style={{ fontWeight: 'bold' }}>What People Say</Typography>
            <Carousel>
              {[...Array(2)].map((_, index) => (
                <Grid container spacing={2} key={index}>
                  <Grid item xs={12} sm={6}>
                    <Card className="feedback-card">
                      <CardContent>
                        <Box display="flex" alignItems="center" mb={2}>
                          <Avatar alt="John Doe" src="https://img.freepik.com/free-photo/portrait-confident-young-man-posing_23-2148266112.jpg" className="feedback-avatar" />
                          <Box ml={2}>
                            <Typography variant="h6" className="feedback-name">John Doe</Typography>
                            <Box display="flex" alignItems="center">
                              <Star style={{ color: '#ff7043' }} />
                              <Star style={{ color: '#ff7043' }} />
                              <Star style={{ color: '#ff7043' }} />
                              <Star style={{ color: '#ff7043' }} />
                              <Star style={{ color: '#ff7043' }} />
                            </Box>
                          </Box>
                        </Box>
                        <Typography variant="body2" className="feedback-text">
                          "Volunteering with this organization has been a life-changing experience. I've met amazing people and had the chance to make a real difference."
                        </Typography>
                        <Box mt={2} display="flex" alignItems="center">
                          <Favorite style={{ color: '#ff7043', marginRight: '5px' }} />
                          <Typography variant="body2" className="feedback-likes">123 Likes</Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Card className="feedback-card">
                      <CardContent>
                        <Box display="flex" alignItems="center" mb={2}>
                          <Avatar alt="Jane Smith" src="https://img.freepik.com/free-photo/young-woman-smiling-camera_23-2148179241.jpg" className="feedback-avatar" />
                          <Box ml={2}>
                            <Typography variant="h6" className="feedback-name">Jane Smith</Typography>
                            <Box display="flex" alignItems="center">
                              <Star style={{ color: '#ff7043' }} />
                              <Star style={{ color: '#ff7043' }} />
                              <Star style={{ color: '#ff7043' }} />
                              <Star style={{ color: '#ff7043' }} />
                              <Star style={{ color: '#ff7043' }} />
                            </Box>
                          </Box>
                        </Box>
                        <Typography variant="body2" className="feedback-text">
                          "The support and opportunities provided by this platform are incredible. I've grown so much both personally and professionally."
                        </Typography>
                        <Box mt={2} display="flex" alignItems="center">
                          <Favorite style={{ color: '#ff7043', marginRight: '5px' }} />
                          <Typography variant="body2" className="feedback-likes">98 Likes</Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Card className="feedback-card">
                      <CardContent>
                        <Box display="flex" alignItems="center" mb={2}>
                          <Avatar alt="Michael Johnson" src="https://img.freepik.com/free-photo/portrait-happy-black-man_23-2148769416.jpg" className="feedback-avatar" />
                          <Box ml={2}>
                            <Typography variant="h6" className="feedback-name">Michael Johnson</Typography>
                            <Box display="flex" alignItems="center">
                              <Star style={{ color: '#ff7043' }} />
                              <Star style={{ color: '#ff7043' }} />
                              <Star style={{ color: '#ff7043' }} />
                              <Star style={{ color: '#ff7043' }} />
                              <Star style={{ color: '#ff7043' }} />
                            </Box>
                          </Box>
                        </Box>
                        <Typography variant="body2" className="feedback-text">
                          "The organization provided me with the tools and resources to make a difference in my community. It's been a rewarding experience."
                        </Typography>
                        <Box mt={2} display="flex" alignItems="center">
                          <Favorite style={{ color: '#ff7043', marginRight: '5px' }} />
                          <Typography variant="body2" className="feedback-likes">150 Likes</Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Card className="feedback-card">
                      <CardContent>
                        <Box display="flex" alignItems="center" mb={2}>
                          <Avatar alt="Emily Davis" src="https://img.freepik.com/free-photo/young-woman-smiling-camera_23-2148179241.jpg" className="feedback-avatar" />
                          <Box ml={2}>
                            <Typography variant="h6" className="feedback-name">Emily Davis</Typography>
                            <Box display="flex" alignItems="center">
                              <Star style={{ color: '#ff7043' }} />
                              <Star style={{ color: '#ff7043' }} />
                              <Star style={{ color: '#ff7043' }} />
                              <Star style={{ color: '#ff7043' }} />
                              <Star style={{ color: '#ff7043' }} />
                            </Box>
                          </Box>
                        </Box>
                        <Typography variant="body2" className="feedback-text">
                          "Working with this organization has opened my eyes to the impact that a dedicated group of volunteers can make. Highly recommended!"
                        </Typography>
                        <Box mt={2} display="flex" alignItems="center">
                          <Favorite style={{ color: '#ff7043', marginRight: '5px' }} />
                          <Typography variant="body2" className="feedback-likes">75 Likes</Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              ))}
            </Carousel>
          </Box>
        </Grid>

      </Grid>
    </div>
  );
};

export default Organization;
