import React from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

export default function Navbar() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    // eslint-disable-next-line
    const [userData, setUserData] = useState({});
    const [dropdownOpen, setDropdownOpen] = useState(false); 
  
    useEffect(() => {
      const authToken = sessionStorage.getItem("auth-token");
  
      if (authToken) {
        setIsLoggedIn(true);
        setUserData({
          name: sessionStorage.getItem("name"),
          email: sessionStorage.getItem("email"),
          phone: sessionStorage.getItem("phone"),
        }
    );
      } else {
        setIsLoggedIn(false);
      }}, []);  

      const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
      };

      const handleLogout = () => {
        // Implement your logout logic here
        sessionStorage.removeItem('auth-token');
        sessionStorage.removeItem('name');
        sessionStorage.removeItem('email');
        sessionStorage.removeItem('phone');
        setIsLoggedIn(false);
        setUserData({});
        // Optionally redirect to login page
      };

    const handleClick = () => {
    }
    
  return (
    <div className='navbar'>

    <nav>
            <div className='logo-container'>
            <div className='stay-healthy'>Stay Healthy</div>
            <div className="nav__logo"> 
              <a href="/">
              
                <svg xmlns="http://www.w3.org/2000/svg" height="26" width="26" viewBox="0 0 1000 1000" style={{fill: '#3685fb'}}>
                    <title>Doctor With Stethoscope SVG icon</title>
                    <g>
                        <g>
                          
                            <path d="M499.8,10c91.7,0,166,74.3,166,166c0,91.7-74.3,166-166,166c-91.7,0-166-74.3-166-166C333.8,84.3,408.1,10,499.8,10z"></path>
                           
                            <path d="M499.8,522.8c71.2,0,129.1-58.7,129.1-129.1H370.6C370.6,464.1,428.6,522.8,499.8,522.8z"></path>
                         
                            <path d="M693.2,395c-0.7,94.9-70.3,173.7-160.8,188.9v155.9c0,80.3-60.7,150.8-140.8,155.3c-83,4.7-152.7-58.9-157.6-139.7c-22-12.8-35.6-38.5-30.3-66.7c4.7-25.1,25.5-45.6,50.8-49.9c39.7-6.7,74.1,23.7,74.1,62.1c0,23-12.3,43-30.7,54.1c4.7,45.4,45.1,80.4,92.6,76c44.6-4,77.2-44...."></path>
                        </g>
                    </g>
                </svg>
              </a>
             
              <span>.</span>
            </div>
            </div>
        
        <div class="nav__icon" onClick={handleClick}>
        
          <i class="fa fa-times fa fa-bars"></i>
        </div>

     
        <ul class="nav__links active">
        
        <Link to="/">
          <li class="link">
            <a href="../Landing_Page/LandingPage.html">Home</a>
          </li>
          </Link>
          <Link to="/instant-consultation">
          <li class="link">
             {/* <a href="https://www.raleighmedicalgroup.com/appointments/request-appointment"> */}
    Appointments
            {/* </a> */}
          </li>
          </Link>
<Link to="/reviews">
<li>Reviews</li>
</Link>
{isLoggedIn ? (
            <>
              <li className='link' onClick={toggleDropdown}>
                Welcome, {userData.name}
              </li>
              {dropdownOpen && (
                <ul className='dropdown'>
                  <li>
                    <Link to='/profile'>Profile</Link>
                  </li>
                  <li>
                    <button onClick={handleLogout} className='btn1'>
                      Logout
                    </button>
                  </li>
                </ul>
              )}
            </>
          ) : (
            <>
              <Link to='/SignUp'>
                <li className='link'>
                  <a href='../Sign_Up/Sign_Up.html'>
                    <button className='btn1'>Sign Up</button>
                  </a>
                </li>
              </Link>
              <Link to='/Login'>
                <li className='link'>
                  <a href='../Login/Login.html'>
                    <button className='btn1'>Login</button>
                  </a>
                </li>
              </Link>
            </>
          )}
         </ul>
    </nav>


    </div>
  )
}
