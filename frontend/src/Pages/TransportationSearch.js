import React, { useState } from 'react';
import MyMapComponent from '../components/Map.js'; // assuming MyMapComponent is in the same directory
import { Box } from '@mui/material';
const TransportationSearch = () => {
  // State to store coordinates and description for both maps
  const [departureLocation, setDepartureLocation] = useState({ lat: 37.7749, lng: -122.4194 });
  const [arrivalLocation, setArrivalLocation] = useState({ lat: 37.7749, lng: -122.4194 });
  const [departureDescription, setDepartureDescription] = useState('');
  const [arrivalDescription, setArrivalDescription] = useState('m');
  const [date, setDate] = useState('2024-03-28T00:00:00.000Z');

  // Function to handle the search button click
  const handleSearch = async () => {
    const queryParams = new URLSearchParams({
      depLon: departureLocation.lng,
      depLat: departureLocation.lat,
      arrLon: arrivalLocation.lng,
      arrLat: arrivalLocation.lat,
      date: date,
      depDesc: departureDescription,
      arrDesc: arrivalDescription,
    });
    console.log(`http://localhost:4000/cariGo/transportation/?${queryParams.toString()}`)
    try {
      const response = await fetch(`http://localhost:4000/cariGo/transportation/?${queryParams.toString()}`, {
        method: 'GET',  // Use GET request as per the new request format
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      console.log('Search result:', data);
      // Handle the data, such as displaying it to the user

    } catch (error) {
      console.error('Error fetching transportation data:', error);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-around', padding: '20px' }}>
      {/* Left Map */}
      <Box sx={{ flex: 1, marginRight: '20px', position: 'relative' }}>
        <h2>Departure Location (Map 1)</h2>
        {/* Search Bar for Map 1 */}
        <input
          type="text"
          placeholder="Enter departure location description"
          value={departureDescription}
          onChange={(e) => setDepartureDescription(e.target.value)}
          style={{
            position: 'absolute',
            zIndex: 1000,
            top: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            padding: '10px',
            width: '250px',
            borderRadius: '5px',
            border: '1px solid #ccc',
          }}
        />
        <MyMapComponent 
          onLocationChange={(newLocation) => setDepartureLocation(newLocation)} 
          initialCoordinates={departureLocation}
        />
      </Box>

      {/* Right Map */}
      <div style={{ flex: 1, position: 'relative' }}>
        <h2>Arrival Location (Map 2)</h2>
        {/* Search Bar for Map 2 */}
        <input
          type="text"
          placeholder="Enter arrival location description"
          value={arrivalDescription}
          onChange={(e) => setArrivalDescription(e.target.value)}
          style={{
            position: 'absolute',
            zIndex: 1000,
            top: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            padding: '10px',
            width: '250px',
            borderRadius: '5px',
            border: '1px solid #ccc',
          }}
        />
        <MyMapComponent 
          onLocationChange={(newLocation) => setArrivalLocation(newLocation)} 
          initialCoordinates={arrivalLocation}
        />
      </div>

      {/* Search Form */}
      <div style={{ flexDirection: 'column', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <h2>Search Transportation</h2>
        <input
          type="text"
          placeholder="Enter a description for your trip"
          value={departureDescription}
          onChange={(e) => setDepartureDescription(e.target.value)}
          style={{ marginBottom: '10px', padding: '10px', width: '200px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        <button 
          onClick={handleSearch}
          style={{ padding: '10px 20px', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '5px' }}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default TransportationSearch;
