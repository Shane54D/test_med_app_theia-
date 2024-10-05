// Following code has been commented with appropriate comments for your reference.
import React, { useState } from 'react';
import './GiveReviews.css'

// Function component for giving reviews
function GiveReviews({ onClose, onSubmit }) {
  // State variables using useState hook
//   const [showForm, setShowForm] = useState(false);
//   const [submittedMessage, setSubmittedMessage] = useState('');
  const [showWarning, setShowWarning] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    review: '',
    rating: 0
  });

  // Function to handle button click event
//   const handleButtonClick = () => {
//     setShowForm(true);
//   };

  const handleChange = (e) => {
    // Update the form data based on user input
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.review && formData.rating > 0) {
      setShowWarning(false);
      onSubmit(formData.review); // Pass the review back to the parent via `onSubmit`
      onClose(); // Close the popup after successful submission
    } else {
      setShowWarning(true);
    }
  };

  // Function to handle form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setSubmittedMessage(formData);
//     setFormData({
//       name: '',
//       review: '',
//       rating: 0
//     });
    
    // Check if all required fields are filled before submission
//     if (formData.name && formData.review && formData.rating > 0) {
//       setShowWarning(false);
//     } else {
//       setShowWarning(true);
//     }
//   };

  return (

<div className="review-popup">
      <h2>Give Your Feedback</h2>
      {/* Display warning message if not all fields are filled */}
      {showWarning && <p className="warning">Please fill out all fields.</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="review">Review:</label>
          <textarea id="review" name="review" value={formData.review} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="rating">Rating:</label>
          <div className="rating-options">
            <label>
              <input type="radio" name="rating" value="1" onChange={handleChange} /> 1
            </label>
            <label>
              <input type="radio" name="rating" value="2" onChange={handleChange} /> 2
            </label>
            <label>
              <input type="radio" name="rating" value="3" onChange={handleChange} /> 3
            </label>
            <label>
              <input type="radio" name="rating" value="4" onChange={handleChange} /> 4
            </label>
            <label>
              <input type="radio" name="rating" value="5" onChange={handleChange} /> 5
            </label>
          </div>
        </div>
        {/* Submit button for form submission */}
        <button type="submit">Submit</button>
        <button type="button" onClick={onClose}>Cancel</button> 
      </form>
    </div>
  );
}

export default GiveReviews;




    // <div>
    //   <h2>Form with Message</h2>
    //   {!showForm ? (
    //     // Display button to open the form
    //     <button onClick={handleButtonClick}>Open Form</button>
    //   ) : (
    //     // Display form for giving feedback
    //     <form onSubmit={handleSubmit}>
    //       <h2>Give Your Feedback</h2>
    //       {/* Display warning message if not all fields are filled */}
    //       {showWarning && <p className="warning">Please fill out all fields.</p>}
    //       <div>
    //         <label htmlFor="name">Name:</label>
    //         <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
    //       </div>
    //       <div>
    //         <label htmlFor="review">Review:</label>
    //         <textarea id="review" name="review" value={formData.review} onChange={handleChange} />
    //       </div>
    //       {/* Submit button for form submission */}
    //       <button type="submit">Submit</button>
    //       <button type="button" onClick={onClose}>Cancel</button> 
    //     </form>
    //   )}
    //   {/* Display the submitted message if available */}
    //   {submittedMessage && (
    //     <div>
    //       <h3>Submitted Message:</h3>
    //       <p>{submittedMessage}</p>
    //     </div>
    //   )}
    // </div>