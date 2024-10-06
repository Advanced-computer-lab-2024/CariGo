import "./styles/App.css";
import React from "react";
import AdvertiserProfile from "./AdvertiserProfile"; // Adjust the path based on your structure
//import './styles/App.css';
import "./styles/index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserViewActivities from "./pages/UserViewActivities";
import UserViewItineraries from "./pages/UserViewItineraries";
import Home from "./pages/Home";

import LoginPage from "./pages/login";
import SignUp from "./pages/Signup";
import { jwtDecode } from "jwt-decode";
import NavBar from "./components/NavBar";
import ItineraryUpdate from "./components/ItineraryUpdate";
import ItineraryDetails from "./pages/ItineraryDetails";

function App() {
  const token = localStorage.getItem("jwt");

  // Decode the token safely
  let userId;
  if (token) {
    try {
      const decoded = jwtDecode(token);
      userId = decoded.id; // Assuming the id is in the decoded token
    } catch (error) {
      console.error("Failed to decode token:", error);
    }
  }
  return (
    <Routes>
      <Route path="/" element={<Home />} /> {/* Default route */}
      <Route path="/itineraries" element={<UserViewItineraries />} />
      <Route path="/itineraries/:id" element={<ItineraryDetails />} />
      <Route path="/itineraries/:id/edit" element={<ItineraryUpdate />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/SignUp" element={<SignUp />} />
      <Route path="/activities" element={<UserViewActivities />} />
      <Route
        path="/advertiser"
        element={<AdvertiserProfile userId={localStorage.getItem("id")} />}
      />
      {/* <Route path="/activities/:id" element={<ActivityDetail/>} /> */}
      <Route path="/activities/update/:id" element={<updateActivityForm />} />
      {/* Add more routes as needed */}
    </Routes>
  );
}

export default App;
