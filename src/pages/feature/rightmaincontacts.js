import React, { useState, useEffect } from 'react';
import './rightmaincontacts.css';
import { useNavigate } from 'react-router-dom';
import SendMessagePopup from './SendMessagePopup';
import axiosInstance from '../../utils/axiosInstance'; 
import DeleteConfirmationPopup from './DeleteConfirmationPopup';
import ContactDropdown from './contactDropdown';
import useContactSearch from '../../utils/useContactSearch'; 
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import filter from '../../image/filter.svg';
import addcon from '../../image/addcon.svg';
import send from '../../image/send.svg';
import deleteb from '../../image/deleteb.svg';
import more from '../../image/more.svg';

const Rightmaincontacts = () => {
    const navigate = useNavigate();
    const { searchQuery, filteredContacts, handleSearch } = useContactSearch(); 

    const [contacts, setContacts] = useState([]);
    const [showSendMessagePopup, setShowSendMessagePopup] = useState(false);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [selectAll, setSelectAll] = useState(false);
    const [selectedContacts, setSelectedContacts] = useState([]);
    const [openDropdown, setOpenDropdown] = useState(null);
    const [showMessageSentNotification, setShowMessageSentNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');
    const [userId, setUserId] = useState(null);
    const [contactToMessage, setContactToMessage] = useState(null);

    useEffect(() => {
        const fetchUserId = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axiosInstance.get('/users/me');
                setUserId(response.data._id);
                console.log('Fetching userId with token:', token);
            } catch (error) {
                console.error('Error fetching userId:', error);
                toast.error('Error fetching user information. Please Refresh app');
            }
        };
        fetchUserId();
    }, []);

    useEffect(() => {
        // Update local state when filteredContacts change
        setContacts(filteredContacts);
    }, [filteredContacts]);

    const handleAddconClick = () => {
        navigate('/contact/addcontact');
    };

    const handleSendButtonClick = () => {
        setShowSendMessagePopup(true);
        console.log('Send button clicked');
    };

    const handleCloseSendMessagePopup = () => {
        setShowSendMessagePopup(false);
    };

    const handleDeleteButtonClick = () => {
        setShowDeleteConfirmation(true);
    };

    const handleDeleteCancel = () => {
        setShowDeleteConfirmation(false);
    };

    const handleSelectAllChange = () => {
        const newSelectAll = !selectAll;
        setSelectAll(newSelectAll);
        if (newSelectAll) {
            setSelectedContacts(filteredContacts.map(contact => contact._id));
        } else {
            setSelectedContacts([]);
        }
    };

    const handleContactCheckboxChange = (contactId) => {
        setSelectedContacts(prevSelected =>
            prevSelected.includes(contactId)
                ? prevSelected.filter(id => id !== contactId)
                : [...prevSelected, contactId]
        );
    };

    const handleDeleteConfirm = async () => {
        try {
            await axiosInstance.delete('http://localhost:5000/api/contacts/contact', {
                data: { ids: selectedContacts }
            });

            setContacts(prevContacts =>
                prevContacts.filter(contact => !selectedContacts.includes(contact._id))
            );
            setSelectedContacts([]);
            setSelectAll(false);
            setShowDeleteConfirmation(false);
            console.log('Contacts deleted successfully');
            toast.success('Contacts deleted successfully.');
        } catch (error) {
            console.error('Error deleting contacts:', error);
            toast.error('Error deleting contacts.');
        }
    };

    const handleSendMessage = (contactId) => {
        const contactToSend = filteredContacts.find(contact => contact._id === contactId);
        setContactToMessage(contactToSend);
        setShowSendMessagePopup(true);
    };

    const handleEditContact = (contactId) => {
        const contactToEdit = filteredContacts.find(contact => contact._id === contactId);
        navigate('/contact/addcontact', { state: { contact: contactToEdit } });
        setOpenDropdown(null);
    };

    const handleDropdownToggle = (contactId) => {
        if (openDropdown === contactId) {
            setOpenDropdown(null);
        } else {
            setOpenDropdown(contactId);
        }
    };

    const showNotification = (count) => {
        setNotificationMessage(`Message sent successfully to ${count} contact${count > 1 ? 's' : ''}!`);
        setShowMessageSentNotification(true);
        setTimeout(() => {
            setShowMessageSentNotification(false);
        }, 5000);
    };

    return (
        <div className="rightmaincontacts">
            <div className="firstsection">
                <div className="leftmaincon">
                    <h1 className="con-text">Contact</h1>
                </div>
                <div className="rightmaincon-btn">
                    <button className="btn-filter"><img src={filter} alt="" /> Filter</button>
                    <button className="btn-addcontact" onClick={handleAddconClick}><img src={addcon} alt="" /> Add Contact</button>
                </div>
            </div>
            <div className="secondsection">
                <div className="rightsec-btn">
                    <button className="right-btn-text-all">All Contacts</button>
                    <button className="right-btn-text-new">New Contacts</button>
                </div>
                <div className="rightseccon-btn">
                    <button className="left-btn-send" onClick={handleSendButtonClick}><img src={send} alt="send" /> Send</button>
                    <button className="left-btn-delete" onClick={handleDeleteButtonClick}><img src={deleteb} alt="delete" /> Delete</button>
                </div>
            </div>
            <div className="thirdhorizontalline"></div>

            <div className="forthmainsection">
                <div className="mainplate">
                    <input
                        type="checkbox"
                        className="maincheckbtn"
                        checked={selectAll}
                        onChange={handleSelectAllChange}
                    />
                    <input
                        type="text"
                        placeholder="Search by name"
                        className="search-input-right-main"
                        value={searchQuery}
                        onChange={(e) => handleSearch(e.target.value)}
                    />
                    {/* <h1 className="mainname-name">Name</h1> */}
                    <h1 className="mainname-id">ID No.</h1>
                    <h1 className="mainname mainname-email">Email</h1>
                    <h1 className="mainname mainname-number">Phone Number</h1>
                    <h1 className="mainname mainname-date">Created Date</h1>
                </div>

                {filteredContacts.map(contact => (
                    <div className="localplate" key={contact._id}>
                        <input
                            type="checkbox"
                            className="localcheckbtn"
                            checked={selectedContacts.includes(contact._id)}
                            onChange={() => handleContactCheckboxChange(contact._id)}
                        />
                        <h1 className="localname localname-name">{contact.name}</h1>
                        <h1 className="localname localname-id">{contact._id.substring(15, 25)}</h1>
                        <h1 className="localname localname-email">{contact.email}</h1>
                        <h1 className="localname localname-phone">{contact.phone}</h1>
                        <h1 className="localname localname-date">{contact.createdAt.substring(0, 10)}</h1>
                        <button className="localmorebtn localname-more" onClick={() => handleDropdownToggle(contact._id)}><img src={more} alt="more" /></button>
                        {openDropdown === contact._id && (
                            <ContactDropdown
                                contactId={contact._id}
                                onSendMessage={handleSendMessage}
                                onEditContact={handleEditContact}
                            />
                        )}
                    </div>
                ))}
            </div>
            {showSendMessagePopup && (
                <SendMessagePopup
                    onClose={handleCloseSendMessagePopup}
                    selectedContacts={contactToMessage ? [contactToMessage] : filteredContacts.filter(contact => selectedContacts.includes(contact._id))}
                    showNotification={showNotification}
                    userId={userId}
                />
            )}
            {showDeleteConfirmation && (
                <DeleteConfirmationPopup
                    onConfirm={handleDeleteConfirm}
                    onCancel={handleDeleteCancel}
                    className="delete-btn-show-pop-up"
                />
            )}
            {showMessageSentNotification && (
                <div className="notification">
                    {notificationMessage}
                </div>
            )}
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar closeOnClick pauseOnFocusLoss draggable pauseOnHover />
        </div>
    );
};

export default Rightmaincontacts;
