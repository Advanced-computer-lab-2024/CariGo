import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';
import NavBar from './components/NavBar';
import ActivityList from './components/ActivityListUser';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Link } from 'react-router-dom';
import UserViewActivities from './pages/UserViewActivities';
import CreateActivityForm from './components/CreateActivityForm';
import ActivityDetail from './components/ActivityDetail';
import ActivityPostAdvertiser from './components/ActivityPostAdvertiser';
import updateActivityForm from './components/UpdateActivityForm';
import AdvertiserProfile from './AdvertiserProfile';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router> {/* Wrap your App component with Router */}
      <App /> {/* Your main application with routes */}
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

