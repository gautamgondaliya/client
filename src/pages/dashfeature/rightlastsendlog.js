import React, { useState, useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance";
import "./rightlastsendlog.css";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// images
import message_message from "../../image/message_message.svg";
import email_message from "../../image/email_message.svg";
import whatsapp_message from "../../image/whatsapp_message.svg";

const RightLastSendLog = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await axiosInstance.get('/dashboard/last-logs');
        setLogs(response.data);
      } catch (error) {
        console.error('Error fetching last logs:', error);
        toast.error(`Error fetching last logs: ${error.message}`);
      }
    };

    fetchLogs();
  }, []);

  const renderMethodIcon = (methods) => {
    const icons = {
      sms: <img src={message_message} alt="SMS" />,
      email: <img src={email_message} alt="Email" />,
      whatsapp: <img src={whatsapp_message} alt="WhatsApp" />
    };

    return methods.map(method => icons[method] || null);
  };

  return (
    <div className="main-right-lastlogsection">
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      <div className="secondlastlogsection">
        <div className="lastlogsection">
          <div className="mainnamehaddingsectionlastlog">
            <h2 className="texthaddinglastlog hlastlog-name">Name</h2>
            <h2 className="texthaddinglastlog hlastlog-date">Date</h2>
            <h2 className="texthaddinglastlog hlastlog-id">ID</h2>
            <h2 className="texthaddinglastlog hlastlog-icon">Message</h2>
          </div>
          <div className="dataoflastlogsection">
            {logs.length > 0 ? (
              logs.map(log => (
                <div className="datafeatchintoapilastlog" key={log._id}>
                  <h2 className="textlastlog lastlog-name">{log.contactName || "Unknown"}</h2>
                  <h2 className="textlastlog lastlog-date">{new Date(log.createdAt).toLocaleString()}</h2>
                  <h2 className="textlastlog lastlog-id">{log._id}</h2>
                  <h2 className="textlastlog lastlog-icon">
                    <div className="messageimglastlog">
                      {renderMethodIcon(log.methods)}
                    </div>
                  </h2>
                </div>
              ))
            ) : (
              <div className="no-data-message">No data available</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightLastSendLog;