import React, { useState, useEffect } from 'react';
import { Box,Typography, Menu, TextField, Button, CircularProgress, MenuItem ,IconButton} from '@mui/material';
import NavBar from './components/TouristNavBar.js';
import HistoryTab from './components/HistoryTab.js';
import { ArrowBackIos } from '@mui/icons-material';

export default function TouristHistory(){

    const [selectedTab, setSelectedTab] = useState(null);

    // Define an array of tab data including text and colors
    const tabs = [
        { text: "Products", mainColor: "#ff4d4d", scndColor: "#f37173" },
        { text: "events", mainColor: "#ff4d4d", scndColor: "#f37173" },
        { text: "Tour guide", mainColor: "#ff4d4d", scndColor: "#f37173" },
        { text: "Iteneraries", mainColor: "#ff4d4d", scndColor: "#f37173" }
    ];

    const handleTabClick = (text) => {
        setSelectedTab(text); // Set the selected tab text
    };

    return(
        //for all history tabs
        <Box>
        <NavBar/>
        <Box sx={{marginLeft: "200px", marginTop:"50px", display:'flex' , flexDirection: 'row',}}>  

        <IconButton  sx={{"&:hover ": 
            {backgroundColor: "#ff4d4d88", borderRadius: "5px",}
             ,}} >
           <ArrowBackIos sx={{height: '40px',scale:'1.5',}} onClick={() => handleTabClick(null)} />
        </IconButton>

        {tabs.map(({ text, mainColor, scndColor }) => (
        <Box
          key={text}
          sx={{
            transition: 'transform 0.3s ease', // Smooth transition for the movement
            transform: selectedTab === text ? 'translateY(-15px)' : 'none', // Move selected tab
            opacity: selectedTab === text ? 0.5 : 1, // Hide unselected tabs
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
                    marginLeft:'15%',
                    transition: 'width 0.3s ease', // Smooth transition for width
                    width: selectedTab ? `${5+((tabs.findIndex(tab => tab.text === selectedTab) ) * (60 / tabs.length))}%` : '65%', // Adjust width based on selected tab
                }}
            />
        </Box>
    );
}