import * as React from 'react';
import ToggleButtonGroup from '@mui/joy/ToggleButtonGroup';
import Button from '@mui/joy/Button';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';

export default function UserAcList({ activities }) {
  const [type, setType] = React.useState('disc');

  return (
    <Stack spacing={2}>
      <List marker={type}>
        {activities.map((activity, index) => (
          <ListItem key={index}>
            <Typography variant="h6"><strong>{activity.name}</strong></Typography>
            <Typography variant="body2">
              - {activity.description}
            </Typography>
            <Typography variant="caption">
              <strong>Start Date:</strong> {activity.startDate} <br />
              <strong>End Date:</strong> {activity.endDate}
            </Typography>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}
