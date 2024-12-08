import React from 'react';
import ItineraryCard from "./UserItineraryPost";
import { Grid, Box } from '@mui/material';

const ItineraryList = ({ fetched }) => {
    return (
        <Box sx={{ width: '100%', padding: '20px' }}>
            <Grid container spacing={3}>
                {fetched && fetched.length > 0 && fetched.map((itinerary) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={itinerary._id}>
                        <ItineraryCard
                            id={itinerary._id}
                            author={itinerary.author}
                            title={itinerary.title}
                            img="/assets/images/itinerary.png"
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
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default ItineraryList;

