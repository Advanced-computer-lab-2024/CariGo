import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import CT_Itinerary from "../Pages/CT_Itinerary"

// Example Components for the tabs

export default function CT_TourGuide({experience}) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {/* Tab Navigation */}
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
        <Tab label="My Itineraries" />
        <Tab label="Settings" />
      </Tabs>

      {/* Conditional Rendering Based on the Tab Selection */}
      <Box sx={{ padding: 3 }}>
        {value === 0 && <CT_Itinerary />}  
        {/* {value === 1 && <ActivityPostAdvertiser />}  Render Activity Post in Tab 2 */}
        {value === 1 && <div>Settings Component</div>}  {/* Placeholder for Settings in Tab 3 */}
      </Box>
    </Box>
  );
}
