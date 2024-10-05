import React, { useState, useEffect } from 'react';
import ActivityPost from "./ActivityPost.js";
import { Grid } from '@mui/material';
import { Box } from '@mui/material';

export default function ActivityList({ActivityPosts}){
    const [activities, setActivities] = useState(null);

  useEffect(() => {
    // Fetch activities from the backend API
    const fetchActivities = async() =>{
        const response = await fetch('/cariGo/activities');
        const json= await response.json();

        if(response.ok){
            setActivities(json)
        }    
    }  
  }, []);

    return (
        <Grid container spacing={2} sx={{display: 'flex',
            flexDirection: 'column', width: '100vw'}}>
            {activities.map(activity => (
                <Grid size ={4} key={activity.id}>
                    <ActivityPost
                        id={activity.id}
                        start_date={activity.start_date}
                        end_date={activity.end_date}
                        location={activity.location}
                        duration={activity.duration}
                        price= {activity.price}
                        category={activity.category}
                        discount={activity.discount}
                        isOpened={activity.isOpened}
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