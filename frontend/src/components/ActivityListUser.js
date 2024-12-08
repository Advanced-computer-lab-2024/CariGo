import React from "react";
import ActivityPost from "./ActivityPost.js";
import { Box, Typography, Grid } from "@mui/material";

export default function ActivityList({ fetchedActivities }) {
  const StringDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const calculateDuration = (date1, date2) => {
    if (!date1 || !date2) return "Unknown duration";
    const start = new Date(date1);
    const end = new Date(date2);
    const diffTime = Math.abs(end - start);
    const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return days > 0 ? `${days} days` : "Less than a day";
  };

  return (
    <Box sx={{ width: "100%", padding: "20px" }}>
      <Grid container spacing={3}>
        {fetchedActivities &&
          fetchedActivities.length > 0 &&
          fetchedActivities.map((activity) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={activity._id}>
              <ActivityPost
                id={activity._id}
                author={activity.author}
                title={activity.title || "No title available"}
                start_date={StringDate(activity.start_date)}
                end_date={StringDate(activity.end_date)}
                location={
                  activity.locations
                    ? `${activity.locations.lon}, ${activity.locations.lan}`
                    : "Location unavailable"
                }
                duration={calculateDuration(
                  activity.start_date,
                  activity.end_date
                )}
                price={
                  activity.price ? `${activity.price}` : "Price not available"
                } //price.range.min to //price.range.max
                category={activity.Category?.title || "Uncategorized"}
                rating={activity.ratingsAverage ?? "No rating"}
                discount={activity.discount ?? 0}
                isOpened={activity.bookingOpened ? "open" : "closed"}
                tag={activity.tag?.title || "No tag available"}
                description={activity.description || "No description available"}
                img={activity.img || "activity.jpg"}
              />
            </Grid>
          ))}
      </Grid>
    </Box>
  );
}
