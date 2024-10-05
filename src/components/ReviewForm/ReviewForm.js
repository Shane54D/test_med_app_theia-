import React from 'react';
import './ReviewForm.css'
import GiveReviews from './GiveReviews';
import { useState } from 'react'

// ReviewForm Component
const ReviewForm = () => {
  // Sample data for the table rows
  const [ reviews, setReviews ] = useState ([
    { id: 1, doctorName: "Dr. John Smith", speciality: "Cardiology", feedback: "" },
    { id: 2, doctorName: "Dr. Jane Doe", speciality: "Dermatology", feedback: "" },
    { id: 3, doctorName: "Dr. Emily Johnson", speciality: "Pediatrics", feedback: "" }
  ]);

  const [isReviewPopupOpen, setReviewPopupOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const handleFeedbackClick = (doctor) => {
    setSelectedDoctor(doctor);
    setReviewPopupOpen(true); 
  };

  const handleClosePopup = () => {
    setReviewPopupOpen(false);
    setSelectedDoctor(null); // Clear the selected doctor
  };

  const handleFeedbackSubmission = (doctorId, feedback) => {
    // Update the reviews array with the new feedback
    const updatedReviews = reviews.map(review => 
      review.id === doctorId ? { ...review, feedback } : review
    );
    setReviews(updatedReviews);
    handleClosePopup(); // Close the popup after submission
  };

  return (
    <div className="review-form">
      <h1 className="Heading-Reviews">Reviews</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Serial Number</th>
            <th>Doctor Name</th>
            <th>Doctor Speciality</th>
            <th>Provide Feedback</th>
            <th>Review Given</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((review) => (
            <tr key={review.id}>
              <td>{review.id}</td>
              <td>{review.doctorName}</td>
              <td>{review.speciality}</td>
              <td>
                <button onClick={() => handleFeedbackClick(review.id)}>Click here</button>
              </td>
              <td>{review.feedback}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {isReviewPopupOpen && (
        <GiveReviews onClose={handleClosePopup}
        onSubmit={(feedback) => handleFeedbackSubmission(selectedDoctor, feedback)} />
      )}
    </div>
  );
};

export default ReviewForm;
