import "./styles/App.css";
import React from "react";
import AdvertiserProfile from "./AdvertiserProfile"; // Adjust the path based on your structure
//import './styles/App.css';
import './styles/index.css';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import UserViewActivities from './pages/UserViewActivities';
import Home from './pages/Home';
import LoginPage from './pages/login';
import { jwtDecode } from 'jwt-decode';
import NavBar from "./components/NavBar";
import CreateActivityForm from "./pages/CreateActivityForm";
import TouristProfile from "./pages/TouristProfile";
import TouristGuestHome from "./pages/Tourist-Guest/TouristGuestHome";
function App() {
  const token = localStorage.getItem('jwt');

  // Decode the token safely
  let userId;
  if (token) {
    try {
      const decoded = jwtDecode(token);
      userId = decoded.id; // Assuming the id is in the decoded token
    } catch (error) {
      console.error('Failed to decode token:', error);
    }
  }
  return (
      <Routes>
        <Route path="/" element={<Home />} /> {/* Default route */}
        <Route path="/login" element={<LoginPage />} />
        {<Route path="/activities" element={<TouristGuestHome />} /> }
        <Route path="/createActivity" element={<CreateActivityForm userId={localStorage.getItem("id")} />} /> 
        <Route path="/advertiser" element={<AdvertiserProfile userId={localStorage.getItem("id")} />} />
        <Route path="/tourist" element={<TouristProfile userId={localStorage.getItem("id")} />} />
        <Route path="/tgHome" element={<TouristGuestHome/>} />
        <Route path="/activities/update/:id" element={<updateActivityForm/>} />
      </Routes>
    
  );
}

export default App;