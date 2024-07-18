import React, { useState, useEffect } from 'react';
import './SendMessagePopup.css';
import axios from 'axios';
import { AiFillFilePdf } from 'react-icons/ai';
import upload_send from "../../image/upload_send.svg";
import folder_send from "../../image/folder_send.svg";
import cancel from "../../image/cancel.svg";

const SendMessagePopup = ({ onClose, selectedContacts, showNotification }) => {
  const [message, setMessage] = useState('');
  const [selectedMethods, setSelectedMethods] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [showMessageSent, setShowMessageSent] = useState(false);
  const [availableFiles, setAvailableFiles] = useState([]);
  const [showFilePopup, setShowFilePopup] = useState(false);

  useEffect(() => {
    let timer;
    if (showMessageSent) {
      timer = setTimeout(() => setShowMessageSent(false), 3000);
    }
    return () => clearTimeout(timer);
  }, [showMessageSent]);

  const handleMethodChange = (method) => {
    setSelectedMethods((prevMethods) =>
      prevMethods.includes(method)
        ? prevMethods.filter((m) => m !== method)
        : [...prevMethods, method]
    );
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = async () => {
    if (selectedContacts.length === 0) {
      showNotification('Please select at least one contact to send the message.', 'error');
      return;
    }

    if (!message && selectedFiles.length === 0) {
      showNotification('Please enter a message or attach a file before sending.', 'error');
      return;
    }

    const formData = new FormData();
    formData.append('message', message);
    formData.append('methods', selectedMethods.join(','));
    formData.append('contacts', JSON.stringify(selectedContacts));
    formData.append('userId', selectedContacts[0].userId);

    selectedFiles.forEach(file => {
      formData.append('files', file.filePath ? new File([], file.fileName) : file);
    });

    try {
      const response = await axios.post('http://localhost:5000/api/messages/send', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log('Message sent successfully:', response.data);
      setShowMessageSent(true);
      setSelectedFiles([]);
      setMessage('');
      showNotification('Message sent successfully!', 'success');
      onClose();
    } catch (error) {
      console.error('Error sending message:', error);
      showNotification('An error occurred while sending the message.', 'error');
    }
  };

  const fetchFiles = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/upload/files/${selectedContacts[0].userId}`);
      setAvailableFiles(response.data);
      setShowFilePopup(true);
    } catch (error) {
      console.error('Error fetching files:', error);
      showNotification('An error occurred while fetching files.', 'error');
    }
  };

  const handleFileSelect = (file) => {
    if (selectedFiles.some((selectedFile) => selectedFile.fileName === file.fileName)) {
      setSelectedFiles(selectedFiles.filter((selectedFile) => selectedFile.fileName !== file.fileName));
    } else {
      setSelectedFiles([...selectedFiles, file]);
    }
  };

  const handleRemoveFile = (index) => {
    const updatedFiles = [...selectedFiles];
    updatedFiles.splice(index, 1);
    setSelectedFiles(updatedFiles);
  };

  const handleFileUpload = (e) => {
    setSelectedFiles(Array.from(e.target.files));
  };

  return (
    <div className="send-message-popup-overlay">
      <div className="send-message-popup-content">
        <div className="send-message-popup-header">
          <h2>Send Message</h2>
          <button className="close-button" onClick={onClose}>
            <img src={cancel} alt="close" />
          </button>
        </div>
        <textarea
          value={message}
          onChange={handleMessageChange}
          placeholder="Enter your message"
          rows="5"
          className="message-textarea"
        />
        <div className="uploaded-files-list">
          <h3>Uploaded Files ({selectedFiles.length})</h3>
          <div className="uploaded-files">
            {selectedFiles.length > 0 && (
              <ul>
                {selectedFiles.map((file, index) => (
                  <li key={index} className="filename-btn-right-side">
                    {file.fileName}
                    <button onClick={() => handleRemoveFile(index)}>Remove</button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className="file-upload-section">
          <button onClick={fetchFiles} className="choose-file-btn-upload">
            <img src={upload_send} alt="icon" className="upload_send_icon" /> Uploaded Files
          </button>
          <label htmlFor="file-upload">
            <button className="choose-file-btn">
              <img src={folder_send} alt="icon" className="folder_send_icon" />
              <input type="file" id="file-upload" multiple onChange={handleFileUpload} />
              Choose file
            </button>
          </label>
        </div>
        <div className="send-methods">
          <h3>Send Methods</h3>
          <div className="method-options">
            <label>
              <input type="checkbox" value="email" onChange={() => handleMethodChange('email')} />
              Email
            </label>
            <label>
              <input type="checkbox" value="sms" onChange={() => handleMethodChange('sms')} />
              SMS
            </label>
            <label>
              <input type="checkbox" value="whatsapp" onChange={() => handleMethodChange('whatsapp')} />
              WhatsApp
            </label>
          </div>
        </div>
        <button className="send-message-button" onClick={handleSendMessage} disabled={message === '' && selectedFiles.length === 0}>
          Send Message
        </button>
        {showMessageSent && <div className="message-sent-notification">Message sent successfully!</div>}
      </div>

      {showFilePopup && (
        <div className="file-popup-overlay">
          <div className="file-popup-content">
            <h2>Select Files</h2>
            <div className="file-popup-files">
              {availableFiles.map((file, index) => (
                <div
                  key={index}
                  className={`file-item ${selectedFiles.some((selectedFile) => selectedFile.fileName === file.fileName) ? 'selected' : ''}`}
                  onClick={() => handleFileSelect(file)}
                >
                  {file.fileType.startsWith('image/') && (
                    <img src={`http://localhost:5000/${file.filePath}`} alt={file.fileName} className="file-popup-preview" />
                  )}
                  {file.fileType.startsWith('video/') && (
                    <video className="file-popup-preview" controls>
                      <source src={`http://localhost:5000/${file.filePath}`} type={file.fileType} />
                      Your browser does not support the video tag.
                    </video>
                  )}
                  {file.fileType === 'application/pdf' && (
                    <div className="pdf-icon">
                      <AiFillFilePdf size={50} />
                      <p className="pdf-file-font-size">{file.fileName}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <button onClick={() => setShowFilePopup(false)} className="close-btn-send">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SendMessagePopup;
