import React, { useState } from 'react';
import './Sign_Up.css'
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';

const Sign_Up = () => {
    // State variables using useState hook
     // eslint-disable-next-line
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
     // eslint-disable-next-line
    const [phone, setPhone] = useState('');
     // eslint-disable-next-line
    const [password, setPassword] = useState('');
    const [showerr, setShowerr] = useState(''); // State to show error messages
    const [isLoading, setIsLoading] = useState(false); 
    const navigate = useNavigate(); // Navigation hook from react-router

    // Function to handle form submission
    const register = async (e) => {
        e.preventDefault(); // Prevent default form submission
        setShowerr('');
    setIsLoading(true); 

        // API Call to register user
        try {
        const response = await fetch(`${API_URL}/api/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password,
                phone: phone,
            }),
        });

        const json = await response.json(); // Parse the response JSON

        console.log("Response:", json);

        if (json.authtoken) {
            sessionStorage.setItem("auth-token", json.authtoken);
            sessionStorage.setItem("name", name);
            sessionStorage.setItem("phone", phone);
            sessionStorage.setItem("email", email);
            navigate("/");
            window.location.reload(); 
        } else {
            if (json.errors) {
                setShowerr(json.errors.map(error => error.msg).join(', ')); // Show error messages
            } else {
                setShowerr(json.error);
            }
        }
    } catch (error) {
        console.error("Error:", error);
        setShowerr("An unexpected error occurred. Please try again later.");
    } finally {
        setIsLoading(false); // Reset loading state
    }
};

 // Function to reset the form
 const resetForm = () => {
    setName('');
    setEmail('');
    setPhone('');
    setPassword('');
    setShowerr(''); // Clear any error messages
};
    return (
        <div className="container" style={{marginTop:'5%'}}>
            <div className="signup-grid">

            <div className="signup-text"> 
                  <h1>Sign Up</h1>
              </div>
              <div className="signup-text1" style={{textAlign: "left", marginLeft: "150px"}}>
                  Already a member? <span><a href="../Login/Login.html" style={{color: '#2190FF'}}> Login</a></span>
              </div>

                <div className="signup-form">
                    <form method="POST" onSubmit={register}>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" className="form-control" placeholder="Enter your email" aria-describedby="helpId" />
                            {showerr && <div className="err" style={{ color: 'red' }}>{showerr}</div>}
                        </div>
                        {/* Apply similar logic for other form elements like name, phone, and password to capture user information 
                        */}
                        <div className="form-group">
           <label htmlFor="name">Name</label>
           <input value={name} type="text" onChange={(e) => setName(e.target.value)} name="name" id="name" className="form-control" placeholder="Enter your name" aria-describedby="helpId" />
       </div>
       <div className="form-group">
           <label htmlFor="phone">Phone</label>
           <input value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" name="phone" id="phone" className="form-control" placeholder="Enter your phone number" aria-describedby="helpId" />
       </div>
       <div className="form-group">
           <label htmlFor="password">Password</label>
           <input value={password} onChange={(e) => setPassword(e.target.value)} name="password" id="password" className="form-control" placeholder="Enter your password" aria-describedby="helpId" />
       </div>
       <div className="btn-group"> 
                          <button type="submit" className="btn btn-primary mb-2 mr-1 waves-effect waves-light" 
                        //   onClick={(e) => register()}
                          >{isLoading ? 'Submitting...' : 'Submit'}</button> 
                          <button type="reset" className="btn btn-danger mb-2 waves-effect waves-light" onClick={resetForm}>Reset</button>
                      </div>
                    </form>
                </div>
            </div>
        </div>
        /* Note: Sign up role is not stored in the database. Additional logic can be implemented for this based on your React code. */
    );
}

export default Sign_Up; // Export the Sign_Up component for use in other components