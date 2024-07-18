import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance from '../../utils/axiosInstance'; // Axios instance configured with headers
import defaultProfile from "../../image/profile_user.svg";
import "./rightmainprofile.css";

const RightMainProfile = () => {
    const [userId, setUserId] = useState(null);
    const [totalConnections, setTotalConnections] = useState(0);
    const [profileData, setProfileData] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        occupation: "",
        clientsCount: 0,
        profileImage: defaultProfile,
    });

    // Fetch user ID on component mount
    useEffect(() => {
        const fetchUserId = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('No token found');
                }
                const response = await axiosInstance.get('/users/me');
                setUserId(response.data.user._id); // Set user ID from backend response
                console.log('Fetched userId with token:', token);
            } catch (error) {
                console.error('Error fetching userId:', error);
                toast.error(`Error fetching userId: ${error.message}`);
            }
        };
        fetchUserId();
    }, []);

    // Fetch user data based on user ID
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axiosInstance.get(`/users/${userId}`);
                const userData = response.data;
                setProfileData({
                    name: userData.username,
                    email: userData.email,
                    phone: userData.phone,
                    address: userData.address,
                    occupation: userData.businessType,
                    clientsCount: userData.clientsCount,
                    profileImage: userData.profileImage || defaultProfile,
                });
            } catch (error) {
                console.error("Error fetching user data:", error);
                toast.error(`Error fetching user data: ${error.message}`);
            }
        };

        if (userId) {
            fetchUserData();
        }
    }, [userId]);

    // Fetch total connections (example)
    useEffect(() => {
        const fetchTotalConnections = async () => {
            try {
                const response = await axiosInstance.get('/users/total-connections');
                setTotalConnections(response.data.totalConnections);
            } catch (error) {
                console.error('Error fetching total connections:', error);
                toast.error(`Error fetching total connections: ${error.message}`);
            }
        };

        fetchTotalConnections();
    }, []);

    return (
        <div className="rightmainprofile-ggm">
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
            <div className="firstsection-ggm">
                <div className="thiredsection-ggm">
                    <div className="profileImage-ggm">
                        <label htmlFor="profileImageInput">
                            <img
                                src={profileData.profileImage}
                                alt="Profile"
                                className="profile-image-size-ggm"
                            />
                        </label>
                    </div>
                    <div className="username-profile-ggm">
                        <h1 className="userName-main-ggm">{profileData.name}</h1>
                        <h4 className="userName-second-text-ggm">{profileData.address}</h4>
                        <h3 className="userName-third-phone-ggm">{profileData.phone}</h3>
                        <h3 className="userName-forth-email-ggm">{profileData.email}</h3>
                        <h2 className="userName-Business-work-show-ggm">
                            {profileData.occupation}
                        </h2>
                        <div className="show-borod-ggm">
                            <div className="client-profile-btn-ggm">
                                <h1 className="show-borod-count-ggm">{totalConnections}</h1>
                                <h4 className="show-borod-name-ggm">Clients</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RightMainProfile;
