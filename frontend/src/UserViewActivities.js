import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';
import Navbar from './Navbar';
import ActivityList from './components/ActivityListUser';
import { Box } from '@mui/material';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Navbar/>
    <Box sx={{
      width:'1150px' ,
      overflow: 'hidden',
      position : 'center',
      margin: '0 auto', 
      padding:'20px',
      height: '80vh', // Set a fixed height for the scrolling area
      overflow: 'auto', // Enable scrolling
      '&::-webkit-scrollbar': {
      display: 'none', // Hides the scrollbar for WebKit browsers (Chrome, Safari)
    },
      //backgroundColor : "aquamarine" ,
      }}>
    <Box sx={{ 
      height: '100%',
      
      marginLeft: '100px',
      '&::-webkit-scrollbar': {display: 'none',},
      }}> {/* Enable vertical scrolling only */}
    <ActivityList 
     />
  </Box>
  </Box>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

