import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Chip, Avatar } from "@mui/material";
import PinDropIcon from "@mui/icons-material/PinDrop";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import StarIcon from "@mui/icons-material/Star";
import ResponsiveAppBar from "./Tourist/components/TouristNavBar";
import GuestNavBar from "../components/NavBarTourist";
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

const ItineraryDetails = () => {
  const { id } = useParams(); // Get the itinerary ID from the URL
  const [itinerary, setItinerary] = useState(null);
  const [localInterestedUsers, setLocalInterestedUsers] = useState([]);
  const navigate = useNavigate();
  const [token,setToken] = useState(localStorage.getItem('jwt'));
  const [tourist,setTourist]= useState(false);
  const [user, setUser] = useState();

  useEffect(() => {
  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("jwt");
      const id = jwtDecode(token).id;

      const response = await axios.get(
        `http://localhost:4000/cariGo/users/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
        
      console.log("API Response Data:", response.data); // Logs the fetched data
      setUser(Object.assign({}, response.data));
    } catch (err) {
      console.error("Error fetching profile:", err);
    }
  };
 
  fetchUser();
  }, []);
  // useEffect(() => {
  //   if (user) {
  //     console.log("Updated user state:", user); // Logs the state after it updates
  //   }
  // }, [user]);

  const [isPaymentPopupOpen, setIsPaymentPopupOpen] = useState(false);

  const handleClick = () => {
    if (token){
      setIsPaymentPopupOpen(true);
      // navigate(`/checkout/itinerary/${id}`); // Update the navigation path
    }
      
    else navigate(`/login`);
  };
  
  useEffect(() => {
    const fetchItineraryDetails = async () => {
      try {
        const response = await fetch(
          `/cariGo/Event/readSingleItinerary/${id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setItinerary(data);
        if(data.interestedUsers) {
          setLocalInterestedUsers(data.interestedUsers);
        }
        if (!token) setTourist(false);
      } catch (error) {
        console.error("Error fetching itinerary details:", error);
      }
    };
    fetchItineraryDetails();
  }, [id]); // Include `id` in dependencies

  if (!itinerary) {
    return <Typography>Loading...</Typography>;
  }

  const {start_date,end_date,locations,price,tags,activities,transportation,accommodation,
    ratingsAverage,language,pick_up,drop_off,accessibility,title,isOpened,author,
  } = itinerary;

   // Function to format the date and time
   const formatDateTime = (dateString) => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      //hour: '2-digit',
      //minute: '2-digit',
      //hour12: true,
    };
    return new Date(dateString).toLocaleString(undefined, options);
  };

  const formatDateHour = (dateString) => {
    const options = {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true, // Use 12-hour format with AM/PM
    };
    return new Date(dateString).toLocaleString(undefined, options);
  };


  // Format activities to include start and end dates in the correct format
  const formattedActivities = activities.map((activity) => ({
    name: activity.name,
    description: activity.description,
    startDate: formatDateTime(activity.start_date),
    endDate: formatDateTime(activity.end_date),
  }));

  const handleInterestedUser = async (users) => {
    try {
      const response = await fetch(`/cariGo/Event/updateItinerary/${id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          interestedUsers: users,
        }),
      });
      if (!token) setTourist(false);
    } catch (error) {
      console.error("Error", error);
    }
  };

  const handlePlaceOrder = async (paymentMethod,TotalPrice,NumberOfTickets) => {
    // setLoading(true);
    try {
      const token = localStorage.getItem("jwt");
      if (!token) {
        throw new Error("No token found. Please log in.");
      }
      

      const endpoint = `http://localhost:4000/cariGo/Event/BookItinerary/${id}`;

      // const payload = 
      console.log(paymentMethod,TotalPrice,NumberOfTickets)
      const response = await axios.post(endpoint, {
        PaymentMethod:paymentMethod,
        TotalPrice:TotalPrice,
        NumberOfTickets:NumberOfTickets
      }, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data) {
        navigate("/tourist/MyBookings");
      }
    } catch (error) {
      console.error("Error during booking:", error);
      // setError(error.response?.data?.error || 'Booking failed');
    }
  };
  const conversionRate = localStorage.getItem("conversionRate") || 1;
  const code = localStorage.getItem("currencyCode") || "EGP";

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
    author: {
      fontSize: "16px",
      color: "#cc5b22",
      marginBottom: "8px",
    },
  }
  return (
    <>
      {token? <ResponsiveAppBar />: <GuestNavBar/>}
      <Button
         onClick={() => navigate(`/Tourist-itineraries`)}
          sx={{
            backgroundColor: "white",
            color: "#00355a",
            borderRadius: "8px",
            width: "80px",
            ml: "11%",mt:'2%',mb:'0%',
            fontSize:'18px'
          }}
        >
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
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  marginBottom: "20px",
                }}
              >
                {/* Title and Rating Container */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between", // Push content to edges
                    alignItems: "center",
                    width: "90%", // Ensure it spans full width
                    color: "#00355a",
                  }}
                >
                  {/* Title */}
                  <Box sx={{display: "flex", flexDirection: "column",}}>
                  <Typography
                    variant="h4"
                    sx={{
                      marginBottom: "10px",
                      fontWeight: "bold",
                    }}
                  >
                    {title || "Anonymous"}
                  </Typography>
                  <p style={styles.author}>by {author?.username ? author?.username :"Big Bang"}</p>
                  {/* Rating */}
                  <div style={styles.ratingContainer}>
                    {"★★★★★".split("").map((star, index) => (
                      <span
                        key={index}
                        style={{
                          ...styles.star,
                          opacity: index < Math.floor(ratingsAverage) ? 1 : 0.5,
                        }}
                      >
                        {star}
                      </span>
                    ))}
                    <span style={styles.ratingText}>{ratingsAverage}</span>
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

              <Box
                component="img"
                src={logoImage || ""}
                alt="Itinerary Image"
                sx={{
                  width: "100%",
                  maxHeight: "400px",
                  borderRadius: "10px",
                  objectFit: "cover",
                  marginBottom: "20px",
                }}
              />

              <Divider sx={{ margin: "20px 0" }} />

              <Typography
                variant="h5"
                sx={{ marginBottom: "15px", color: "#00355a" }}
              >
                Itinerary Details
              </Typography>
            {/* start and end date */}
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: "flex",margin: "2% 0", }}>
                    <CalendarMonthIcon sx={{color:'#00355a', fontSize:'28px',}}/>
                    <Box sx={{color:'#00355a', marginLeft:'10px',display:'flex', flexDirection:'column', gap:'5px'}}>
                      {/* <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                        Start Date:
                      </Typography> */}
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
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: "flex",margin: "2% 0", }}>
                    <CalendarMonthIcon sx={{color:'#00355a', fontSize:'28px',}}/>
                    <Box sx={{color:'#00355a', marginLeft:'10px',display:'flex', flexDirection:'column', gap:'5px'}}>
                      {/* <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                        Start Date:
                      </Typography> */}
                      <Typography variant="body2" sx={{fontSize:'18px'}}>
                        {formatDateTime(end_date)}
                      </Typography>
                      <Box sx={{display:'flex', gap:'5px', color:'#00355a'}}>
                        <AccessTimeIcon sx={{fontSize: "22px",}}/>
                        <Typography sx={{ }}>
                            {formatDateHour(end_date)}
                        </Typography>
                        </Box>
                    </Box>
                  </Box>
                </Grid>
                {/* end of start and end date */}
                <Grid item xs={12}>
                  <Box
                    sx={{
                      display: "flex",
                      //alignItems: "center",
                      marginBottom: "10px",
                    }}
                  >
                    <PinDropIcon
                      sx={{ fontSize:'30px', color: "#00355a" }}
                    />
                    <Box sx={{color:'#00355a', marginLeft:'10px',display:'flex', flexDirection:'column', gap:'5px'}}>
                      <Typography variant="body1" sx={{ fontWeight: "bold", color:'#ff6b35' }}>
                      Location {locations.length > 1 ? 's' : ''}
                      </Typography>
                      <Typography variant="body2">
                        {locations?.join(", ") || "Not specified"}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box
                    sx={{
                      display: "flex",
                      //alignItems: "center",
                      marginBottom: "10px",
                    }}
                  >
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
                </Grid>
              </Grid>

              <Divider sx={{ margin: "20px 0" }} />

              <Typography
                variant="h5"
                sx={{ marginBottom: "15px", color: "#00355a" }}
              >
                Additional Information
              </Typography>

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
                  top: "20px",
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
      </Box>
    </>
  );
};

export default ItineraryDetails;
