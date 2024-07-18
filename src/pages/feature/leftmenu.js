import React, { useState } from 'react';
import { connect } from 'react-redux';
import "./leftmenu.css";
import DashboardIcon from "../../image/Dashboard.svg";
import ContactsIcon from "../../image/contacts_main.svg";
import UploadIcon from "../../image/upload.svg";
import ClockIcon from "../../image/clock.svg";
import LogoutIcon from "../../image/logout.svg";
import LogoutPopIcon from "../../image/logout_pop.svg";
import axiosInstance from '../../utils/axiosInstance';

import { useNavigate, useLocation } from 'react-router-dom'; 

const Leftmenu = () => {
    const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate();
    const location = useLocation(); 

    const handleDashboardClick = () => {
        navigate('/dashboard');
    };

    const handleContactClick = () => {
        navigate('/contact');
    };

    const handleUploadClick = () => {
        navigate('/upload');
    };

    const handleHistoryClick = () => {
        navigate('/history');
    };

    const handleLogout = async () => {
        try {
           const response =  await axiosInstance.post('http://localhost:5000/api/logout'); // POST request to logout endpoint
            localStorage.removeItem('token'); // Clear token from localStorage
    
            console.log("Logging out...",response);
            setShowPopup(false); // Close popup after logout
            window.location.href = '/login'; // Redirect to login page
        } catch (error) {
            console.error("Logout failed:", error);
            // Handle logout failure if necessary
        }
    };
    

    return (
        <div className="main-leftmenu">
            <div className="leftlogo">
                <h1>Biz<span className="text-blue-left">Comm</span>Sync</h1>
            </div>
            <div className="menuleftbutton">
                <button className={`left-btn-pr ${location.pathname === '/dashboard' ? 'active' : ''}`} onClick={handleDashboardClick}><img src={DashboardIcon} alt="" className={`lefticon-btn ${location.pathname === '/dashboard' ? 'active-icon' : ''}`} />Dashboard</button>
                <button className={`left-btn-pr ${location.pathname === '/contact' ? 'active' : ''}`} onClick={handleContactClick}><img src={ContactsIcon} alt="" className={`lefticon-btn ${location.pathname === '/contact' ? 'active-icon' : ''}`} />Contacts</button>
                <button className={`left-btn-pr ${location.pathname === '/upload' ? 'active' : ''}`} onClick={handleUploadClick}><img src={UploadIcon} alt="" className={`lefticon-btn ${location.pathname === '/upload' ? 'active-icon' : ''}`} />Upload</button>
                <button className={`left-btn-pr ${location.pathname === '/history' ? 'active' : ''}`} onClick={handleHistoryClick}><img src={ClockIcon} alt="" className={`lefticon-btn ${location.pathname === '/history' ? 'active-icon' : ''}`} />History</button>
                <button className={`left-btn-pr ${showLogoutConfirmation ? 'active' : ''}`} onClick={() => setShowLogoutConfirmation(true)}><img src={LogoutIcon} alt="" className={`lefticon-btn ${showLogoutConfirmation ? 'active-icon' : ''}`} />Logout</button>
            </div>
            {showLogoutConfirmation && (
                <div className="logout-confirmation-overlay">
                    <div className="logout-confirmation">
                        <div className="logohadding">
                            <img src={LogoutPopIcon} alt="" />
                            <h3>Logout</h3>
                        </div>
                        <p>Are you sure you want to logout?</p>
                        <div className="logoutbtn">
                            <button onClick={() => setShowLogoutConfirmation(false)}>Cancel</button>
                            <button onClick={handleLogout}>Logout</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Leftmenu;
