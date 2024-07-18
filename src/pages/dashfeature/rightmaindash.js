import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import "./rightmaindash.css";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Images
import layout from "../../image/layout.svg";
import userpers from "../../image/userpers.svg";
import RightgraphSec from "./rightgraphsec";

const RightmainDash = () => {
    const [totalConnections, setTotalConnections] = useState(0);
    const [messageCount, setMessageCount] = useState(0);

    useEffect(() => {
        const fetchTotalConnections = async () => {
            try {
                const response = await axiosInstance.get('/users/total-connections');
                setTotalConnections(response.data.totalConnections);
            } catch (error) {
                console.error('Error fetching total connections:', error);
                toast.error(`Error fetching total connections: ${error.message}`);
            }
        };

        fetchTotalConnections();
    }, []);

    useEffect(() => {
        const fetchMessageCount = async () => {
            try {
                const response = await axiosInstance.get('/dashboard/messageCountToday');
                setMessageCount(response.data.messageCount);
            } catch (error) {
                console.error('Error fetching message count:', error);
                toast.error(`Error fetching message count: ${error.message}`);
            }
        };

        fetchMessageCount();
    }, []);

    return (
        <div className="main-rightdahboard-con">
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
            <div className="firstsectiontext">
                <div className="textleftdash">
                    <img src={layout} alt="" className="layoutimg" />
                    <h1 className="main-text-left">Dashboard</h1>
                </div>
            </div>
            <div className="secondsectiondash">
                <div className="firstpart">
                    <h2 className="h2maintext">Total message</h2>
                    <h1>150</h1>
                </div>
                <div className="verticalline-small"></div>
                <div className="secondpart">
                    <h2 className="h2maintext">Today message Send</h2>
                    <h1>{messageCount}</h1>
                </div>
                <div className="verticalline-small"></div>
                <div className="thirdpart">
                    <h2 className="h2maintext">Not send message</h2>
                    <h1>138</h1>
                </div>
                <div className="verticalline-small"></div>
                <div className="forthpart">
                    <h2 className="h2maintext">Total person connect</h2>
                    <div className="h1lasttextuser">
                        <h1><img src={userpers} alt="" />{totalConnections}</h1>
                    </div>
                </div>
            </div>
            <div className="thirdsectiondash">
                <RightgraphSec />
            </div>
        </div>
    );
}

export default RightmainDash;
