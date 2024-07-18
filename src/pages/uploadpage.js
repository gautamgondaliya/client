import React from "react";
import { connect } from 'react-redux';
import Leftmenu from "./feature/leftmenu";

import "./uploadpage.css";
import Rightmenuupload from "./uploadfeature/rightmenuupload";

const UploadPage = () =>{
    return (
        <div className="main-uploadpage">
        <div className="leftside-section">
            <Leftmenu/>
        </div>
        <div className="verticalline"></div>
        <div className="rightside-section-upload">
        <Rightmenuupload/>
        </div>
       </div>

    )
}

export default UploadPage;