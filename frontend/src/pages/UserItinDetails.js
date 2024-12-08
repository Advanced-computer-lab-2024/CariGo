import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Chip, Avatar } from "@mui/material";
import PinDropIcon from "@mui/icons-material/PinDrop";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
<<<<<<< HEAD
import ResponsiveAppBar from "./Tourist/components/TouristNavBar";
=======
import StarIcon from "@mui/icons-material/Star";
import TouristNavBar from "./Tourist/components/TouristNavBar.js";
import GuestNavBar from "./Tourist/components/GuestNavBar";
import GuestSideBar from "./Tourist/components/GuestSideBar";
import TouristSideBar from "./Tourist/components/TouristSideBar";
import UserAcList from "../components/UserAcList"; // Import the new MarkerList component
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
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import BookingPaymentPopUp from "./Tourist/components/BookingPaymentPopUp";
import { jwtDecode } from "jwt-decode";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe('pk_test_51QLoL4AkXvwFjwTIX8acMj27pC8YxdOhmoUzn0wbUhej1xUFgFlfgYtXRGmggbKUI6Yfpxz08i9shcsfszv6y9iP0007q608Ny'); // Publishable key
>>>>>>> main

const UserVintageDetails = () => {
  const { id } = useParams(); // Get the vintage ID from the URL
  const [vintage, setVintage] = useState(null);

  useEffect(() => {
    const fetchVintageDetails = async () => {
      try {
        const token = localStorage.getItem("jwt");
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
<<<<<<< HEAD
        setVintage(data);
=======
        setItinerary(data);
        if(data.interestedUsers) {
          setLocalInterestedUsers(data.interestedUsers);
        }
        if (token) setTourist(true);
>>>>>>> main
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
  return (
<<<<<<< HEAD
    <div>
      <ResponsiveAppBar />
      <Box sx={{ padding: "20px", maxWidth: "1200px", margin: "auto" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: "20px",
=======
    <Box sx={{ display: "flex", backgroundColor: "#f9f9f9", minHeight: "100vh" }}>
    {/* Sidebar */}
    <Box>
      {!tourist ? <GuestSideBar /> : <TouristSideBar />}
    </Box>

    {/* Main Content Area */}
    <Box
      sx={{
        flexGrow: 1,
        marginLeft: "80px", // Sidebar width
        marginTop: "64px", // AppBar height
        padding: "16px",
      }}
    >
      {/* Top Navbar */}
      {!tourist ? <GuestNavBar /> : <TouristNavBar />}
      <Button
         onClick={() => navigate(`/Tourist-itineraries`)}
          sx={{
            backgroundColor: "white",
            color: "#00355a",
            borderRadius: "8px",
            width: "80px",
            ml: "1%",mt:'2%',mb:'0%',
            fontSize:'18px'
>>>>>>> main
          }}
        >
          <Avatar sx={{ bgcolor: "#126782", width: 56, height: 56 }}>
            {name.charAt(0)}
          </Avatar>
          <Typography variant="h4" sx={{ margin: "10px 0", fontWeight: "bold" }}>
            {name || "No name provided"}
          </Typography>
          {tags?.map((tag, index) => (
            <Chip
              key={index}
              label={tag}
              sx={{ backgroundColor: "#126782", color: "white", margin: "5px" }}
            />
          ))}
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

        <div className="vintage-info">
          <Box sx={{ marginBottom: "20px" }}>
            <Typography variant="body1" sx={{ fontSize: "18px", marginBottom: "10px" }}>
              <strong>Description:</strong> {description}
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <PinDropIcon sx={{ marginRight: "5px" }} />
              <Typography variant="body1">
                <strong>Location:</strong> {`${location.nation.city}, ${location.nation.country}`} (Lat: {location.latitude}, Long: {location.longitude})
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <AttachMoneyIcon sx={{ marginRight: "5px" }} />
              <Typography variant="body1">
              Ticket Prices in {`${code}`}:<br/> Foreigner: {(ticket_price.foriegner*conversionRate).toFixed(2)}<br/> Native: {(ticket_price.native*conversionRate).toFixed(2)}<br/> Student: {(ticket_price.student*conversionRate).toFixed(2)}
              </Typography>
<<<<<<< HEAD
            </Box>
            <Typography variant="body1" sx={{ fontSize: "18px", marginBottom: "10px" }}>
              <strong>Opening Hours:</strong> {opening_hours.opening} - {opening_hours.closing}
            </Typography>
          </Box>
        </div>
      </Box>
    </div>
=======

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "10px",
                    }}
                  >
                    <LanguageIcon
                      sx={{ marginRight: "10px", color: "#00355a" }}
                    />
                    <Box>
                      <Typography variant="body1" sx={{ fontWeight: "bold",color:"#ff6b35" }}>
                        Language of Tour Guide
                      </Typography>
                      <Typography variant="body2"  color= "#00355a" >
                        {language || "Not specified"}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "10px",
                    }}
                  >
                    <DirectionsBusIcon
                      sx={{ marginRight: "10px", color: "#00355a" }}
                    />
                    <Box>
                      <Typography variant="body1" sx={{ fontWeight: "bold",color:"#ff6b35"  }}>
                        Transportation
                      </Typography>
                      <Typography variant="body2"  color= "#00355a">
                        {transportation || "Not specified"}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "10px",
                    }}
                  >
                    <DirectionsBusIcon
                      sx={{ marginRight: "10px", color: "#00355a" }}
                    />
                    <Box>
                      <Typography variant="body1" sx={{ fontWeight: "bold" ,color:"#ff6b35" }}>
                        Pick-up
                      </Typography>
                      <Typography variant="body2"  color= "#00355a">
                        {pick_up || "Not specified"}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "10px",
                    }}
                  >
                    <DirectionsBusIcon
                      sx={{ marginRight: "10px", color: "#00355a" }}
                    />
                    <Box>
                      <Typography variant="body1" sx={{ fontWeight: "bold",color:"#ff6b35"  }}>
                        Drop-off
                      </Typography>
                      <Typography variant="body2"  color= "#00355a">
                        {drop_off || "Not specified"}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "10px",
                    }}
                  >
                    <HotelIcon sx={{ marginRight: "10px", color: "#00355a" }} />
                    <Box>
                      <Typography variant="body1" sx={{ fontWeight: "bold",color:"#ff6b35"  }}>
                        Accommodation
                      </Typography>
                      <Typography variant="body2"  color= "#00355a">
                        {accommodation || "Not specified"}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "10px",
                    }}
                  >
                    <AccessibleIcon
                      sx={{ marginRight: "10px", color: "#00355a" }}
                    />
                    <Box>
                      <Typography variant="body1" sx={{ fontWeight: "bold",color:"#ff6b35"  }}>
                        Accessibility
                      </Typography>
                      <Typography variant="body2"  color= "#00355a">
                        {accessibility || "Not specified"}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>

              <Divider sx={{ margin: "20px 0" }} />

              <Typography
                variant="h5"
                sx={{ mb:'0.5%', color: "#00355a" }}
              >
                Activities
              </Typography>
              <UserAcList activities={formattedActivities} />
            </Grid>

            <Grid item xs={12} md={4}>
              <Paper
                elevation={2}
                sx={{
                  padding: "20px",
                  position: "sticky",
                  top: "80px",
                  backgroundColor: isOpened ? "#ffffff" : "#f0f4f8",
                  border: isOpened ? "none" : "2px dashed #00355a",
                  transition: "all 0.3s ease-in-out",
                }}
              >
                {isOpened ? (
                  <>
                    <Typography
                      variant="h6"
                      sx={{ marginBottom: "15px", color: "#00355a" }}
                    >
                      Book This Itinerary
                    </Typography>
                    <Typography variant="body1" sx={{ marginBottom: "15px" , color: "#00355a" }}>
                      Experience this amazing journey from{" "}
                      {formatDateTime(start_date)} to {formatDateTime(end_date)}
                      .
                    </Typography>
                    <Typography
                      variant="h5"
                      sx={{ marginBottom: "15px", fontWeight: "bold", color: "#ff6b35" }}
                    >
                      {price
                        ? `${(price * conversionRate).toFixed(2)} ${code}`
                        : "Price not specified"}
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      onClick={handleClick}
                      sx={{
                        backgroundColor: "#ff6b35",
                        // "&:hover": {
                        //   backgroundColor: "#0d4e63",
                        // },
                      }}
                    >
                      Book Now
                    </Button>
                    <Elements stripe={stripePromise}>
                      {isPaymentPopupOpen && (
                        <BookingPaymentPopUp
                          open={isPaymentPopupOpen}
                          onClose={() => setIsPaymentPopupOpen(false)}
                          checkoutCart={handlePlaceOrder}
                          amount={(price * conversionRate).toFixed(2)}
                          user={user}
                          itineraryName={title} 
                          startDate={start_date}
                          endDate={end_date}
                        />
                      )}
                    </Elements>
                  </>
                ) : (
                  <Box sx={{ textAlign: "center" }}>
                    <Typography
                      variant="h6"
                      sx={{ marginBottom: "15px", color: "#00355a" }}
                    >
                      Booking Coming Soon!
                    </Typography>
                    <AccessTimeIcon
                      sx={{
                        fontSize: 60,
                        color: "#00355a",
                        marginBottom: "15px",
                      }}
                    />
                    <Typography variant="body1" sx={{ marginBottom: "15px" }}>
                      This itinerary is not yet open for booking. Check back
                      later for updates!
                    </Typography>
                    {!localInterestedUsers.includes(localStorage.getItem("id"))?<Button
                      variant="outlined"
                      color="primary"
                      fullWidth
                      sx={{
                        borderColor: "#00355a",
                        color: "#00355a",
                        "&:hover": {
                          backgroundColor: "#e6f7ff",
                        },
                      }}
                      onClick={() => {
                        setLocalInterestedUsers([...localInterestedUsers, localStorage.getItem("id")]);
                        let users = [
                          ...localInterestedUsers,
                          localStorage.getItem("id"),
                        ];
                        console.log("ernker " + users);
                        handleInterestedUser(users);
                      }}
                    >
                      Notify Me When Available
                    </Button>:
                    <Typography variant="body1" sx={{ marginBottom: "15px" }}>
                    You will be notified when this itinerary is available for booking.
                  </Typography>}
                  </Box>
                )}
              </Paper>
            </Grid>
          </Grid>
        </Paper>
        </Box></Box> </Box>
>>>>>>> main
  );
};

export default UserVintageDetails;
