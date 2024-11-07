import React, { useState, useEffect } from "react";
import ResponsiveAppBar from "./components/TouristNavBar";
import { Grid, Typography } from "@mui/material";
import UserItineraryPost from "../../components/UserItineraryPost";
import jwtDecode from "jwt-decode";
import { CircularProgress } from "@mui/material";

const TouristHome = () => {
  const [itineraries, setItineraries] = useState([]);
  // l-ring.register();
  useEffect(() => {
    const fetchItineraries = async () => {
      try {
        const token = localStorage.getItem("jwt");
        if (!token) {
          throw new Error("No token found. Please log in.");
        }

        const userId = localStorage.getItem("id");
        console.log("User ID:", userId);

        // Fetch user data
        const userResponse = await fetch(`/cariGo/users/${userId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!userResponse.ok) {
          throw new Error(`Failed to fetch user data: ${userResponse.status}`);
        }

        const user = await userResponse.json();
        const tags = user.selectedTags || []; // Default to empty array if undefined
        console.log("User selected tags:", tags);

        // Generate query string for tags
        const queryString = tags
          .map((tag) => `tags=${encodeURIComponent(tag)}`)
          .join("&");

        // Fetch itineraries based on tags
        const response = await fetch(`/cariGo/Event/suggested?${queryString}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const json = await response.json();
        setItineraries(json);
        console.log("Fetched itineraries:", json);
      } catch (error) {
        console.log("Error fetching itineraries:", error);
      }
    };

    fetchItineraries();
  }, []);

  return (
    <div>
      <ResponsiveAppBar />
      {itineraries ? (
        <Grid
          container
          spacing={0}
          sx={{ display: "flex", flexDirection: "column", width: "100vw" }}
        >
          {itineraries.map((itinerary, index) => (
            <Grid
              item
              key={index}
              sx={{ display: "flex", justifyContent: "left" }}
            >
              <UserItineraryPost
                id={itinerary._id}
                author={itinerary.author?.name}
                title={itinerary.title}
                img={"frontend/public/assets/images/itirenary.png"}
                start_date={itinerary.start_date}
                end_date={itinerary.end_date}
                locations={itinerary.locations}
                price={itinerary.price}
                tags={itinerary.tags}
                transportation={itinerary.transportation}
                accommodation={itinerary.accommodation}
                rating={itinerary.ratingsAverage}
                isBooked={itinerary.isBooked}
                accessibility={itinerary.accessibility}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <CircularProgress size={40} color="primary" sx={{ marginTop: "50px" }} />
        </div>
      )}
    </div>
  );
};

export default TouristHome;
