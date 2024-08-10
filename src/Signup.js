import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import GoogleIcon from '@mui/icons-material/Google';
import AppleIcon from '@mui/icons-material/Apple';
import FacebookIcon from '@mui/icons-material/Facebook';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import InputAdornment from '@mui/material/InputAdornment';
import axios from 'axios';
import './Signup.css'; // Import the CSS file

const SignUp = () => {
  const navigate = useNavigate();

  // State management for inputs and errors
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmpassword: '',
  });

  const [errors, setErrors] = useState({
    usernameError: '',
    emailError: '',
    passwordError: '',
    confirmPasswordError: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let valid = true;
    const { username, email, password, confirmpassword } = formData;

    // Reset errors
    setErrors({
      usernameError: '',
      emailError: '',
      passwordError: '',
      confirmPasswordError: '',
    });

    if (!username) {
      setErrors((prevState) => ({ ...prevState, usernameError: 'Username is required.' }));
      valid = false;
    }

    if (!email) {
      setErrors((prevState) => ({ ...prevState, emailError: 'Email is required.' }));
      valid = false;
    }

    if (!password) {
      setErrors((prevState) => ({ ...prevState, passwordError: 'Password is required.' }));
      valid = false;
    }

    if (password !== confirmpassword) {
      setErrors((prevState) => ({ ...prevState, confirmPasswordError: 'Passwords do not match.' }));
      valid = false;
    }

    if (valid) {
      try {
        const response = await axios.post('http://localhost:9001/reg', formData);
        console.log('User registered:', response.data);
        alert('Registration successful');
        navigate('/');
      } catch (error) {
        console.error('There was an error registering the user!', error);
        alert('Registration failed');
      }
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-image-container">
        <img src="https://img.freepik.com/free-vector/solidarity-concept-illustration_114360-6286.jpg?t=st=1722004706~exp=1722008306~hmac=828eb10da046a5b9ea95209288529fd9a5d9837e453042b7bb5eda8fe39c54f4&w=900" alt="SignUp illustration" className="signup-image" />
      </div>
      <div className="signup-form-container">
        <form className="signup-form" onSubmit={handleSubmit}>
          <TextField
            id="username"
            name="username"
            label="UserName"
            variant="standard"
            fullWidth
            value={formData.username}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircleIcon sx={{ color: '#01352c' }} />
                </InputAdornment>
              ),
              sx: {
                '& .MuiInputBase-input': {
                  color: '#01352c', // Text color
                },
                '& .MuiInput-underline:before': {
                  borderBottomColor: '#01352c', // Unfocused underline color
                },
                '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                  borderBottomColor: '#01352c', // Hover underline color
                },
                '& .MuiInput-underline:after': {
                  borderBottomColor: '#01352c', // Focused underline color
                },
                '&.Mui-focused': {
                  '& .MuiInput-underline:after': {
                    borderBottomColor: '#01352c', // Focused underline color
                  },
                },
              },
            }}
          />
          {errors.usernameError && <div className="error-message" style={{ color: 'red' }}>{errors.usernameError}</div>}
          <br />
          <br />
          <TextField
            id="email"
            name="email"
            label="Email"
            variant="standard"
            fullWidth
            value={formData.email}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon sx={{ color: '#01352c' }} />
                </InputAdornment>
              ),
              sx: {
                '& .MuiInputBase-input': {
                  color: '#01352c', // Text color
                },
                '& .MuiInput-underline:before': {
                  borderBottomColor: '#01352c', // Unfocused underline color
                },
                '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                  borderBottomColor: '#01352c', // Hover underline color
                },
                '& .MuiInput-underline:after': {
                  borderBottomColor: '#01352c', // Focused underline color
                },
                '&.Mui-focused': {
                  '& .MuiInput-underline:after': {
                    borderBottomColor: '#01352c', // Focused underline color
                  },
                },
              },
            }}
          />
          {errors.emailError && <div className="error-message" style={{ color: 'red' }}>{errors.emailError}</div>}
          <br />
          <br />
          <TextField
            id="password"
            name="password"
            label="Password"
            variant="standard"
            type="password"
            fullWidth
            value={formData.password}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon sx={{ color: '#01352c' }} />
                </InputAdornment>
              ),
              sx: {
                '& .MuiInputBase-input': {
                  color: '#01352c', // Text color
                },
                '& .MuiInput-underline:before': {
                  borderBottomColor: '#01352c', // Unfocused underline color
                },
                '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                  borderBottomColor: '#01352c', // Hover underline color
                },
                '& .MuiInput-underline:after': {
                  borderBottomColor: '#01352c', // Focused underline color
                },
                '&.Mui-focused': {
                  '& .MuiInput-underline:after': {
                    borderBottomColor: '#01352c', // Focused underline color
                  },
                },
              },
            }}
          />
          {errors.passwordError && <div className="error-message" style={{ color: 'red' }}>{errors.passwordError}</div>}
          <br />
          <br />
          <TextField
            id="confirm-password"
            name="confirmpassword"
            label="Confirm Password"
            variant="standard"
            type="password"
            fullWidth
            value={formData.confirmPassword}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon sx={{ color: '#01352c' }} />
                </InputAdornment>
              ),
              sx: {
                '& .MuiInputBase-input': {
                  color: '#01352c', // Text color
                },
                '& .MuiInput-underline:before': {
                  borderBottomColor: '#01352c', // Unfocused underline color
                },
                '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                  borderBottomColor: '#01352c', // Hover underline color
                },
                '& .MuiInput-underline:after': {
                  borderBottomColor: '#01352c', // Focused underline color
                },
                '&.Mui-focused': {
                  '& .MuiInput-underline:after': {
                    borderBottomColor: '#01352c', // Focused underline color
                  },
                },
              },
            }}
          />
          {errors.confirmPasswordError && <div className="error-message" style={{ color: 'red' }}>{errors.confirmPasswordError}</div>}
          <br />
          <br />
          <button type="submit" className="signup-button">
            Sign Up
          </button>
          <br />
          <br />
          <Link to="/login" className="login-link">Already have an account? Login</Link>
          <br />
          <br />
          <div className="or-login-text">or sign up using</div>
          <div className="social-icons">
            <IconButton aria-label="google" size="large">
              <GoogleIcon fontSize="inherit" sx={{ color: 'black' }} />
            </IconButton>
            <IconButton aria-label="apple" size="large" sx={{ color: 'black' }}>
              <AppleIcon fontSize="inherit" />
            </IconButton>
            <IconButton aria-label="facebook" size="large" sx={{ color: 'black' }}>
              <FacebookIcon fontSize="inherit" />
            </IconButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
