import React, { useState, useEffect } from 'react';
import ActivityPost from "./ActivityPost.js";
import { Grid } from '@mui/material';


export default function ActivityList({ActivityPosts}){
    const [activities, setActivities] = useState([]);

  useEffect(() => {
    // Fetch activities from the backend API
    fetch('/cariGo/activities')
      .then(response => response.json())
      .then(data => setActivities(data))
      .catch(error => console.error('Error fetching activities:', error));
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
                        title={activity.title}
                        tags={activity.tags}
                        description={activity.description}
                        img={activity.img}
                    />
                </Grid>
            ))}
        </Grid>
    );
};