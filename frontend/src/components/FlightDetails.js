import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import { Box ,Typography,Button, Divider} from "@mui/material";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import FlightIcon from '@mui/icons-material/Flight';
import LuggageIcon from '@mui/icons-material/Luggage';
import { useLocation } from 'react-router-dom';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AirlinesIcon from '@mui/icons-material/Airlines';
import TimelapseIcon from '@mui/icons-material/Timelapse';

const FlightDetails = () =>{
  const { state } = useLocation();
  const flightData = state.flight;
  const rate = parseFloat(JSON.parse(localStorage.getItem("conversionRate")))||1;
  const segments = flightData.segments;
  const airlineName = flightData.airlineName;
  const noOfFlights= segments.length;
  const price = (flightData.price.total*rate).toFixed(2);
  const availableSeats= flightData.numberOfBookableSeats;
  const bookBefore = flightData.lastTicketingDate;
  const currency=localStorage.getItem("currencyCode") ||"EGP" ;
    // Function to format the duration string
    const navigate = useNavigate();

    
    const formatDuration = (duration) => {
      if (!duration) return ""; // Handle cases where duration might be undefined
  
      // Ignore the first two characters
      const durationString = duration.substring(2);
      
      // Replace 'h' with ' hours' and 'm' with ' minutes'
      return durationString.replace(/H/g, ' hours ').replace(/M/g, ' minutes ').trim();
    };

    const handleBackCLick=() =>{
      navigate(`/book-services`);
      window.scrollTo(0, 0);
    }

    const handleBookClick=() =>{
      navigate(`/ExtraServicesCheckOut/flight`,{ state: { flightData } }) ;
    };

  return (
    <Box sx={{display:'flex', flexDirection:'column', gap:'0px', margin:'20px', marginLeft:'10%'}}>
      <Button onClick={handleBackCLick}
          sx={{ backgroundColor: "#126782", color: 'white', borderRadius: '8px', width: '80px', fontSize:'18px', marginLeft:'20px' }}>
          Back
      </Button>
    <Box   sx={{
      border: '2px solid #126782', 
      borderColor:'#126782',
      borderRadius:'10px', 
      maxHeight:'1000px',
      //display: 'inline-flex', 
      //flexDirection:'column', 
      width:'950px', 
      margin:'20px',
      marginTop:'20px',
      marginRight:'60px',
      color:'#126782',
      }}>
      <Box sx={{margin:'20px', position:'relative'}}>  {/*gives some spacing from borders */}
        <Box sx={{display:'flex', gap:'0px'}}>{/*airline box */}
        <AirlinesIcon fill="#126782" fontSize="large"/>
        <Typography sx={{padding:'5px',paddingTop:'0px', fontSize:'24px', fontWeight:'bold'}}>
          {airlineName}
        </Typography>
        </Box>

      <Divider sx={{ borderBottomWidth: 3 }}/>
      {/* info box */}
      <Box sx={{ margin:'10px',marginLeft:'20px',position:'relative', display:'flex', flexDirection:'column'}}>
      <Typography sx={{fontSize:'16px', fontWeight:'bold',marginLeft:'10px'}}>
        {noOfFlights} trip{noOfFlights > 1 ? 's' : ''}
      </Typography>
      {/*segments box*/}
      <Box sx={{marginLeft:'10px', padding:'10px', display:'flex', flexDirection:'column', gap:'20px'}}>
      <Divider sx={{borderStyle:'dashed',borderBottomWidth: 3,borderColor: 'grey' , margin:'15px',marginBottom:'0px',marginTop:'0px', width:'78%'}} />
        {segments.map((segment)=>
                <div>
                <Typography sx={{fontWeight:'bold' ,margin:'10px', marginTop:'0px'}} >
                  flight no. {segment.flightNumber}
                  </Typography>
                <Box sx={{marginLeft:'10px', display:'flex', position:'relative'}}>
                  <Box sx={{display:'flex', flexDirection:'column', gap:'5px'}}>
                  {/*date box*/}
                  <Box sx={{display:'flex', gap:'5px'}}>
                  <CalendarMonthIcon fill="#126782" fontSize="small"/>
                  <Typography type="date" sx={{fontSize:'16px'}}>
                  {new Date(segment.departure.time).toLocaleDateString()}
                  </Typography>
                  </Box>

                  <Typography>
                    {segment.departure.airport}
                  </Typography>
                  <Typography color="#ff4d4d">
                    {new Date(segment.departure.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </Typography>
                  <Typography>
                    terminal: {segment.departure.terminal} 
                  </Typography>
                  </Box>

                  <FlightIcon 
                  sx={{scale:'3', fill:'#126782',position:'absolute',left: '20%', marginTop:'40px' ,transform: 'rotateZ(45deg)',}}
                  />

                  <Box sx={{display:'flex', flexDirection:'column', gap:'5px', position:'absolute', left:'35%'}}>
                    <Box sx={{display:'flex', gap:'5px'}}>
                    <CalendarMonthIcon fill="#126782" fontSize="small"/>
                    <Typography type="date" sx={{fontSize:'16px'}}>
                    {new Date(segment.arrival.time).toLocaleDateString()}
                    </Typography>
                    </Box>
                    <Typography>
                      {segment.arrival.airport}
                    </Typography>
                    <Typography color="#ff4d4d">
                      {new Date(segment.arrival.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </Typography>
                    <Typography>
                    terminal: {segment.arrival.terminal} 
                  </Typography>
                  </Box>

                  <Box sx={{display:'flex', flexDirection:'column', gap:'5px', position:'absolute', left:'60%'}}>
                    <Box sx={{display:'flex',gap:'8px'}}>
                      <TimelapseIcon fill="#126782" fontSize="medium"/>
                      <Typography color="#126782">
                        {formatDuration(segment.duration)}
                      </Typography>
                    </Box>
                    <Typography sx={{marginLeft:'5px', fontWeight:'bold'}}>
                      {segment.fareDetails.cabin ==="FIRST" ? 
                      `${segment.fareDetails.cabin}  CLASS` :
                      segment.fareDetails.cabin
                      }
                    </Typography>
                    <Box sx={{display:'flex',gap:'8px'}}>
                      <LuggageIcon fill="#126782" fontSize="medium"/>
                      <Typography color="#126782" type="number">
                        {segment.fareDetails.includedCheckedBags.quantity} checked bags
                      </Typography>
                    </Box>
                  </Box>

                </Box>
                <Divider sx={{borderStyle:'dashed',borderBottomWidth: 3,borderColor: 'grey' , marginLeft:'15px',marginTop:'20px',marginBottom:'0px', width:'78%'}} />
                </div>
        )}
      </Box>
        {/*end of segments box*/}
        <Box sx={{marginLeft:'10px', padding:'10px', display:'flex', flexDirection:'column', gap:'10px'}}>
          <Box sx={{display:'flex', gap:'5px'}}>
            <Typography  >
              seats available
            </Typography>
            <Typography   color="#ff4d4d">
              {availableSeats}
            </Typography>
          </Box>
          <Box sx={{display:'flex', gap:'5px'}}>
            <Typography  >
              book before 
            </Typography>
            <Typography   color="#ff4d4d">
              {new Date(bookBefore).toLocaleDateString()}
            </Typography>
          </Box>
        </Box>
        <Box sx={{display:'flex', width:'100%',justifyContent: 'space-between',margin:'10px',marginBottom:'0px', marginTop:'20px'}}>{/*price and book box*/}
        <Box sx={{display:'flex', padding:'0px',marginTop:'-5px'}}>
          <AttachMoneyIcon sx={{marginTop:'0px', color: '#126782', fontSize:'30px'}}/>
          <Price>{`${(price *rate).toFixed(2)}   ${currency}`}</Price> {/* Display price */}
        </Box>
        <Button onClick={handleBookClick}
            sx={{
              color: 'white',
              backgroundColor: '#ff4d4d',
              borderRadius: '5px',
              alignSelf: 'flex-end', // Aligns it to the right within the container
              width:'90px',
              height:'40px',
              fontSize:'20px',
            }}>
            Book
          </Button>
          </Box>
      </Box>
      
    </Box>
    </Box>
    </Box>
  );
};


const Price = styled.p`
  font-size: 22px;
  font-weight: bold;
  color: #126782;
  margin-top:0px;
  margin-bottom: 10px;
  
`;



export default FlightDetails;