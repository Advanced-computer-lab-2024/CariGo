import * as React from 'react';
import Sheet from '@mui/joy/Sheet';
import CssBaseline from '@mui/joy/CssBaseline';
import Typography from '@mui/joy/Typography';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const bcrypt = require("bcryptjs");

export default function Pass() {

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    newPassword: ''  // Step 1: Add newPassword to formData for later use

  });

  const [isPasswordChange, setIsPasswordChange] = useState(false); // Step 2: State to track password change phase
  const [passwordError, setPasswordError] = useState(''); // Step 2: State for password match error


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
      if(!(formData.username===localStorage.getItem("username")))
      {
        throw new Error('Unauthorized: Incorrect username or password');
      }
      else
      {
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
      console.log("here is the token")
      console.log(token);
      // Store the token in localStorage
      localStorage.setItem('jwt', token);

      localStorage.setItem("id", data.data.user._id);

     

      // Step 3: Set isPasswordChange to true to display new password input and submit button
      setIsPasswordChange(true);

      const id =  localStorage.getItem("id", data.data.user._id);
      console.log(id);
     
    }} 
    catch (error) {
      console.error("Error:", error.message);
      alert("Login failed: " + error.message);
    }
    
  };

  // Step 4: Function to handle submitting the new password
  const handleSubmitNewPassword = async (event) => {
    event.preventDefault();

    if (formData.newPassword !== formData.confirmNewPassword) {
      setPasswordError("Passwords do not match.");
      return;
    }
    setPasswordError(''); // Clear error if passwords match


    try {
        const userId = localStorage.getItem("id"); // Retrieve user ID from localStorage
        const token = localStorage.getItem("jwt"); // Retrieve token for authorization

        
        const hashedPassword = await bcrypt.hash(formData.newPassword, 12);//hashing the password so that it is not saved unhashed in the database

        if (!token) {
            throw new Error("No token found. Please log in.");
          }
        const response = await fetch(`http://localhost:4000/cariGo/users/update/${userId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          
          body: JSON.stringify({ password: hashedPassword }), // Only updating password by passing the hashed password
        });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      console.log("Password updated successfully!");
      navigate("/login"); // Redirect to login page after successful update

    } catch (error) {
      console.error("Error updating password:", error.message);
      alert("Failed to update password: " + error.message);
    }
  };

  return (
    <main>
      <CssBaseline />
      <Sheet
        sx={{
          width: 300,
          mx: 'auto', // margin left & right
          my: 4, // margin top & bottom
          py: 3, // padding top & bottom
          px: 2, // padding left & right
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          borderRadius: 'sm',
          boxShadow: 'md',
        }}
        variant="outlined"
      >
        <div>
          <Typography level="h4" component="h1">
            <b>Welcome!</b>
          </Typography>
          <Typography level="body-sm">enter your username and your old password in order to change password.</Typography>
        </div>
        {/* Step 5: Conditionally render based on isPasswordChange */}
        {!isPasswordChange ? (
          <form onSubmit={handleSubmitLogin}>
            <FormControl>
              <FormLabel>Username</FormLabel>
              <Input
                name="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
                placeholder="johndoe"
                required
              />
            </FormControl>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="password"
                required
              />
            </FormControl>
            <Button sx={{ mt: 1 }} type="submit">
              Check
            </Button>
          </form>
        ) : (
          <form onSubmit={handleSubmitNewPassword}>
            <Typography level="body-sm" sx={{ mt: 2 }}>
              Enter new password
            </Typography>
            <FormControl>
              <FormLabel>New Password</FormLabel>
              <Input
                name="newPassword"
                type="password"
                value={formData.newPassword}
                onChange={handleChange}
                placeholder="New password"
                required
              />
            </FormControl>
            <FormControl>
              <FormLabel>Confirm New Password</FormLabel>
              <Input
                name="confirmNewPassword"
                type="password"
                value={formData.confirmNewPassword}
                onChange={handleChange}
                placeholder="Confirm new password"
                required
              />
            </FormControl>
            {passwordError && (
              <Typography sx={{ color: 'red', mt: 1 }}>
                {passwordError}
              </Typography>
            )}
            <Button sx={{ mt: 1 }} type="submit">
              Submit
            </Button>
          </form>
        )}
        
      </Sheet>
    </main>
  );
}