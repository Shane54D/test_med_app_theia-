// Following code has been commented with appropriate comments for your reference. 
// Import necessary modules from React and other files
import React, { useEffect, useState } from "react";
import { API_URL } from "../../config";
import { useNavigate } from "react-router-dom";
import './ProfileCard.css'

// Define a Function component called ProfileForm
const ProfileForm = () => {
  // Set up state variables using the useState hook
  const [userDetails, setUserDetails] = useState({});
  const [updatedDetails, setUpdatedDetails] = useState({});
  const [editMode, setEditMode] = useState(false);
  
  // Access the navigation functionality from React Router
  const navigate = useNavigate();

    // Use the useEffect hook to fetch user profile data when the component mounts or updates
    useEffect(() => {
  // Function to fetch user profile data from the API
  const fetchUserProfile = async () => {
    console.log('fetchUserProfile function called');
    try {
      const authtoken = sessionStorage.getItem("auth-token");
      const email = sessionStorage.getItem("email"); // Get the email from session storage

      if (!authtoken) {
        console.log('No auth token, navigating to login');
        navigate("/login");
      } else {

        const apiUrl = `${API_URL}/api/auth/user`; // Log the API URL
        console.log('Fetching user profile from:', apiUrl);

        const response = await fetch(apiUrl, {
          headers: {
            "Authorization": `Bearer ${authtoken}`,
            "Email": email, // Add the email to the headers
          },
        });

        console.log('Response status:', response.status);

        if (response.ok) {
          const user = await response.json();
          console.log('API response:', user);
          setUserDetails(user);
          setUpdatedDetails(user);
          console.log('State after setting userDetails:', userDetails);
        } else {
          // Handle error case
          throw new Error("Failed to fetch user profile");
        }
      }
    } catch (error) {
      console.error("Error - error is", error);
      // Handle error case
    }
  };
        const authtoken = sessionStorage.getItem("auth-token");
        if (!authtoken) {
          navigate("/login");
        } else {
          fetchUserProfile();
        }
      }, [navigate, userDetails]);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleInputChange = (e) => {
    setUpdatedDetails({
      ...updatedDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('Updated details before submission:', updatedDetails); // Log updated details before submission


    try {
      const authtoken = sessionStorage.getItem("auth-token");
      const email = sessionStorage.getItem("email"); // Get the email from session storage

      if (!authtoken || !email) {
        navigate("/login");
        return;
      }

      const payload = { ...updatedDetails };
      const response = await fetch(`${API_URL}/api/auth/user`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${authtoken}`,
          "Content-Type": "application/json",
          "Email": email,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        // Update the user details in session storage
        sessionStorage.setItem("name", updatedDetails.name);
        sessionStorage.setItem("phone", updatedDetails.phone);

        setUserDetails(updatedDetails);
        setEditMode(false);
        alert(`Profile Updated Successfully!`);
        navigate("/");
      } else {
        throw new Error("Failed to update profile");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Render the profile form with different sections based on edit mode
  return (
    <div className="profile-container">
      {editMode ? (
        <form onSubmit={handleSubmit}>
              <h2>Edit Your Details:</h2>
            <label>
            Name
            <input
              type="text"
              name="name"
              value={updatedDetails.name}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Email
            <input
              type="email"
              name="email"
              value={updatedDetails.email}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Phone
            <input
              type="number"
              name="phone"
              value={updatedDetails.phone}
              onChange={handleInputChange}
            />
          </label>
          <button type="submit">Save</button>
        </form>
      ) : (
        <div className="profile-details">
          <h2>Your Details:</h2>
          <form>
          <label>
            Name
            <input
              type="text"
              name="name"
              value={userDetails.name}
              disabled // Disable the email field
            />
          </label>
          <label>
            Phone
            <input
              type="number"
              name="phonenumber"
              value={userDetails.phone}
              disabled // Disable the email field
            />
          </label>
          <label>
            Email
            <input
              type="email"
              name="email"
              value={userDetails.email}
              disabled // Disable the email field
            />
          </label>
          {/* Implement code to display and allow editing of phone and email similar to above */}
          <button onClick={handleEdit}>Edit</button>
          </form>
        </div>
      )}
    </div>
  );
};

// Export the ProfileForm component as the default export
export default ProfileForm;
