import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import "./loginpage.css";
import loginImage from "../image/loginimage.svg";
import google from "../image/google.svg";

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [userId, setUserId] = useState(null); 

  const navigate = useNavigate(); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    let errors = {};
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email address is invalid';
    }
    if (!formData.password) errors.password = 'Password is required';
    return errors;
  };

  const handleTogglePassword = () => setShowPassword(!showPassword);

  const handleSignUpClick = () => navigate('/signup');
  
  const handleForgotPassword = () => navigate('/forgetpassword');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/users/login', formData);
      localStorage.setItem('token', response.data.token);
      await fetchUserId(); // Ensure userId is fetched after login
      navigate("/contact");
      setFormData({ email: '', password: '' });
    } catch (error) {
      setErrors({ form: 'Login failed. Please try again.' });
    }
  };

  const fetchUserId = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await axios.get('http://localhost:5000/api/users/me', config);

      if (response.status === 200) {
        setUserId(response.data._id);
      } else {
        console.error('Unexpected response:', response);
      }
    } catch (error) {
      console.error('Error fetching userId:', error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) fetchUserId();
  }, []);
  
 
  

  return (
    <div className="login-page">
      <div className="custom-left-side-login" style={{ width: '576px', height: '422px' }}>
        <img src={loginImage} alt="" />
      </div>
      <div className="custom-right-side-login">
        <h1 style={{ textAlign: 'center', fontSize: '48px' }}>Biz<span className="text-blue">Comm</span>Sync</h1>
        <p style={{ textAlign: 'center', fontSize: '32px' }}>Welcome back!</p>
        <form onSubmit={handleSubmit} className="form-main">
          <input 
            type="email" 
            name="email"
            placeholder="name@gmail.com" 
            className="custom-input" 
            value={formData.email}
            onChange={handleChange}
            required 
          />
          <div className="custom-input custom-input-password">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              className="input-pass"
              value={formData.password}
              onChange={handleChange}
              required 
            />
            <IconButton onClick={handleTogglePassword}>
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </div>
          <div className="rememmbersection">
            <label className="policy-box-login">
              <input type="checkbox" />
              Remember me
            </label>
            <div className="forgot-password">
              <button type="button" className="forgot-password-btn" onClick={handleForgotPassword}>Forgot your password?</button>
            </div>
          </div>
          <button type="submit" className="custom-button-submit">Login</button>
        </form>
        <div className="already-account-login">
          <p className="already-account-login-p">Already have an account? <button className="signup-btn-on-login" onClick={handleSignUpClick}><span className="text-black">Sign up</span></button></p>
        </div>
        <div className="orlineinsection-login">
          <div className="horizontallinestart-login"></div>
          <h1 className="or-text-login">or</h1>
          <div className="horizontallineend-login"></div>
        </div>
        <div className="googlelineinsection">
          <button className="google-btn" ><img src={google} alt="" />Sign in with Google</button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
