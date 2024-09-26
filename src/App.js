
import './App.css';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './components/Landing_Page/LandingPage';

function App() {
  return (
    <div className="App">
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<LandingPage /> } />
     </Routes>
     </Router>
    </div>
  );
}

export default App;
