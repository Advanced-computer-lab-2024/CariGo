import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Chip, Avatar } from "@mui/material";
import PinDropIcon from "@mui/icons-material/PinDrop";
import ResponsiveAppBar from "./Tourist/components/TouristNavBar";
import GuestNavBar from "../components/NavBarTourist";
import "../components/styles/CompanyInfo.css";
import logoImage from "../assets/itinerary.png"; // Correct relative path
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import axios from "axios";
import { Paper, Grid } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LanguageIcon from "@mui/icons-material/Language";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import HotelIcon from "@mui/icons-material/Hotel";
import AccessibleIcon from "@mui/icons-material/Accessible";
import Divider from "@mui/material/Divider";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import BookingPaymentPopUp from "./Tourist/components/BookingPaymentPopUp";
import { jwtDecode } from "jwt-decode";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe('pk_test_51QLoL4AkXvwFjwTIX8acMj27pC8YxdOhmoUzn0wbUhej1xUFgFlfgYtXRGmggbKUI6Yfpxz08i9shcsfszv6y9iP0007q608Ny'); // Publishable key

const UserVintageDetails = () => {
  const { id } = useParams(); // Get the vintage ID from the URL
  const [vintage, setVintage] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("jwt");

  useEffect(() => {
    const fetchVintageDetails = async () => {
      try {
        const token = localStorage.getItem("jwt");
        const id = jwtDecode(token).id;
        // if (!token) {
        //   throw new Error("No token found. Please log in.");
        // }

        const response = await fetch(`/cariGo/Event/readSingleVintage/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setVintage(data);
      } catch (error) {
        console.error("Error fetching vintage details:", error);
      }
    };

    fetchVintageDetails();
  }, [id]);

  if (!vintage) {
    return <Typography>Loading...</Typography>;
  }

  const {
    name = "No name provided",
    description = "No description available",
    rating,
    pictures = [],
    location = {
      longitude: "Not specified",
      latitude: "Not specified",
      nation: { country: "Not specified", city: "Not specified" },
    },
    ticket_price = {
      foriegner: "Not specified",
      native: "Not specified",
      student: "Not specified",
    },
    tags = [],
    opening_hours = {
      opening: "Not specified",
      closing: "Not specified",
    },
  } = vintage;
  const conversionRate = localStorage.getItem("conversionRate")||1;
  const code = localStorage.getItem("currencyCode")||"EGP";

  const styles = {
    ratingContainer: {
      display: "flex",
      alignItems: "center",
      gap: "4px",
      marginBottom: "16px",
    },
    star: {
      color: "#ff6b35",
      fontSize: "20px",
    },
    ratingText: {
      fontSize: "20px",
      color: "#cc5b22",
    },
  }

  return (
    <>
      {token? <ResponsiveAppBar />: <GuestNavBar/>}
      <Button
         onClick={() => navigate(`/Tourist-itineraries`)}
          sx={{backgroundColor: "white", color: "#00355a", borderRadius: "8px", width: "80px",ml: "11%",mt:'2%',mb:'0%',fontSize:'18px'}}>
          <ArrowBackIosIcon/>
          Back
        </Button>
        <Box>
        <Paper
          elevation={3}
          sx={{ padding: "30px", maxWidth: "1200px", margin: "20px auto" }}
        >
          <Grid container spacing={4}>
            <Grid item xs={12} md={8}>
              <Box
                sx={{display: "flex", flexDirection: "column",alignItems: "flex-start",marginBottom: "20px",}}>
                {/* Title and Rating Container */}
                <Box
                  sx={{display: "flex",justifyContent: "space-between", alignItems: "center",width: "90%",color: "#00355a",}}>
                  {/* Title */}
                  <Box sx={{display: "flex", flexDirection: "column",}}>
                  <Typography
                    variant="h4"
                    sx={{marginBottom: "10px",fontWeight: "bold",}}>
                    {name || "Anonymous"}
                  </Typography>
                  {/* Rating */}
                  <div style={styles.ratingContainer}>
                    {"★★★★★".split("").map((star, index) => (
                      <span
                        key={index}
                        style={{
                          ...styles.star,
                          opacity: index < Math.floor(rating) ? 1 : 0.5,
                        }}
                      >
                        {star}
                      </span>
                    ))}
                    <span style={styles.ratingText}>{rating}</span>
                  </div>
                  </Box>
                </Box>

                <Box
                  sx={{display: "flex",flexWrap: "wrap",gap: "10px",marginBottom: "15px",}}
                >
                  {tags?.map((tag) => (
                    <Chip key={tag._id}label={tag.title}
                      sx={{ backgroundColor: "#00355a", color: "white" }}
                    />
                  ))}
                </Box>
              </Box>

              {pictures.length > 0 && (
              <Box
                component="img"
                src={pictures[0]}
                alt="Vintage Image"
                sx={{
                  width: "100%",
                  maxHeight: "400px",
                  borderRadius: "10px",
                  objectFit: "cover",
                  marginBottom: "20px",
                }}
              />
            )}

            <Divider sx={{ margin: "20px 0" }} />
        
              <Typography
                variant="h5"
                sx={{ marginBottom: "15px", color: "#00355a" }}
              >
                Itinerary Details
              </Typography>
            {/* start and end date */}
              <Grid container spacing={2}>
                {/* <Grid item xs={12} sm={6}>
                  <Box sx={{ display: "flex",margin: "2% 0", }}>
                    <CalendarMonthIcon sx={{color:'#00355a', fontSize:'28px',}}/>
                    <Box sx={{color:'#00355a', marginLeft:'10px',display:'flex', flexDirection:'column', gap:'5px'}}>
                      {/* <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                        Start Date:
                      </Typography> 
                      <Typography variant="body2" sx={{fontSize:'18px'}}>
                        {formatDateTime(start_date)}
                      </Typography>
                      <Box sx={{display:'flex', gap:'5px', color:'#00355a'}}>
                        <AccessTimeIcon sx={{fontSize: "22px",}}/>
                        <Typography sx={{ }}>
                            {formatDateHour(start_date)}
                        </Typography>
                        </Box>
                    </Box>
                  </Box>
                </Grid> */}

                {/* opening hours */}
                <Typography sx={{fontWeight:'bold', color:'#ff6b35'}}>Opening Hours:</Typography> 
                <Typography variant="body2" sx={{ fontSize: "18px", marginBottom: "10px" , color:'#00355a'}}>
              
              {opening_hours.opening} - {opening_hours.closing}
            </Typography>
                
                <Grid item xs={12}>
                  <Box sx={{ display: "flex", marginBottom: "10px", }}>
                    <PinDropIcon
                      sx={{ fontSize:'30px', color: "#00355a" }}
                    />
                    <Box sx={{color:'#00355a', marginLeft:'10px',display:'flex', flexDirection:'column', gap:'5px'}}>
                      <Typography variant="body1" sx={{ fontWeight: "bold", color:'#ff6b35' }}>
                      Location
                      </Typography>
                      <Typography variant="body2">
                        {/* {locations?.join(", ") || "Not specified"} */}
                        {`${location.nation.city}, ${location.nation.country}`} (Lat: {location.latitude}, Long: {location.longitude})
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                {/* <Grid item xs={12}>
                  <Box sx={{display: "flex",marginBottom: "10px",}}>
                    <AttachMoneyIcon
                      sx={{ fontSize:'30px', color: "#00355a" }}
                    />
                    <Box sx={{color:'#00355a', marginLeft:'10px',display:'flex', flexDirection:'column', gap:'5px'}}>
                      <Typography variant="body1" sx={{ fontWeight: "bold", color:'#ff6b35' }}>
                        Price
                      </Typography>
                      <Typography variant="body2">
                        {price
                          ? `${(price * conversionRate).toFixed(2)} ${code}`
                          : "Price not specified"}
                      </Typography>
                    </Box>
                  </Box>
                </Grid> */}
              </Grid>

              <Divider sx={{ margin: "20px 0" }} />

            </Grid>
          </Grid>
        </Paper>
      </Box>
    </>
  );
};

export default UserVintageDetails;
