
import './App.css';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './components/Landing_Page/LandingPage';
import SignUp from './components/Sign_Up/Sign_Up';
import Login from './components/Login/Login';
import BookingConslutation from './components/BookingConsultation/BookingConsultation';
import Notification from './components/Notification/Notification';
import ReviewForm from './components/ReviewForm/ReviewForm'
import ProfileCard from './components/ProfileCard/ProfileCard'
import ReportsLayout from './components/ReportsLayout/ReportsLayout';

function App() {

  return (
    <div className="App">
        <Router>
            <Navbar />
            <Notification />
            <Routes>
                <Route path="/" element={<LandingPage /> } />
                <Route path="/Login" element={<Login /> } />
                <Route path="/SignUp" element={<SignUp /> } />
                <Route path="/instant-consultation" element={<BookingConslutation />} />  
                <Route path="/reviews" element={<ReviewForm />} />
                <Route path="/profile" element={<ProfileCard />} />
                <Route path="/reports" element={<ReportsLayout />} />
     </Routes>
     </Router>
    </div>
  );
}

export default App;
