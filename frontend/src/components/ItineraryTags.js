import React, { useEffect, useState } from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import axios from "axios";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function ItineraryTags({ selectedTags, setSelectedTags }) {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    // Fetch tags from the backend
    const fetchTags = async () => {
      try {
        const response = await axios.get("http://localhost:4000/Admin/getTags");
        if (response.data && Array.isArray(response.data)) {
          setTags(response.data);
        } else {
          console.error("Unexpected response data format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    };

    fetchTags();
  }, []);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;

    // Find the corresponding tag objects from selected IDs
    const selectedTagObjects = value
      .map((id) => {
        const tag = tags.find((tag) => tag._id === id);
        return tag ? { _id: tag._id, title: tag.title } : null;
      })
      .filter(Boolean);

    setSelectedTags(selectedTagObjects);
  };

  return (
    <FormControl sx={{ width: 300 }}>
      <InputLabel id="tag-select-label">Tags</InputLabel>
      <Select
        labelId="tag-select-label"
        id="tag-select"
        multiple
        value={selectedTags.map((tag) => tag._id)} // Map selected tags to their IDs for tracking
        onChange={handleChange}
        input={<OutlinedInput label="Tags" />}
        renderValue={(selected) =>
          Array.isArray(selected) // Ensure `selected` is an array
            ? selectedTags
                .filter((tag) => selected.includes(tag._id)) // Filter selected tags
                .map((tag) => tag.title) // Map to titles for display
                .join(", ")
            : ""
        }
        MenuProps={MenuProps}
      >
        {tags && tags.length > 0 ? (
          tags.map((tag) => (
            <MenuItem key={tag._id} value={tag._id}>
              <Checkbox
                checked={selectedTags.some(
                  (selected) => selected._id === tag._id
                )}
              />
              <ListItemText primary={tag.title} />
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
