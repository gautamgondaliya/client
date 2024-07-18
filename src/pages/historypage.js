import React from "react";
import { connect } from "react-redux";
import Leftmenu from "./feature/leftmenu";
import Rightmenuhistory from "./historyfeature/rightmenuhistory";
import "./historypage.css";

const HistoryPage = () =>{
    return (

       <div className="main-historypage">
        <div className="leftside-section">
            <Leftmenu/>
        </div>
        <div className="verticalline"></div>
        <div className="rightside-section-history">
            <Rightmenuhistory/>
        </div>
       </div>

    )
}

export default HistoryPage;