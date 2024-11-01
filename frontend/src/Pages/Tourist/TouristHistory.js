import React, { useState, useEffect } from 'react';
import { Box,Typography, Menu, TextField, Button, CircularProgress, MenuItem ,IconButton} from '@mui/material';
import NavBar from './components/TouristNavBar.js';
import HistoryTab from './components/HistoryTab.js';

export default function TouristHistory(){

    const [selectedTab, setSelectedTab] = useState(null);

    // Define an array of tab data including text and colors
    const tabs = [
        { text: "Tab 1", mainColor: "#ff4d4d", scndColor: "#f37173" },
        { text: "Tab 2", mainColor: "#ff4d4d", scndColor: "#f37173" },
        { text: "Tab 3", mainColor: "#ff4d4d", scndColor: "#f37173" },
        { text: "Tab 4", mainColor: "#ff4d4d", scndColor: "#f37173" }
    ];

    const handleTabClick = (text) => {
        setSelectedTab(text); // Set the selected tab text
    };

    return(
        //for all history tabs
        <Box>
        <Box sx={{marginLeft: "200px", marginTop:"50px", gap :"100px", display:'flex' , flexDirection: 'row',}}>  
        
        {tabs.map(({ text, mainColor, scndColor }) => (
        <Box
          key={text}
          sx={{
            transition: 'transform 0.3s ease', // Smooth transition for the movement
            transform: selectedTab === text ? 'translateY(-20px)' : 'none', // Move selected tab
            opacity: selectedTab == text ? 0.5 : 1, // Hide unselected tabs
            height: selectedTab === text ? '60%' : '100%',
            cursor: 'pointer',
            overflow : 'hidden' ,
          }}
          onClick={() => handleTabClick(text)} // Handle tab click
        >
            <HistoryTab text={text} mainColor={mainColor} scndColor={scndColor} />
        </Box>
      ))}
       
        </Box>
        {/* Horizontal Line Below Tabs */}
        <Box
                sx={{
                    height: '2px',
                    //width: '80%',
                    backgroundColor: '#ff4d4d',
                    marginTop: '0px',
                    marginLeft:'8%',
                    transition: 'width 0.3s ease', // Smooth transition for width
                    width: selectedTab ? `${(tabs.findIndex(tab => tab.text === selectedTab) + 1) * (60 / tabs.length)}%` : '80%', // Adjust width based on selected tab
                }}
            />
        </Box>
    );
}