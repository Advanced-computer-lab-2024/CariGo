import React from "react";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import { Box ,Typography,Card,Button,Divider,Link} from "@mui/material";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import FlightIcon from '@mui/icons-material/Flight';
import LuggageIcon from '@mui/icons-material/Luggage';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PinDropIcon from '@mui/icons-material/PinDrop';
import CommuteIcon from '@mui/icons-material/Commute';

const TransportCard = (Transportation) =>{
  const departure= Transportation.departureTime;
  //const departureLocStr=Transportation.departureLocation.description;
  const arrival= Transportation.arrivalTime;
  //const arrivalLocStr=Transportation.arrivalLocation.description;
  
    const navigate = useNavigate();

    // const handleClick = () => {
    //   navigate(`/flight-details/${flight.id}`, { state: { flight } });
    // };

    const formatDuration = (duration) => {
      if (!duration) return ""; // Handle cases where duration might be undefined
  
      // Ignore the first two characters
      const durationString = duration.substring(2);
      
      // Replace 'h' with ' hours' and 'm' with ' minutes'
      return durationString.replace(/H/g, ' hours ').replace(/M/g, ' minutes ').trim();
    };

    const waitingTime = (time) => {
      let currentTime = new Date();
      
      if(time)
        return {hrs: time.hours - currentTime.getHours() , mins: time.minutes - currentTime.getMinutes()}
    }

  return (
    <Card variant="outlined"  sx={{
      border: '2px solid #126782', 
      borderColor:'#126782',
      borderRadius:'10px', 
      height:'320px',
      maxHeight:'600px',
      //overflowY:'overflow',
      display: 'flex', 
      flexDirection:'column', 
      width: '450px',
      margin:'20px',
      marginTop:'20px',
      marginRight:'60px',
      }}>
        <Box sx={{margin:'5%', padding:'5px', marginTop:'2%'}}>{/*EVERYTHING BOX*/}
        <Box sx={{width:'90%',margin:'10px', display:'flex'}}>
        <CommuteIcon fontSize="large" sx={{fill:'#126782'}}/>{/* to be changed based on carType */}
        {/* <Typography fontSize="16px">
          in {waitingTime(departure).hrs}h{waitingTime(departure).mins}
          </Typography> */}
      </Box>
      <Divider sx={{borderBottomWidth: 3}} />

      {/*INFO BOX*/}
      <Box sx={{margin: "10px",marginLeft:'10px',}}>
      {/*departure and arrival BOX*/}
      <Box sx={{gap:'50px'}}>
      {/*departure*/}
      <Box>
      <Typography sx={{color:'#126782',padding:'1px'}}>
        {departure ? `${departure.hours}:${departure.mins} ${departure.dayTime}` : 'departure time'}
      </Typography>
      <Typography sx={{color:'#126782',padding:'1px'}}>
        {/* {departureLocStr ? departureLocStr : 'departure time'} */}
        departure location
      </Typography>
     </Box>

     {/*arrival*/}
     <Box>
      <Typography sx={{color:'#126782',padding:'1px'}}>
        {departure ? `${departure.hours}:${departure.mins} ${departure.dayTime}` : 'arrival time'}
      </Typography>
      <Typography sx={{color:'#126782',padding:'1px'}}>
        {/* {arrivalLocStr ? arrivalLocStr : 'arrival time'} */}
        arrival location
      </Typography>
     </Box>
     </Box>
     {/*END OF departure and arrival BOX*/}
    
    
      {/*location link*/}
      <Box sx={{display:'flex',gap:'10px', padding:'5px', marginLeft:'-10px'}}> 
      <PinDropIcon fontSize="medium" sx={{fill:"#126782"}}/>
      <Link  href="https://www.example.com"  sx={{color: '#126782',padding: '1px',cursor: 'pointer',textDecoration: 'none',
        '&:hover': {textDecoration: 'underline',}}}
        >location link</Link> 
     </Box>
    
     {/*for price and booking button*/}
     <Box sx={{position:'relative',padding:'10px',}}>
      <Box sx={{display:'flex', marginLeft:'-10px',padding:'5px',marginBottom:'10px',bottom:'10px'}}>
        <AttachMoneyIcon sx={{marginTop:'0px', color: '#126782'}}/>
      <Typography sx={{color:'#126782', fontSize:'16px',marginLeft:'5px'}}
      >price</Typography> {/* Display price */}
      
      </Box>
      <Button 
      sx={{color:'white',  backgroundColor:'#ff4d4d', borderRadius:'5px',position:'absolute',right:'0px', bottom:'10px',}} 
      >Book</Button> {/* Add Book button */}
      </Box>
      </Box>
      </Box>{/* END OF EVERYTHING BOX */}
    </Card>
  );
};

export default TransportCard;
