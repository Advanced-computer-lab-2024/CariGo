import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const MyMapComponent = () => {
  const [location, setLocation] = useState('');
  const [marker, setMarker] = useState(null);

  const handleSearch = async () => {
    if (!location) return;

    try {
      const response = await axios.get(`https://nominatim.openstreetmap.org/search`, {
        params: {
          q: location,
          format: 'json',
          limit: 1,
        },
      });

      if (response.data.length > 0) {
        const { lat, lon } = response.data[0];
        setMarker({ latitude: lat, longitude: lon });
      } else {
        alert('Location not found.');
      }
    } catch (error) {
      console.error('Error fetching location:', error);
    }
  };

  const handleMarkerDrag = (event) => {
    const { lat, lng } = event.target.getLatLng();
    setMarker({ latitude: lat, longitude: lng });
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search for a location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === 'Enter') handleSearch(); // Search on Enter key press
        }}
      />
      <MapContainer
        center={[51.505, -0.09]} // Default center
        zoom={4}
        style={{ height: '400px', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {marker && (
          <Marker
            position={[marker.latitude, marker.longitude]}
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
              Location: {marker.latitude}, {marker.longitude}
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};

export default MyMapComponent;
