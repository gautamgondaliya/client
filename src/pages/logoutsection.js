import React, { useState } from "react";
import axiosInstance from '../utils/axiosInstance'; 

const LogoutSection = () => {
    const [showPopup, setShowPopup] = useState(false);

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
        <div className="logout-section">
            <button onClick={() => setShowPopup(true)}>Logout</button>
            {showPopup && (
                <div className="popup">
                    <div className="popup-content">
                        <p>Are you sure you want to logout?</p>
                        <button onClick={handleLogout}>Logout</button>
                        <button onClick={() => setShowPopup(false)}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LogoutSection;
