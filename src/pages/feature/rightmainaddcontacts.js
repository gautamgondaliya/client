import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Headerinside from "./headerinside";
import RightAddconForm from './rightaddconform';
import "./rightmainaddcontacts.css";
import filter from "../../image/filter.svg";
import addcon from "../../image/addcon.svg";
import useradd from "../../image/useradd.svg";
import importi from "../../image/importi.svg";
import Papa from 'papaparse';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RightmainAddContact = () => {
    const navigate = useNavigate();
    const [csvData, setCsvData] = useState([]);

    const handleAddconClick = () => {
        navigate('/contact/addcontact');
    };

    const handleImportClick = () => {
        document.getElementById('csvFileInput').click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            Papa.parse(file, {
                header: true,
                complete: (result) => {
                    // Filter out records with missing required fields
                    const filteredData = result.data.filter(contact => (
                        contact.name && contact.email && contact.phone && contact.occupation && contact.loan
                    ));
                    setCsvData(filteredData);
                    console.log(filteredData); // Check the parsed and filtered data
                    uploadCsvData(filteredData);
                },
                error: (error) => {
                    console.error("Error parsing CSV file:", error);
                    toast.error("Error parsing CSV file.");
                }
            });
        }
    };

    const uploadCsvData = async (data) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('http://localhost:5000/api/contacts/import', data.map(contact => ({ ...contact, userId: token })), {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            console.log(response.data); // Check the response format
            toast.success("CSV data uploaded successfully!");

            // Update your frontend state or UI as needed
            if (response.data.result) {
                setCsvData(response.data.result);
            }

            // Clear csvData state after successful import
            setCsvData([]);

        } catch (error) {
            console.error("Error uploading CSV data:", error);
            toast.error("Error uploading CSV data.");
        }
    };

    return (
        <div className="main-rightisideaddcontact">
            <Headerinside/>
            <div className="firstsectionaddcontact">
                <div className="firstsection">
                    <div className="leftmaincon">
                        <h1 className="con-text">Contact</h1>
                    </div>
                    <div className="rightmaincon-btn">
                        <button className="btn-filter"><img src={filter} alt="" /> Filter</button>
                        <button className="btn-addcontact" onClick={handleAddconClick}><img src={addcon} alt="addcon" /> Add Contact</button>
                    </div>
                </div>
            </div>
            <div className="secondsectionaddcontact">
                <div className="rightsec-btn">
                    <button className="right-btn-text-all-contacts"><img src={useradd} alt="user" /> Contact Details</button>
                </div>
                <div className="rightseccon-btn">
                    <button className="left-btn-import" onClick={handleImportClick}><img src={importi} alt="import" /> Import</button>
                    <input
                        type="file"
                        id="csvFileInput"
                        accept=".csv"
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                    />
                </div>
            </div>
            <div className="thirdsectionhorizontalline"></div>
            <RightAddconForm/>
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar closeOnClick pauseOnFocusLoss draggable pauseOnHover />
        </div>
    );
}

export default RightmainAddContact;
