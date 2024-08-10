import React, { useState, useEffect } from 'react';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import GoogleIcon from '@mui/icons-material/Google';
import AppleIcon from '@mui/icons-material/Apple';
import FacebookIcon from '@mui/icons-material/Facebook';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import InputAdornment from '@mui/material/InputAdornment';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

const Login = ({ setIsLoggedIn, setUserData }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    emailError: '',
    passwordError: '',
  });

  const [termsAccepted, setTermsAccepted] = useState(false);
  const [termsError, setTermsError] = useState('');
  const [isAdmin, setIsAdmin] = useState(false); // Add state for admin status

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
    const { email, password } = formData;

    // Reset errors
    setErrors({
      emailError: '',
      passwordError: '',
    });

    if (!email) {
      setErrors((prevState) => ({ ...prevState, emailError: 'Email is required.' }));
      valid = false;
    }

    if (!password) {
      setErrors((prevState) => ({ ...prevState, passwordError: 'Password is required.' }));
      valid = false;
    }

    if (!termsAccepted) {
      setTermsError('You must accept the terms and conditions.');
      valid = false;
    } else {
      setTermsError('');
    }

    if (valid) {
      try {
        const response = await axios.post('http://localhost:9001/login', formData);
        const userData = response.data;
        if (userData) {
          setUserData({
            profileImage: 'https://static.thenounproject.com/png/2265555-200.png',
            name: userData.username,
          });
          setIsLoggedIn(true);

          const isUserAdmin = userData.email.includes('.admin');
          setIsAdmin(isUserAdmin); // Update the admin status
          
          if (isUserAdmin) {
            navigate('/admin/dashboard', { state: { adminData: userData } });
          } else {
            navigate('/');
          }
        } else {
          alert('Invalid login credentials');
        }
      } catch (error) {
        console.error('There was an error logging in!', error);
        alert('Login failed');
      }
    }
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="login-container">
      <div className="login-image-container">
        <img src="https://img.freepik.com/free-vector/solidarity-concept-illustration_114360-6286.jpg?t=st=1722004706~exp=1722008306~hmac=828eb10da046a5b9ea95209288529fd9a5d9837e453042b7bb5eda8fe39c54f4&w=900" alt="Login illustration" className="login-image" />
      </div>
      <div className="login-form-container">
        <form className="login-form" onSubmit={handleSubmit}>
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
                  <AccountCircleIcon sx={{ color: '#01352c' }} />
                </InputAdornment>
              ),
              sx: {
                '& .MuiInputBase-input': {
                  color: '#01352c',
                },
                '& .MuiInput-underline:before': {
                  borderBottomColor: '#01352c',
                },
                '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                  borderBottomColor: '#01352c',
                },
                '& .MuiInput-underline:after': {
                  borderBottomColor: '#01352c',
                },
                '&.Mui-focused': {
                  '& .MuiInput-underline:after': {
                    borderBottomColor: '#01352c',
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
                  color: '#01352c',
                },
                '& .MuiInput-underline:before': {
                  borderBottomColor: '#01352c',
                },
                '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                  borderBottomColor: '#01352c',
                },
                '& .MuiInput-underline:after': {
                  borderBottomColor: '#01352c',
                },
                '&.Mui-focused': {
                  '& .MuiInput-underline:after': {
                    borderBottomColor: '#01352c',
                  },
                },
              },
            }}
          />
          {errors.passwordError && <div className="error-message" style={{ color: 'red' }}>{errors.passwordError}</div>}
          <br />
          <br />
          <div className="terms-container">
            <Checkbox
              size="small"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
            />
            <span className="terms-text">Accept Terms and Conditions</span>
            {termsError && <div className="error-message" style={{ color: 'red' }}>{termsError}</div>}
          </div>
          <br />
          <button type="submit" className="login-button">
            Login
          </button>
          <br />
          <br />
          <Link to="/register" className="register-link">Don't have an account? Sign Up</Link>
          <br />
          <br />
          <div className="or-login-text">or login using</div>
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

export default Login;
