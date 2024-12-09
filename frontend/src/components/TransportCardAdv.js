import React from "react";
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent,
  Divider, 
  Link, 
  IconButton
} from "@mui/material";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PinDropIcon from '@mui/icons-material/PinDrop';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import StarIcon from '@mui/icons-material/Star';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const TransportCardAdv = ({ Transportation }) => {
  const navigate = useNavigate();

  const handleDeleteClick = async () => {
    if (window.confirm("Are you sure you want to delete this transportation?")) {
      try {
        const token = localStorage.getItem('jwt');
        const response = await fetch(`http://localhost:4000/Carigo/Transportation/deleteTransportation/${Transportation._id}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        window.location.reload();
      } catch (error) {
        console.error("Error deleting transportation:", error);
      }
    }
  };

  return (
    <Card 
      sx={{
        border: '2px solid #004e89',
        borderRadius: '10px',
        width: '450px',
        margin: '20px',
        marginTop: '20px',
        marginRight: '60px',
        position: 'relative',
        minHeight: '320px',
        maxHeight: '600px',
        display: 'flex',
        flexDirection: 'column',
        transition: 'box-shadow 0.3s',
        '&:hover': {
          boxShadow: '0 4px 20px 0 rgba(0,0,0,0.12)',
        },
      }}
    >
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Box sx={{ display: 'flex', gap: '10px' }}>
            {Transportation.carType === "car" ? (
              <DirectionsCarIcon fontSize="large" sx={{ color: '#ff6b35' }} />
            ) : (
              <DirectionsBusIcon fontSize="large" sx={{ color: '#ff6b35' }} />
            )}
            <StarIcon fontSize="large" sx={{ color: '#004e89', ml: '60%', mr: '5px' }} />
            <Typography sx={{ fontSize: '20px', mt: '3px', color: '#004e89' }}>
              {Transportation.ratingsAverage}
            </Typography>
          </Box>
        </Box>
        <Divider sx={{ borderBottomWidth: 3, mb: 2 }} />

        <Box sx={{ mb: 2 }}>
          <Typography sx={{ color: '#004e89', fontWeight: 'bold', mb: 0.5 }}>
            {Transportation.departureLocation.description || 'Departure Location'}
          </Typography>
          <Typography sx={{ color: '#ff6b35' }}>
            {`${Transportation.departureTime.hours}:${Transportation.departureTime.minutes} ${Transportation.departureTime.dayTime}`}
          </Typography>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography sx={{ color: '#004e89', fontWeight: 'bold', mb: 0.5 }}>
            {Transportation.arrivalLocation.description || 'Arrival Location'}
          </Typography>
          <Typography sx={{ color: '#ff6b35' }}>
            {`${Transportation.arrivalTime.hours}:${Transportation.arrivalTime.minutes} ${Transportation.arrivalTime.dayTime}`}
          </Typography>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography sx={{ color: '#004e89', fontWeight: 'bold', mb: 0.5 }}>
            Driver Number
          </Typography>
          <Typography sx={{ color: '#ff6b35' }}>
            {Transportation.driverNumber || 'N/A'}
          </Typography>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography sx={{ color: '#004e89', fontWeight: 'bold', mb: 0.5 }}>
            Plate Number
          </Typography>
          <Typography sx={{ color: '#ff6b35' }}>
            {Transportation.plateNumber || 'N/A'}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px', mb: 2 }}>
          <Link
            href={Transportation.departureLocationMapLink}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              display: 'flex',
              alignItems: 'center',
              color: '#004e89',
              fontSize: '11px',
              textDecoration: 'none',
              '&:hover': { textDecoration: 'underline' },
            }}
          >
            <PinDropIcon fontSize="small" sx={{ mr: 0.5 }} />
            Click to view exact departure location
          </Link>

          <Link
            href={Transportation.arrivalLocationMapLink}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              display: 'flex',
              alignItems: 'center',
              color: '#004e89',
              fontSize: '11px',
              textDecoration: 'none',
              '&:hover': { textDecoration: 'underline' },
            }}
          >
            <PinDropIcon fontSize="small" sx={{ mr: 0.5 }} />
            Click to view exact arrival location
          </Link>
        </Box>

        {Transportation.ac && (
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <AcUnitIcon sx={{ color: '#004e89', mr: 1 }} />
            <Typography sx={{ color: '#004e89', fontWeight: 'bold' }}>
              Air Conditioned
            </Typography>
          </Box>
        )}

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <AttachMoneyIcon sx={{ color: '#004e89' }} />
          <Typography sx={{ color: '#004e89', fontSize: '16px', ml: 0.5 }}>
            {Transportation.price}
          </Typography>
        </Box>

        <Box sx={{
          position: 'absolute',
          bottom: '10px',
          right: '10px',
          display: 'flex',
          gap: '15px',
        }}>
          <IconButton
            sx={{ color: '#004e89' }}
            onClick={() => navigate(`/trans/update/${Transportation._id}`)}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            sx={{ color: '#ff6b35' }}
            onClick={handleDeleteClick}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TransportCardAdv;

