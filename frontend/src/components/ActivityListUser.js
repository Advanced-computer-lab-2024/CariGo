import React, { useState, useEffect } from 'react';
import ActivityPost from "./ActivityPost.js";
import { Grid } from '@mui/material';
import { Box } from '@mui/material';

export default function ActivityList({ActivityPosts}){
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        // Fetch activities from the backend API
        const fetchActivities = async () => {
            try {
                const response = await fetch("/cariGo/activity");
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const json = await response.json();
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
    

    return (
        <Grid container spacing={2} sx={{display: 'flex',
            flexDirection: 'column', width: '100vw'}}>
            {activities.map((activity,index) => (
                <Grid size ={4} key={index}>
                    <ActivityPost
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
        </Grid>
        
    );
};