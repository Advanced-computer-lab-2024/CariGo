import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

const ITEM_HEIGHT = 30;
const ITEM_PADDING_TOP = 2;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 150,
      backgroundColor: 'rgba(233, 124, 255)',
    },
  },
};

export default function SelectTags({ tag = '', setTags }) {
  const [names, setNames] = React.useState([]);

  React.useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await fetch('http://localhost:4000/Admin/getCategories');
        const data = await response.json();
        console.log(data); // Log the data to see its structure
        // Check if data is an array
        if (Array.isArray(data)) {
          const tagNames = data.map(tag => tag.name);
          setNames(tagNames);
        } else {
          console.error('Expected data to be an array:', data);
        }
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
    setTags(value); // Set the single selected tag
  };

  return (
    <div>
      <FormControl sx={{ marginTop: '-18px', width: 300, height: 50, marginLeft: '-40px' }}>
        <InputLabel id="demo-single-checkbox-label"
          sx={{ fontSize: '14px', marginLeft: '40px', marginTop: '2px' }}
        >
          Tag
        </InputLabel>
        <Select
          sx={{ scale: '0.65', borderRadius: '10px', marginLeft: '-15px' }}
          labelId="demo-single-checkbox-label"
          id="demo-single-checkbox"
          value={tag}
          onChange={handleChange}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) => selected || 'Select a tag'}
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
              }}
            >
              <Checkbox checked={tag === name} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
