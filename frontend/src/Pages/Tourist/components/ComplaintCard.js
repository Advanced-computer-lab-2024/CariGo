// ComplaintCard.js
import React from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Box,
  Chip,
  Divider,
} from '@mui/material';
import { format } from 'date-fns';

const ComplaintCard = ({ title, body, date, status, reply }) => {
  return (
    <Card
      sx={{
        maxWidth: 600,
        margin: '20px auto',
        boxShadow: 4,
        borderRadius: 2,
        padding: 2,
        backgroundColor: '#f9f9f9',
      }}
    >
      {/* Card Header with Title and Status */}
      <CardHeader
        title={<Typography variant="h6">{title}</Typography>}
        action={
          <Chip
            label={status}
            color={status === 'Resolved' ? 'success' : 'warning'}
            sx={{
              fontWeight: 'bold',
              fontSize: '0.85rem',
            }}
          />
        }
        subheader={<Typography variant="caption">{format(new Date(date), 'MMMM dd, yyyy')}</Typography>}
      />

      <Divider />

      {/* Main Complaint Content */}
      <CardContent>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          {body}
        </Typography>
      </CardContent>

      {/* Divider Line */}
      <Divider light />

      {/* Reply Section (if exists) */}
      {reply && (
        <Box
          sx={{
            backgroundColor: '#e8f4f8',
            borderRadius: 1,
            padding: 2,
            marginTop: 2,
          }}
        >
          <Typography variant="subtitle2" color="primary" gutterBottom>
            Reply from Support
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {reply}
          </Typography>
        </Box>
      )}
    </Card>
  );
};

export default ComplaintCard;
