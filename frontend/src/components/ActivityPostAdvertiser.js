import React, { useState } from 'react';
import { Card, CardContent, CardMedia, Typography, IconButton, Box, Chip, Grid } from '@mui/material';
import { Info as InfoIcon, Event as EventIcon } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import DetailsModal from './ActivityDetailsModal';

const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  width: '100%',
  margin: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'scale(1.02)',
    cursor: 'pointer',
  },
}));

const ContentWrapper = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  width: '100%',
});

const IconsWrapper = styled(Box)({
  display: 'flex',
  justifyContent: 'flex-end',
  padding: '8px',
});

const ActivityPost = ({
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
  description,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <>
      <StyledCard>
        <CardMedia
          component="img"
          sx={{ width: 300, height: 300, objectFit: 'cover' }}
          image={img || '/placeholder.svg'}
          alt={title}
        />
        <ContentWrapper>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography
                  variant="h6"
                  sx={{ color: 'primary.main', fontWeight: 700 }}
                >
                  {title}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography
                  variant="body1"
                  sx={{ fontWeight: 700 }}
                >
                  Start Date:{' '}
                  <span style={{ fontWeight: 400, color: '#ff6b35' }}>
                    {start_date}
                  </span>
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ fontWeight: 700 }}
                >
                  End Date:{' '}
                  <span style={{ fontWeight: 400, color: '#ff6b35' }}>
                    {end_date}
                  </span>
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ fontWeight: 700 }}
                >
                  Duration:{' '}
                  <span style={{ fontWeight: 400, color: '#ff6b35' }}>
                    {duration}
                  </span>
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography
                  variant="body1"
                  sx={{ fontWeight: 700 }}
                >
                  Price:{' '}
                  <span style={{ fontWeight: 400, color: '#ff6b35' }}>
                    ${price}
                  </span>
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ fontWeight: 700 }}
                >
                  Category:{' '}
                  <span style={{ fontWeight: 400, color: '#ff6b35' }}>
                    {category}
                  </span>
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ fontWeight: 700 }}
                >
                  Status:{' '}
                  <span style={{ fontWeight: 400, color: '#ff6b35' }}>
                    {isOpened ? 'Open' : 'Closed'}
                  </span>
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: 700, mr: 1 }}
                  >
                    Rating:
                  </Typography>
                  {[...Array(5)].map((_, index) => (
                    <span
                      key={index}
                      style={{
                        color: index < Math.floor(rating) ? '#ff6b35' : '#ccc',
                      }}
                    >
                      ★
                    </span>
                  ))}
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: 400, ml: 1 }}
                  >
                    ({rating})
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Chip
                  label={tag}
                  size="small"
                  sx={{ backgroundColor: 'secondary.main', color: 'white', mr: 1 }}
                />
                <Chip
                  label={`${discount}% off`}
                  size="small"
                  sx={{ backgroundColor: 'error.main', color: 'white' }}
                />
              </Grid>
            </Grid>
          </CardContent>
          <IconsWrapper>
            <IconButton size="small" onClick={handleOpenModal}>
              <InfoIcon sx={{ color: 'primary.main' }} />
            </IconButton>
            <IconButton size="small">
              <EventIcon sx={{ color: 'secondary.main' }} />
            </IconButton>
          </IconsWrapper>
        </ContentWrapper>
      </StyledCard>
      <DetailsModal
        open={isModalOpen}
        onClose={handleCloseModal}
        activity={{
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
          description,
        }}
      />
    </>
  );
};

export default ActivityPost;
