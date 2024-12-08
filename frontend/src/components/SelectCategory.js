import React, { useState, useEffect } from 'react';
import { FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';

export default function SelectCategory({ tag = '', setTags }) {
  const [names, setNames] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:4000/Admin/getCategories');
        const data = await response.json();
        if (Array.isArray(data)) {
          const categoryNames = data.map(category => category.name);
          setNames(categoryNames);
        } else {
          console.error('Expected data to be an array:', data);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (event) => {
    const selectedCategory = event.target.value;
    setTags(selectedCategory);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="category-select-label">Category</InputLabel>
        <Select
          labelId="category-select-label"
          id="category-select"
          value={tag}
          label="Category"
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

