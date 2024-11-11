import React, { useState, useEffect , useRef} from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Box, TextField ,InputAdornment,} from '@mui/material';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import PinDropIcon from '@mui/icons-material/PinDrop';


const MyMapComponent = ({ initialCoordinates, onLocationChange }) => {
  const [marker, setMarker] = useState(initialCoordinates);
  const [searchTerm, setSearchTerm] = useState('');
  const mapRef = useRef(null); // Reference to the map instance
  const[Location, setLocation] = useState(initialCoordinates)

  useEffect(() => {
    setMarker(initialCoordinates);
  }, [initialCoordinates]);

  // Update marker position after search result
  const handleSearch = async (location) => {
    if (!location) return;

    try {
      const response = await axios.get('https://nominatim.openstreetmap.org/search', {
        params: {
          q: location,
          format: 'json',
          limit: 1,
        },
      });

      console.log(response);
      if (response.data.length > 0) {
        const { lat, lon } = response.data[0];
        const newLocation = { lat: parseFloat(lat), lng: parseFloat(lon) };

        setMarker(newLocation); // Set the new marker position
        onLocationChange(newLocation); // Notify parent of the change
        //Move the map to the new location
        if (mapRef.current) {
          mapRef.current.flyTo([Marker.lat, Marker.lon ], 13, { animate: true });
        }
      } else {
        alert('Location not found.');
      }
    } catch (error) {
      console.error('Error fetching location:', error);
    }
    finally{
      
    }
  };

  const handleMarkerDrag = (event) => {
    const { lat, lng } = event.target.getLatLng();
    const newPosition = { lat, lng };
    
    // Update marker position and move the map center
    setMarker(newPosition);
    onLocationChange(newPosition);

    if (mapRef.current) {
      mapRef.current.flyTo([Marker.lat, Marker.lon], 13, { animate: true });
    }
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleInputKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(searchTerm);
    }
  };

  return (
    
    <Box sx={{display:'flex', flexDirection:'column', gap:'15px',}}>
      {/*WHEN USING PUT IN Box COMPONENT TO DECIDE WIDTH */}
      <TextField
        variant='outlined'
        type="text"
        placeholder="Search for a location"
        value={searchTerm}
        onChange={handleInputChange}
        onKeyPress={handleInputKeyPress}
        sx={{width: '250px',}}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <PinDropIcon />
            </InputAdornment>
          ),
          
        }}
      />
      {/*map box */}
      <Box sx={{ height: '300px', width: '100%' }}>
      <MapContainer
        center={[marker.lat, marker.lng]}
        zoom={13}
        style={{ height: '300px', width: '100%' }}
        whenCreated={(mapInstance) => {
          mapRef.current = mapInstance; ; // Assign map instance to mapRef
          mapInstance.on('click', (e) => {
            const { lat, lng } = e.latlng;
            setMarker({ lat, lng });
            onLocationChange({ lat, lng });
            mapRef.current.flyTo([lat, lng], 13, { animate: true });
          });
        }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker
          position={[marker.lat, marker.lng]}
          draggable={true}
          eventHandlers={{
            dragend: handleMarkerDrag,
          }}
          icon={new L.Icon({
            iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
          })}
        >
          <Popup>
            {`Latitude: ${marker.lat}, Longitude: ${marker.lng}`}
          </Popup>
        </Marker>
      </MapContainer>
      </Box>{/*end of map box*/}
    </Box>
  );
};

export default MyMapComponent;
