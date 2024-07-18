import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import "./signuppage.css";
import signup from "../image/sign_up.svg";
import google from "../image/google.svg";

const SignUppage = () => {
  const navigate = useNavigate(); 

  const handleLoginClick = () => navigate('/login');

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    mobile: '',
    address: '',
    password: '',
    confirmPassword: '',
    businessType: 'builder',
    agreeToTerms: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  const handleTogglePassword = () => setShowPassword(!showPassword);

  const handleToggleConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const validate = () => {
    let errors = {};
    if (!formData.username) errors.username = 'Username is required';
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email address is invalid';
    }
    if (!formData.password) errors.password = 'Password is required';
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    if (!formData.agreeToTerms) {
      errors.agreeToTerms = 'You must agree to the terms and conditions';
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length > 0) {
        setErrors(errors);
        return;
    }

    try {
        const response = await axios.post('http://localhost:5000/api/users/signup', formData);
        if (response.status === 201) {
            setFormData({
                username: '',
                email: '',
                mobile: '',
                address: '',
                password: '',
                confirmPassword: '',
                businessType: 'builder',
                agreeToTerms: false,
            });
            localStorage.setItem('token', response.data.token);
            navigate("/dashboard");
        }
    } catch (error) {
        setErrors({ form: 'Registration failed. Please try again.' });
    }
  };

  return (
    <div className="signup-page">
      <div className="custom-left-side" style={{ width: '576px', height: '422px' }}>
        <img src={signup} alt="" />
      </div>
      <div className="custom-right-side">
        <h1 style={{ textAlign: 'center', fontSize: '48px' }}>Biz<span className="text-blue">Comm</span>Sync</h1>
        <p style={{ textAlign: 'center', fontSize: '32px', marginTop: "-10px" }}>Welcome to our app</p>
        <div className="main-signuppage">
          <form onSubmit={handleSubmit} className="form-main">
            <input 
              type="text" 
              name="username"
              placeholder="Username" 
              className="custom-input" 
              value={formData.username}
              onChange={handleChange}
              required 
            />
            <input 
              type="email" 
              name="email"
              placeholder="name@gmail.com" 
              className="custom-input" 
              value={formData.email}
              onChange={handleChange}
              required 
            />
            <input 
              type="text" 
              name="mobile"
              placeholder="Mobile Number" 
              className="custom-input" 
              value={formData.mobile}
              onChange={handleChange}
              required 
            />
            <input 
              type="text" 
              name="address"
              placeholder="Address" 
              className="custom-input" 
              value={formData.address}
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
            <div className="custom-input custom-input-password">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                placeholder="Confirm Password"
                className="input-pass"
                value={formData.confirmPassword}
                onChange={handleChange}
                required 
              />
              <IconButton onClick={handleToggleConfirmPassword}>
                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </div>
            {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}
            
            <div className="type-selecter">
              <label>Business type</label>
              <select 
                className="custom-select"
                name="businessType"
                value={formData.businessType}
                onChange={handleChange}
              >
                <option value="builder">Builder</option>
                <option value="jeweller">Jeweller</option>
              </select>
            </div>
            
            <label className="policy-box">
              <input 
                type="checkbox"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleChange} 
                required 
              />
              I’ve read and agree with Terms of Service and our Privacy Policy
            </label>
            {errors.agreeToTerms && <p className="error-message">{errors.agreeToTerms}</p>}
            
            <button 
              type="submit" 
              className="custom-button-submit"
            >Sign Up</button>
            {message && <p className="success-message">{message}</p>}
            {errors.form && <p className="error-message">{errors.form}</p>}
          </form>
          <div className="already-account-signup">
            <p className="already-account-signup-p">Already have an account? <button className="signin-btn-on-signup" onClick={handleLoginClick}><span className="text-black">Sign in</span></button></p>
          </div>
          <div className="orlineinsection-signup">
            <div className="horizontallinestart-signup"></div>
            <h1 className="or-text-signup">or</h1>
            <div className="horizontallineend-signup"></div>
          </div>
          <div className="googlelineinsection">
            <button className="google-btn"> <img src={google} alt="" />Sign up with Google</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUppage;
