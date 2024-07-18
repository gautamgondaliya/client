import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./rightaddconform.css";
import formimg from "../../image/formimg.svg";
import axiosInstance from '../../utils/axiosInstance';

const RightAddconForm = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        occupation: '',
        loan: ''
    });
    const [otp, setOtp] = useState('');
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [isVerified, setIsVerified] = useState(false);

    useEffect(() => {
        if (location.state && location.state.contact) {
            setFormData(location.state.contact);
        }
    }, [location.state]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handlePhoneChange = (e) => {
        const { value } = e.target;
        const phoneValue = value.startsWith('+91') ? value : `+91${value}`;
        setFormData(prevState => ({
            ...prevState,
            phone: phoneValue
        }));
    };

    const sendOtp = async () => {
        try {
            await axios.post('http://localhost:5000/api/verify/send-otp', { phone: formData.phone });
            setIsOtpSent(true);
            toast.success('OTP sent successfully!');
        } catch (error) {
            console.error('Error sending OTP:', error);
            toast.error('Failed to send OTP');
        }
    };

    const verifyOtp = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/verify/verify-otp', { phone: formData.phone, code: otp });
            if (response.status === 200) {
                setIsVerified(true);
                toast.success('Phone number verified successfully!');
            }
        } catch (error) {
            console.error('Error verifying OTP:', error);
            toast.error('Failed to verify OTP');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isVerified) {
            toast.warning('Please verify your phone number first');
            return;
        }

        const token = localStorage.getItem('token');
        console.log('Token before request:', token); // Debugging line
        try {
            if (formData._id) {
                await axiosInstance.put(`/contacts/contact/${formData._id}`, formData);
            } else {
                await axiosInstance.post('/contacts/contact', formData);
            }
            navigate('/contact');
        } catch (error) {
            console.error('Error saving contact:', error);
            toast.error('Error saving contact');
        }
    };

    return (
        <div className="mainaddcontact">
            <div className="leftsideform">
                <form id="loanForm" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name" className="contactsName">Contact Name</label>
                        <input 
                            type="text" 
                            id="name" 
                            name="name" 
                            placeholder="Name"
                            className="custom-input-phone-contact" 
                            value={formData.name}
                            onChange={handleChange}
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone" className="PhoneNumber">Phone Number</label>
                        <input 
                            type="tel" 
                            id="phone" 
                            name="phone"
                            placeholder="Phone Number" 
                            value={formData.phone}
                            className="custom-input-phone-contact" 
                            onChange={handlePhoneChange}
                            required 
                        />
                        <button type="button" onClick={sendOtp}  className="otp-btn-contacts" disabled={isOtpSent}>Send OTP</button>
                    </div>
                    {isOtpSent && (
                        <div className="form-group">
                            <label htmlFor="otp" className="Otp">Enter OTP</label>
                            <input 
                                type="text" 
                                id="otp" 
                                name="otp" 
                                placeholder="Enter OTP" 
                                value={otp}
                                className="custom-input-phone-contact" 
                                onChange={(e) => setOtp(e.target.value)}
                                required 
                            />
                            <button type="button" className="otp-btn-contacts" onClick={verifyOtp}>Verify OTP</button>
                        </div>
                    )}
                    <div className="form-group">
                        <label htmlFor="email" className="Emailaddress">Email Address</label>
                        <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            placeholder="Email Address" 
                            value={formData.email}
                            onChange={handleChange}
                            className="custom-input-phone-contact" 
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="occupation" className="occupation">Occupation</label>
                        <input 
                            type="text" 
                            id="occupation" 
                            name="occupation" 
                            placeholder="Occupation" 
                            value={formData.occupation}
                            onChange={handleChange}
                            className="custom-input-phone-contact" 
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="loan" className="loanamount">Loan (%)</label>
                        <input 
                            type="number" 
                            id="loan" 
                            name="loan" 
                            min="0" 
                            max="100" 
                            placeholder="Loan" 
                            className="custom-input-phone-contact" 
                            value={formData.loan}
                            onChange={handleChange}
                            required 
                        />
                    </div>
                    <div className="form-group-btn">
                        <button type="submit" className="btn-primary-submit">
                            {formData._id ? 'Update' : 'Submit'}
                        </button>
                    </div>
                </form>
            </div>
            <div className="rightsideform">
                <img src={formimg} alt="form image" />
            </div>
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar closeOnClick pauseOnFocusLoss draggable pauseOnHover />
        </div>
    );
}

export default RightAddconForm;
