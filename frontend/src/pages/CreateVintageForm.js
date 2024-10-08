import React, { useState } from "react";
import { FormControl } from '@mui/base/FormControl';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import { Button as BaseButton } from '@mui/base/Button';
// import SelectTags from "../components/SelectTags";
// import SelectCategory from "../components/SelectCategory";
import { useNavigate } from 'react-router-dom';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { Checkbox, FormControlLabel } from '@mui/material'; // Import Checkbox components


export default function CreateVintageForm() {

    const token = localStorage.getItem('jwt'); // or sessionStorage if that's where it's stored
    const userId = localStorage.getItem('id');
    if (!token) {
        throw new Error('No token found. Please log in.');
    }

  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [pictures, setPictures] = useState([]);
  const [longitude, setLongitude] = useState('');
  const [latitude, setLatitude] = useState('');
//   const [country, setCountry] = useState('');
//   const [city, setCity] = useState('');
  const [nation, setNation] = useState({ country: '', city: '' }); // New nested attribute for nation
  const [foreigner, setForeigner] = useState(0);
  const [native, setNative] = useState(0);
  const [student, setStudent] = useState(0);
  const [tags, setTags] = useState([]); // State for tags
  const [opening, setOpening] = useState('');
  const [closing, setClosing] = useState('');
  const [errorMessages, setErrorMessages] = useState({});

  const handleTagChange = (event) => {
    const selectedTag = event.target.value;

    // Check if the tag is already in the array
    if (tags.includes(selectedTag)) {
      // If it is, remove it (for toggle behavior)
      setTags(tags.filter(tag => tag !== selectedTag));
    } else {
      // If not, add it
      setTags([...tags, selectedTag]);
    }
  };


  const validateFields = () => {
    const errors = {};
    if (!name) errors.name = "Name is required.";
    if (!description) errors.description = "Description is required.";
    if (!longitude) errors.longitude = "Longitude is required.";
    if (!latitude) errors.latitude = "Latitude is required.";
    // if (!country) errors.country = "Country is required.";  // Added country validation
    // if (!city) errors.city = "City is required.";            // Added city validation
    if (!opening) errors.opening = "Opening time is required.";
    if (!closing) errors.closing = "Closing time is required.";
    if (foreigner < 0) errors.foreigner = "Foreigner price cannot be negative.";
    if (native < 0) errors.native = "Native price cannot be negative.";
    if (student < 0) errors.student = "Student price cannot be negative.";
    // if (tags.length === 0) errors.tags = "At least one tag is required.";
    if (pictures.length === 0) errors.pictures = "At least one picture is required.";
    
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
    // Get the token from localStorage
    

    const vintage = {
        author: userId,
        name,
        description,
        pictures,
        location: {
          longitude,
          latitude,
          nation: {
            country: nation.country,
            city: nation.city,
          },
        }, // Updated location field to match the schema
        ticket_price: {
          foreigner: parseFloat(foreigner),
          native: parseFloat(native),
          student: parseFloat(student),
        },
        tags,
        opening_hours: { opening, closing },
      };
      

    // const token = localStorage.getItem('jwt');

    
    // if (!token) {
    //   setErrorMessages({ general: "No token found. Please log in." });
    //   return;
    // }

    try {
      const response = await fetch("http://localhost:4000/cariGo/Event/createvintage", {
        method: 'POST',
        body: JSON.stringify(vintage),
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
      setName('');
      setDescription('');
      setPictures([]);
      setLongitude('');
      setLatitude('');
    //   setCountry('');
    //   setCity('');
      setForeigner(0);
      setNative(0);
      setStudent(0);
      setTags([]);
      setOpening('');
      setClosing('');
      setErrorMessages({});
      console.log("Vintage created");
      navigate('/vintages');
    } catch (err) {
      setErrorMessages({ general: "Failed to create vintage. Please try again." });
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
        <h3 style={{ color: '#ff4d4d' }}>CREATE A NEW VINTAGE</h3>
        <Box sx={{ width: '100%', padding: '5px', paddingBottom: '20px' }}>
          <FormControl required sx={{ marginTop: '20px' }}>
            <Label>TITLE</Label>
            <StyledInput
              placeholder="Enter vintage name"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            {errorMessages.name && <HelperText>{errorMessages.name}</HelperText>}
          </FormControl>

          <FormControl required>
            <Label>DESCRIPTION</Label>
            <StyledInput
              placeholder="Brief description of the vintage"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            />
            {errorMessages.description && <HelperText>{errorMessages.description}</HelperText>}
          </FormControl>

          <FormControl required>
            <Label>PICTURES</Label>
            <StyledInput
              placeholder="Enter picture URLs separated by commas"
              onChange={(e) => setPictures(e.target.value.split(','))}
              value={pictures.join(',')}
            />
            {errorMessages.pictures && <HelperText>{errorMessages.pictures}</HelperText>}
          </FormControl>

          <FormControl required>
  <Label>Longitude</Label>
  <StyledInput
    placeholder="Enter longitude"
    onChange={(e) => setLongitude(e.target.value)}
    value={longitude}
  />
  {errorMessages.longitude && <HelperText>{errorMessages.longitude}</HelperText>}
</FormControl>

<FormControl required>
  <Label>Latitude</Label>
  <StyledInput
    placeholder="Enter latitude"
    onChange={(e) => setLatitude(e.target.value)}
    value={latitude}
  />
  {errorMessages.latitude && <HelperText>{errorMessages.latitude}</HelperText>}
</FormControl>

<FormControl required>
  <Label>Country</Label>
  <StyledInput
    placeholder="Enter country"
    onChange={(e) => setNation({ ...nation, country: e.target.value })}
    value={nation.country}
  />
  {errorMessages.nation && <HelperText>{errorMessages.nation}</HelperText>}
</FormControl>

<FormControl required>
  <Label>City</Label>
  <StyledInput
    placeholder="Enter city"
    onChange={(e) => setNation({ ...nation, city: e.target.value })}
    value={nation.city}
  />
  {errorMessages.nation && <HelperText>{errorMessages.nation}</HelperText>}
</FormControl>

          <FormControl required>
            <Label>Foreigner Price</Label>
            <StyledInput
              placeholder="Enter price for foreigners"
              type="number"
              onChange={(e) => setForeigner(e.target.value)}
              value={foreigner}
            />
            {errorMessages.foreigner && <HelperText>{errorMessages.foreigner}</HelperText>}
          </FormControl>

          <FormControl component="fieldset" required>
            <Label>Tags</Label>
            <FormControlLabel
              control={
                <Checkbox
                  value="tag:museums"
                  checked={tags.includes('tag:museums')}
                  onChange={handleTagChange}
                />
              }
              label="Museums"
            />
            <FormControlLabel
              control={
                <Checkbox
                  value="tag:monuments"
                  checked={tags.includes('tag:monuments')}
                  onChange={handleTagChange}
                />
              }
              label="Monuments"
            />
            <FormControlLabel
              control={
                <Checkbox
                  value="tag:religious sites"
                  checked={tags.includes('tag:religious sites')}
                  onChange={handleTagChange}
                />
              }
              label="Religious Sites"
            />
            <FormControlLabel
              control={
                <Checkbox
                  value="tag:palaces/castles"
                  checked={tags.includes('tag:palaces/castles')}
                  onChange={handleTagChange}
                />
              }
              label="Palaces/Castles"
            />
            {errorMessages.tags && <HelperText>{errorMessages.tags}</HelperText>}
          </FormControl>

          <FormControl required>
          <Label>Native Price</Label>
            <StyledInput
              placeholder="Enter price for natives"
              type="number"
              onChange={(e) => setNative(e.target.value)}
              value={native}
            />
            {errorMessages.native && <HelperText>{errorMessages.native}</HelperText>}
          </FormControl>

          <FormControl required>
          <Label>Student Price</Label>
            <StyledInput
              placeholder="Enter price for students"
              type="number"
              onChange={(e) => setStudent(e.target.value)}
              value={student}
            />
            {errorMessages.student && <HelperText>{errorMessages.student}</HelperText>}
          </FormControl>

          {/* <FormControl required>
          <Label>Tags</Label>
            <SelectTags tags={tags} setTags={setTags} />
            {errorMessages.tags && <HelperText>{errorMessages.tags}</HelperText>}
          </FormControl> */}

          <FormControl>
          <Label>Opening Time</Label>
            <StyledInput
              placeholder="Enter opening time (e.g., 09:00 AM)"
              onChange={(e) => setOpening(e.target.value)}
              value={opening}
            />
            {errorMessages.opening && <HelperText>{errorMessages.opening}</HelperText>}
          </FormControl>
          <FormControl required>
            <Label>Closing Time</Label>
            <StyledInput
              placeholder="Enter closing time (e.g., 05:00 PM)"
              onChange={(e) => setClosing(e.target.value)}
              value={closing}
            />
            {errorMessages.closing && <HelperText>{errorMessages.closing}</HelperText>}
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
