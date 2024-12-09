import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ActivityPostAdvList from './ActivityPostAdvList';
import ActivityPostAdvertiser from './ActivityPostAdvertiser';
import CreateActivityForm from './CreateActivityForm';
import CreateTransportationForm from './CreateTransportationForm';
import TransportListAdvertiser from './TransportListAdvertiser';
import { jwtDecode } from "jwt-decode";
import Repo from './Report/dashboard/Dashboard';

export default function CenteredTabs() {
  const [value, setValue] = React.useState(0);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [createFormType, setCreateFormType] = React.useState(null);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleCreateClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (type) => {
    setCreateFormType(type);
    if (type === 'activity') {
      setValue(1); // Switch to the Activity Post tab
    } else {
      setValue(0); // Switch to the first tab for transportation
    }
    handleMenuClose();
  };

  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        centered
        textColor="inherit"
        indicatorColor="primary"
        sx={{
          '& .MuiTabs-indicator': {
            backgroundColor: '#ff683c',
          },
          '& .Mui-selected': {
            color: '#ff683c',
          },
          '& .MuiTab-root': {
            color: '#577b98',
          },
        }}
      >
        <Tab
          label={
            <Button
              endIcon={<ArrowDropDownIcon />}
              onClick={handleCreateClick}
              sx={{ color: 'inherit' }}
            >
              Create
            </Button>
          }
        />
        <Tab label="Activity Post" />
        <Tab label="My Transportations" />
        <Tab label="View Report" />
      </Tabs>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => handleMenuItemClick('activity')}>Create Activity</MenuItem>
        <MenuItem onClick={() => handleMenuItemClick('transportation')}>Create Transportation</MenuItem>
      </Menu>

      <Box sx={{ padding: 3 }}>
        {value === 0 && createFormType === 'transportation' && <CreateTransportationForm />}
        {value === 1 && (
          <>
            {createFormType === 'activity' ? (
              <CreateActivityForm onActivityCreated={() => {
                setCreateFormType(null);
                setValue(1);
              }} />
            ) : (
              <ActivityPostAdvList />
            )}
          </>
        )}
        {value === 2 && <TransportListAdvertiser />}
        {value === 3 && <Repo />}
      </Box>
    </Box>
  );
}

