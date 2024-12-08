import * as React from 'react';
import { 
  Card, 
  CardMedia, 
  CardContent, 
  Typography, 
  IconButton, 
  Box, 
  Chip, 
  Button 
} from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function VintageTouristCard({
  author = "Anonymous",
  id,
  name = "No name provided",
  description = "No description available",
  pictures = [],
  location = null,
  ticket_price = {
    foriegner: "Not specified",
    native: "Not specified",
    student: "Not specified"
  },
  tags = [],
  opening_hours = {
    opening: "Not specified",
    closing: "Not specified"
  },
  rating = 4.5
}) {
  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const [isBookmarked, setIsBookmarked] = React.useState(false);

  const handleDelete = async (event) => {
    event.stopPropagation();
    const confirmDelete = window.confirm("Are you sure you want to delete this vintage?");
    if (confirmDelete) {
      try {
        const token = localStorage.getItem('jwt');
        if (!token) {
          throw new Error("No token found. Please log in.");
        }

        await axios.delete(`/cariGo/Event/deleteVintage/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setSnackbarMessage("Vintage deleted successfully");
        setSnackbarOpen(true);
        navigate('/myVintages');
      } catch (error) {
        console.error('Failed to delete vintage:', error);
        setSnackbarMessage('Failed to delete. Please try again.');
        setSnackbarOpen(true);
      }
    }
  };

  const handleShare = async (event) => {
    // event.stopPropagation();
    try {
      const token = localStorage.getItem('jwt');
      if (!token) {
        throw new Error("No token found. Please log in.");
      }

      const response = await axios.get(`/cariGo/Event/shareVintage/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const shareLink = response.data;

      if (navigator.share) {
        await navigator.share({
          title: 'Check out this vintage place!',
          text: 'I found this interesting vintage place on CariGo',
          url: shareLink,
        });
      } else {
        await navigator.clipboard.writeText(shareLink);
        setSnackbarMessage('Link copied to clipboard!');
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error('Error sharing vintage:', error);
      setSnackbarMessage('Failed to share. Please try again.');
      setSnackbarOpen(true);
    }
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    setSnackbarMessage(isBookmarked ? 'Removed from bookmarks' : 'Added to bookmarks');
    setSnackbarOpen(true);
  };

  const handleViewDetails = () => {
    navigate(`/vintageDetails/${id}`);
  };

  const conversionRate = localStorage.getItem("conversionRate") || 1;
  const code = localStorage.getItem("currencyCode") || "EGP";

  return (
    <Card sx={{ 
      maxWidth: 345, 
      borderRadius: 2, 
      boxShadow: 3,
      bgcolor: 'background.paper',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    }}>
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          height="140"
          image={"./Rome.jpg"}
          alt={name}
        />
        <IconButton
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            bgcolor: 'background.paper',
            '&:hover': { bgcolor: 'background.paper' },
          }}
          aria-label="share"
           // Link the ShareIcon with the share function
        >
          <ShareIcon sx={{ color: '#ff6b35' }} onClick={handleShare} />
        </IconButton>
      </Box>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" sx={{ color: '#004e89', fontWeight: 'bold' }}>
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {description}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <AccessTimeIcon sx={{ color: '#1a659e', mr: 1 }} />
          <Typography variant="body2" color="text.secondary">
            {opening_hours.opening} - {opening_hours.closing}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {tags.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              size="small"
              sx={{
                bgcolor: '#f7c59f',
                color: '#004e89',
                '&:hover': { bgcolor: '#f7e1c6' },
              }}
            />
          ))}
        </Box>
      </CardContent>
      <Box sx={{ p: 2 }}>
        <button
          style={{
            width: "100%",
            backgroundColor: "#ff6b35", // Bright Orange
            color: "#ffffff", // White for contrast
            border: "none",
            borderRadius: "4px",
            padding: "8px 16px",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "background-color 0.3s",
          }}
          onClick={() => navigate(`/viewingAllvintage/${id}`)}
        >
          More Details
        </button>
      </Box>
    </Card>
  );
}
