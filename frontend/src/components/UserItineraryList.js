import React, { useState, useEffect } from 'react';
import ItineraryPost from "./UserItineraryPost";
import { Box } from '@mui/material';
// import itineraryImg from '../assets/itinerary.jpeg'

const ItineraryList = ({ fetched }) => {
    

    return (
         <Box sx={{ width: '100%' ,marginTop:'-15px'}}>
         {fetched && fetched.length > 0 && (
             <Box>
                 {fetched.map((itinerary) => (
                     <Box item key={itinerary._id}>
                         <ItineraryPost
                             id={itinerary._id}
                             author={itinerary.author}
                             title={itinerary.title}
                             img={"frontend/public/assets/images/itirenary.png"}
                             start_date={itinerary.start_date}
                             end_date={itinerary.end_date}
                             locations={itinerary.locations}
                             price={itinerary.price}
                             tags={itinerary.tags}
                             transportation={itinerary.transportation}
                             accommodation={itinerary.accommodation}
                             rating={itinerary.ratingsAverage}
                             isBooked={itinerary.isBooked}
                             accessibility={itinerary.accessibility}
                         />
                     </Box>
                 ))}
             </Box>
         )}
     </Box>
    );
};

export default ItineraryList;
