import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function ManageTags() {
  const [tags, setTags] = useState([]); // State to hold fetched tags
  const [loading, setLoading] = useState(false); // Loading state

  // Fetch tags on component mount
  useEffect(() => {
    fetchTags();
  }, []);

  const fetchTags = async () => {
    setLoading(true); // Start loading
    try {
      const response = await axios.get("http://localhost:4000/Admin/getTags"); // Fetch from backend
      setTags(response.data); // Set the tags state
    } catch (error) {
      console.error("Error fetching tags:", error);
      toast.error("Error fetching tags."); // Show error message
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const deleteTag = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/Admin/deleteTag/${id}`); // Call delete endpoint
      toast.success("Tag deleted successfully!"); // Show success message
      fetchTags(); // Refresh the tag list
    } catch (error) {
      console.error("Error deleting tag:", error);
      const errorMessage = error.response?.data?.message || "Error deleting tag"; // Access the message from error response
      toast.error(errorMessage); // Show error message
    }
  };

  return (
    <div>
      <h1>Delete Tags</h1>
      {loading && <p>Loading tags...</p>}
      <ul>
        {tags.map((tag) => (
          <li key={tag._id}>
            {tag.title}
            <button onClick={() => deleteTag(tag._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
