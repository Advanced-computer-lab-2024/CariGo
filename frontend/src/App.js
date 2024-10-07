import "./styles/App.css";
import React from "react";
import AdvertiserProfile from "./AdvertiserProfile"; // Adjust the path based on your structure
//import './styles/App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserViewActivities from "./pages/UserViewActivities";
import UserViewItineraries from "./pages/UserViewItineraries";
import Home from "./pages/Home";
import LoginPage from "./pages/login";
import SignUp from "./pages/Signup";
import { jwtDecode } from "jwt-decode";
import "./styles/index.css";
import NavBar from "./components/NavBar";
import ItineraryUpdate from "./components/ItineraryUpdate";
import ItineraryDetails from "./pages/ItineraryDetails";
import CreateItineraryForm from "./components/CreateItineraryForm";
import AllItineraries from "./pages/AllItineraries";
import UserItinDetails from './pages/UserItinDetails';
import CreateActivityForm from "./components/CreateActivityForm";
import TouristProfile from "./pages/TouristProfile";
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
      console.error("Failed to decode token:", error);
    }
  }
  return (
    <Routes>
      <Route path="/" element={<Home />} /> {/* Default route */}
      <Route path="tour_guide/itineraries" element={<UserViewItineraries />} />
      <Route path="tour_guide/itineraries/:id" element={<ItineraryDetails />} />
      <Route path="tour_guide/itineraries/new" element={<CreateItineraryForm />} />
      <Route path="tour_guid/itineraries/:id/edit" element={<ItineraryUpdate />} />
      <Route path="/user_itineraries" element={<AllItineraries />} />
      <Route path="/user_itineraries/:id" element={<UserItinDetails />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/SignUp" element={<SignUp />} />
      <Route path="/activities" element={<UserViewActivities />} />
      <Route
        path="/advertiser"
        element={<AdvertiserProfile userId={localStorage.getItem("id")} />}
      />
      {/* <Route path="/activities/:id" element={<ActivityDetail/>} /> */}
      <Route path="/activities/update/:id" element={<updateActivityForm />} />
      <Route path="/" element={<Home />} /> {/* Default route */}
      <Route path="/activities" element={<UserViewActivities />} /> 
      <Route path="/createActivity" element={<CreateActivityForm userId={localStorage.getItem("id")} />} /> 
      <Route path="/advertiser" element={<AdvertiserProfile userId={localStorage.getItem("id")} />} />
      <Route path="/tourist" element={<TouristProfile userId={localStorage.getItem("id")} />} />
      {/* Add more routes as needed */}
    </Routes>
  );
}

export default App;

