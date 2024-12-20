import React from "react";
import ActivityPostAdvertiser from "./ActivityPostAdvertiser";
import { Box } from "@mui/material";
import { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import { jwtDecode } from "jwt-decode";
import TransportCard from "./TransportCard";
import TransportCardAdv from "./TransportCardAdv";
export default function TransportListAdvertiser({advertiserPosts}){

    const [activities, setActivities] = useState([]);
    //const id=localStorage.getItem("id");
    useEffect(() => {
        // Fetch activities from the backend API
        const fetchActivities = async () => {

            const token = localStorage.getItem('jwt'); // Get the token from local storage
            const userId = localStorage.getItem("id"); // Get user ID if needed
            console.log(userId);
            console.log(token);

            try {
                const response = await fetch("http://localhost:4000/cariGo/transportation/getadvTrans", {
                    method: "GET", // Change this to "POST" if your backend expects it
                    headers: {
                        "Authorization": `Bearer ${token}`, // Send the token in the Authorization header
                        
                    }
                });

                // console.log(Request.json())

                if (!response.ok) {
                    console.log(response)
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const json = await response.json().catch((err) => {
                    console.error('Error parsing JSON:', err);
                    throw new Error('Invalid JSON response');
                });

                console.log("Fetched activities:", json);
                setActivities(json); // Set activities if response is okay
            } catch (error) {
                console.log('Error fetching activities:', error);
            }
        };

        fetchActivities(); // Call the function to fetch activities
    }, []);

//     const StringDate = (date) => {
//         // Ensure date is a Date object
//         const d = new Date(date);
        
//         // Get day, month, and year
//         const day = String(d.getDate()).padStart(2, '0'); // Pad with leading zero if needed
//         const month = String(d.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
//         const year = d.getFullYear();
    
//         // Return formatted string
//         return `${day}/${month}/${year}`;
//     };
//  const calculateDuration=(date1,date2)=>{
//         const start = new Date(date1);
//         const end = new Date(date2);
        
//         // Calculate differences
//         const years = end.getFullYear() - start.getFullYear();
//         const months = end.getMonth() - start.getMonth() + (years * 12);
//         const days = Math.floor((end - start) / (1000 * 60 * 60 * 24));
//         const weeks = Math.floor(days / 7);
      
//         // Determine the largest unit
//         if (years > 0) {
//           return `${years} year${years > 1 ? 's' : ''}`;
//         } else if (months > 0) {
//           return `${months} month${months > 1 ? 's' : ''}`;
//         } else if (weeks > 0) {
//           return `${weeks} week${weeks > 1 ? 's' : ''}`;
//         } else {
//           return `${days} day${days > 1 ? 's' : ''}`;
//         }
//     }
    

    return (
        <Grid container spacing={2} sx={{display: 'flex',
            flexDirection: 'column', width: '100vw'}}>
            {activities.map((transport) => 
                
            (
                <Grid size ={4} >
                     <TransportCardAdv  Transportation={transport} />
                </Grid>
            ))}
        </Grid>
        
    );
};