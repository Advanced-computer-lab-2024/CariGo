import React, { useEffect, useState } from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
      backgroundColor: "rgba(255, 255, 255)", // Match original background color
    },
  },
};

export default function SelectCategory({ tag = "", setTags }) {
  const [names, setNames] = useState([]);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await fetch(
          "http://localhost:4000/Admin/getCategories"
        );
        const data = await response.json();
        if (Array.isArray(data)) {
          const tagNames = data.map((tag) => tag.name);
          setNames(data);
        } else {
          console.error("Expected data to be an array:", data);
        }
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    };

    fetchTags();
  }, []);

  const handleChange = (event) => {
    const { value } = event.target;
    setTags(value);
  };

  return (
    <FormControl sx={{ width: 300 }}>
      <InputLabel id="demo-single-checkbox-label" sx={{ fontSize: "16px" }}>
        Tag
      </InputLabel>
      <Select
        labelId="demo-single-checkbox-label"
        id="demo-single-checkbox"
        value={tag}
        onChange={handleChange}
        input={<OutlinedInput label="Tag" />}
        renderValue={(selected) => {
          const selectedTag = names.find((tag) => tag._id === selected);
          return selectedTag ? selectedTag.name : "";
        }}
        MenuProps={MenuProps}
        sx={{
          scale: "1", // Increased scale for a clearer label and select area
          borderRadius: "8px", // More rounded border for a modern look
          mt: 1, // Consistent top margin for alignment
        }}
      >
        {names && names.length > 0 ? (
          names.map((tag) => (
            <MenuItem key={tag._id} value={tag._id}>
              <ListItemText primary={tag.name} />
            </MenuItem>
          ))
        ) : (
          <MenuItem disabled>
            <ListItemText primary="No tags available" />
          </MenuItem>
        )}
      </Select>
    </FormControl>
  );
}
