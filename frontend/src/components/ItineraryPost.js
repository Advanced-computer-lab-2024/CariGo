import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box } from '@mui/material';
import { Chip } from '@mui/material';
import PinDropIcon from '@mui/icons-material/PinDrop';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import StarIcon from '@mui/icons-material/Star';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logoImage from '../assets/itinerary.png'; // Correct relative path

export default function ItineraryPost({
  id,
  title,
  img,
  start_date,
  end_date,
  locations,
  price,
  tags,
  transportation,
  accommodation,
  rating,
  isBooked,
  accessibility,
}) {
  const navigate = useNavigate();

  // Format the date and time
  const formatDateTime = (dateString) => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    };
    return new Date(dateString).toLocaleString(undefined, options);
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this itinerary?");
    if (confirmDelete) {
      try {
        const token = localStorage.getItem('jwt');
        if (!token) {
          throw new Error("No token found. Please log in.");
        }

        // Assuming you have the correct API endpoint to delete an itinerary
        await axios.delete(`/cariGo/Event/itineraries/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        alert("Itinerary deleted successfully");
        // Optionally use navigate or a callback to update the parent component
        navigate('/tour_guide/itineraries'); // Redirect to the itineraries list or any other page
      } catch (error) {
        console.error('Failed to delete itinerary:', error.response ? error.response.data : error.message);
        alert(`An error occurred while deleting the itinerary. Details: ${error.message}`);
      }
    }
  };

  return (
    <Card
      sx={{
        width: '100%',
        maxWidth: '900px',
        height: '400px',
        color: '#126782',
        fontSize: '18px',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '10px',
        position: 'relative',
        margin: '20px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        transition: 'transform 0.3s ease',
        '&:hover': {
          transform: 'scale(1.02)',
          cursor: 'pointer',
        },
      }}
      onClick={() => navigate(`/tour_guide/itineraries/${id}`)}
    >
      <Box sx={{ display: 'flex', flexDirection: 'row', flexGrow: 1 }}>
        <CardMedia
          component="img"
          image={logoImage || "/default-itinerary.jpg"}
          alt="Itinerary Image"
          sx={{
            width: '500px',
            height: '250px',
            margin: '2px',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          }}
        />

        <Box sx={{ display: 'flex', flexDirection: 'column', width: '400px', padding: '10px' }}>
          <CardHeader
            avatar={<Avatar sx={{ bgcolor: red[500] }}>{title?.charAt(0) || 'A'}</Avatar>}
            title={
              <Typography variant="h5" sx={{ fontWeight: 'bold', fontSize: '24px' }}>
                {title || "Anonymous"}
              </Typography>
            }
          />

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginLeft: '15px' }}>
            {tags?.map((tag) => (
              <Chip key={tag._id} label={tag.title} sx={{ backgroundColor: '#126782', color: 'white' }} />
            ))}
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', marginLeft: '30px' }}>
            <Box sx={{ display: 'flex' }}>
              <StarIcon sx={{ scale: '0.9' }} />
              <Typography sx={{ fontSize: '16px', marginTop: '1px' }}>{rating || "No rating"}</Typography>
            </Box>
            <Typography sx={{ fontSize: '16px' }}>
              From: {formatDateTime(start_date)}
            </Typography>
            <Typography sx={{ fontSize: '16px' }}>
              To: {formatDateTime(end_date)}
            </Typography>

            <Box sx={{ display: 'flex', marginTop: '5px' }}>
              <PinDropIcon />
              <Typography sx={{ marginLeft: '5px' }}>Locations: {locations?.join(', ') || "Not specified"}</Typography>
            </Box>

            <Box sx={{ display: 'flex', marginTop: '5px' }}>
              <AttachMoneyIcon />
              <Typography sx={{ marginLeft: '5px', color: price ? '#126782' : '#ff4d4d' }}>
                {price ? `$${price}` : "Price not specified"}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary', marginTop: '-10px', fontSize: '16px', width: '460px' }}>
          {transportation || "No transportation info"} | {accommodation || "No accommodation info"}
        </Typography>
      </CardContent>

      <CardActions disableSpacing>
        <Box sx={{ position: 'absolute', bottom: '2px', left: '2px' }}>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
          <IconButton
            aria-label="delete"
            onClick={handleDelete} // Add the delete handler here
            sx={{ color: 'red' }} // Optional styling for the delete icon
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      </CardActions>
    </Card>
  );
}
