
import './App.css';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './components/Landing_Page/LandingPage';
import SignUp from './components/Sign_Up/Sign_Up';
import Login from './components/Login/Login';
import BookingConslutation from './components/BookingConsultation/BookingConsultation';

function App() {
  return (
    <div className="App">
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<LandingPage /> } />
                <Route path="/Login" element={<Login /> } />
                <Route path="/SignUp" element={<SignUp /> } />
                <Route path="/instant-consultation" element={<BookingConslutation />} />
     </Routes>
     </Router>
    </div>
  );
}

export default App;
