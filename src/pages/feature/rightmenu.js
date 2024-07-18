import React from 'react';
import { connect } from 'react-redux';
import "./rightmenu.css"
import Headerinside from './headerinside';
import Rightmaincontacts from './rightmaincontacts';


const Rightmenu = () =>{

   

   

    return (
        <div className="right-main">
           <Headerinside  />
            <Rightmaincontacts />
        </div>
    )
}

export default Rightmenu;