import React, { useState } from 'react';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Input,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
const bcrypt = require("bcryptjs");

const theme = createTheme({
  palette: {
    primary: {
      main: "#004e89",
    },
    secondary: {
      main: "#ff6b35",
    },
    background: {
      default: "#F2F0EF",
      paper: "#f5f5f5",
    },
    text: {
      primary: "#004e89",
      secondary: "#ff6b35",
    },
    error: {
      main: "#ff6b35",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
      color: "#004e89",
    },
    h5: {
      fontWeight: 500,
      color: "#004e89",
    },
    h6: {
      fontWeight: 500,
      color: "#004e89",
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.5,
      color: "#1a659e",
    },
  },
});

export default function PassModal({ open, onClose }) {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    newPassword: '',
    confirmNewPassword: ''
  });

  const [isPasswordChange, setIsPasswordChange] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmitLogin = async (event) => {
    event.preventDefault();

    try {
      if (!(formData.username === localStorage.getItem("username"))) {
        throw new Error('Unauthorized: Incorrect username or password');
      } else {
        const response = await fetch("http://localhost:4000/cariGo/users/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: formData.username,
            password: formData.password
          }),
        });

        if (!response.ok) {
          if (response.status === 401) {
            throw new Error('Unauthorized: Incorrect username or password');
          }
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Login successful", data);
        
        const token = data.token;
        localStorage.setItem('jwt', token);
        localStorage.setItem("id", data.data.user._id);

        setIsPasswordChange(true);
      }
    } catch (error) {
      console.error("Error:", error.message);
      alert("Login failed: " + error.message);
    }
  };

  const handleSubmitNewPassword = async (event) => {
    event.preventDefault();

    if (formData.newPassword !== formData.confirmNewPassword) {
      setPasswordError("Passwords do not match.");
      return;
    }
    setPasswordError('');

    try {
      const userId = localStorage.getItem("id");
      const token = localStorage.getItem("jwt");

      const hashedPassword = await bcrypt.hash(formData.newPassword, 12);

      if (!token) {
        throw new Error("No token found. Please log in.");
      }
      const response = await fetch(`http://localhost:4000/cariGo/users/update/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ password: hashedPassword }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      console.log("Password updated successfully!");
      onClose();
      navigate("/login");

    } catch (error) {
      console.error("Error updating password:", error.message);
      alert("Failed to update password: " + error.message);
    }
  };

  return (
    <ThemeProvider theme={theme}>
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          border: '1px solid',
          borderColor: 'primary.main',
        }}
      >
        <Typography variant="h5" component="h2" gutterBottom sx={{ color: 'primary.main' }}>
          Welcome!
        </Typography>
        <Typography variant="body1" gutterBottom sx={{ color: 'text.secondary' }}>
          {!isPasswordChange
            ? "Enter your username and old password to change your password."
            : "Enter your new password."}
        </Typography>

        {!isPasswordChange ? (
          <form onSubmit={handleSubmitLogin}>
            <TextField
              fullWidth
              margin="normal"
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              margin="normal"
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <Button
              fullWidth
              variant="contained"
              type="submit"
              sx={{
                mt: 2,
                bgcolor: 'primary.main',
                color: 'background.paper',
                '&:hover': {
                  bgcolor: 'secondary.main',
                },
              }}
            >
              Check
            </Button>
          </form>
        ) : (
          <form onSubmit={handleSubmitNewPassword}>
            <TextField
              fullWidth
              margin="normal"
              label="New Password"
              name="newPassword"
              type="password"
              value={formData.newPassword}
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              margin="normal"
              label="Confirm New Password"
              name="confirmNewPassword"
              type="password"
              value={formData.confirmNewPassword}
              onChange={handleChange}
              required
            />
            {passwordError && (
              <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                {passwordError}
              </Typography>
            )}
            <Button
              fullWidth
              variant="contained"
              type="submit"
              sx={{
                mt: 2,
                bgcolor: 'primary.main',
                color: 'background.paper',
                '&:hover': {
                  bgcolor: 'secondary.main',
                },
              }}
            >
              Submit
            </Button>
          </form>
        )}
      </Box>
    </Modal>
    </ThemeProvider>
  );
}

