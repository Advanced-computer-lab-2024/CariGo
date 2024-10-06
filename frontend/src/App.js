import "./styles/App.css";
import React from "react";
import AdvertiserProfile from "./AdvertiserProfile"; // Adjust the path based on your structure
//import './styles/App.css';
import "./styles/index.css";

import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import ActivityList from "./components/ActivityListUser";
import ActivityPostAdvertiser from "./components/ActivityPostAdvertiser";
import Login from "./pages/login";
import NavBar from "./components/NavBar";
import '@fontsource/inter';
import { jwtDecode } from 'jwt-decode';

import { CssVarsProvider } from '@mui/joy/styles';
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
    <div className="App">
      <NavBar />
      
      {/* <ActivityList /> */}
      {/* <ActivityList /> */}
      {/* <CssVarsProvider> */}
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<ActivityList />} />
            <Route path="/advertiser" element={<AdvertiserProfile userId={localStorage.getItem("id")}/>} />
          </Routes>
        </BrowserRouter>
      {/* </CssVarsProvider> */}
    </div>
  );
}

export default App;