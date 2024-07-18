import React from "react";
import { connect } from 'react-redux';
import Leftmenu from "./feature/leftmenu";
import Rightmenudash from "./dashfeature/Rightmenudash";
import "./dashboardpage.css";



const DashboardPage = () =>{
    return (
        <div className="main-dashboardpage">
        
        <div className="leftside-section">
        < Leftmenu />
        </div>
        <div className="verticalline"></div>
        <div className="rightside-dashsection">
        <Rightmenudash/>
          
          
      
        </div>
      </div>
    )
}
export default DashboardPage;