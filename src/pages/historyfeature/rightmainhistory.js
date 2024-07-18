import React, { useState, useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./rightmainhistory.css";

// images
import message_message from "../../image/message_message.svg";
import email_message from "../../image/email_message.svg";
import whatsapp_message from "../../image/whatsapp_message.svg";
import clock_small from "../../image/clock_small.svg";

const RightmainHistory = () => {
    const [logs, setLogs] = useState([]);
    const [year, setYear] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1); // Pagination state, starting at page 1
    const [pageSize, setPageSize] = useState(10); // Number of items per page
    const [total, setTotal] = useState(0); // Total number of items

    useEffect(() => {
        fetchHistory('lastWeek'); // Fetch initial data for last week
    }, []); // Empty dependency array ensures useEffect runs only once

    const fetchHistory = async (range) => {
        try {
            setLoading(true); // Set loading to true before fetch
            const response = await axiosInstance.get('/history/history-data', {
                params: { range, year, page, pageSize } 
            });
            setLogs(response.data.messages);
            setTotal(response.data.total); // Set total count from backend response
            setLoading(false); // Set loading to false after successful fetch
        } catch (error) {
            console.error('Error fetching history:', error);
            setError(error); // Set error state
            setLoading(false); // Set loading to false after error
            toast.error(`Error fetching history: ${error.message}`);
        }
    };

    const handleRangeClick = (range) => {
        setPage(1); // Reset page to 1 when changing range
        fetchHistory(range);
    };

    const handleYearSelect = (event) => {
        const selectedYear = event.target.value;
        setYear(selectedYear);
        setPage(1); // Reset page to 1 when changing year
        if (selectedYear) {
            fetchHistory(selectedYear);
        } else {
            setLogs([]); // Clear logs if no year is selected
            setTotal(0); // Reset total count
        }
    };

    const renderMethodIcon = (methods) => {
        const icons = {
            sms: <img src={message_message} alt="SMS" key="sms" />,
            email: <img src={email_message} alt="Email" key="email" />,
            whatsapp: <img src={whatsapp_message} alt="WhatsApp" key="whatsapp" />
        };

        return methods.map((method, index) => icons[method] || <div key={index}>Unknown</div>);
    };

    const handleNextPage = () => {
        setPage(prevPage => prevPage + 1); // Increment page number
    };

    const handlePrevPage = () => {
        if (page > 1) {
            setPage(prevPage => prevPage - 1); // Decrement page number, ensuring it doesn't go below 1
        }
    };

    useEffect(() => {
        fetchHistory('lastWeek'); // Fetch initial data for last week
    }, [page]); // Trigger fetchHistory whenever page changes

    return (
        <div className="main-right-historysection">
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
            <div className="firsthistorysection">
                <div className="textlefthistory">
                    <img src={clock_small} alt="" className="clockimg" />
                    <h1 className="main-text-left">History</h1>
                </div>
            </div>

            {/* Buttons for time range */}
            <div className="last-btn-section-year">
                <div className="last-btn">
                    <button onClick={() => handleRangeClick('lastWeek')}>Last Week</button>
                    <button onClick={() => handleRangeClick('lastMonth')}>Last Month</button>
                    <button onClick={() => handleRangeClick('lastYear')}>Last Year</button>
                </div>
                {/* Dropdown for selecting a specific year */}
                <div className="yearselection">
                    <select className="year-selection-btn-history" onChange={handleYearSelect}>
                        <option value="">Select Year</option>
                        <option value="2024">2024</option>
                        <option value="2025">2025</option>
                    </select>
                </div>
            </div>

            <div className="secondhistorysection">
                <div className="historysection">
                    <div className="mainnamehaddingsection">
                        <h2 className="texthadding h-name">Name</h2>
                        <h2 className="texthadding h-date">Date</h2>
                        <h2 className="texthadding h-id">ID</h2>
                        <h2 className="texthadding h-icon">Message</h2>
                    </div>
                    <div className="dataofhistorysection">
                        {loading ? (
                            <div>Loading...</div>
                        ) : error ? (
                            <div>Error fetching data: {error.message}</div>
                        ) : logs.length > 0 ? (
                            logs.map(log => (
                                <div className="datafeatchintoapi" key={log._id}>
                                    <h2 className="texthadding s-name">{log.contactName || "Unknown"}</h2>
                                    <h2 className="texthadding s-date">{new Date(log.createdAt).toLocaleString()}</h2>
                                    <h2 className="texthadding s-id">{log._id}</h2>
                                    <h2 className="texthadding s-icon">
                                        <div className="messageimg">
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

                {/* Pagination controls */}
                <div className="pagination-section">
                    <button className="pagination-section-prev" onClick={handlePrevPage} disabled={page === 1}>Previous</button>
                    <button className="pagination-section-next" onClick={handleNextPage} disabled={logs.length < pageSize || (page * pageSize) >= total}>Next</button>
                </div>
            </div>
        </div>
    );
};

export default RightmainHistory;
