import React from 'react';
import { List, ListItem, ListItemText, Typography, Box, Divider } from '@mui/material';
import { Event, AccessTime } from '@mui/icons-material';


export default function UserAcList({ activities }) {
  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {activities.map((activity, index) => (
        <React.Fragment key={index}>
          <ListItem alignItems="flex-start" sx={{ flexDirection: 'column', py: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, color: '#126782' }}>
              <Event sx={{ mr: 1 }} />
              <Typography variant="h6" component="div" >
                {activity.name}
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {activity.description}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', color: '#126782' }}>
              <AccessTime sx={{ mr: 1, fontSize: 'small' }} />
              <Typography variant="body2" component="span">
                {activity.startDate} - {activity.endDate}
              </Typography>
            </Box>
          </ListItem>
          {index < activities.length - 1 && <Divider variant="inset" component="li" />}
        </React.Fragment>
      ))}
    </List>
  );
}

