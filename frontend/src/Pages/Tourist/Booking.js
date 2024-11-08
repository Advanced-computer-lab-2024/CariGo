import React, { useState } from "react";
import { Box,Button,Typography } from "@mui/material";
import NavBar from"./components/TouristNavBar";
import FlightIcon from '@mui/icons-material/Flight';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import CommuteIcon from '@mui/icons-material/Commute';
import FlightBooking from "../FlightBooking";
import HotelBooking from "../../components/HotelBooking";
import TransportationBooking from "../../components/TransportationBooking";
export default function BookingPage(){
    const[selectedBooking, setSelectedBooking]= useState("");

    return (
        <div>
           <NavBar/>
           <Box sx={{display:'flex', padding:'20px', position:'relative', alignItems:'center', justifyContent:'center', marginTop:'50px', gap:'100px'}}>
           <Button variant= "outlined" 
           sx={{width:'200px', height:'180px', borderRadius:'15px',border:"2px solid #126782",
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
            transition: 'all 0.3s ease',
            '&:hover':{
                scale:'1.1',
                borderColor:'#ff4d4d',
                backgroundColor:'white',
                
                marginRight:'5px',
                '& .insideIcon':{
                fill:'#ff4d4d',
            }}
            }}
            onClick={()=>setSelectedBooking("flight")}
           >
           <FlightIcon className="insideIcon" fontSize="large" sx={{scale:'3', fill:'#126782',margin:'30px', transform: 'rotateZ(45deg)',}}/>
           </Button>

           <Button variant= "outlined" 
           sx={{width:'200px', height:'180px', borderRadius:'15px',border:"2px solid #126782",
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
            transition: 'all 0.3s ease',
            '&:hover':{
                scale:'1.1',
                borderColor:'#ff4d4d',
                backgroundColor:'white',
                marginLeft:'5px',
                marginRight:'5px',
                '& .insideIcon':{
                fill:'#ff4d4d',
            }}
            }}
            onClick={()=>setSelectedBooking("hotel")}
           >
           <LocationCityIcon className="insideIcon" fontSize="large" sx={{scale:'3', fill:'#126782',margin:'30px', }}/>
           </Button>
           <Button variant= "outlined" 
           sx={{width:'200px', height:'180px', borderRadius:'15px',border:"2px solid #126782",
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
            transition: 'all 0.3s ease',
            '&:hover':{
                scale:'1.1',
                borderColor:'#ff4d4d',
                backgroundColor:'white',
                marginLeft:'5px',
                
                '& .insideIcon':{
                fill:'#ff4d4d',
            }}
            }}
            onClick={()=>setSelectedBooking("transportation")}
           >
           <CommuteIcon className="insideIcon" fontSize="large" sx={{scale:'3', fill:'#126782',margin:'30px', }}/>
           </Button>
           </Box>
           {selectedBooking ==="flight" &&
            <FlightBooking/>
            }
            {selectedBooking ==="hotel" &&
            <HotelBooking/>
            }
            {selectedBooking ==="transportation" &&
            <TransportationBooking/>
            }
        </div>
    );
}