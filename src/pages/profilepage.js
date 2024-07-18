import React from "react";
import { connect } from "react-redux";
import "./profilepage.css";
import Leftmenu from "./feature/leftmenu";
import RightMenuProfile from "./profilefeture/rightmenuprofile";



const ProfilePage = () =>{
    return (
        <div className="main-profilepage">
        <div className="leftside-section">
            <Leftmenu/>
        </div>
        <div className="verticalline"></div>
        <div className="rightside-section-profile">
            <RightMenuProfile/>
        </div>
       </div>

    )
}

export default ProfilePage;