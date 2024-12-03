// TopBar.jsx
import React, {useEffect, useState } from 'react';
import { Layout } from 'antd';
import { UserOutlined, BellOutlined, MessageOutlined, CheckCircleOutlined, WarningOutlined } from '@ant-design/icons'; // Import the icons
import logo from '../assests/logo.png';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import axios from "axios";
import Badge from '@mui/material/Badge';
import Button from "@mui/material/Button";

const TopBar = () => {
   const navigate  = useNavigate()
  const handleLogout = () =>{
    localStorage.clear();
    navigate("/")
    
  }
  const [username, setUsername] = useState(localStorage.getItem('username'))
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [anchorElNotifications, setAnchorElNotifications] = useState(null); // Notification menu anchor
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem('jwt');
        const response = await axios.get('http://localhost:4000/cariGo/notifications/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setNotifications(response.data.data.notifications);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };
    fetchNotifications();
  }, []);
  const markAsRead = async (id) => {
    try {
      const token = localStorage.getItem('jwt');
      await axios.patch(
        `http://localhost:4000/cariGo/notifications/${id}/mark-read`,
        null,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // Update state to remove the marked notification
      setNotifications((prev) => prev.filter((notification) => notification._id !== id));
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };


  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };


  const handleOpenNotifications = (event) => {
    setAnchorElNotifications(event.currentTarget);
  };


  const handleCloseNotifications = () => {
    setAnchorElNotifications(null);
  };


  const handleChangePass=()=>{
    handleCloseUserMenu();

    navigate('/change-password');
  }
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  //console.log(localStorage.getItem('username'))

  const getIcon = (type) => {
    switch (type) {
      case 'success': return <CheckCircleOutlined style={{ color: 'green' }} />;
      case 'warning': return <WarningOutlined style={{ color: 'orange' }} />;
      case 'info': return <MessageOutlined style={{ color: 'blue' }} />;
      default: return <BellOutlined />;
    }
  };

  return (
    <div style={{ 
      backgroundColor: '#001529', 
      color: '#fff', 
      padding: '0 20px', 
      height: '64px', 
      display: 'flex', 
      justifyContent: 'space-between', // Space out the items
      alignItems: 'center' 
    }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
      <Link to="/admin"> <img 
          src={logo} 
          alt="CariGo Logo" 
          style={{ height: '50px', marginRight: '10px', marginTop: '20px'}} // Adjust the height as needed
        /></Link>
        <h2 style={{ color: '#fff', margin: '0' }}> <Link to="/">CariGo</Link></h2>
      </div>
      <p style={{marginLeft:"900px"}}>Hi  { username}</p>
      <div style={{ display: 'flex', alignItems: 'center' }}>
  {/* Notification Icon */}
  <IconButton
  size="large"
  aria-label="show notifications"
  aria-controls="notification-menu"
  aria-haspopup="true"
  onClick={handleOpenNotifications}
  color="inherit"
>
  <Badge
    badgeContent={notifications.length}
    color="error"
    sx={{
      '& .MuiBadge-badge': {
        right: 1.5,
        top: 10,
        fontSize: '0.75rem',
        minWidth: '16px',
        height: '16px',
        borderRadius: '50%',
      },
    }}
  >
    <BellOutlined style={{ fontSize: '33px', color: 'white', marginRight: '1px' }} />
  </Badge>
</IconButton>


<Menu
  id="notification-menu"
  anchorEl={anchorElNotifications}
  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
  keepMounted
  transformOrigin={{ vertical: 'top', horizontal: 'right' }}
  open={Boolean(anchorElNotifications)}
  onClose={handleCloseNotifications}
  sx={{
    mt: 1,
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', // Soft shadow
    borderRadius: '8px', // Rounded corners
    overflow: 'hidden',
    minWidth: '300px', // Ensure a consistent width
  }}
>
  {notifications.length > 0 ? (
    notifications.map((notification) => (
      <MenuItem
        key={notification._id}
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          py: 1, // Padding for better spacing
          gap: 2, // Space between the icon and message
          borderBottom: '1px solid #e0e0e0', // Divider between notifications
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
          {getIcon(notification.type)}
          <Box sx={{ ml: 1 }}>
            <Typography variant="body1">
              {notification.message}
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: 'gray', fontSize: '0.75rem' }}
            >
              {/* {new Date(notification.date).toLocaleTimeString()} Time */}
            </Typography>
          </Box>
        </Box>
        <Button
          size="small"
          variant="text"
          sx={{
            color: notifications.length > 0 ? '#2196F3' : 'gray',
            textTransform: 'none',
            fontSize: '0.75rem',
            ':hover': {
              color: 'black',
            },
          }}
          onClick={() => markAsRead(notification._id)}
        >
          Mark as Read
        </Button>
      </MenuItem>
    ))
  ) : (
    <MenuItem>
      <Typography>No new notifications</Typography>
    </MenuItem>
  )}
</Menu>


        {/* User Menu */}
      <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="User Avatar" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              keepMounted
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              
              <MenuItem onClick={handleLogout}>
                <Typography sx={{ textAlign: 'center' }}>Logout</Typography>
              </MenuItem>
              <MenuItem onClick={handleChangePass}>
                <Typography sx={{ textAlign: 'center' }}>Change Password</Typography>
              </MenuItem>
            </Menu>
          </Box>      </div>
    </div>
  );
};

export default TopBar;
