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
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box } from '@mui/material';
import { Chip } from '@mui/material';
import PinDropIcon from '@mui/icons-material/PinDrop';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import SellIcon from '@mui/icons-material/Sell';
import StarIcon from '@mui/icons-material/Star';
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';


export default function ActivityPost({ id,author, img, start_date, end_date, duration, tags, description, title,location,
    price,category,discount,isOpened, rating}) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

const navigate = useNavigate();
  return (
    // <Link 
    // to={`/activities/${id}`} 
    // style={{textDecoration:'none'}} 
    // onClick={() => navigate(`/activities/${id}`)}
    // >
    <Card
      sx={{
        width: '100%', // Use full width of the container
        maxWidth: '900px', // Set a max width
        height: '400px',
        color: '#126782',
        fontSize: '18px',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '10px',
        position: 'relative',
        margin: '20px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Box shadow all around
        transition: 'transform 0.3s ease', // Transition effect for size change
        '&:hover': {
          transform: 'scale(1.02)', // Scale up the card on hover
          cursor: 'pointer', // Change cursor to pointer
        },
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'row', flexGrow: 1 }}>
        
        <CardMedia
          component="img"
          image={img || "/0ae1e586-0d84-43c3-92d4-924c13c01059.jpeg"}
          alt={title}
          sx={{
            width: '500px',
            height: '250px',
            margin: '2px',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          }}
        />
        
        <Box sx={{ display: 'flex', flexDirection: 'column' ,}}>
          <Box
            sx={{
              width: '400px',
              padding: '10px',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'overflow',
              
            }}
          >
            <CardHeader
              avatar={<Avatar sx={{ bgcolor: red[500] }}>R</Avatar>}
              
              title={
                <Typography variant="h5" sx={{ width: '300px', fontWeight: 'bold', fontSize: '24px' }}>
                  {title}
                </Typography>
              }
            />

            {/* Tags below title */}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginLeft: '15px' }}>
              {
              tags != null ?
              tags.map((tag) => (
                <Chip key={tag} label={tag.title} sx={{backgroundColor :'#126782', color: 'white' }} />
              )) : ""}
            </Box>
          </Box>
          
          {/* Data Stuff */}
          <Box
            sx={{
              display: 'flex',
              flexFlow: 'column',
              marginLeft: '30px',
            }}
          >
            <Box sx={{display:'flex', }}>
            <StarIcon sx={{scale:'0.9'}}/>
            <Typography sx={{fontSize: '16px',marginTop:'1px'}}>{""+rating+""}</Typography>
            </Box>
            <Box sx={{
                fontSize: '16px',
                backgroundColor: isOpened === 'open' ? '#70db70' : '#ff4d4d',
                color: 'white', 
                //padding: '2px 0px',
                display: 'inline-block',
                borderRadius: '4px' ,
                width: isOpened === 'open' ? '50px' : '60px',
                }}>
            <Typography sx={{
                marginLeft: '6px',
                marginBottom: '2px',
                }}>
                {isOpened || "status"}
                </Typography>
                </Box>
                <Typography sx={{fontSize: '16px'}}>{category}</Typography>
            <Typography sx={{fontSize: '16px'}}>From: {start_date}</Typography>
            <Typography sx={{fontSize: '16px'}}>To: {end_date}</Typography>
            <Box sx={{ display: 'flex',
                marginTop: '5px',
                margoinLeft:'-10px' ,
                
                }}>
            <PinDropIcon sx={{marginTop:'0px',}}/>
            <Typography sx={{marginLeft:'5px'}}> {location}</Typography>
            </Box>
            
            <Typography sx={{fontSize: '16px', marginLeft: '30px'}}> {duration}</Typography>

            <Box sx={{ display: 'flex',
                marginTop: '5px',
                margoinLeft:'-10px' ,
                
                }}>
            <AttachMoneyIcon />
            <Typography sx={{
                marginLeft:'5px',
                textDecoration: discount>0 ? 'line-through' : 'none',
                color: discount>0 ? '#ff4d4d' : '#126782',
                marginRight: '5px',
            }}> {price != null? price+"" :'no specified price'}</Typography>
            <Typography sx={{fontSize: '16px'}}> {discount >0?  (price -(price*discount/100)): ''}</Typography>
            <Box sx={{
                backgroundColor : '#ff4d4d',
                display: 'flex',
                marginLeft: '5px',
                borderRadius: '5px',
                padding: '0px',
                }}>
                  
            <Typography sx={{marginLeft:'5px', color: "white"}}> {"-"+discount+"%" || ''}</Typography>
            <SellIcon  sx={{scale: '0.7', color: 'white', marginTop:'2px',marginLeft:'-2px',
                //do smth about display
            }}/>
            </Box>
            </Box>

          </Box>
        </Box>
      </Box>

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

      {/* Card actions */}
      <CardActions disableSpacing>
        <Box sx={{ position: 'absolute', bottom: '2px', left: '2px' }}>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
          <IconButton
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            {/* <ExpandMoreIcon /> */}
          </IconButton>
        </Box>
      </CardActions>
    </Card>
    // </Link>
  );
}
