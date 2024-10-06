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
  const [minPrice, setminPrice] = useState(0);
  const [maxPrice, setmaxPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [error, setError] = useState(null);

  const handleCreate = async (e) => {
    e.preventDefault();

    // Validate start and end dates
    if (!startDate || !endDate) {
      setError("Start date and end date are required.");
      return;
    }

    const activity = {
      title,
      description,
      start_date: startDate.format('YYYY-MM-DD'),
      end_date: endDate.format('YYYY-MM-DD'),
      tag,
      lon,lan,
      minPrice: parseFloat(minPrice),
      maxPrice: parseFloat(maxPrice),
      discount: parseFloat(discount),
      category,
    };

    const token = localStorage.getItem('jwt');

    if (!token) {
      setError("No token found. Please log in.");
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
      console.log(activity);

      const json = await response.json();

      if (!response.ok) {
        setError(json.error || "An error occurred while creating the activity.");
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
      setminPrice(0);
      setmaxPrice(0);
      setDiscount(0);
      setError(null);
      console.log("Activity created");
      navigate('/activities');
    } catch (err) {
      setError("Failed to create activity. Please try again.");
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
            <HelperText />
          </FormControl>

          <FormControl required>
            <Label>DESCRIPTION</Label>
            <StyledInput
              placeholder="Brief description of your activity"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            />
            <HelperText />
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
            <HelperText />
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
            <HelperText />
          </FormControl>

          <FormControl required>
            <Label>LON</Label>
            <StyledInput
              placeholder="Activity location"
              onChange={(e) => setLon(e.target.value)}
              value={lon}
            />
            <HelperText />
          </FormControl>
          <FormControl required>
            <Label>LAN</Label>
            <StyledInput
              placeholder="Activity location"
              onChange={(e) => setLan(e.target.value)}
              value={lan}
            />
            <HelperText />
          </FormControl>

          <FormControl required>
            <Label>Tags</Label>
            <SelectTags tags={tag} setTags={setTags} />
            <p>Selected Tag: {tag}</p> {/* Display the selected tag */}
          </FormControl>


          <FormControl required>
            <Label>Category</Label>
            <SelectCategory tags={category} setTags={setCategory} />
          </FormControl>

          <FormControl required>
            <Label>minimum Price</Label>
            <StyledInput
              placeholder="Enter activity price"
              type="number"
              onChange={(e) => setminPrice(e.target.value)}
              value={minPrice}
            />
            <HelperText />
          </FormControl>

         
          <FormControl required>
            <Label>maximum Price</Label>
            <StyledInput
              placeholder="Enter activity price"
              type="number"
              onChange={(e) => setmaxPrice(e.target.value)}
              value={maxPrice}
            />
            <HelperText />
          </FormControl>

          <FormControl>
            <Label>DISCOUNT</Label>
            <StyledInput
              placeholder="Enter any discounts"
              type="number"
              onChange={(e) => setDiscount(e.target.value)}
              value={discount}
            />
            <HelperText />
          </FormControl>
        </Box>
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

