import React, { useState, useEffect } from 'react';
// import ActivityPost from "../../components/ActivityPost.js";
import AdminActPost from "./AdminActPost.js";
import { Box, Typography } from '@mui/material';



export default function ActivityList({fetchedActivities}) {
    
   
   
    const StringDate = (date) => {
        const d = new Date(date);
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const year = d.getFullYear();
        return `${day}/${month}/${year}`;
    };
  
    const calculateDuration=(date1,date2)=>{
        const start = new Date(date1);
        const end = new Date(date2);
        
        // Calculate differences
        const years = end.getFullYear() - start.getFullYear();
        const months = end.getMonth() - start.getMonth() + (years * 12);
        const days = Math.floor((end - start) / (1000 * 60 * 60 * 24));
        const weeks = Math.floor(days / 7);
      
        // Determine the largest unit
        if (years > 0) {
          return `${years} year${years > 1 ? 's' : ''}`;
        } else if (months > 0) {
          return `${months} month${months > 1 ? 's' : ''}`;
        } else if (weeks > 0) {
          return `${weeks} week${weeks > 1 ? 's' : ''}`;
        } else {
          return `${days} day${days > 1 ? 's' : ''}`;
        }
    }
 
    return (
        <Box sx={{ width: '100vw' }}>
           
            {/* Activity List */}
            {fetchedActivities.length > 0 ? (
            <Box>
                {fetchedActivities.map((activity) => (
                    <Box item key={activity._id}>
                        <AdminActPost
                            id={activity._id}
                            start_date={StringDate(activity.start_date)}
                            end_date={StringDate(activity.end_date)}
                            location={activity.locations}
                            duration={calculateDuration(activity.start_date, activity.end_date)}
                            price={activity.price}
                            category={activity.Category}
                            rating={activity.ratingsAverage}
                            discount={activity.discount}
                            isOpened={activity.isOpened ? 'open' : 'closed'}
                            title={activity.title}
                            tag={activity.tag}
                            description={activity.description}
                            img={activity.img}
                            isFlagged={activity.isFlagged}
                        />
                    </Box>
                        ))}
                    </Box>
                    ) : (
                    <Typography>No activities found.</Typography>
            )}
        </Box>
    );
}
