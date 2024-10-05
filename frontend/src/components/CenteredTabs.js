import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

export default function CenteredTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        centered
        textColor="inherit" // Optional: to keep text color consistent
        indicatorColor="primary" // Change this to the desired color
        sx={{
          '& .MuiTabs-indicator': {
            backgroundColor: '#ff683c', // Change this to your desired active tab color
          },
          '& .Mui-selected': {
            color: '#ff683c', // Change this to your desired text color for the active tab
          },
          '& .MuiTab-root': {
            color: '#577b98', // Change this to your desired text color for inactive tabs
          },
        }}
      >
        <Tab label="Item One" />
        <Tab label="Item Two" />
        <Tab label="Item Three" />
      </Tabs>
    </Box>
  );
}
