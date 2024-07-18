import React from "react";
import { connect } from "react-redux";
import Headerinside from "../feature/headerinside";
import RightmainDash from "./rightmaindash";
import "./Rightmenudash.css";
import RightDoughnutChart from "./rightdoughnutchart";

import Rightlastsendlog from "./rightlastsendlog";



const Rightmenudash = () =>{
    return (
       <div className="rightdashboard">
         <Headerinside/>
         <RightmainDash/>
         <RightDoughnutChart/>
         <Rightlastsendlog/>
           
       </div>
    )
}

export default Rightmenudash;