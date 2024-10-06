import React, { useState, useEffect } from 'react';
import ActivityPost from "./ActivityPost.js";
import { Grid } from '@mui/material';
import { Box } from '@mui/material';
import Paper from '@mui/material/Paper';

export default function ActivityList({}){
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        // Fetch activities from the backend API
        const fetchActivities = async () => {
            try {
                const response = await fetch("http://localhost:4000/cariGo/activity");
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

    
    

    return (
        <Paper elevation={3} sx={{ padding: 2 }}>
        <Grid container spacing={2} sx={{display: 'flex',
            flexDirection: 'column', width: '100vw'}}>
            {activities.map((activity,index) => (
                <Grid size ={4} key={index}>
                    <ActivityPost
                        id={activity.id}
                        start_date={activity.start_date}
                        end_date={activity.end_date}
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
        </Paper>
        
    );
};