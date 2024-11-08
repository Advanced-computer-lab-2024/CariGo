import React from "react";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import { Box ,Typography,Card,Button,Divider,Link} from "@mui/material";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PinDropIcon from '@mui/icons-material/PinDrop';
import CommuteIcon from '@mui/icons-material/Commute';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import StarIcon from '@mui/icons-material/Star';
import SellIcon from '@mui/icons-material/Sell';

const TransportCard = ({Transportation}) =>{

  const departure= Transportation.departureTime;
  const departureLocStr=Transportation.departureLocation.description;
  const arrival= Transportation.arrivalTime;
  const arrivalLocStr=Transportation.arrivalLocation.description;
  
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
      minHeight:'320px',
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
        {Transportation.carType === "car" ?
        <DirectionsCarIcon fontSize="large" sx={{fill:'#ff4d4d'}}/> :
          <DirectionsBusIcon fontSize="large" sx={{fill:'#ff4d4d'}}/>
        }
        <StarIcon fontSize="large" sx={{fill:'#126782',marginLeft:'60%', marginRight:'5px'}}/>
        <Typography sx={{fontSize: '20px',marginTop:'3px', color:'#126782'}}>
          {Transportation.ratingsAverage}</Typography>
      </Box>
      <Divider sx={{borderBottomWidth: 3}} />

      {/*INFO BOX*/}
      <Box sx={{margin: "10px",marginLeft:'10px',}}>
      {/*departure and arrival BOX*/}
      <Box sx={{display:'flex',flexDirection:'column',gap:'10px'}}>
      {/*departure*/}
      <Box sx={{}}>
      <Typography sx={{color:'#126782',padding:'1px', fontWeight:'bold'}}>
        {departureLocStr ? departureLocStr : 'departure location'}
        {/* departure location */}
      </Typography>
      <Typography sx={{color:'#ff4d4d',padding:'1px',}}>
        {departure ? `${departure.hours}:${departure.minutes} ${departure.dayTime}` : 'departure time'}
      </Typography>
      
     </Box>

     {/*arrival*/}
     <Box sx={{}}>
     <Typography sx={{color:'#126782',padding:'1px',fontWeight:'bold'}}>
        {arrivalLocStr ? arrivalLocStr : 'arrival location'}
        {/* arrival location */}
      </Typography>
      <Typography sx={{color:'#ff4d4d',padding:'1px', }}>
        {departure ? `${departure.hours}:${departure.minutes} ${departure.dayTime}` : 'arrival time'}
      </Typography>
      
     </Box>
     </Box>
     {/*END OF departure and arrival BOX*/}
    
    
      {/*location link*/}
      <Box sx={{display:'flex',gap:'10px', padding:'5px', marginLeft:'-10px'}}> 
      <PinDropIcon fontSize="medium" sx={{fill:"#126782"}}/>
      <Link  href={"https://www.example.com"}  sx={{color: '#126782',padding: '1px',cursor: 'pointer',textDecoration: 'none',
        '&:hover': {textDecoration: 'underline',}}}
        >location link</Link> 
     </Box>
    
     {/*for price and booking button*/}
     <Box sx={{position:'relative',padding:'10px',}}>
      <Box sx={{display:'flex', marginLeft:'-10px',padding:'5px',marginBottom:'10px',bottom:'10px'}}>
        <AttachMoneyIcon sx={{marginTop:'0px', color: '#126782'}}/>
      <Typography sx={{color:'#126782', fontSize:'16px',marginLeft:'5px'}}
      >price</Typography> {/* Display price */}

      {/* <Box sx={{
          backgroundColor : '#ff4d4d',
          display: 'flex',
          marginLeft: '5px',
          borderRadius: '5px',
          padding: '0px',
          }}>
                  
      <Typography sx={{marginLeft:'5px', color: "white"}}> {"-"+Transportation.discount+"%" || ''}</Typography>
      <SellIcon  sx={{scale: '0.7', color: 'white', marginTop:'2px',marginLeft:'-2px',}}/>
      </Box> */}
      
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
