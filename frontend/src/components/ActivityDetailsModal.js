import React, { useState } from 'react';
import { Modal, Box, Typography, Button, IconButton, Grid, Paper } from '@mui/material';
import { Close as CloseIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import EditModal from './EditActivityModal';


const StyledModal = styled(Modal)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const ModalContent = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[5],
  padding: theme.spacing(4),
  outline: 'none',
  borderRadius: theme.shape.borderRadius,
  maxWidth: 600,
  width: '90%',
  maxHeight: '90vh',
  overflowY: 'auto',
}));


const DetailsModal =  ({ open, onClose, activity, onUpdate }) => {
  const navigate = useNavigate();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
 

  const handleEdit = () => {
    setIsEditModalOpen(true);
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this activity?");
    if (confirmDelete) {
      try {
        const token = localStorage.getItem('jwt');
        const response = await fetch(`http://localhost:4000/Carigo/Activity/deleteActivity/${id}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        onClose();
        navigate('/activities');
      } catch (error) {
        console.error("Error deleting activity:", error);
      }
    }
  };

  const handleUpdate = async (updatedActivity) => {
    try {
      const token = localStorage.getItem('jwt');
      const response = await fetch(`http://localhost:4000/cariGO/Activity/updateActivity/${activity.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedActivity),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const updatedData = await response.json();
      onUpdate(updatedData);
    } catch (error) {
      console.error("Error updating activity:", error);
    }
  };

  if (!activity) return null;

  const { 
    id, 
    author, 
    img, 
    start_date, 
    end_date, 
    location, 
    duration, 
    price, 
    category, 
    rating, 
    discount, 
    isOpened, 
    title, 
    tag, 
    description 
  } = activity;

  return (
    <>
    <StyledModal open={open} onClose={onClose}>
      <ModalContent elevation={3}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h5" component="h2" sx={{ color: 'primary.main', fontWeight: 700 }}>
            Activity Details
          </Typography>
          <IconButton onClick={onClose} size="small" sx={{ color: 'text.secondary' }}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box sx={{ position: 'relative', mb: 3 }}>
          <img 
            src={img || "/placeholder.svg"} 
            alt={title} 
            style={{ 
              width: '100%', 
              height: 250, 
              objectFit: 'cover', 
              borderRadius: 8 
            }} 
          />
          <Typography 
            variant="h6" 
            sx={{ 
              position: 'absolute', 
              bottom: 16, 
              left: 16, 
              color: 'white', 
              backgroundColor: 'rgba(0,0,0,0.6)', 
              padding: '4px 8px', 
              borderRadius: 4 
            }}
          >
            {title}
          </Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper elevation={1} sx={{ p: 2, mb: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main', mb: 1 }}>Activity Information</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                 
                  <Typography variant="body1" sx={{ fontWeight: 700 }}>Start Date: <span style={{ fontWeight: 400  , color : '#ff6b35' }}>{start_date}</span></Typography>
                  <Typography variant="body1" sx={{ fontWeight: 700 }}>End Date: <span style={{ fontWeight: 400  , color : '#ff6b35' }}>{end_date}</span></Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body1" sx={{ fontWeight: 700 }}>Price: <span style={{ fontWeight: 400  , color : '#ff6b35' }}>${price}</span></Typography>
                  <Typography variant="body1" sx={{ fontWeight: 700 }}>Category: <span style={{ fontWeight: 400  , color : '#ff6b35' }}>{category}</span></Typography>
                  <Typography variant="body1" sx={{ fontWeight: 700 }}>Status: <span style={{ fontWeight: 400  , color : '#ff6b35' }}>{isOpened ? 'Open' : 'Closed'}</span></Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper elevation={1} sx={{ p: 2, mb: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main', mb: 1 }}>Additional Details</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body1" sx={{ fontWeight: 700 }}>Duration: <span style={{ fontWeight: 400  , color : '#ff6b35' }}>{duration}</span></Typography>
                  <Typography variant="body1" sx={{ fontWeight: 700 }}>Discount: <span style={{ fontWeight: 400  , color : '#ff6b35' }}>{discount}% off</span></Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body1" sx={{ fontWeight: 700 }}>Tag: <span style={{ fontWeight: 400  , color : '#ff6b35' }}>{tag}</span></Typography>
                  <Typography variant="body1" sx={{ fontWeight: 700 }}>Location: <span style={{ fontWeight: 400 , color : '#ff6b35' }}>{location ? `Lat: ${location.lat}, Lon: ${location.lon}` : 'Not specified'}</span></Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper elevation={1} sx={{ p: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main', mb: 1 }}>Description</Typography>
              <Typography variant="body1" sx={{ lineHeight: 1.6  , color : '#ff6b35'  }}>{description}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Typography variant="body1" sx={{ fontWeight: 700, mr: 1 }}>Rating:</Typography>
              {[...Array(5)].map((_, index) => (
                <span key={index} style={{ color: index < Math.floor(rating) ? '#ff6b35' : '#ccc' }}>★</span>
              ))}
              <Typography variant="body1" sx={{ ml: 1 }}>({rating})</Typography>
            </Box>
          </Grid>
        </Grid>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 4 }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<EditIcon />}
            onClick={handleEdit}
            sx={{ 
              fontWeight: 700,
              '&:hover': { backgroundColor: 'primary.dark' } 
            }}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={handleDelete}
            sx={{ 
              fontWeight: 700,
              '&:hover': { backgroundColor: 'error.dark' } 
            }}
          >
            Delete
          </Button>
        </Box>
      </ModalContent>
    </StyledModal>
    <EditModal 
        open={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)} 
        activity={activity}
        onUpdate={handleUpdate}
      />
      </>
    
  );
};

export default DetailsModal;

