import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const MyMapComponent = ({ initialCoordinates, onLocationChange }) => {
  const [marker, setMarker] = useState(initialCoordinates);
  const [searchTerm, setSearchTerm] = useState('');

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

      if (response.data.length > 0) {
        const { lat, lon } = response.data[0];
        const newLocation = { lat, lng: lon };
        setMarker(newLocation); // Set the new marker position
        onLocationChange(newLocation); // Notify parent of the change
      } else {
        alert('Location not found.');
      }
    } catch (error) {
      console.error('Error fetching location:', error);
    }
  };

  const handleMarkerDrag = (event) => {
    const { lat, lng } = event.target.getLatLng();
    setMarker({ lat, lng });
    onLocationChange({ lat, lng });
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
    <div>
      <input
        type="text"
        placeholder="Search for a location"
        value={searchTerm}
        onChange={handleInputChange}
        onKeyPress={handleInputKeyPress}
        style={{
          position: 'absolute',
          zIndex: 1000,
          top: 20,
          left: '50%',
          transform: 'translateX(-50%)',
          padding: '10px',
          width: '250px',
          borderRadius: '5px',
          border: '1px solid #ccc',
        }}
      />
      <MapContainer
        center={[marker.lat, marker.lng]}
        zoom={13}
        style={{ height: '400px', width: '100%' }}
        whenCreated={(mapInstance) => {
          mapInstance.on('click', (e) => {
            const { lat, lng } = e.latlng;
            setMarker({ lat, lng });
            onLocationChange({ lat, lng });
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
    </div>
  );
};

export default MyMapComponent;
