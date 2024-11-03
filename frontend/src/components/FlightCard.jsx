import React from "react";
import styled from "styled-components";
import FlightInfo from "./FlightInfo";
import FlightDate from "./FlightDate"; // You might need to adapt this if it doesn't match the data format.
import FlightDuration from "./FlightDuration";
import { useNavigate } from 'react-router-dom';
import { Box ,Typography} from "@mui/material";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import FlightIcon from '@mui/icons-material/Flight';
import LuggageIcon from '@mui/icons-material/Luggage';

const FlightCard = ({ flight, onClick }) =>{
  const { airline, segments,price } = flight;
    // Function to format the duration string
    const navigate = useNavigate();

    const handleClick = () => {
      navigate(`/flight-details/${flight.id}`, { state: { flight } });
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
      
      height:'320px',
      display: 'flex', // Allows the box to grow with content
      flexDirection:'column', 
      maxWidth: '500px', // Starting width
      margin:'30px',
      }}>

      <Box sx={{display:'flex', }}>
        <FlightDate date={new Date(segments[0].departure.time).toLocaleDateString()}  />
        <FlightDuration duration={formatDuration(segments[0].duration)}/>
      </Box>

      <Divider />
      <Box sx={{display:'flex',flexDirection:'row'}}>
      <FlightDetails>
        {segments.map((segment, index) => (
          <FlightInfo
            key={index}
            time={new Date(segment.departure.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            code={segment.flightNumber}
            city={`${segment.departure.airport} to ${segment.arrival.airport}`} // Displaying the route
            
          />
        ))}
      </FlightDetails>
      <FlightIcon sx={{scale:'3', fill:'#126782', marginTop:'30px',marginLeft:'50px',transform: 'rotateZ(45deg)',}}/>
      </Box>

      <Box sx={{display:'flex', flexDirection:'row', marginTop:'-120px',marginLeft:'12px',}}>
        <LuggageIcon sx={{ fill:'#126782'}}/>
      <Typography>{flight.includedCheckedBagsOnly}</Typography>
      </Box>

      <Box sx={{display:'flex', marginLeft:'330px',padding:'10px',marginBottom:'10px',}}>
        <AttachMoneyIcon sx={{marginTop:'0px', color: '#126782'}}/>
      <Price>{`${price.total}   ${price.currency}`}</Price> {/* Display price */}
      </Box>
      <BookButton onClick={handleClick}>Book</BookButton> {/* Add Book button */}
    </Box>
  );
};

const Card = styled.article`
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  align-self: center;
  display: flex;
  margin-top: 27px;
  width: 100%;
  max-width: 338px;
  flex-direction: column;
  align-items: center;
  padding: 21px 9px 12px;
`;

const CardHeader = styled.header`
  display: flex;
  width: 100%;
  max-width: 298px;
  gap: 40px 100px;
  color: #2f2f2f;
  font: 500 9px Roboto, sans-serif;
`;

const Divider = styled.hr`
  align-self: stretch;
  margin: 21px 0 17px;
  border: none;
  border-top: 1px dashed #dcdcdc;
`;

const FlightDetails = styled.section`
  display: flex;
  width: 100%;
  max-width: 299px;
  gap: 40px 77px;
  margin-left: 20px;
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
const BookButton = styled.button`
  padding: 10px 15px;
  background-color: #126782; /* Button color */
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
  margin-top: -15px;
  &:hover {
    background-color: #0056b3; /* Darker shade on hover */
  }
`;



export default FlightCard;
