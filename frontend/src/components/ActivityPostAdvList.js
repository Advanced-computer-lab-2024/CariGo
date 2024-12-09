import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import ActivityPost from './ActivityPostAdvertiser';

const ActivityPostAdvList = () => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchActivities = async () => {
      const token = localStorage.getItem('jwt');
      const userId = localStorage.getItem("id");

      try {
        const response = await fetch("http://localhost:4000/cariGo/activity/getadvact", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const json = await response.json();
        console.log("Fetched activities:", json);
        setActivities(json);
      } catch (error) {
        console.log('Error fetching activities:', error);
      }
    };

    fetchActivities();
  }, []);

  const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const calculateDuration = (date1, date2) => {
    const start = new Date(date1);
    const end = new Date(date2);
    
    const years = end.getFullYear() - start.getFullYear();
    const months = end.getMonth() - start.getMonth() + (years * 12);
    const days = Math.floor((end - start) / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(days / 7);
  
    if (years > 0) {
      return `${years} year${years > 1 ? 's' : ''}`;
    } else if (months > 0) {
      return `${months} month${months > 1 ? 's' : ''}`;
    } else if (weeks > 0) {
      return `${weeks} week${weeks > 1 ? 's' : ''}`;
    } else {
      return `${days} day${days > 1 ? 's' : ''}`;
    }
  };

  return (
    <Grid container spacing={2}>
      {activities.map((activity, index) => (
        <Grid item xs={12} key={index}>
          <ActivityPost
            id={activity._id}
            author={activity.author}
            start_date={formatDate(activity.start_date)}
            end_date={formatDate(activity.end_date)}
            location={activity.locations}
            duration={calculateDuration(activity.start_date, activity.end_date)}
            price={activity.price}
            category={activity.Category}
            rating={activity.ratingsAverage}
            discount={activity.discount}
            isOpened={activity.isOpened ? "open" : "closed"}
            title={activity.title}
            tag={activity.tag}
            description={activity.description}
            img={"https://upload.wikimedia.org/wikipedia/commons/4/49/%D8%AC%D8%A7%D9%85%D8%B9_%D9%85%D8%AD%D9%85%D8%AF_%D8%B9%D9%84%D9%8A.JPG"}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default ActivityPostAdvList;

