import React from 'react';
import { connect } from 'react-redux';
import Leftmenu from "./leftmenu";
import RightmainAddContact from './rightmainaddcontacts';
import "./addcontact.css";

const AddContact = () =>{
    return (
        <div className="main-addcontactpage">
        
        
        < Leftmenu />
       
        <div className="verticalline"></div>
        
        < RightmainAddContact/>
      </div>
       
    )
}

export default AddContact;