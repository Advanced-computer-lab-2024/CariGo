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
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Chip, Snackbar } from '@mui/material';
import PinDropIcon from '@mui/icons-material/PinDrop';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function TouristVintagePost({
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
  }
}) {
  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');

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
        console.error('Failed to delete vintage:', error.response ? error.response.data : error.message);
        setSnackbarMessage(`An error occurred while deleting the vintage. Details: ${error.message}`);
        setSnackbarOpen(true);
      }
    }
  };

  const handleShare = async (event) => {
    event.stopPropagation();
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
      if (error.response && error.response.status === 401) {
        setSnackbarMessage('You need to be logged in to share this vintage. Please log in and try again.');
      } else {
        setSnackbarMessage('Failed to share vintage. Please try again later.');
      }
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };
  const conversionRate = localStorage.getItem("conversionRate")||1;
  const code = localStorage.getItem("currencyCode")||"EGP";
  return (
    <Card
      sx={{
        width: '100%',
        //maxWidth: '900px',
        height: '80%',
        maxHeight:'100%',
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
        <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
          <CardMedia
            component="img"
            image={pictures[0] || '/ca353eb3-2c2e-4c9a-bcea-615f80995fd2.jpeg'}
            //image={'/ca353eb3-2c2e-4c9a-bcea-615f80995fd2.jpeg'}
            alt={name}
            sx={{
              width: '90%', // Adjusts to parent container's width
              maxWidth: '90%', // Maximum width for responsiveness
              height:'70%',
              maxHeight:'70%',
              aspectRatio: '16/9', // Forces all images to have the same aspect ratio
              borderRadius: '10px',
              margin: '5px',
              borderRadius: '10px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            }}
          />
          <CardContent sx={{ flexGrow: 1 , width:'95%', overflow:'overflow', marginTop:'3%'}}>
            <Typography variant="body2" sx={{ color: 'text.secondary', marginTop: '-10px', fontSize: '16px', }}>
              {description}
            </Typography>
          </CardContent>
          </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', width: '60%', padding: '10px' }}>
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

          <Box sx={{ display: 'flex', flexDirection: 'column', marginLeft: '5%', marginTop: '3%' , gap:'5px'}}>
            <Box sx={{ display: 'flex', marginTop: '5px' , marginTop: '2%', gap:'5px'}}>
              <AccessTimeIcon sx={{fill:'#ff4d4d'}}/>
              <Typography sx={{ fontSize: '16px', }}>
               {opening_hours.opening} - {opening_hours.closing}
              </Typography>
            </Box>
            {location && location.nation ? (
              <Box sx={{ display: 'flex', marginTop: '5px' }}>
                <PinDropIcon 
                //sx={{fill:'#ff4d4d', fontSize}}
                />
                <Typography sx={{ marginLeft: '5px' }}>
                 {location.nation.city}, {location.nation.country}<br/> (Lat: {location.latitude}, Long: {location.longitude})
                </Typography>
              </Box>
            ) : (
              <Typography sx={{ marginLeft: '5px', marginTop: '5px' }}>
                Location: Not specified
              </Typography>
            )}

            <Box sx={{ display: 'flex', marginTop: '5px' }}>
              <AttachMoneyIcon />
              <Typography sx={{ marginLeft: '5px', color: '#126782', fontWeight:'bold' }}>
                Ticket Prices in {`${code}`} 
              </Typography>
              </Box>
            {/* prices box */}
            <Box sx={{marginLeft:'8%',width:'35%'}}>
              <Box sx={{display:'flex' ,justifyContent:'space-between'}}>
                <Typography sx={{marginLeft:'10%'}}>
                  Foreigner 
                </Typography>
                <Typography sx={{color:'#ff4d4d', }}>
                  {(ticket_price.foriegner*conversionRate).toFixed(2)}
                </Typography>
              </Box>
              <Box sx={{display:'flex',justifyContent:'space-between'}}>
                <Typography sx={{marginLeft:'10%'}}>
                  Native 
                </Typography>
                <Typography sx={{color:'#ff4d4d', }}>
                  {(ticket_price.native*conversionRate).toFixed(2)}
                </Typography>
              </Box>
              <Box sx={{display:'flex' ,justifyContent:'space-between'}}>
                <Typography sx={{marginLeft:'10%'}}>
                  Student 
                </Typography>
                <Typography sx={{color:'#ff4d4d', }}>
                  {(ticket_price.student*conversionRate).toFixed(2)} 
                </Typography>
              </Box>
            </Box>
              
            
          </Box>
        </Box>
      </Box>

      <CardActions disableSpacing>
        <Box sx={{ position: 'absolute', bottom: '2px', left: '2px' }}>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share" onClick={handleShare}>
            <ShareIcon />
          </IconButton>
          <IconButton aria-label="delete" onClick={handleDelete} sx={{ color: 'red' }}>
            <DeleteIcon />
          </IconButton>
        </Box>
      </CardActions>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
    </Card>
  );
}