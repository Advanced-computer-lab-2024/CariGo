import React, { useState } from 'react';
import { Box, TextField, List, ListItem, ListItemText } from '@mui/material';

const ActivityContainer = ({ activities }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredActivities, setFilteredActivities] = useState(activities);

  const handleSearchChange = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = activities.filter((activity) =>
      activity.name.toLowerCase().includes(value)
    );
    setFilteredActivities(filtered);
  };

  return (
    <Box 
      sx={{ 
        maxHeight: '400px', 
        overflowY: 'scroll', 
        padding: '1rem',
        border: '1px solid #ddd',
        borderRadius: '8px',
        backgroundColor: '#f9f9f9',
      }}
    >
      <TextField
        label="Search Activities"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={handleSearchChange}
        sx={{ marginBottom: '1rem' }}
      />
      
      <List>
        {filteredActivities.map((activity) => (
          <ListItem key={activity.id} button>
            <ListItemText primary={activity.name} secondary={activity.description} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ActivityContainer;
