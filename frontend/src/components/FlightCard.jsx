import React from "react";
import styled from "styled-components";
import FlightInfo from "./FlightInfo";
import FlightDate from "./FlightDate"; // You might need to adapt this if it doesn't match the data format.
import FlightDuration from "./FlightDuration";
import { useNavigate } from 'react-router-dom';
import { Box ,Typography,Button,} from "@mui/material";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import FlightIcon from '@mui/icons-material/Flight';
import LuggageIcon from '@mui/icons-material/Luggage';

const FlightCard = ({ flight, onClick }) =>{
  const { airline, segments,price } = flight;
    // Function to format the duration string
    const navigate = useNavigate();
    
    const handleClick = () => {
      navigate(`/flight-details/${flight.id}`, { state: { flight } });
      window.scrollTo(0, 0);
    };
    
    const formatDuration = (duration) => {
      if (!duration) return ""; // Handle cases where duration might be undefined
  
      // Ignore the first two characters
      const durationString = duration.substring(2);
      
      // Replace 'h' with ' hours' and 'm' with ' minutes'
      return durationString.replace(/H/g, ' hours ').replace(/M/g, ' minutes ').trim();
    };

  return (
    <Box   sx={{
      border: '2px solid #126782', 
      borderColor:'#126782',
      borderRadius:'10px', 
      //display:'flex', 
      maxHeight:'350px',
      display: 'inline-flex', 
      flexDirection:'column', 
      minWidth:'400px',
      maxWidth: '800px', 
      margin:'20px',
      marginTop:'20px',
      marginRight:'60px',
      
      }}>
      <Box sx={{margin:'20px',}}>  {/*gives some spacing from borders */}
      <Box sx={{display:'flex',marginBottom:'-10px'}}>
        <FlightDate date={new Date(segments[0].departure.time).toLocaleDateString()}  />
        <FlightDuration duration={formatDuration(segments[0].duration)}/>
      </Box>

      <Divider />
      <Box sx={{display:'flex',flexDirection:'row', height:"80px"}}>
      <FlightDetails>
        {segments.map((segment, index) => (
          <FlightInfo
            key={index}
            time1={new Date(segment.departure.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            time2={new Date(segment.arrival.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            code={segment.flightNumber}
            city={`${segment.departure.airport} to ${segment.arrival.airport}`} // Displaying the route
            
          />
        ))}
      </FlightDetails>
      </Box>
      <FlightIcon sx={{scale:'3', fill:'#126782',margin:'30px', marginTop:'30px',marginLeft:"120px", transform: 'rotateZ(45deg)',}}/>
      {/* <Box sx={{display:'flex', flexDirection:'row', marginTop:'-120px',marginLeft:'12px',}}>
        <LuggageIcon sx={{ fill:'#126782'}}/>
      <Typography>{flight.includedCheckedBagsOnly}</Typography>
      </Box> */}
      {/*PUTS PRICE AND BOOK BUTTON AT BOTTOM */}
      <Box sx={{position:'relative',  display:'flex',}}>
        <Box sx={{display:'flex', padding:'0px',}}>
          <AttachMoneyIcon sx={{marginTop:'0px', color: '#126782'}}/>
          <Price>{`${price.total}   ${price.currency}`}</Price> {/* Display price */}
        </Box>
        
        <Button onClick={handleClick} 
        sx={{color:'white',  backgroundColor:'#ff4d4d', borderRadius:'5px',position:'absolute',right:'0px', bottom:'0px',}} 
        >View Details</Button> {/* Add Book button */}
      </Box>
    </Box>
    </Box>
  );
};


const Divider = styled.hr`
  align-self: stretch;
  margin: 21px 0 17px;
  border: none;
  //width: 80%;
  border-top: 3px solid #dcdcdc;
`;

const FlightDetails = styled.section`
  display: flex;
  width: 100%;
  max-width: 299px;
  gap: 40px 77px;
  margin-left: 10px;
  height:200px;
`;
const Price = styled.p`
  font-size: 16px;
  font-weight: bold;
  color: #126782;
  margin-top:0px;
  margin-bottom: 10px;
  right:0;
`;



export default FlightCard;
