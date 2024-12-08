import React, { useState, useEffect } from "react";
import { Box, Typography, Grid } from "@mui/material";
import TouristVintagePost from "./TouristVintagePost.js";

export default function ActivityList({ fetchedVintages }) {
  return (
    <Box sx={{ width: "100%", padding: "20px" }}>
      <Grid container spacing={3}>
        {fetchedVintages &&
          fetchedVintages.length > 0 &&
          fetchedVintages.map((vintage) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={vintage._id}>
              <TouristVintagePost
                id={vintage._id || "N/A"} // Safely handle missing _id
                name={vintage.name || "No name provided"} // Handle missing name
                description={vintage.description || "No description available"} // Handle missing description
                pictures={vintage.pictures || []} // Handle missing pictures with an empty array
                location={
                  vintage.location
                    ? {
                        longitude: vintage.location.longitude || 0, // Default longitude
                        latitude: vintage.location.latitude || 0, // Default latitude
                        nation: {
                          country:
                            vintage.location.country || "Unknown country",
                          city: vintage.location.city || "Unknown city",
                        },
                      }
                    : null
                } // Handle missing location by setting it to null
                ticket_price={
                  vintage.ticket_price
                    ? {
                        foriegner:
                          vintage.ticket_price.foriegner || "Not specified",
                        native: vintage.ticket_price.native || "Not specified",
                        student:
                          vintage.ticket_price.student || "Not specified",
                      }
                    : {
                        foriegner: "Not specified",
                        native: "Not specified",
                        student: "Not specified",
                      }
                } // Handle missing ticket_price safely
                tags={vintage.tags || []} // Default tags to an empty array if missing
                opening_hours={
                  vintage.opening_hours
                    ? {
                        opening:
                          vintage.opening_hours.opening || "Not specified",
                        closing:
                          vintage.opening_hours.closing || "Not specified",
                      }
                    : {
                        opening: "Not specified",
                        closing: "Not specified",
                      }
                } // Handle missing opening_hours safely
              />
            </Grid>
          ))}
      </Grid>
    </Box>
  );
}
