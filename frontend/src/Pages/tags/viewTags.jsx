import React, { useState } from "react";
import axios from "axios";

export default function FetchCategories() {
  const [categories, setCategories] = useState([]); // State to hold fetched categories
  const [loading, setLoading] = useState(false); // Loading state

  const fetchCategories = async () => {
    setLoading(true); // Start loading
    try {
      const response = await axios.get("http://localhost:4000/Admin/getTags"); // Fetch from backend
      console.log(response.data); // Log the response data
      setCategories(response.data); // Set the categories state
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div>
      <button onClick={fetchCategories}>Fetch Categories</button>
      {loading && <p>Loading categories...</p>
      }
      <ul>
        {categories.map((category) => (
          <li key={category._id}>
            <strong>Name:</strong> {category.title} <br />
          </li>
        ))}
      </ul>
    </div>
  );
}
