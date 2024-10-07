import * as React from 'react';
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
import { Box } from '@mui/material';
import { Chip } from '@mui/material';
import PinDropIcon from '@mui/icons-material/PinDrop'; // For location
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'; // For ticket prices
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';

export default function TouristVintagePost({
  author = "Anonymous",
  id,
  name = "No name provided",
  description = "No description available",
  pictures = [], // Default as an empty array
  location = null, // Default is null for the location
  ticket_price = {
    foreigner: "Not specified",
    native: "Not specified",
    student: "Not specified"
  },
  tags = [], // Default as an empty array
  opening_hours = {
    opening: "Not specified",
    closing: "Not specified"
  }
}) {
  const navigate = useNavigate();

  const handleDelete = async (event) => {
    event.stopPropagation();
    const confirmDelete = window.confirm("Are you sure you want to delete this itinerary?");
    if (confirmDelete) {
      try {
        const token = localStorage.getItem('jwt');
        if (!token) {
          throw new Error("No token found. Please log in.");
        }

        // Assuming you have the correct API endpoint to delete an itinerary
        await axios.delete(`/cariGo/Event/deleteVintage/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        alert("Itinerary deleted successfully");
        // Optionally use navigate or a callback to update the parent component
        navigate('/myVintages'); // Redirect to the itineraries list or any other page
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
      onClick={() => navigate(`/viewingAllvintage/${id}`)}
    >
      <Box sx={{ display: 'flex', flexDirection: 'row', flexGrow: 1 }}>
        <CardMedia
          component="img"
          image={pictures[0] || 'placeholder-image.jpg'} // Fallback to placeholder image if no pictures
          alt={name}
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
            avatar={<Avatar sx={{ bgcolor: red[500] }}>{author?.charAt(0)}</Avatar>}
            title={
              <Typography variant="h5" sx={{ fontWeight: 'bold', fontSize: '24px' }}>
                {name}
              </Typography>
            }
          />

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginLeft: '15px' }}>
            {tags?.map((tag, index) => (
              <Chip key={index} label={tag} sx={{ backgroundColor: '#126782', color: 'white' }} />
            ))}
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', marginLeft: '30px', marginTop: '10px' }}>
            {/* Check if location exists and render if available */}
            {location && location.nation ? (
              <Box sx={{ display: 'flex', marginTop: '5px' }}>
                <PinDropIcon />
                <Typography sx={{ marginLeft: '5px' }}>
                  Location: {location.nation.city}, {location.nation.country}<br/> (Lat: {location.latitude}, Long: {location.longitude})
                </Typography>
              </Box>
            ) : (
              <Typography sx={{ marginLeft: '5px', marginTop: '5px' }}>
                Location: Not specified
              </Typography>
            )}

            {/* Ticket Price Section */}
            <Box sx={{ display: 'flex', marginTop: '5px' }}>
              <AttachMoneyIcon />
              <Typography sx={{ marginLeft: '5px', color: '#126782' }}>
                Ticket Prices :<br/> Foreigner: {ticket_price.foreigner}<br/> Native: {ticket_price.native}<br/> Student: {ticket_price.student}
              </Typography>
            </Box>

            <Typography sx={{ fontSize: '16px', marginTop: '10px' }}>
              Opening Hours: {opening_hours.opening} - {opening_hours.closing}
            </Typography>
          </Box>
        </Box>
      </Box>

      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary', marginTop: '-10px', fontSize: '16px', width: '460px' }}>
          {description}
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
        </Box>
      </CardActions>
    </Card>
  );
}
