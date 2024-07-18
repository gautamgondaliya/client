import React from "react";
import { connect } from "react-redux";
import Headerinside from "../feature/headerinside";
import RightMainProfile from "./rightmainprofile";
import "./rightmenuprofile.css";


const RightMenuProfile = () =>{

  const userId = localStorage.getItem('userId');
    return (
        <div className="rightmenuprofile">
       
      <RightMainProfile userId={userId} /> 
       
      </div>
    )
}

export default RightMenuProfile;