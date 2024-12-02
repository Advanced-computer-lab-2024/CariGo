import * as React from 'react';
import { Box, Chip, Snackbar ,Typography,IconButton,Avatar,Card, CardHeader,CardMedia,CardContent,CardActions} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PinDropIcon from '@mui/icons-material/PinDrop';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import SellIcon from '@mui/icons-material/Sell';
import StarIcon from '@mui/icons-material/Star';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import TimelapseIcon from '@mui/icons-material/Timelapse';
export default function ActivityPost({ id,author, img, start_date, end_date, duration, tag, description, title,location,
    price,category,discount,isOpened, rating}) {
  const [expanded, setExpanded] = React.useState(false);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const navigate = useNavigate();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleShare = async (e) => {
    e.stopPropagation();
    try {
      const token = localStorage.getItem('jwt');
      if (!token) {
        throw new Error("No token found. Please log in.");
      }

      const response = await axios.get(`/cariGo/Activity/shareActivity/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const shareLink = response.data;

      if (navigator.share) {
        await navigator.share({
          title: 'Check out this activity!',
          text: 'I found this great activity on CariGo',
          url: shareLink,
        });
      } else {
        await navigator.clipboard.writeText(shareLink);
        setSnackbarMessage('Link copied to clipboard!');
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error('Error sharing activity:', error);
      if (error.response) {
        if (error.response.status === 404) {
          setSnackbarMessage('Activity not found. It may have been deleted.');
        } else if (error.response.status === 401) {
          setSnackbarMessage('You need to be logged in to share this activity. Please log in and try again.');
        } else {
          setSnackbarMessage('An error occurred while sharing the activity. Please try again later.');
        }
      } else if (error.request) {
        setSnackbarMessage('Unable to reach the server. Please check your internet connection and try again.');
      } else {
        setSnackbarMessage('An unexpected error occurred. Please try again later.');
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
        //width: '100%', // Use full width of the container
        width: '100%', // Set a max width
        height:'370px',
        maxHeight: '500px',
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
      onClick={() => navigate(`/activity/${id}`)}
    >
      <Box sx={{ display: 'flex', flexDirection: 'row', flexGrow: 1 }}>
        <CardMedia
          component="img"
          image={img || "/0ae1e586-0d84-43c3-92d4-924c13c01059.jpeg"}
          alt={title}
          sx={{
            width: '400px',
            height: '250px',
            margin: '5px',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          }}
        />
        
        <Box sx={{ display: 'flex', flexDirection: 'column' , margin:'15px', marginLeft:'25px',}}>
          <Box
            sx={{
              //width: '400px',
              //padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'overflow',
            }}
          >
            <CardHeader
            // avatar={<Avatar sx={{ bgcolor: red[500] }}>R</Avatar>}
              title={
                <Typography variant="h5" sx={{ width: '300px', fontWeight: 'bold', fontSize: '24px', marginLeft:'-5px' }}>
                  {title}
                </Typography>
              }
            />

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginLeft: '10px' }}>
              {tag != null && <Chip label={tag} sx={{backgroundColor :'#126782', color: 'white' }} />}
            </Box>
          </Box>
          
          {/* Data Stuff */}
          <Box
            sx={{
              display: 'flex',
              flexFlow: 'column', 
              margin:'10px',
              marginLeft: '15px',
            }}
          >
            <Typography>
              category: {category != null ? category:"no specified category"}
            </Typography>

            <Box sx={{display:'flex', }}>
            <StarIcon sx={{scale:'0.9'}}/>
            <Typography sx={{fontSize: '16px',marginTop:'1px'}}>{""+rating+""}</Typography>
            </Box>
            <Box sx={{
              fontSize: '16px',
              backgroundColor: isOpened === 'open' ? '#70db70' : '#ff4d4d',
              color: 'white', 
              display: 'inline-block',
              borderRadius: '4px',
              width: isOpened === 'open' ? '50px' : '60px',
            }}>
              <Typography sx={{ marginLeft: '6px', marginBottom: '2px' }}>
                {isOpened || "status"}
                </Typography>
                </Box>
        
            <Box sx={{ display: 'flex',
                marginTop: '5px',
                margoinLeft:'-10px' ,
                
                }}>
            <AttachMoneyIcon />
            <Typography sx={{
                marginLeft:'5px',
                color: '#126782',
                marginRight: '5px',
            }}> {
              price != null?
              ((price*conversionRate).toFixed(2)) +` ${code}`   //((price.range?.max*conversionRate).toFixed(2)+"-"+(price.range?.min*conversionRate).toFixed(2) ) +` ${code}`
              :'no specified price'}
              </Typography>

              <Box sx={{
                backgroundColor : '#ff4d4d',
                display: 'flex',
                marginLeft: '5px',
                borderRadius: '5px',
                padding: '0px',
              }}>
                <Typography sx={{marginLeft:'5px', color: "white"}}>{"-"+discount+"%" || ''}</Typography>
                <SellIcon sx={{scale: '0.7', color: 'white', marginTop:'2px', marginLeft:'-2px'}}/>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box sx={{display:'flex', flexDirection:'column', }}>
      {/* Description */}
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
            marginTop: '-10px',
            marginLeft: '-5px',
            flexWrap: 'wrap',
            fontSize: '16px',
            width: '460px',
            position: 'absolute',
            top: '290px',
          }}
        >
          {description}
        </Typography>
      </CardContent>

      <CardActions disableSpacing>
        <Box sx={{ position: 'absolute', bottom: '2px', left: '2px' }}>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share" onClick={handleShare}>
            <ShareIcon />
          </IconButton>
          <IconButton
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <MoreVertIcon />
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
      </Box>
    </Card>
  );
}