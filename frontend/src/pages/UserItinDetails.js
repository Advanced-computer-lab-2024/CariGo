import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Chip, Avatar } from "@mui/material";
import PinDropIcon from "@mui/icons-material/PinDrop";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import StarIcon from "@mui/icons-material/Star";
import ResponsiveAppBar from "./Tourist/components/TouristNavBar";
import UserAcList from "../components/UserAcList"; // Import the new MarkerList component
import "../components/styles/CompanyInfo.css";
import logoImage from "../assets/itinerary.png"; // Correct relative path
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import axios from "axios";
<<<<<<< HEAD
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

=======
import { Paper, Grid } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LanguageIcon from "@mui/icons-material/Language";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import HotelIcon from "@mui/icons-material/Hotel";
import AccessibleIcon from "@mui/icons-material/Accessible";
import Divider from "@mui/material/Divider";
>>>>>>> main
const ItineraryDetails = () => {
  const { id } = useParams(); // Get the itinerary ID from the URL
  const [itinerary, setItinerary] = useState(null);
  const [localInterestedUsers, setLocalInterestedUsers] = useState([]);
  const navigate = useNavigate();

  const handleClick = () => {
    if (token)
      navigate(`/checkout/itinerary/${id}`); // Update the navigation path
    else navigate(`/login`);
  };

  useEffect(() => {
    const fetchItineraryDetails = async () => {
      try {
        const token = localStorage.getItem("jwt");
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
      } catch (error) {
        console.error("Error fetching itinerary details:", error);
      }
    };
    fetchItineraryDetails();
  }, [id]); // Include `id` in dependencies

  if (!itinerary) {
    return <Typography>Loading...</Typography>;
  }

  const {
    start_date,
    end_date,
    locations,
    price,
    tags,
    activities,
    transportation,
    accommodation,
    ratingsAverage,
    language,
    pick_up,
    drop_off,
    accessibility,
    title,
    isOpened
  } = itinerary;

  // if (itinerary.interestedUsers) {
  //   setInterestedUsers(itinerary.interestedUsers);
  // }

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
    } catch (error) {
      console.error("Error", error);
    }
  };

  const conversionRate = localStorage.getItem("conversionRate") || 1;
  const code = localStorage.getItem("currencyCode") || "EGP";
  const token = localStorage.getItem("jwt");
  return (
<<<<<<< HEAD
    <Box>
      <ResponsiveAppBar />
      <Button
          onClick={() => navigate(`/tourist-itineraries`)}
          sx={{
            backgroundColor: "#126782",
            color: "white",
            borderRadius: "8px",
            width: "100px",
            marginTop:'3%',
            marginLeft:'15%',
            fontSize:'16px',
            paddingLeft:'0px',
          }}
        >
          <ArrowBackIosIcon ></ArrowBackIosIcon>
          Back
        </Button>
    <Box sx={{width: "70%", margin:'5%',marginLeft: "15%",marginBottom:'20px', marginTop:'2%'}}>
        <Box
          component="img"
          src={logoImage || ""}
          alt="Itinerary Image"
          sx={{
            width:"100%",
            maxHeight: "400px",
            borderRadius: "10px",
            objectFit: "cover",
            marginBottom: "20px",
          }}
        />
        <Box className="company-info" sx={{marginTop:'-2%',}}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap:'10px' ,
              marginBottom: "20px",
              padding: "20px",
              width:'90%'
            }}
            >
            
            <Box sx={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', gap: '10px', color: '#126782' }}>
              <Avatar sx={{ bgcolor: "#ff4d4d", width: 42, height: 42 }}>
                {title?.charAt(0) || "A"} 
              </Avatar>
              <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                {title || "Anonymous"}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", color: "#126782"  }}>
              <StarIcon sx={{ color: "#FFD700", marginRight: "5px", fontSize: '40px' }} />
              <Typography sx={{ fontSize: "30px", fontWeight: 'bold', lineHeight: '1.2' }}>
                {ratingsAverage || "No rating"}
              </Typography>
            </Box>
          </Box>

            <Box sx={{ display: "flex", gap: "0px" ,}}>
              {tags?.map((tag) => (
                <Chip
                  key={tag._id}
                  label={tag.title}
                  sx={{ backgroundColor: "#126782", color: "white", margin: "5px",fontSize:'15px',padding: "3px" }}
                />
              ))}
              </Box>
            </Box>
            {/* big box for dates*/}
            <Box sx={{ marginBottom: "20px",display:'flex',flexDirection:"column" ,gap:'15px' , color:"#126782", marginLeft:'3%'}}>
              <Box sx={{display:'flex', gap:'40px'}}>
                <Box sx={{display:'flex', flexDirection:'column',}}>
                  <Box sx={{display:"flex", gap:'5px'}}>
                    <CalendarMonthIcon sx={{color:'#ff4d4d', fontSize:'30px', marginTop:'5px'}}/>
                    <Typography variant="body1" sx={{ fontSize: "20px", }} >
                      {formatDateTime(start_date)}
                    </Typography>
                  </Box>
                <Box sx={{display:'flex', gap:'5px',marginLeft:'35px', color:'#ff4d4d'}}>
                  <AccessTimeIcon sx={{fontSize: "26px",}}/>
                  <Typography sx={{fontSize: "18px",lineHeight: "1.1" }}>
                    {formatDateHour(start_date)}
                  </Typography>
                </Box>
              </Box>
              <Typography sx={{fontSize:'20px', }}>to</Typography>
              <Box sx={{display:'flex', flexDirection:'column',}}>
                <Box sx={{display:"flex", gap:'5px'}}>
                  <CalendarMonthIcon sx={{color:'#ff4d4d', fontSize:'30px',marginTop:'5px'}}/>
                  <Typography variant="body1" sx={{ fontSize: "20px", }} >
                    {formatDateTime(end_date)}
                  </Typography>
                </Box>
                <Box sx={{display:'flex', gap:'5px',marginLeft:'35px', color:'#ff4d4d'}}>
                  <AccessTimeIcon sx={{fontSize: "26px",}}/>
                  <Typography sx={{fontSize: "18px",lineHeight: "1.1" }}>
                    {formatDateHour(end_date)}
                    </Typography>
                </Box>
              </Box>
            </Box>

            <Box
              sx={{display: "flex", marginBottom: "5px",}}>
              <PinDropIcon sx={{ marginRight: "5px",fill:'#ff4d4d' ,fontSize:'30px'}} />
              <Typography sx={{fontSize:'20px', fontWeight:'550', lineHeight:'1.1',}}>
                {" "}
                {locations?.join(", ") || "Not specified"}
              </Typography>
            </Box>

            <Typography variant="body1" sx={{ fontSize: "18px" }}>
              <strong>Language of Tour Guide</strong>{" "}
              {language || "No language info"}
            </Typography>
            <Typography variant="body1" sx={{ fontSize: "18px" }}>
              <strong>Transportation:</strong>{" "}
              {transportation || "No transportation info"}
            </Typography>
            <Typography variant="body1" sx={{ fontSize: "18px" }}>
              <strong>Pick-up:</strong> {pick_up || "No transportation info"}
            </Typography>
            <Typography variant="body1" sx={{ fontSize: "18px" }}>
              <strong>Drop-off:</strong> {drop_off || "No transportation info"}
            </Typography>
            <Typography variant="body1" sx={{ fontSize: "18px" }}>
              <strong>Accommodation:</strong>{" "}
              {accommodation || "No accommodation info"}
            </Typography>
            <Typography variant="body1" sx={{ fontSize: "18px" }}>
              <strong>Accessibility:</strong>{" "}
              {accessibility || "No accessibility info"}
            </Typography>

            {/* Using MarkerList to display activities */}
            <Typography variant="body1" sx={{ fontSize: "18px" }}>
              <strong>Activities:</strong>
            </Typography>
            <UserAcList activities={formattedActivities} />
            <Box 
              sx={{ 
                display: "flex", 
                justifyContent: "space-between", 
               
                marginBottom: "20px", 
                width: "180%" 
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <AttachMoneyIcon sx={{ marginRight: "5px", fill: '#ff4d4d', fontSize: '30px' }} />
                <Typography sx={{ fontSize: '20px', fontWeight: '550', lineHeight: '1.1' }}>
                  {price
                    ? `${(price * conversionRate).toFixed(2)} ${code}`
                    : "Price not specified"}
                </Typography>
              </Box>
              <Button 
                variant="contained" 
                onClick={handleClick} 
                sx={{ backgroundColor: "#ff4d4d", padding:'10px 15px', fontSize: "16px",marginTop:'10px' }}
              >
                Book Now
              </Button>
            </Box>

            {/* <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", color: "#126782" , width: "180%"}}> */}
              {/* <Box sx={{display: "flex",alignItems: "center",}}>
                <StarIcon sx={{ color: "#FFD700", marginRight: "5px" }} />
                <Typography  sx={{ fontSize: "18px" }}>
                  {ratingsAverage || "No rating"}
                </Typography>
              </Box> */}
             
            {/* </Box> */}
          </Box>
          {/* end of info box0 */}
      </Box>
    </Box>
    </Box>
=======
    <>
      <ResponsiveAppBar />
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
                <Typography
                  variant="h4"
                  sx={{
                    marginBottom: "10px",
                    fontWeight: "bold",
                    color: "#126782",
                  }}
                >
                  {title || "Anonymous"}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "10px",
                    marginBottom: "15px",
                  }}
                >
                  {tags?.map((tag) => (
                    <Chip
                      key={tag._id}
                      label={tag.title}
                      sx={{ backgroundColor: "#126782", color: "white" }}
                    />
                  ))}
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "15px",
                  }}
                >
                  <StarIcon sx={{ color: "#FFD700", marginRight: "5px" }} />
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    {ratingsAverage || "No rating"}
                  </Typography>
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
                sx={{ marginBottom: "15px", color: "#126782" }}
              >
                Itinerary Details
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
                    <AccessTimeIcon
                      sx={{ marginRight: "10px", color: "#126782" }}
                    />
                    <Box>
                      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                        Start Date:
                      </Typography>
                      <Typography variant="body2">
                        {formatDateTime(start_date)}
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
                    <AccessTimeIcon
                      sx={{ marginRight: "10px", color: "#126782" }}
                    />
                    <Box>
                      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                        End Date:
                      </Typography>
                      <Typography variant="body2">
                        {formatDateTime(end_date)}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "10px",
                    }}
                  >
                    <PinDropIcon
                      sx={{ marginRight: "10px", color: "#126782" }}
                    />
                    <Box>
                      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                        Locations:
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
                      alignItems: "center",
                      marginBottom: "10px",
                    }}
                  >
                    <AttachMoneyIcon
                      sx={{ marginRight: "10px", color: "#126782" }}
                    />
                    <Box>
                      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                        Price:
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
                    <LanguageIcon
                      sx={{ marginRight: "10px", color: "#126782" }}
                    />
                    <Box>
                      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                        Language of Tour Guide:
                      </Typography>
                      <Typography variant="body2">
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
                      sx={{ marginRight: "10px", color: "#126782" }}
                    />
                    <Box>
                      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                        Transportation:
                      </Typography>
                      <Typography variant="body2">
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
                      sx={{ marginRight: "10px", color: "#126782" }}
                    />
                    <Box>
                      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                        Pick-up:
                      </Typography>
                      <Typography variant="body2">
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
                      sx={{ marginRight: "10px", color: "#126782" }}
                    />
                    <Box>
                      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                        Drop-off:
                      </Typography>
                      <Typography variant="body2">
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
                    <HotelIcon sx={{ marginRight: "10px", color: "#126782" }} />
                    <Box>
                      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                        Accommodation:
                      </Typography>
                      <Typography variant="body2">
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
                      sx={{ marginRight: "10px", color: "#126782" }}
                    />
                    <Box>
                      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                        Accessibility:
                      </Typography>
                      <Typography variant="body2">
                        {accessibility || "Not specified"}
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
                  border: isOpened ? "none" : "2px dashed #126782",
                  transition: "all 0.3s ease-in-out",
                }}
              >
                {isOpened ? (
                  <>
                    <Typography
                      variant="h6"
                      sx={{ marginBottom: "15px", color: "#126782" }}
                    >
                      Book This Itinerary
                    </Typography>
                    <Typography variant="body1" sx={{ marginBottom: "15px" }}>
                      Experience this amazing journey from{" "}
                      {formatDateTime(start_date)} to {formatDateTime(end_date)}
                      .
                    </Typography>
                    <Typography
                      variant="h5"
                      sx={{ marginBottom: "15px", fontWeight: "bold" }}
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
                        backgroundColor: "#126782",
                        "&:hover": {
                          backgroundColor: "#0d4e63",
                        },
                      }}
                    >
                      Book Now
                    </Button>
                  </>
                ) : (
                  <Box sx={{ textAlign: "center" }}>
                    <Typography
                      variant="h6"
                      sx={{ marginBottom: "15px", color: "#126782" }}
                    >
                      Booking Coming Soon!
                    </Typography>
                    <AccessTimeIcon
                      sx={{
                        fontSize: 60,
                        color: "#126782",
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
                        borderColor: "#126782",
                        color: "#126782",
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
>>>>>>> main
  );
};

export default ItineraryDetails;
