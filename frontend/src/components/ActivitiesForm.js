// ActivitiesForm.js
import React, { useState } from 'react';
import { Box, Button, Input, TextField } from '@mui/material';

const ActivitiesForm = ({ activities, setActivities }) => {
  const handleChange = (index, field, value) => {
    const updatedActivities = [...activities];
    updatedActivities[index] = {
      ...updatedActivities[index],
      [field]: value,
    };
    setActivities(updatedActivities);
  };

  const handleAddActivity = () => {
    setActivities([...activities, { name: '', start_date: '', end_date: '', description: '' }]);
  };

  const handleRemoveActivity = (index) => {
    const updatedActivities = activities.filter((_, i) => i !== index);
    setActivities(updatedActivities);
  };

  return (
    <Box>
      {activities.map((activity, index) => (
        <Box key={index} sx={{ marginBottom: 2 }}>
          <Input
            placeholder="Activity Name"
            value={activity.name}
            onChange={(e) => handleChange(index, 'name', e.target.value)}
          />
          <TextField
            type="datetime-local"
            label="Start Date"
            value={activity.start_date ? new Date(activity.start_date).toISOString().slice(0, 16) : ''}
            onChange={(e) => handleChange(index, 'start_date', e.target.value)}
          />
          <TextField
            type="datetime-local"
            label="End Date"
            value={activity.end_date ? new Date(activity.end_date).toISOString().slice(0, 16) : ''}
            onChange={(e) => handleChange(index, 'end_date', e.target.value)}
          />
          <Input
            placeholder="Activity Description"
            value={activity.description}
            onChange={(e) => handleChange(index, 'description', e.target.value)}
          />
          <Button variant="outlined" color="error" onClick={() => handleRemoveActivity(index)}>
            Remove
          </Button>
        </Box>
      ))}
      <Button variant="contained" onClick={handleAddActivity}>
        Add Activity
      </Button>
    </Box>
  );
};

export default ActivitiesForm;
