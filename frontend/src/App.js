import './styles/App.css';
import React from 'react';
import AdvertiserProfile from './AdvertiserProfile';  // Adjust the path based on your structure
//import './styles/App.css';
import './styles/index.css';
import Activity from './components/Activity';
import ActivityGrid from './components/ActivityGrid';
import ActivityPost from './components/ActivityPost';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import ActivityList from './components/ActivityListUser';
import ActivityPostAdvertiser from './components/ActivityPostAdvertiser';
import UserViewActivities from './pages/UserViewActivities';
import CreateActivityForm from './components/CreateActivityForm';
import UpdateActivityForm from './components/UpdateActivityForm';

import SelectTags from './components/SelectTags';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';

function App() {
  return (
      <Routes>
        <Route path="/" element={<Home />} /> {/* Default route */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/activities" element={<UserViewActivities />} /> 
        
        {/* <Route path="/activities/:id" element={<ActivityDetail/>} /> */}
        <Route path="/activities/update/:id" element={<updateActivityForm/>} />
        {/* Add more routes as needed */}
      </Routes>
    
  );
}

export default App;

