/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './DoctorCardIC.css';
import AppointmentFormIC from '../BookingConsultation/AppointmentFormIC'
import { v4 as uuidv4 } from 'uuid';

const DoctorCardIC = ({ name, speciality, experience, ratings, profilePic }) => {
  const [showModal, setShowModal] = useState(false);
  const [appointments, setAppointments] = useState([]);

  const handleBooking = () => {
    setShowModal(true);
  };

  const handleCancel = (appointmentId) => {
    const updatedAppointments = appointments.filter((appointment) => appointment.id !== appointmentId);
    setAppointments(updatedAppointments);
    sessionStorage.setItem('appointments', JSON.stringify(updatedAppointments));

  };

  const handleFormSubmit = (appointmentData) => {
    console.log("Form submitted with data:", appointmentData); 

    const newAppointment = {
        id: uuidv4(),  // Generates a new unique ID for the appointment
        ...appointmentData,
    };

    // Retrieve existing appointments from sessionStorage
    const existingAppointments = JSON.parse(sessionStorage.getItem('appointments')) || [];

    // Append the new appointment to the existing appointments
    const updatedAppointments = [...existingAppointments, newAppointment];

    // Update the state
    setAppointments(updatedAppointments);
    setShowModal(false);

    // Store the updated appointments array in sessionStorage with the key 'appointments'
    sessionStorage.setItem('isLoggedIn', JSON.stringify(true)); // Set logged-in status

    sessionStorage.setItem('appointments', JSON.stringify(updatedAppointments)); // Store appointments under a fixed key

    const event = new Event('appointmentUpdated');
    window.dispatchEvent(event);

 // Store doctor's details in sessionStorage
    const doctorDetails = {
        name,
        speciality,
        experience,
        ratings,
    };

    sessionStorage.setItem('doctorDetails', JSON.stringify(doctorDetails)); // Store doctor's details under a fixed key

    // Log the appointments to confirm they are stored correctly
    console.log('Appointments in sessionStorage:', JSON.parse(sessionStorage.getItem('appointments')));
    console.log('Doctor Details in sessionStorage:', JSON.parse(sessionStorage.getItem('doctorDetails')));
};



  return (
    <div className="doctor-card-container">
      <div className="doctor-card-details-container">
        <div className="doctor-card-profile-image-container">
            {/* <img 
            src={profilePic}
            alt={`${name}'s profile`}
            width= '46'
            height= '46'> */}
        <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16"> <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/> </svg>
        {/* </img> */}
        </div>
        <div className="doctor-card-details">
          <div className="doctor-card-detail-name">{name}</div>
          <div className="doctor-card-detail-speciality">{speciality}</div>
          <div className="doctor-card-detail-experience">{experience} years experience</div>
          <div className="doctor-card-detail-consultationfees">Ratings: {ratings}</div>
        </div>
        {/* for reference  */}
        {/* <div>
              <button className='book-appointment-btn'>                    
                <div>Book Appointment</div>
              <div>No Booking Fee</div>
            </button>
              </div> */}
      </div>


      <div className="doctor-card-options-container">
       <Popup
          style={{ backgroundColor: '#FFFFFF' }}
          trigger={
            <button className={`book-appointment-btn ${appointments.length > 0 ? 'cancel-appointment' : ''}`}>
              {appointments.length > 0 ? (
                <div>Cancel Appointment</div>
              ) : (
                <div>Book Appointment</div>
              )}
              <div>No Booking Fee</div>
            </button>
          }
          modal
          open={showModal}
          onClose={() => setShowModal(false)}
        >
          {(close) => (
            <div className="doctorbg" style={{ height: '100vh', overflow: 'scroll' }}>
              <div>
                <div className="doctor-card-profile-image-container">
                <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16"> <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/> </svg>
                </div>
                <div className="doctor-card-details">
                  <div className="doctor-card-detail-name">{name}</div>
                  <div className="doctor-card-detail-speciality">{speciality}</div>
                  <div className="doctor-card-detail-experience">{experience} years experience</div>
                  <div className="doctor-card-detail-consultationfees">Ratings: {ratings}</div>
                </div>
              </div>

              {appointments.length > 0 ? (
                <>
                  <h3 style={{ textAlign: 'center' }}>Appointment Booked!</h3>
                  {appointments.map((appointment) => (
                    <div className="bookedInfo" key={appointment.id}>
                      <p>Name: {appointment.name}</p>
                      <p>Phone Number: {appointment.phoneNumber}</p>
                      <p>Date: {appointment.selectedSlot}</p>
                      <p>Time: {appointment.selectedDate}</p>
                      <button onClick={() => handleCancel(appointment.id)}>Cancel Appointment</button>
                    </div>
                  ))}
                  {/* <Notification /> */}
                </>
              ) : (
                <AppointmentFormIC doctorName={name} doctorSpeciality={speciality} onSubmit={handleFormSubmit} />
              )}
            </div>
          )}
        </Popup> 
      </div>
    </div>
  );
};

export default DoctorCardIC;
