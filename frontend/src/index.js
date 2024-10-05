import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';
import Navbar from './Navbar';
import ActivityList from './components/ActivityListUser';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Link } from 'react-router-dom';
import UserViewActivities from './UserViewActivities';
import CreateActivityForm from './components/CreateActivityForm';
import ActivityDetail from './components/ActivityDetail';
import ActivityPostAdvertiser from './components/ActivityPostAdvertiser';
import updateActivityForm from './components/UpdateActivityForm';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Navbar /> {/* Navigation bar */}
      
      <Routes>
        <Route path="/" element={<App />} /> {/* Default route */}
        <Route path="/activities" element={<UserViewActivities />} /> {/* Activities page route */}
        <Route path="/activities/:id" element={<ActivityDetail/>} />
        <Route path="/activities/update/:id" element={<updateActivityForm/>} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

