/* eslint-disable no-unused-vars */

// Following code has been commented with appropriate comments for your reference.
import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import './Notification.css'

// Function component Notification to display user notifications
const Notification = ({ children }) => {
     console.log('Notification is rendering!');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  /* eslint-disable-next-line no-unused-vars */
  const [username, setUsername] = useState("");
  const [doctorData, setDoctorData] = useState(null);
  const [appointmentData, setAppointmentData] = useState(null);

  useEffect(() => {
    const fetchData = () => {
    const storedUsername = sessionStorage.getItem('name');
    const storedDoctorData = JSON.parse(localStorage.getItem('doctorData'));
    const storedAppointmentData = JSON.parse(localStorage.getItem('appointments'));

    console.log("Raw Appointment Data:", storedAppointmentData);

if (storedUsername) {
    setIsLoggedIn(true); 
    setUsername(storedUsername);
}

if (storedDoctorData) {
    setDoctorData(storedDoctorData); 
}

 setAppointmentData(storedAppointmentData);

 console.log("Stored Doctor Data:", storedDoctorData);
    console.log("Stored Appointment Data:", storedAppointmentData); 
    console.log("Notification StoredAppointmentData", storedAppointmentData); 
    console.log("Notficiation appointmentData", appointmentData); 
 }; 

 // Initial fetch when component mounts
 fetchData();

 // Event listener to update appointment data on event trigger
 const handleAppointmentUpdate = () => {
     fetchData(); // Re-fetch appointment data
 };

 // Add event listener
 window.addEventListener('appointmentUpdated', handleAppointmentUpdate);

 // Cleanup event listener on component unmount
 return () => {
     window.removeEventListener('appointmentUpdated', handleAppointmentUpdate);
 };
}, [appointmentData]);

  const handleCancelAppointment = () => {
    // Logic to clear appointment data
    setAppointmentData(null);
    localStorage.removeItem(doctorData?.name); // Adjust as necessary to match your storage logic
    alert("Your appointment has been canceled.");
  };

  // Return JSX elements to display Navbar, children components, and appointment details if user is logged in
  return (
    <div>
      {/* Render Navbar component */}
      {/* <Navbar ></Navbar> */}
      {/* Render children components */}
      {children}
      {/* Display appointment details if user is logged in and appointmentData is available */}
      {isLoggedIn && 
      appointmentData &&
       (
        <>
          <div className="appointment-card">
            <div className="appointment-card__content">
              {/* Display title for appointment details */}
              <h3 className="appointment-card__title">Appointment Details</h3>
              <p className="appointment-card__message">
                     <p className="appointment-card__message">
                        <strong>Patient:</strong> {username}</p>
                        {/* <p className="appointment-card__message"> */}
                        {/* <strong>Phone Number:</strong> {appointmentData?.phoneNumber}</p> */}
                {/* Display doctor's name from doctorData */}
                <strong>Doctor:</strong> {doctorData?.name}
                <br />
                <strong>Speciality:</strong> {doctorData?.speciality}
                <br />
                <strong>Appointment Date:</strong> {appointmentData?.date || 'N/A'}<br />
                <strong>Appointment Time:</strong> {appointmentData?.time || 'N/A'}<br />
              </p>
            </div>
            <button onClick={handleCancelAppointment} className="cancel-appointment-button">
            Cancel Appointment
          </button>
          </div>
        </>
      )}
    </div>
  );
};

// Export Notification component for use in other parts of the application
export default Notification;