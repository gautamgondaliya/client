import React from 'react';
import "./headerinside.css";
import account from "../../image/account.svg";
import { useNavigate } from 'react-router-dom';

const Headerinside = ({ searchQuery, onSearch }) => {
    const navigate = useNavigate();

    const handleProfileClick = () => {
        navigate('/profile');
    };

    return (
        <div className="headerrightmain">
            <div className="searchbarright">
                
            </div>
            <div className="account_btn">
                <img src={account} alt="account-logo" onClick={handleProfileClick} />
            </div>
        </div>
    );
};

export default Headerinside;
