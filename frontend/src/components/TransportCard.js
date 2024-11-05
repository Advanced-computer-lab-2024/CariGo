import React from "react";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import { Box ,Typography,Card,Button,Divider,Link} from "@mui/material";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import FlightIcon from '@mui/icons-material/Flight';
import LuggageIcon from '@mui/icons-material/Luggage';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import BedIcon from '@mui/icons-material/Bed';
import PinDropIcon from '@mui/icons-material/PinDrop';

const TransportCard = (Hotel) =>{
  //const { airline, segments,price } = flight;
    // Function to format the duration string
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

  return (
    <Card variant="outlined"  sx={{
      border: '2px solid #126782', 
      borderColor:'#126782',
      borderRadius:'10px', 
      height:'400px',
      maxHeight:'600px',
      display: 'flex', 
      flexDirection:'column', 
      maxWidth: '450px',
      margin:'20px',
      marginTop:'20px',
      marginRight:'60px',
      }}>
        <Box sx={{width:'90%',margin:'20px'}}>
        <Typography 
        sx={{color:'#126782', fontSize:'26px', fontWeight:'bold',padding:'10px',}}
        >Hotel name</Typography>
      <Divider sx={{borderBottomWidth: 3}} />

      {/*INFO BOX*/}
      <Box sx={{margin: "10px",marginLeft:'10px',}}>
      <Typography sx={{color:'#126782',padding:'1px',fontWeight:'bold'}}>Duration</Typography>
        {/*PUTS CHECK IN AND OUT NEXT TO EACH OTHER*/}
      <Box sx={{display:'flex',gap:'50px', marginLeft:'20px',padding:'5px' }}>
      <Box>
      <Typography sx={{color:'#126782',padding:'1px'}}>from</Typography>
      {/*check in*/}
     <Box sx={{display:'flex',padding:'5px',gap:'10px',}}> 
      <CalendarMonthIcon fontSize="medium" sx={{fill:"#126782"}}/>
      <Typography type="date" sx={{color:'#126782',padding:'1px'}}>4/11/2024</Typography> 
     </Box>
     </Box>

     <Box>
     <Typography sx={{color:'#126782',padding:'1px'}}>to</Typography>
    {/*check out*/}
    <Box sx={{display:'flex',padding:'5px',gap:'10px',}}> 
      <CalendarMonthIcon fontSize="medium" sx={{fill:"#126782"}}/>
      <Typography type="date" sx={{color:'#126782',padding:'1px'}}>9/11/2024</Typography> 
     </Box>
     </Box>
     </Box>
     {/*END OF DATES BOX*/}
     {/*number of beds*/}
    <Box sx={{display:'flex',gap:'10px', padding:'5px', marginLeft:'-10px'}}> 
      <BedIcon fontSize="medium" sx={{fill:"#126782"}}/>
      <Typography sx={{color:'#126782',padding:'1px'}}>2 king size beds</Typography> 
     </Box>
      {/*location link*/}
    <Box sx={{display:'flex',gap:'10px', padding:'5px', marginLeft:'-10px'}}> 
      <PinDropIcon fontSize="medium" sx={{fill:"#126782"}}/>
      <Link  href="https://www.example.com"  sx={{color: '#126782',padding: '1px',cursor: 'pointer',textDecoration: 'none',
        '&:hover': {textDecoration: 'underline',}}}
        >location link</Link> 
     </Box>
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
      
    </Card>
  );
};

export default TransportCard;
