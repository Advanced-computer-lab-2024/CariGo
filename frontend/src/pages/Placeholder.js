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
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const ItineraryDetails = () => {
  const { id } = useParams(); // Get the itinerary ID from the URL
  const [itinerary, setItinerary] = useState(null);
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
  const conversionRate = localStorage.getItem("conversionRate") || 1;
  const code = localStorage.getItem("currencyCode") || "EGP";
  const token = localStorage.getItem("jwt");
  return (
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
  );
};

export default ItineraryDetails;
