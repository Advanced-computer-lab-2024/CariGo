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

export default function LoginPage() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

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
      const response = await fetch("http://localhost:4000/cariGo/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
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

      // Store the token in localStorage
      localStorage.setItem('jwt', token);
      localStorage.setItem("id", data.data.user._id);
      localStorage.setItem("role", data.data.user.role);
      console.log(localStorage.getItem("role"));

      navigate('/'); 
    } catch (error) {
      console.error("Error:", error.message);
      alert("Login failed: " + error.message);
    }
  };

  return (
    <main style={{ 
      height: '100vh', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      backgroundColor: '#f5f5f5' // Light gray background to replace green
    }}>
      <CssBaseline />
      <Sheet
        sx={{
          width: 300, // Larger width for the form
          height: 400, // Smaller height for the form
          mx: 'auto', // margin left & right
          py: 4, // Increased padding top & bottom
          px: 3, // Increased padding left & right
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          borderRadius: 'sm',
          boxShadow: 'md',
          backgroundColor: 'white', // Ensure the background of the form is white
        }}
        variant="outlined"
      >
        <div>
          <Typography level="h4" component="h1">
            <b>Welcome!</b>
          </Typography>
          <Typography level="body-sm">Sign in to continue.</Typography>
        </div>
        <form onSubmit={handleSubmitLogin}>
          <FormControl>
            <FormLabel >Username</FormLabel>
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
          <Button sx={{ mt: 1 }} type='submit'>
            Log in
          </Button>
        </form>
        <Typography
          endDecorator={<Link href="/sign-up">Sign up</Link>}
          sx={{ fontSize: 'sm', alignSelf: 'center' }}
        >
          Don&apos;t have an account?
        </Typography>
      </Sheet>
    </main>
  );
}
