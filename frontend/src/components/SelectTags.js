import React, { useState, useEffect } from 'react';
import { FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';

export default function SelectTags({ tag = '', setTags }) {
  const [names, setNames] = useState([]);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await fetch('http://localhost:4000/Admin/getTags');
        const data = await response.json();
        const tagNames = data.map(tag => tag.title);
        setNames(tagNames);
      } catch (error) {
        console.error('Error fetching tags:', error);
      }
    };

    fetchTags();
  }, []);

  const handleChange = (event) => {
    const selectedTag = event.target.value;
    setTags(selectedTag);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="tag-select-label">Tag</InputLabel>
        <Select
          labelId="tag-select-label"
          id="tag-select"
          value={tag}
          label="Tag"
          onChange={handleChange}
        >
          {names.map((name) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

