/* eslint-disable no-unused-vars */

import React, { useState, useEffect } from 'react'
import './Login.css'
import { 
    // Link,
     useNavigate } from 'react-router-dom'
import { API_URL } from '../../config'

export default function Login() {

  const [password, setPassword] = useState("");
  const [email, setEmail ] = useState('');

  const navigate = useNavigate();
  useEffect(() => {
    // if (sessionStorage.getItem("auth-token")) {
    //   navigate("/");
    // }
  }, []);

  const login = async (e) => {
    e.preventDefault();
    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    console.log('Response status:', res.status);  // Log response status

    // Parse the response JSON
    const json = await res.json();
    if (json.authtoken) {
      // If authentication token is received, store it in session storage
      sessionStorage.setItem('auth-token', json.authtoken);
      sessionStorage.setItem('email', email);

      // Fetch additional user details
      const userRes = await fetch(`${API_URL}/api/auth/user`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${json.authtoken}`,
            "email": email
        },
    });

    if (userRes.ok) {
        const userDetails = await userRes.json();
        console.log('User Details:', userDetails); // Log the user details
        // Assuming the userDetails object has 'username' and 'phone'
        sessionStorage.setItem('name', userDetails.name);
        sessionStorage.setItem('phone', userDetails.phone);
    } else {
        console.error('Failed to fetch user details:', userRes.status);
        alert('Failed to fetch user details. Please try again.');
    }


      // Redirect to home page and reload the window
      navigate('/');
      window.location.reload();
    } else {
      // Handle errors if authentication fails
      if (json.errors) {
        for (const error of json.errors) {
          alert(error.msg);
        }
      } else {
        alert(json.error);
      }
    }
  };



  return (
    <div>

    <div className="container">
    
        <div className="login-grid">

          <div className="login-text">
            <h2>Login</h2>
          </div>
    
          <div className="login-text">
            Are you a new member? <span><a href="../Sign_Up/Sign_Up.html" style={{color: '#2190FF'}}> Sign Up Here</a></span>
          </div>
          <br />
    
          <div className="login-form">
            <form onSubmit={login}>
             
            <div className="form-group">
               <label htmlFor="email">Email</label>
               <input
                 value={email}
                 onChange={(e) => setEmail(e.target.value)}
                 type="email"
                 name="email"
                 id="email"
                 className="form-control"
                 placeholder="email"
                 aria-describedby="helpId"
               />
             </div>
        
              <div className="form-group">
                <label for="password">Password</label>
                <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  name="password"
                  id="password"
                  class="form-control"
                  placeholder="Enter your password"
                  aria-describedby="helpId"
                />
              </div>
              <div className="btn-group">
                <button type="submit" className="btn btn-primary mb-2 mr-1 waves-effect waves-light">Login</button> 
                <button type="reset" className="btn btn-danger mb-2 waves-effect waves-light">Reset</button>
              </div>
              <br />

              <div className="login-text">
        
              </div>
            </form>
          </div>
        </div>
      </div>

    </div>
  )
}
