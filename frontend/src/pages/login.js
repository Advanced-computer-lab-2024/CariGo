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
  localStorage.clear();
 // console.log(localStorage.getItem('jwt') +"         d")
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
   console.log(token);
      // Store the token in localStorage
      localStorage.setItem('jwt', token);
      localStorage.setItem("id", data.data.user._id);
     // console.log(formData.username)
      localStorage.setItem('username',formData.username)
      localStorage.setItem("role", data.data.user.role);

      const id =  localStorage.getItem("id", data.data.user._id);
      console.log(id);
      switch (localStorage.getItem("role").toLocaleLowerCase()) {
        case "admin":
          navigate(`/admin`); // Redirect to "View All" page
          break;
        case "advertiser":
          navigate("/advertiser"); // Redirect to "Update" page
          break;
          case "tourist":
          navigate("/Tourist"); // Redirect to "Update" page
          break;
          case "toursim_governor":
          navigate("/myVintages"); // Redirect to "Update" page
          break;
        case "tour_guide":
           navigate('/tour_guide/itineraries');// Redirect to "Create" page
          break;
        case "seller":
          navigate("/Seller"); // Redirect to "Delete" page
          break;  
        default:
          navigate("/tgHome")

      }
     // navigate('/admin'); 
    } catch (error) {
      console.error("Error:", error.message);
      alert("Login failed: " + error.message);
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
          <Typography level="body-sm">Sign in to continue.</Typography>
        </div>
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
          <Button sx={{ mt: 1 }} type='submit'>
            Log in
          </Button>
        </form>
        <Typography
          endDecorator={<Link href="/signup">Sign up</Link>}
          sx={{ fontSize: 'sm', alignSelf: 'center' }}
        >
          Don&apos;t have an account?
        </Typography>
      </Sheet>
    </main>
  );
}