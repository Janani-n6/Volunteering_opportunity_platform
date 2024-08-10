import React, { useState } from 'react';
import {
  Button, TextField, Container, Typography, Box, Grid, Paper, IconButton, ToggleButton, ToggleButtonGroup, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { CardGiftcard, Pets, Nature, Home } from '@mui/icons-material';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Import the toast CSS
import './Donate.css';

// Styled Button
const DonateButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#ff7043',
  '&:hover': {
    backgroundColor: '#ff8a65',
  },
}));

const Donate = () => {
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('creditCard');
  const [donationType, setDonationType] = useState('money'); // State for donation type
  const [productDetails, setProductDetails] = useState({
    type: '',
    address: '',
  });

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleDonationTypeChange = (event, newDonationType) => {
    if (newDonationType !== null) {
      setDonationType(newDonationType);
    }
  };

  const handleProductDetailsChange = (e) => {
    const { name, value } = e.target;
    setProductDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const validateMoneyDonation = () => {
    if (!amount) {
      toast.error('Please enter an amount for your donation.');
      return false;
    }
    if (paymentMethod === 'creditCard' || paymentMethod === 'debitCard') {
      // Check for credit card/debit card details
      const cardNumber = document.querySelector('input[placeholder="Card Number"]').value;
      const expiryDate = document.querySelector('input[placeholder="Expiry Date"]').value;
      const cvv = document.querySelector('input[placeholder="CVV"]').value;
      if (!cardNumber || !expiryDate || !cvv) {
        toast.error('Please fill in all card details.');
        return false;
      }
    }
    return true;
  };

  const validateProductDonation = () => {
    if (!productDetails.type || !productDetails.address) {
      toast.error('Please fill in all product donation details.');
      return false;
    }
    return true;
  };

  const handlePayment = () => {
    let isValid = false;
    if (donationType === 'money') {
      isValid = validateMoneyDonation();
    } else if (donationType === 'products') {
      isValid = validateProductDonation();
    }

    if (isValid) {
      // Payment gateway integration code
      console.log(`Processing payment of ₹${amount} using ${paymentMethod}`);
      toast.success('Donation processed successfully!');
    }
  };

  const [hoveredFAQ, setHoveredFAQ] = useState(null);

  const faqData = [
    {
      question: 'How will my donation be used?',
      answer: 'Your donation will be used to support various projects and initiatives.',
    },
    {
      question: 'Is my donation tax-deductible?',
      answer: 'Yes, all donations are tax-deductible to the extent allowed by law.',
    },
    {
      question: 'How can I be sure my donation is secure?',
      answer: 'We use industry-standard security measures to protect your information.',
    },
    {
      question: 'Can I choose where my donation goes?',
      answer: 'Yes, you can specify a preferred area or project for your donation.',
    },
    {
      question: 'How can I receive a receipt for my donation?',
      answer: 'You will receive a receipt via email after your donation is processed.',
    },
  ];

  return (
    <Container className="donate-page">
      <ToastContainer /> {/* Toast container for displaying toasts */}
      
      <Box className="header-container" component={Paper} p={3} mb={3}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="h4">Support Our Cause</Typography>
            <Typography variant="body1">Your donations make a difference. Help us continue our work by contributing today.</Typography>
            <Typography variant="h6" className="quote">"The best way to find yourself is to lose yourself in the service of others." - Mahatma Gandhi</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box className="image-container">
              <img src="./hello.png" alt="Support Our Cause" className="header-image" />
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Box className="donation-info-container" component={Paper} p={3} mb={3}>
        <Typography variant="h5">Where Your Donation Goes</Typography>
        <Typography variant="body1">Discover the impactful projects and transformative initiatives that your generous donations help bring to life.</Typography>
        <Grid container spacing={2} className="donation-grid">
          <Grid item xs={12} md={3}>
            <CardGiftcard className="donation-icon" />
            <Typography variant="h6">Children</Typography>
            <Typography variant="body2">Support children's education and welfare programs.</Typography>
          </Grid>
          <Grid item xs={12} md={3}>
            <Home className="donation-icon" />
            <Typography variant="h6">Homeless</Typography>
            <Typography variant="body2">Provide shelter and resources for the homeless.</Typography>
          </Grid>
          <Grid item xs={12} md={3}>
            <Pets className="donation-icon" />
            <Typography variant="h6">Animals</Typography>
            <Typography variant="body2">Help animals in need with food and medical care.</Typography>
          </Grid>
          <Grid item xs={12} md={3}>
            <Nature className="donation-icon" />
            <Typography variant="h6">Tree Planting</Typography>
            <Typography variant="body2">Support tree planting initiatives to fight climate change.</Typography>
          </Grid>
        </Grid>
      </Box>

      {/* Donation Type Selection */}
      <Box className="donation-type-container" component={Paper} p={3} mb={3}>
        <Typography variant="h5">Choose Donation Type</Typography>
        <ToggleButtonGroup
          value={donationType}
          exclusive
          onChange={handleDonationTypeChange}
          aria-label="Donation Type"
        >
          <ToggleButton value="money" aria-label="Monetary Donation">
            Monetary Donation
          </ToggleButton>
          <ToggleButton value="products" aria-label="Product Donation">
            Product Donation
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {donationType === 'money' && (
        <>
          <Box className="donation-amount-container" component={Paper} p={3} mb={3}>
            <Typography variant="h5" align="center">Choose Your Donation Amount</Typography>
            <Grid container spacing={2} className="amount-options">
              <Grid item xs={12} md={6}>
                <img src="https://i.pinimg.com/564x/58/f7/fa/58f7fa5d73ebc4d3a23b6d5fd5c437a6.jpg" alt="Donation Options" className="donation-amount-image" />
              </Grid>
              <Grid item xs={12} md={6} container spacing={2} alignItems="center">
                <Grid item>
                  <DonateButton variant="contained" onClick={() => setAmount(500)}>₹500</DonateButton>
                </Grid>
                <Grid item>
                  <DonateButton variant="contained" onClick={() => setAmount(1000)}>₹1000</DonateButton>
                </Grid>
                <Grid item>
                  <DonateButton variant="contained" onClick={() => setAmount(2500)}>₹2500</DonateButton>
                </Grid>
                <Grid item>
                  <TextField
                    label="Custom Amount"
                    value={amount}
                    onChange={handleAmountChange}
                    variant="outlined"
                  />
                </Grid>
                <Grid item>
                  <Typography variant="body1" className="encouragement-text">Your contribution can bring a significant impact. Every donation, big or small, helps us make a difference. Thank you for your generosity!</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Box>
          <Box className="payment-method-container" component={Paper} p={3} mb={3}>
            <Typography variant="h5">Select Payment Method</Typography>
            <FormControl component="fieldset">
              <FormLabel component="legend">Payment Method</FormLabel>
              <RadioGroup
                value={paymentMethod}
                onChange={handlePaymentMethodChange}
              >
                <FormControlLabel value="creditCard" control={<Radio />} label="Credit Card" />
                <FormControlLabel value="debitCard" control={<Radio />} label="Debit Card" />
                <FormControlLabel value="paypal" control={<Radio />} label="PayPal" />
                <FormControlLabel value="upi" control={<Radio />} label="UPI" />
              </RadioGroup>
            </FormControl>
            {paymentMethod === 'creditCard' && (
              <Box className="credit-card-form">
                <TextField
                  label="Card Number"
                  placeholder="Card Number"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Expiry Date"
                  placeholder="Expiry Date"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="CVV"
                  placeholder="CVV"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                />
              </Box>
            )}
            {paymentMethod === 'debitCard' && (
              <Box className="debit-card-form">
                <TextField
                  label="Card Number"
                  placeholder="Card Number"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Expiry Date"
                  placeholder="Expiry Date"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="CVV"
                  placeholder="CVV"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                />
              

              </Box>
            )}
            {paymentMethod === 'paypal' && (
              <Box className="paypal-form">
                <Typography variant="body1">You will be redirected to PayPal to complete your payment.</Typography>
              </Box>
            )}
            {paymentMethod === 'upi' && (
              <Box className="upi-form">
                <TextField
                  label="UPI ID"
                  placeholder="UPI ID"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                />
              </Box>
            )}
          </Box>
          <DonateButton variant="contained" onClick={handlePayment}>Donate Now</DonateButton>
        </>
      )}

      {donationType === 'products' && (
        <Box className="product-donation-form" component={Paper} p={3} mb={3}>
          <Typography variant="h5">Product Donation Details</Typography>
          <TextField
            label="Product Type"
            name="type"
            value={productDetails.type}
            onChange={handleProductDetailsChange}
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <TextField
            label="Address"
            name="address"
            value={productDetails.address}
            onChange={handleProductDetailsChange}
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <DonateButton variant="contained" onClick={handlePayment}>Donate Now</DonateButton>
        </Box>
      )}

<Box className="faq-container" component={Paper} p={3} mb={3}>
        <Typography variant="h5">Frequently Asked Questions</Typography>
        <Grid container spacing={2}>
          {faqData.map((faq, index) => (
            <Grid item xs={12} key={index}>
              <Box
  className={`faq-card ${hoveredFAQ === index ? 'hovered' : ''}`}
  onMouseEnter={() => setHoveredFAQ(index)}
  onMouseLeave={() => setHoveredFAQ(null)}
  p={2}
  border={1}
  borderColor="#ddd"
  borderRadius="4px"
>
  <Typography variant="h6">{faq.question}</Typography>
  <Typography variant="body2">{faq.answer}</Typography>
</Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box className="thank-you-container" component={Paper} p={3} mb={3}>
        <Typography variant="h5" align="center">Thank You!</Typography>
        <Typography variant="body1" align="center">We appreciate your support. Share your contribution on social media.</Typography>
        <Box className="social-media-icons" mt={2} display="flex" justifyContent="center">
          <IconButton aria-label="instagram" href="https://instagram.com">
            <InstagramIcon />
          </IconButton>
          <IconButton aria-label="facebook" href="https://facebook.com">
            <FacebookIcon />
          </IconButton>
          <IconButton aria-label="twitter" href="https://twitter.com">
            <TwitterIcon />
          </IconButton>
        </Box>
      </Box>
    </Container>
  );
};

export default Donate;