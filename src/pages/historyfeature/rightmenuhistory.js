import React from "react";
import { connect } from "react-redux";
import Headerinside from "../feature/headerinside";
import "./rightmenuhistory.css";
import RightmainHistory from "./rightmainhistory"



const Rightmenuhistory = () =>{
    return (
       <div className="rightmenuhistory">
         <Headerinside/>
         <RightmainHistory/>
       
           
       </div>
    )
}

export default Rightmenuhistory;