import * as React from 'react';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/material/Typography';

export default function ItineraryActivityList({ activities }) {
  // Ensure activities is an array
  const safeActivities = Array.isArray(activities) ? activities : [];

  return (
    <Stack spacing={2}>
      <List>
        {safeActivities.length > 0 ? (
          safeActivities.map((activity, index) => (
            <ListItem key={index} sx={{ flexDirection: "column", alignItems: "flex-start" }}>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                {activity.name || "Unnamed Activity"} {/* Fallback for activity name */}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {activity.description || "No description available."} {/* Fallback for description */}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary", marginTop: "5px" }}>
                <strong>Start Date:</strong> {activity.start_date ? new Date(activity.start_date).toLocaleString() : "N/A"} {/* Check for start_date */}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary", marginTop: "5px" }}>
                <strong>End Date:</strong> {activity.end_date ? new Date(activity.end_date).toLocaleString() : "N/A"} {/* Check for end_date */}
              </Typography>
            </ListItem>
          ))
        ) : (
          <ListItem>No activities available for this itinerary</ListItem>
        )}
      </List>
    </Stack>
  );
}
