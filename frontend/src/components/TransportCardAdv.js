import React from "react";
import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Card, Divider, Link } from "@mui/material";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PinDropIcon from '@mui/icons-material/PinDrop';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import StarIcon from '@mui/icons-material/Star';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState } from 'react';

const TransportCardAdv = ({ Transportation }) => {
  const departure = Transportation.departureTime;
  const departureLocStr = Transportation.departureLocation.description;
  const arrival = Transportation.arrivalTime;
  const arrivalLocStr = Transportation.arrivalLocation.description;

  const navigate = useNavigate();

  const formatDuration = (duration) => {
    if (!duration) return ""; // Handle cases where duration might be undefined

    const durationString = duration.substring(2);
    return durationString.replace(/H/g, ' hours ').replace(/M/g, ' minutes ').trim();
  };

  const waitingTime = (time) => {
    let currentTime = new Date();

    if (time)
      return { hrs: time.hours - currentTime.getHours(), mins: time.minutes - currentTime.getMinutes() };
  }

  const handleLocationLinkClick = (locationMapLink) => {
    sessionStorage.setItem('previousPageState', JSON.stringify({
      departureTime: Transportation.departureTime,
      arrivalTime: Transportation.arrivalTime,
      price: Transportation.price,
    }));
  };

  // Event handlers for edit and delete actions
  const token = localStorage.getItem('jwt');
  const handleEditClick = () => {
    console.log("Edit clicked");
    // Navigate to edit page or open a modal for editing the transport card
    // For example, navigate(`/edit-transport/${Transportation.id}`);
  };

  const handleDeleteClick =async () => {
    console.log("Delete clicked");
    // Handle delete logic here, such as showing a confirmation modal
    // You can also make an API call to delete the transport item if required
  
    try{
    const response = await fetch(`http://localhost:4000/Carigo/Transportation/deleteTransportation/${Transportation._id}`, {
      method: 'DELETE',        headers: {
        Authorization: `Bearer ${token}`,
       
      }
    });
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    // Optionally, handle the success response here (e.g., show a message)
  } catch (error) {
    console.error("Error deleting activity:", error);
    // Handle error, possibly show an error message
  } finally {
    // Reload the current page
   window.location.reload();
  }
  };

  return (
    <Card variant="outlined" sx={{
      border: '2px solid #126782',
      borderColor: '#126782',
      borderRadius: '10px',
      minHeight: '320px',
      maxHeight: '600px',
      display: 'flex',
      flexDirection: 'column',
      width: '450px',
      margin: '20px',
      marginTop: '20px',
      marginRight: '60px',
      position: 'relative', // Add position relative to allow absolute positioning of the icons
    }}>
      <Box sx={{ margin: '5%', padding: '5px', marginTop: '2%' }}>
        {/* Header with Edit and Delete icons */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', gap: '10px' }}>
            {Transportation.carType === "car" ? (
              <DirectionsCarIcon fontSize="large" sx={{ fill: '#ff4d4d' }} />
            ) : (
              <DirectionsBusIcon fontSize="large" sx={{ fill: '#ff4d4d' }} />
            )}
            <StarIcon fontSize="large" sx={{ fill: '#126782', marginLeft: '60%', marginRight: '5px' }} />
            <Typography sx={{ fontSize: '20px', marginTop: '3px', color: '#126782' }}>
              {Transportation.ratingsAverage}
            </Typography>
          </Box>
        </Box>
        <Divider sx={{ borderBottomWidth: 3 }} />

        {/* INFO BOX */}
        <Box sx={{ margin: "10px", marginLeft: '10px' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <Box>
              <Typography sx={{ color: '#126782', padding: '1px', fontWeight: 'bold' }}>
                {departureLocStr ? departureLocStr : 'Departure Location'}
              </Typography>
              <Typography sx={{ color: '#ff4d4d', padding: '1px' }}>
                {`${Transportation.departureTime.hours}:${Transportation.departureTime.minutes} ${Transportation.departureTime.dayTime}`}
              </Typography>
            </Box>

            {arrival && (
              <Box>
                <Typography sx={{ color: '#126782', padding: '1px', fontWeight: 'bold' }}>
                  {arrivalLocStr ? arrivalLocStr : 'Arrival location'}
                </Typography>
                <Typography sx={{ color: '#ff4d4d', padding: '1px' }}>
                  {`${Transportation.arrivalTime.hours}:${Transportation.arrivalTime.minutes} ${Transportation.arrivalTime.dayTime}`}
                </Typography>
              </Box>
            )}
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <Typography sx={{ color: '#126782', padding: '1px', fontWeight: 'bold' }}>
              Driver Number
            </Typography>
            <Typography sx={{ color: '#ff4d4d', padding: '1px' }}>
              {Transportation.driverNumber || 'N/A'}
            </Typography>

            <Typography sx={{ color: '#126782', padding: '1px', fontWeight: 'bold' }}>
              Plate Number
            </Typography>
            <Typography sx={{ color: '#ff4d4d', padding: '1px' }}>
              {Transportation.plateNumber || 'N/A'}
            </Typography>
          </Box>

          {/* Location Links */}
          <Box sx={{ display: 'flex', gap: '10px', padding: '5px', marginLeft: '-10px' }}>
            <PinDropIcon fontSize="medium" sx={{ fill: "#126782" }} />
            <Link
        href={Transportation.departureLocationMapLink}  // Corrected this line
        sx={{
          color: '#126782',
          fontSize:'11px',
          padding: '1px',
          marginTop:'3px',
          cursor: 'pointer',
          textDecoration: 'underlined',
          textDecorationColor: '#126782',
        }}
        target="_blank"
      >
        click to view exact depature location
      </Link>
          </Box>

          <Box sx={{ display: 'flex', gap: '10px', padding: '5px', marginLeft: '-10px' }}>
            <PinDropIcon fontSize="medium" sx={{ fill: "#126782" }} />
            <Link  href={Transportation.arrivalLocationMapLink}  
         sx={{
          color: '#126782',
          fontSize:'11px',
          padding: '1px',
          marginTop:'3px',
          cursor: 'pointer',
          textDecoration: 'underlined',
          textDecorationColor: '#126782',
          }}
          target="_blank"
        >
          click to view exact arrival location
          </Link> 
          </Box>

          {/* AC Availability */}
          {Transportation.ac && (
            <Box sx={{ display: 'flex', gap: '5px', paddingTop: '10px' }}>
              <AcUnitIcon sx={{ fill: '#126782', fontSize: '30px' }} />
              <Typography sx={{ color: '#126782', fontWeight: 'bold' }}>Air Conditioned</Typography>
            </Box>
          )}

          {/* Price */}
          <Box sx={{ position: 'relative', padding: '10px' }}>
            <Box sx={{ display: 'flex', marginLeft: '-10px', padding: '5px', marginBottom: '10px', bottom: '10px' }}>
              <AttachMoneyIcon sx={{ marginTop: '0px', color: '#126782' }} />
              <Typography sx={{ color: '#126782', fontSize: '16px', marginLeft: '5px' }}>
                {Transportation.price}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Edit and Delete icons positioned at the bottom right */}
        <Box sx={{
          position: 'absolute',
          bottom: '10px',
          right: '10px',
          display: 'flex',
          gap: '15px', // Add gap between icons
        }}>
          <EditIcon
            sx={{ cursor: 'pointer', color: '#126782' }}
            to={`/trans/update/${Transportation._id}`} 
             
            onClick={() => navigate(`/trans/update/${Transportation._id}`)}
          />
          <DeleteIcon
            sx={{ cursor: 'pointer', color: '#ff4d4d' }}
            onClick={handleDeleteClick}
          />
        </Box>
      </Box>
    </Card>
  );
};

export default TransportCardAdv;
