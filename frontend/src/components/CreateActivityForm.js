import React, { useState } from "react";
import { FormControl } from '@mui/base/FormControl';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import { Button as BaseButton } from '@mui/base/Button';
import SelectTags from "./SelectTags";
import SelectCategory from "./SelectCategory";
import { useNavigate } from 'react-router-dom';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';


export default function CreateActivityForm() {
  const navigate = useNavigate();

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

  const validateFields = () => {
    const errors = {};
    if (!title) errors.title = "Title is required.";
    if (!description) errors.description = "Description is required.";
    if (!startDate) errors.startDate = "Start date is required.";
    if (!endDate) errors.endDate = "End date is required.";
    if (!lon) errors.lon = "Longitude is required.";
    if (!lan) errors.lan = "Latitude is required.";
    if (!tag) errors.tag = "Tag is required.";
    if (!category) errors.category = "Category is required.";
    if (minPrice < 0) errors.minPrice = "Minimum price cannot be negative.";
    if (maxPrice < 0) errors.maxPrice = "Maximum price cannot be negative.";
    if (discount < 0) errors.discount = "Discount cannot be negative.";
    
    return errors;
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    
    const errors = validateFields();
    if (Object.keys(errors).length > 0) {
      setErrorMessages(errors);
      return;
    } else {
      setErrorMessages({});
    }

    const activity = {
      title,
      description,
      start_date: startDate.format('YYYY-MM-DD'),
      end_date: endDate.format('YYYY-MM-DD'),
      tag,
      lon,
      lan,
      minPrice: parseFloat(minPrice),
      maxPrice: parseFloat(maxPrice),
      discount: parseFloat(discount),
      category,
    };

    const token = localStorage.getItem('jwt');

    if (!token) {
      setErrorMessages({ general: "No token found. Please log in." });
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/Carigo/Activity/createActivity", {
        method: 'POST',
        body: JSON.stringify(activity),
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const json = await response.json();

      if (!response.ok) {
        setErrorMessages({ general: json.error || "An error occurred while creating the activity." });
        return;
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
      console.log("Activity created");
      navigate('/activities');
    } catch (err) {
      setErrorMessages({ general: "Failed to create activity. Please try again." });
      console.error(err);
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
          <FormControl required sx={{ marginTop: '20px' }}>
            <Label>TITLE</Label>
            <StyledInput
              placeholder="Write your title here"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
            {errorMessages.title && <HelperText>{errorMessages.title}</HelperText>}
          </FormControl>

          <FormControl required>
            <Label>DESCRIPTION</Label>
            <StyledInput
              placeholder="Brief description of your activity"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            />
            {errorMessages.description && <HelperText>{errorMessages.description}</HelperText>}
          </FormControl>

          <FormControl required>
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

          <FormControl required>
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

          <FormControl required>
            <Label>LON</Label>
            <StyledInput
              placeholder="Activity longitude"
              onChange={(e) => setLon(e.target.value)}
              value={lon}
            />
            {errorMessages.lon && <HelperText>{errorMessages.lon}</HelperText>}
          </FormControl>
          <FormControl required>
            <Label>LAN</Label>
            <StyledInput
              placeholder="Activity latitude"
              onChange={(e) => setLan(e.target.value)}
              value={lan}
            />
            {errorMessages.lan && <HelperText>{errorMessages.lan}</HelperText>}
          </FormControl>

          <FormControl required>
            <Label>Tags</Label>
            <SelectTags tags={tag} setTags={setTags} />
            {errorMessages.tag && <HelperText>{errorMessages.tag}</HelperText>}
          </FormControl>

          <FormControl required>
            <Label>Category</Label>
            <SelectCategory tags={category} setTags={setCategory} />
            {errorMessages.category && <HelperText>{errorMessages.category}</HelperText>}
          </FormControl>

          <FormControl required>
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
        <Button onClick={handleCreate}>CREATE</Button>
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
