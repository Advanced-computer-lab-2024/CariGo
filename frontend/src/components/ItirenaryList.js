import React, { useState, useEffect } from 'react';
import ItineraryPost from "./ItineraryPost";
import ItineraryCard from "./UserItineraryPost";
import { Grid, Box } from '@mui/material';
import ItineraryImage from '../assets/itinerary.png';
// import { Grid } from '@mui/material';
// import itineraryImg from '../assets/itinerary.jpeg'

const ItineraryList = () => {
    const [itineraries, setItineraries] = useState([]);

    useEffect(() => {
        const fetchItineraries = async () => {
            try {
                const token = localStorage.getItem('jwt');
                const userId = localStorage.getItem('id');
                if (!token) {
                    throw new Error('No token found. Please log in.');
                }
                
                const response = await fetch(`/cariGo/Event/readMyItineraries?id=${userId}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const json = await response.json();
                setItineraries(json.filter(itinerary => itinerary.isActive === true));
            } catch (error) {
                console.log('Error fetching itineraries:', error);
            }
        };

        fetchItineraries();
    }, []);

    return (
        // <Grid container spacing={0} sx={{ display: 'flex', flexDirection: 'column', width: '100vw' }}>
        //     {itineraries.map((itinerary, index) => (
        //         <Grid item key={index} sx={{ display: 'flex', justifyContent: 'left' }}>
                    // <ItineraryPost
                    //     id={itinerary._id}
                    //     title={itinerary.title}
                    //     img={"frontend/public/assets/images/itirenary.png"}
                    //     start_date={itinerary.start_date}
                    //     end_date={itinerary.end_date}
                    //     locations={itinerary.locations}
                    //     price={itinerary.price}
                    //     tags={itinerary.tags}
                    //     transportation={itinerary.transportation}
                    //     accommodation={itinerary.accommodation}
                    //     rating={itinerary.ratingsAverage}
                    //     isBooked={itinerary.isBooked}
                    //     accessibility={itinerary.accessibility}
                    // />
        //         </Grid>
        //     ))}
        // </Grid>
        <Box sx={{ width: '100%', padding: '20px' }}>
            <Grid container spacing={3}>
                {itineraries.map((itinerary) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={itinerary._id}>
                        {/* <ItineraryCard
                            id={itinerary._id}
                            author={itinerary.author}
                            title={itinerary.title}
                            img={ItineraryImage}
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
                        /> */}
                        <ItineraryPost
                        id={itinerary._id}
                        title={itinerary.title}
                        img={ItineraryImage}
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
