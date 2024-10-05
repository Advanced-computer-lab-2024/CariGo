import './styles/App.css';
import React from 'react';
import AdvertiserProfile from './AdvertiserProfile';  // Adjust the path based on your structure
//import './styles/App.css';
import './styles/index.css';
import Activity from './components/Activity';
import Navbar from './Navbar';
import ActivityGrid from './components/ActivityGrid';
import ActivityPost from './components/ActivityPost';
import { BrowserRouter,Route,Router,Routes } from 'react-router-dom';
import ActivityList from './components/ActivityListUser';
import ActivityPostAdvertiser from './components/ActivityPostAdvertiser';
import UserViewActivities from './UserViewActivities';
import CreateActivityForm from './components/CreateActivityForm';
import UpdateActivityForm from './components/UpdateActivityForm';

import SelectTags from './components/SelectTags';

function App() {
  return (
    <div className="App">
    {/* <ActivityList/> */}
   <ActivityPostAdvertiser/> 
   <UpdateActivityForm/> 
    
      
    </div>
  );
}

export default App;

