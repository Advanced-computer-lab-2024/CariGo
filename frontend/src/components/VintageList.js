import React, { useState, useEffect } from 'react';
import VintagePost from './VintagePost';
import { Grid } from '@mui/material';

const VintageList = () => {
    const [vintages, setVintages] = useState([]);
    const [errorMessage, setErrorMessage] = useState(''); // State to store error messages

    useEffect(() => {
        const fetchVintages = async () => {
            try {
                const token = localStorage.getItem('jwt');
                const userId = localStorage.getItem('id');
                
                if (!token) {
                    throw new Error('No token found. Please log in.');
                }
                
                const response = await fetch(`/cariGo/Event/readAllVintages?id=${userId}`, { 
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
                setVintages(json);
            } catch (error) {
                console.log('Error fetching vintages:', error);
                setErrorMessage(error.message); // Set error message in case of failure
            }
        };

        fetchVintages();
    }, []);

    return (
        <>
            {errorMessage ? (
                <p style={{ color: 'red', textAlign: 'center' }}>{errorMessage}</p> // Display error message if any
            ) : (
                <Grid container spacing={0} sx={{ display: 'flex', flexDirection: 'column', width: '100vw' }}>
                    {vintages.length > 0 ? (
                        vintages.map((vintage, index) => (
                            <Grid item key={index} sx={{ display: 'flex', justifyContent: 'left' }}>
                                <VintagePost
                                    id={vintage._id || 'N/A'} // Safely handle missing _id
                                    name={vintage.name || 'No name provided'} // Handle missing name
                                    description={vintage.description || 'No description available'} // Handle missing description
                                    pictures={vintage.pictures || []} // Handle missing pictures with an empty array
                                    location={vintage.location ? {
                                        longitude: vintage.location.longitude || 0, // Default longitude
                                        latitude: vintage.location.latitude || 0,   // Default latitude
                                        nation: {
                                            country: vintage.location.country || 'Unknown country',
                                            city: vintage.location.city || 'Unknown city',
                                        }
                                    } : null} // Handle missing location by setting it to null
                                    ticket_price={vintage.ticket_price ? {
                                        foreigner: vintage.ticket_price.foreigner || 'Not specified',
                                        native: vintage.ticket_price.native || 'Not specified',
                                        student: vintage.ticket_price.student || 'Not specified',
                                    } : {
                                        foreigner: 'Not specified',
                                        native: 'Not specified',
                                        student: 'Not specified',
                                    }} // Handle missing ticket_price safely
                                    tags={vintage.tags || []} // Default tags to an empty array if missing
                                    opening_hours={vintage.opening_hours ? {
                                        opening: vintage.opening_hours.opening || 'Not specified',
                                        closing: vintage.opening_hours.closing || 'Not specified',
                                    } : {
                                        opening: 'Not specified',
                                        closing: 'Not specified',
                                    }} // Handle missing opening_hours safely
                                />
                            </Grid>
                        ))
                    ) : (
                        <p>No vintage posts available.</p> // Display a message if no vintages are found
                    )}
                </Grid>
            )}
        </>
    );
};

export default VintageList;
