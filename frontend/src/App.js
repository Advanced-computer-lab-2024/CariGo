import "./styles/App.css";
import React from "react";
import AdvertiserProfile from "./AdvertiserProfile"; // Adjust the path based on your structure

import UserViewItineraries from "./pages/UserViewItineraries";
import ItineraryUpdate from "./components/ItineraryUpdate";
import ItineraryDetails from "./pages/ItineraryDetails";
import CreateItineraryForm from "./components/CreateItineraryForm";
import AllItineraries from "./pages/AllItineraries";
import UserItinDetails from "./pages/UserItinDetails";
import TourGuideProfile from "./pages/TourGuideProfile";

import './styles/index.css';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import UserViewActivities from './pages/UserViewActivities';
import Home from './pages/Home';

import LoginPage from './pages/login';
import SignUp from './pages/Signup';
import { jwtDecode } from 'jwt-decode';
import CreateActivityForm from "./pages/CreateActivityForm";
import TouristProfile from "./pages/Tourist/TouristProfile";
import TouristGuestHome from "./pages/Tourist-Guest/TouristGuestHome";
import TouristHome from "./pages/Tourist/TouristHome";
import GuestHome from "./pages/Guest/GuestHome";
import TouristActivities from './pages/Tourist/TouristActivities.js';
import GuestActivities from './pages/Guest/GuestActivities.js';
import NavBar from "./components/NavBar";
import UserViewVintages from "./pages/UserViewVintages";
import VintageDetails from "./pages/VintageDetails";
import TouristViewVintage from "./pages/TouristViewVintage";
import UserVintageDetails from "./pages/UserVintageDetails";



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
        <Route path="/login" element={<LoginPage />} />
      <Route
        path="tour_guide/profile"
        element={<TourGuideProfile userId={localStorage.getItem("id")} />}
      />
      <Route path="tour_guide/itineraries" element={<UserViewItineraries />} />
      <Route path="tour_guide/itineraries/:id" element={<ItineraryDetails />} />
      <Route
        path="tour_guide/itineraries/new"
        element={<CreateItineraryForm />}
      />
      <Route
        path="tour_guid/itineraries/:id/edit"
        element={<ItineraryUpdate />}
      />
      <Route path="/user_itineraries" element={<AllItineraries />} />
      <Route path="/user_itineraries/:id" element={<UserItinDetails />} />
        {<Route path="/activities" element={<UserViewActivities />} /> }
        <Route path="/tourist-activities" element={<TouristActivities/>} />
        <Route path="/guest-activities" element={<GuestActivities/>} />
        <Route path="/createActivity" element={<CreateActivityForm userId={localStorage.getItem("id")} />} /> 
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/advertiser" element={<AdvertiserProfile userId={localStorage.getItem("id")} />} />
        <Route path="/tourist" element={<TouristProfile userId={localStorage.getItem("id")} />} />
        <Route path="/tgHome" element={<TouristGuestHome/>} />
        <Route path="/touristHome" element={<TouristHome/>} />
        <Route path="/guestHome" element={<GuestHome/>} />
        <Route path="/activities/update/:id" element={<updateActivityForm/>} />
        <Route path="/myVintages" element={<UserViewVintages />} />
        <Route path="/vintage/:id" element={<VintageDetails />} />
        <Route path="/allVintages" element={<TouristViewVintage />} />
        <Route path="/viewingAllvintage/:id" element={<UserVintageDetails />} />
        {/* Add more routes as needed */}
      </Routes>
  );
}

export default App;
