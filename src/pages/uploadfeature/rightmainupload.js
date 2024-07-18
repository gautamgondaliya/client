import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useFileContext } from "../../contexts/FileContext";
import axiosInstance from "../../utils/axiosInstance";
import SuccessMessage from "./SuccessMessage";
import { AiFillFilePdf } from "react-icons/ai";
import "./rightmainupload.css";
import 'react-toastify/dist/ReactToastify.css';

const RightmainUpload = () => {
    const { uploadedFiles, setUploadedFiles, selectedFiles, setSelectedFiles } = useFileContext();
    const [uploadError, setUploadError] = useState(null);
    const [filterType, setFilterType] = useState("all");
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [selectedUploadedFiles, setSelectedUploadedFiles] = useState([]);

    useEffect(() => {
        const fetchUploadedFiles = async () => {
            try {
                const response = await axiosInstance.get('/upload/uploaded-files');
                setUploadedFiles(response.data.reverse());
            } catch (error) {
                console.error('Error fetching uploaded files:', error);
                toast.error(`Error fetching uploaded files: ${error.message}`);
            }
        };

        fetchUploadedFiles();
    }, [setUploadedFiles]);

    const handleFileChange = (event) => {
        const files = event.target.files;
        const allowedTypes = ["image/*", "video/*", "application/pdf"];
        const filteredFiles = Array.from(files).filter(file =>
            allowedTypes.some(type => file.type.match(type))
        );
        setSelectedFiles(filteredFiles);
    };

    const handleUpload = async () => {
        const formData = new FormData();
        selectedFiles.forEach(file => {
            formData.append('files', file);
        });

        try {
            const response = await axiosInstance.post('/upload/upload-file', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Upload successful:', response.data);
            setUploadedFiles(prev => [...response.data.files.reverse(), ...prev]);
            setSelectedFiles([]);
            setShowSuccessMessage(true);
            setTimeout(() => setShowSuccessMessage(false), 3000);
        } catch (error) {
            console.error('Error uploading files:', error);
            toast.error(`Error uploading files: ${error.response?.data?.message || 'An error occurred while uploading files.'}`);
        }
    };

    const handleFilter = (type) => {
        setFilterType(type);
    };

    const handleSelectFile = (fileId) => {
        setSelectedUploadedFiles(prev =>
            prev.includes(fileId)
                ? prev.filter(id => id !== fileId)
                : [...prev, fileId]
        );
    };

    const handleCheckboxClick = (e, fileId) => {
        e.stopPropagation();
        handleSelectFile(fileId);
    };

    const handleSelectAll = () => {
        if (selectedUploadedFiles.length === filteredFiles.length) {
            setSelectedUploadedFiles([]);
        } else {
            setSelectedUploadedFiles(filteredFiles.map(file => file._id));
        }
    };

    const handleDeleteSelected = async () => {
        try {
            await axiosInstance.post('/upload/delete-files', { fileIds: selectedUploadedFiles });
            setUploadedFiles(prev => prev.filter(file => !selectedUploadedFiles.includes(file._id)));
            setSelectedUploadedFiles([]);
        } catch (error) {
            console.error('Error deleting files:', error);
            toast.error(`Error deleting files: ${error.message}`);
        }
    };

    const filteredFiles = uploadedFiles.filter(file => {
        if (filterType === "all") return true;
        if (filterType === "image" && file.fileType.startsWith("image/")) return true;
        if (filterType === "video" && file.fileType.startsWith("video/")) return true;
        if (filterType === "pdf" && file.fileType === "application/pdf") return true;
        return false;
    });

    return (
        <div className="mainuploadsection">
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
            {showSuccessMessage && <SuccessMessage message="Files uploaded successfully!" />}
            <div className="firstsectionupload">
                <div className="haddingh1">
                    <h1>Upload</h1>
                </div>
                <div className="upload-btn-main">
                    <div className="btn-upload">
                        <label htmlFor="file-input" className="btn-upload-img">
                            Select file
                        </label>
                        <input id="file-input" type="file" onChange={handleFileChange} style={{ display: 'none' }} multiple />
                    </div>
                    <button className="btn-upload-btn" onClick={handleUpload}> Upload </button>
                </div>
            </div>
            <div className="secondsectionupload">
                <div className="second-btn">
                    <button 
                        onClick={() => handleFilter("image")} 
                        className={filterType === "image" ? 'active' : ''}
                    >
                        Image
                    </button>
                    <button 
                        onClick={() => handleFilter("video")} 
                        className={filterType === "video" ? 'active' : ''}
                    >
                        Video
                    </button>
                    <button 
                        onClick={() => handleFilter("pdf")} 
                        className={filterType === "pdf" ? 'active' : ''}
                    >
                        Pdf
                    </button>
                </div>
                <div className="horizontalline-this"></div>
            </div>
            <div className="selected-files">
                {selectedFiles.map((file, index) => (
                    <div key={index} className="file-item">
                        <span>{file.name}</span>
                    </div>
                ))}
            </div>

            <div className="uploaded-files-actions">
                <button onClick={handleSelectAll}>
                    {selectedUploadedFiles.length === filteredFiles.length ? 'Unselect All' : 'Select All'}
                </button>
                <button onClick={handleDeleteSelected} disabled={selectedUploadedFiles.length === 0}>
                    Delete Selected
                </button>
            </div>

            <div className="uploaded-files">
                {filteredFiles.map((file, index) => (
                    <div
                        key={index}
                        className={`file-item ${selectedUploadedFiles.includes(file._id) ? 'selected' : ''}`}
                        onClick={() => handleSelectFile(file._id)}
                    >
                        <input 
                            type="checkbox" 
                            checked={selectedUploadedFiles.includes(file._id)} 
                            onClick={(e) => handleCheckboxClick(e, file._id)}
                            onChange={() => {}}
                        />
                        {file.fileType.startsWith("image/") && (
                            <img src={`http://localhost:5000/${file.filePath}`} alt={file.fileName} />
                        )}
                        {file.fileType.startsWith("video/") && (
                            <video className="mainimgs" controls>
                                <source src={`http://localhost:5000/${file.filePath}`} type={file.fileType} />
                                Your browser does not support the video tag.
                            </video>
                        )}
                        {file.fileType === "application/pdf" && (
                            <div className="pdf-icon">
                                <AiFillFilePdf size={100} />
                                <p className="pdf-file-font-size">{file.fileName}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {uploadError && <p className="error-message">{uploadError}</p>}
        </div>
    );
};

export default RightmainUpload;
