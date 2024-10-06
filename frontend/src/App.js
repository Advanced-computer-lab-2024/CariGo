import './styles/App.css';
import React from 'react';
  // Adjust the path based on your structure
//import './styles/App.css';
import './styles/index.css';

import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';

import UserViewActivities from './pages/UserViewActivities';
import AdvertiserProfile from './pages/AdvertiserProfile ';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import UpdateActivityForm from './components/UpdateActivityForm';
function App() {
  return (
      <Routes>
        <Route path="/" element={<Home />} /> {/* Default route */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/activities" element={<UserViewActivities />} /> 
        <Route path="/advertiser" element={<AdvertiserProfile />} />
        {/* <Route path="/activities/:id" element={<ActivityDetail/>} /> */}
        <Route path="/activities/update/:id" element={<UpdateActivityForm/>} />
        {/* Add more routes as needed */}
      </Routes>
    
  );
}

export default App;

