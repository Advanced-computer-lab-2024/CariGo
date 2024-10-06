import React, { useState } from "react";
import { FormControl, useFormControlContext } from '@mui/base/FormControl';
import { Input, inputClasses } from '@mui/base/Input';
import clsx from 'clsx';
import { Box, TextField, FormHelperText } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Button as BaseButton } from '@mui/base/Button';
import SelectTags from "./SelectTags";
import SelectCategory from "./SelectCategory";
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';




export default function UpdateActivityForm(){
    const {id} = useParams();
    // const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [tag, setTags] = useState('');
    const [category, setCategory] = useState('');
    const [lon, setLon] = useState('');
    const [lan, setLan] = useState('');
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [errorMessages, setErrorMessages] = useState({});

    const navigate = useNavigate();
   
    

    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setFormData({
    //       ...formData,
    //       [name]: value
    //     });
    //   };
    
        // Ensure the ID is correctly used in the URL.

        
        const handleUpdate = async (e) => {
          const activity = {};

          if (title) activity.title = title;
          if (description) activity.description = description;
          if (startDate) activity.start_date = startDate.format('YYYY-MM-DD');
          if (endDate) activity.end_date = endDate.format('YYYY-MM-DD');
          if (tag) activity.tag = tag;
          if (lon) activity.lon = lon;
          if (lan) activity.lan = lan;
          if (minPrice) activity.minPrice = parseFloat(minPrice);
          if (maxPrice) activity.maxPrice = parseFloat(maxPrice);
          if (discount) activity.discount = parseFloat(discount);
          if (category) activity.category = category;
        
          const token = localStorage.getItem('jwt');

          if (!token) {
            setErrorMessages({ general: "No token found. Please log in." });
            return;
          }
      
            try {
              const response = await fetch(`http://localhost:4000/cariGO/Activity/updateActivity/:${id}`, {
                method: 'PATCH', // Ensure the method is capitalized (PATCH)
                body: JSON.stringify(activity),
                headers: {
                  Authorization: `Bearer ${token}`,
                  'Content-Type': 'application/json',
                  // 'Access-Control-Allow-Methods':'GET, POST, PATCH, PUT, DELETE, OPTIONS',
                },
              
              });
        
              if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
              }


              // Reset fields
              setTitle('');
              setDescription('');
              setStartDate(null);
              setEndDate(null);
              setTags('');
              setLon('');
              setLan('');
              setMinPrice(0);
              setMaxPrice(0);
              setDiscount(0);
              setErrorMessages({});
              console.log("Activity updated");
        
              navigate('/advertiser'); 
            } catch (error) {
              console.error("Error:", error.message);
              //alert("Login failed: " + error.message);
            }  
    };

    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '560px',
          padding: '10px',
          color: '#ff4d4d',
          borderRadius: '15px',
          boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)',
          gap: '5px',
          margin: '20px',
          border: '2px solid #126782',
          paddingLeft: '30px',
        }}>
        <Box sx={{ marginLeft: '50px' }}>
          <h3 style={{ color: '#ff4d4d' }}>CREATE A NEW ACTIVITY</h3>
          <Box sx={{ width: '100%', padding: '5px', paddingBottom: '20px' }}>
            <FormControl  sx={{ marginTop: '20px' }}>
              <Label>TITLE</Label>
              <StyledInput
                placeholder="Write your title here"
                onChange={(e) => setTitle(e.target.value)}
              value={title}
              />
              {errorMessages.title && <HelperText>{errorMessages.title}</HelperText>}
            </FormControl>
  
            <FormControl >
              <Label>DESCRIPTION</Label>
              <StyledInput
                placeholder="Brief description of your activity"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              />
              {errorMessages.description && <HelperText>{errorMessages.description}</HelperText>}
            </FormControl>
  
            <FormControl >
              <Label>START DATE</Label>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  value={startDate}
                  onChange={(newValue) => setStartDate(newValue)}
                  renderInput={(params) => <StyledInput {...params} />}
                />
              </LocalizationProvider>
              {errorMessages.startDate && <HelperText>{errorMessages.startDate}</HelperText>}
            </FormControl>
  
            <FormControl >
              <Label>END DATE</Label>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  value={endDate}
                  onChange={(newValue) => setEndDate(newValue)}
                  renderInput={(params) => <StyledInput {...params} />}
                />
              </LocalizationProvider>
              {errorMessages.endDate && <HelperText>{errorMessages.endDate}</HelperText>}
            </FormControl>
  
            <FormControl >
              <Label>LON</Label>
              <StyledInput
                placeholder="Activity longitude"
                onChange={(e) => setLon(e.target.value)}
                value={lon}
              />
              {errorMessages.lon && <HelperText>{errorMessages.lon}</HelperText>}
            </FormControl>
            <FormControl >
              <Label>LAN</Label>
              <StyledInput
                placeholder="Activity latitude"
                onChange={(e) => setLan(e.target.value)}
                value={lan}
              />
              {errorMessages.lan && <HelperText>{errorMessages.lan}</HelperText>}
            </FormControl>
  
            <FormControl >
              <Label>Tags</Label>
              <SelectTags tags={tag} setTags={setTags} />
              {errorMessages.tag && <HelperText>{errorMessages.tag}</HelperText>}
            </FormControl>
  
            <FormControl >
              <Label>Category</Label>
              <SelectCategory tags={category} setTags={setCategory} />
              {errorMessages.category && <HelperText>{errorMessages.category}</HelperText>}
            </FormControl>
  
            <FormControl >
              <Label>Minimum Price</Label>
              <StyledInput
                placeholder="Enter minimum activity price"
                type="number"
                onChange={(e) => setMinPrice(e.target.value)}
                value={minPrice}
              />
              {errorMessages.minPrice && <HelperText>{errorMessages.minPrice}</HelperText>}
            </FormControl>
  
            <FormControl required>
              <Label>Maximum Price</Label>
              <StyledInput
                placeholder="Enter maximum activity price"
                type="number"
                onChange={(e) => setMaxPrice(e.target.value)}
                value={maxPrice}
              />
              {errorMessages.maxPrice && <HelperText>{errorMessages.maxPrice}</HelperText>}
            </FormControl>
  
            <FormControl>
              <Label>DISCOUNT</Label>
              <StyledInput
                placeholder="Enter any discounts"
                type="number"
                onChange={(e) => setDiscount(e.target.value)}
                value={discount}
              />
              {errorMessages.discount && <HelperText>{errorMessages.discount}</HelperText>}
            </FormControl>
          </Box>
          {errorMessages.general && <HelperText>{errorMessages.general}</HelperText>}
          <Button onClick={handleUpdate}>UPDATE</Button>
        </Box>
      </Box>
    );
  }
  
  // Styled components
  const StyledInput = styled('input')(({ theme }) => `
      width: 400px;
      padding: 8px 12px;
      border-radius: 8px;
      border: 1px solid ${theme.palette.mode === 'dark' ? '#6B7A90' : '#B0B8C4'};
      background: ${theme.palette.mode === 'dark' ? '#303740' : '#fff'};
      color: ${theme.palette.mode === 'dark' ? '#C7D0DD' : '#1C2025'};
      &:focus {
          outline: 0;
          border-color: #3399FF;
      }
  `);
  
  const Button = styled(BaseButton)(({ theme }) => `
      background-color: #ff4d4d;
      color: white;
      padding: 6px 8px;
      border-radius: 8px;
      cursor: pointer;
      transition: all 150ms ease;
      &:hover {
          background-color: #ff3333;
      }
  `);
  
  const Label = styled('label')`
      font-size: 0.875rem;
      margin-bottom: 4px;
      display: block;
  `;
  
  const HelperText = styled('p')`
      font-size: 0.75rem;
      color: red;
  `;