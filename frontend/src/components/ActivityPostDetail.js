import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Chip,
  Paper,
  Grid,
  Button,
  Divider,
} from "@mui/material";
import {
  AccessTime,
  AttachMoney,
  CalendarMonth,
  Category,
  Description,
  LocationOn,
  Star,
} from "@mui/icons-material";
import NavBar from "../Pages/Tourist/components/TouristNavBar";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import BookingPaymentPopUp from "../Pages/Tourist/components/BookingPaymentPopUp";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe('pk_test_51QLoL4AkXvwFjwTIX8acMj27pC8YxdOhmoUzn0wbUhej1xUFgFlfgYtXRGmggbKUI6Yfpxz08i9shcsfszv6y9iP0007q608Ny'); // Publishable key


export default function ActivityDetail() {
  const { id } = useParams();
  const [activity, setActivities] = useState({});
  const navigate = useNavigate();
  const [localInterestedUsers, setLocalInterestedUsers] = useState([]);
  const token = localStorage.getItem("jwt");
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

  const [isPaymentPopupOpen, setIsPaymentPopupOpen] = useState(false);

  const handleClick = () => {
    if (token)
      setIsPaymentPopupOpen(true);
      //navigate(`/checkout/activity/${id}`); // Update the navigation path
    else navigate(`/login`);
  };

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/cariGo/Activity/getOne/${id}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const json = await response.json();
        console.log("Fetched activity data:", json); // Check the structure here
        setActivities(json);
        setLocalInterestedUsers(json.interestedUsers);
      } catch (error) {
        console.log("Error fetching activity:", error);
      }
    };

    fetchActivities();
  }, [id]);

  const handleInterestedUser = async (users) => {
    try {
      const response = await fetch(`/cariGo/activity/updateActivity/${id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          interestedUsers: users,
        }),
      });
      // if (!token) setTourist(false);
    } catch (error) {
      console.error("Error", error);
    }
  };

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatDateHour = (dateString) => {
    const options = {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    return new Date(dateString).toLocaleString(undefined, options);
  };

  const calculateDuration = (date1, date2) => {
    const start = new Date(date1);
    const end = new Date(date2);
    const days = Math.floor((end - start) / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(days / 7);

    if (weeks > 0) {
      return `${weeks} week${weeks > 1 ? "s" : ""}`;
    } else {
      return `${days} day${days > 1 ? "s" : ""}`;
    }
  };

  if (!activity) {
    return <Typography>Loading...</Typography>;
  }

  const conversionRate = localStorage.getItem("conversionRate") || 1;
  const code = localStorage.getItem("currencyCode") || "EGP";

  const handlePlaceOrder = async (paymentMethod,TotalPrice,NumberOfTickets) => {
    // setLoading(true);
    try {
      const token = localStorage.getItem("jwt");
      if (!token) {
        throw new Error("No token found. Please log in.");
      }
      

      const endpoint = `http://localhost:4000/cariGo/activity/BookActivity/${id}`;

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
        navigate("/tourist/MyBookedActivities");
      }
    } catch (error) {
      console.error("Error during booking:", error);
      // setError(error.response?.data?.error || 'Booking failed');
    }
  };

  return (
    <>
      <NavBar />
      <Box>
        <Button
          onClick={() => navigate(`/activities`)}
          sx={{
            backgroundColor: "white",
            color: "#126782",
            borderRadius: "8px",
            width: "80px",
            ml: "11%",
            mt: "2%",
            mb: "0%",
            fontSize: "18px",
          }}
        >
          <ArrowBackIosIcon/>
          Back
        </Button>
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
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "90%",
                    color: "#126782",
                  }}
                >
                  <Typography
                    variant="h4"
                    sx={{
                      marginBottom: "10px",
                      fontWeight: "bold",
                    }}
                  >
                    {activity.title || "Anonymous"}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Star
                      sx={{
                        color: "#FFD700",
                        marginRight: "5px",
                        fontSize: "30px",
                      }}
                    />
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: "bold", fontSize: "20px" }}
                    >
                      {activity.ratingsAverage || "No rating"}
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "10px",
                    marginBottom: "15px",
                  }}
                >
                  {Array.isArray(activity.tag) ? (
                    activity.tag.map((tag, index) => (
                      <Chip
                        key={index}
                        label={tag}
                        sx={{ backgroundColor: "#126782", color: "white" }}
                      />
                    ))
                  ) : (
                    <Typography>No tags available</Typography>
                  )}
                </Box>
              </Box>

              <Box
                component="img"
                src={activity.img || "/activity.jpg"}
                alt="Activity Image"
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
                sx={{ marginBottom: "15px", color: "#126782" }}
              >
                Activity Details
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: "flex", margin: "2% 0" }}>
                    <CalendarMonth
                      sx={{ color: "#ff4d4d", fontSize: "28px" }}
                    />
                    <Box
                      sx={{
                        color: "#126782",
                        marginLeft: "10px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "5px",
                      }}
                    >
                      <Typography variant="body2" sx={{ fontSize: "18px" }}>
                        {formatDate(activity.start_date)}
                      </Typography>
                      <Box
                        sx={{ display: "flex", gap: "5px", color: "#126782" }}
                      >
                        <AccessTime sx={{ fontSize: "22px" }} />
                        <Typography>
                          {formatDateHour(activity.start_date)}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: "flex", margin: "2% 0" }}>
                    <CalendarMonth
                      sx={{ color: "#ff4d4d", fontSize: "28px" }}
                    />
                    <Box
                      sx={{
                        color: "#126782",
                        marginLeft: "10px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "5px",
                      }}
                    >
                      <Typography variant="body2" sx={{ fontSize: "18px" }}>
                        {formatDate(activity.end_date)}
                      </Typography>
                      <Box
                        sx={{ display: "flex", gap: "5px", color: "#126782" }}
                      >
                        <AccessTime sx={{ fontSize: "22px" }} />
                        <Typography>
                          {formatDateHour(activity.end_date)}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box
                    sx={{
                      display: "flex",
                      marginBottom: "10px",
                    }}
                  >
                    <LocationOn sx={{ fontSize: "30px", color: "#ff4d4d" }} />
                    <Box
                      sx={{
                        color: "#126782",
                        marginLeft: "10px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "5px",
                      }}
                    >
                      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                        Location{activity.locations?.length > 1 ? "s" : ""}
                      </Typography>
                      <Typography variant="body2">
                        {Array.isArray(activity.locations)
                          ? activity.locations.join(", ")
                          : "Location not specified"}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box
                    sx={{
                      display: "flex",
                      marginBottom: "10px",
                    }}
                  >
                    <AttachMoney sx={{ fontSize: "30px", color: "#ff4d4d" }} />
                    <Box
                      sx={{
                        color: "#126782",
                        marginLeft: "10px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "5px",
                      }}
                    >
                      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                        Price
                      </Typography>
                      <Typography variant="body2">
                        {activity.price
                          ? `${(activity.price * conversionRate).toFixed(
                              2
                            )} ${code}`
                          : "Price not specified"}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>

              <Divider sx={{ margin: "20px 0" }} />

              <Typography
                variant="h5"
                sx={{ marginBottom: "15px", color: "#126782" }}
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
                    <Category sx={{ marginRight: "10px", color: "#126782" }} />
                    <Box>
                      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                        Category:
                      </Typography>
                      <Typography variant="body2">
                        {activity.Category || "Not specified"}
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
                    <AccessTime
                      sx={{ marginRight: "10px", color: "#126782" }}
                    />
                    <Box>
                      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                        Duration:
                      </Typography>
                      <Typography variant="body2">
                        {calculateDuration(
                          activity.start_date,
                          activity.end_date
                        )}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>

              <Divider sx={{ margin: "20px 0" }} />

              <Typography
                variant="h5"
                sx={{ marginBottom: "15px", color: "#126782" }}
              >
                Description
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  marginBottom: "10px",
                }}
              >
                <Description sx={{ marginRight: "10px", color: "#126782" }} />
                <Typography variant="body2">{activity.description}</Typography>
              </Box>
            </Grid>

            <Grid item xs={12} md={4}>
              <Paper
                elevation={2}
                sx={{
                  padding: "20px",
                  position: "sticky",
                  top: "20px",
                  backgroundColor: activity.isOpened ? "#ffffff" : "#f0f4f8",
                  border: activity.isOpened ? "none" : "2px dashed #126782",
                  transition: "all 0.3s ease-in-out",
                }}
              >
                {activity.isOpened ? (
                  <>
                    <Typography
                      variant="h6"
                      sx={{ marginBottom: "15px", color: "#126782" }}
                    >
                      Book This Activity
                    </Typography>
                    <Typography variant="body1" sx={{ marginBottom: "15px" }}>
                      Experience this amazing activity from{" "}
                      {formatDate(activity.start_date)} to{" "}
                      {formatDate(activity.end_date)}.
                    </Typography>
                    <Typography
                      variant="h5"
                      sx={{ marginBottom: "15px", fontWeight: "bold" }}
                    >
                      {activity.price
                        ? `${(activity.price * conversionRate).toFixed(
                            2
                          )} ${code}`
                        : "Price not specified"}
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      onClick={handleClick}
                      sx={{
                        backgroundColor: "#126782",
                        "&:hover": {
                          backgroundColor: "#0d4e63",
                        },
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
                          amount={(activity.price * conversionRate).toFixed(2)}
                          user={user}
                          itineraryName={activity.title} 
                          startDate={activity.start_date}
                          endDate={activity.end_date}
                        />
                      )}
                    </Elements>
                  </>
                ) : (
                  <Box sx={{ textAlign: "center" }}>
                    <Typography
                      variant="h6"
                      sx={{ marginBottom: "15px", color: "#126782" }}
                    >
                      Booking Coming Soon!
                    </Typography>
                    <AccessTime
                      sx={{
                        fontSize: 60,
                        color: "#126782",
                        marginBottom: "15px",
                      }}
                    />
                    <Typography variant="body1" sx={{ marginBottom: "15px" }}>
                      This activity is not yet open for booking. Check back
                      later for updates!
                    </Typography>
                    {!localInterestedUsers.includes(
                      localStorage.getItem("id")
                    ) ? (
                      <Button
                        variant="outlined"
                        color="primary"
                        fullWidth
                        sx={{
                          borderColor: "#126782",
                          color: "#126782",
                          "&:hover": {
                            backgroundColor: "#e6f7ff",
                          },
                        }}
                        onClick={() => {
                          setLocalInterestedUsers([
                            ...localInterestedUsers,
                            localStorage.getItem("id"),
                          ]);
                          let users = [
                            ...localInterestedUsers,
                            localStorage.getItem("id"),
                          ];
                          console.log("ernker " + users);
                          handleInterestedUser(users);
                        }}
                      >
                        Notify Me When Available
                      </Button>
                    ) : (
                      <Typography variant="body1" sx={{ marginBottom: "15px" }}>
                        You will be notified when this activity is available
                        for booking.
                      </Typography>
                    )}
                  </Box>
                )}
              </Paper>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </>
  );
}
