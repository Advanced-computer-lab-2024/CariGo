import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import axios from 'axios'; // Import axios for making HTTP requests

const ITEM_HEIGHT = 30;
const ITEM_PADDING_TOP = 2;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 150,  // Set width for the dropdown menu here
      maxWidth: 150,
      scale: 0.75,
      paddingRight: -90,
      backgroundColor: 'rgba(233, 124, 255)',
    },
  },
};

export default function SelectCategory() {
  const [tag, setTag] = React.useState([]);
  const [names, setNames] = React.useState([]); // State to hold tag names

  React.useEffect(() => {
    // Function to fetch tags from backend
    const fetchTags = async () => {
      try {
        const response = await fetch('http://localhost:4000/Admin/getCategories');
        const data = await response.json(); // Parse the JSON from the response
        console.log(data); // Log the data to see its structure
        const tagNames = data.map(tag => tag.name);
        setNames(tagNames);
      } catch (error) {
        console.error('Error fetching tags:', error);
      }
    };

    fetchTags();
  }, []);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setTag(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <div>
      <FormControl sx={{ marginTop: '-18px', width: 300, height: 50, marginLeft: "-40px" }}>  {/* Adjust margin and width */}
        <InputLabel id="demo-multiple-checkbox-label"
          sx={{ fontSize: '14px', marginLeft: '40px', marginTop: '2px' }}
        >Category</InputLabel>
        <Select sx={{ scale: '0.65', borderRadius: '10px', marginLeft: '-15px' }}
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={tag}
          onChange={handleChange}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem key={name} value={name}
              sx={{
                height: '25px',
                maxWidth: '150px',
                color: '#126782',
                paddingLeft: '0px',
                marginRight: "-20px",
              }} // Set minWidth here
            >
              <Checkbox checked={tag.includes(name)} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
