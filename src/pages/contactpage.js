import React from 'react';
import { connect } from 'react-redux';
import Leftmenu from './feature/leftmenu';
import "./contacts.css";
import Rightmenu from './feature/rightmenu';

const ContactPage = () =>{
    return (
      <div className="main-contactpage">
        
        <div className="leftside-section">
        < Leftmenu />
        </div>
        <div className="verticalline"></div>
        <div className="rightside-section">
        < Rightmenu />
          
          
      
        </div>
      </div>
    )
}

export default ContactPage;