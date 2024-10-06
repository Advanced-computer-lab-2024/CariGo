import React from "react";
import ActivityPostAdvertiser from "./ActivityPostAdvertiser";
import { Box } from "@mui/material";
import { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import { jwtDecode } from "jwt-decode";

export default function ActivityPostAdvList({advertiserPosts}){

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
                const response = await fetch("http://localhost:4000/cariGo/activity/getadvact", {
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

    const StringDate = (date) => {
        // Ensure date is a Date object
        const d = new Date(date);
        
        // Get day, month, and year
        const day = String(d.getDate()).padStart(2, '0'); // Pad with leading zero if needed
        const month = String(d.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
        const year = d.getFullYear();
    
        // Return formatted string
        return `${day}/${month}/${year}`;
    };

    return(
        <Box sx={{display:"flex", flexDirection:"column"}}>
            {activities.map((activity,index) => (
                <Grid size ={4} key={index}>
                    <ActivityPostAdvertiser
                        id={activity._id}
                        start_date={StringDate(activity.start_date)}
                        end_date={StringDate(activity.end_date)}
                        location={activity.location}
                        duration={activity.duration}
                        price= {activity.price}
                        category={activity.category}
                        rating={activity.ratingsAverage}
                        discount={activity.discount}
                        isOpened= {activity.isOpened==true? "open":"closed"}
                        title= {activity.title} 
                        tags={activity.tags}
                        description={activity.description}
                        img={activity.img}
                    />
                </Grid>
            ))}
        </Box>
    )


}