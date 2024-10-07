import React from 'react';
import NavBar from '../../components/NavBarTourist'; // Adjust path if necessary
import ActivityList from '../../components/ActivityListUser'; // Adjust path if necessary
import { Box } from '@mui/material';

const TouristGuestHome = () => {
    return (
        <div>
            <NavBar />
            <Box sx={{
                width: '1150px',
                overflow: 'hidden',
                margin: '0 auto',
                padding: '20px',
                height: '80vh', // Set a fixed height for the scrolling area
                overflow: 'auto', // Enable scrolling
                '&::-webkit-scrollbar': {
                    display: 'none', // Hides the scrollbar for WebKit browsers (Chrome, Safari)
                },
            }}>
                <ActivityList />
            </Box>
        </div>
    );
};

export default TouristGuestHome;
