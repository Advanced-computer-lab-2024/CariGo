import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function CreateCategory() {
  const [name, setName] = useState(""); // State for category name
  const [description, setDescription] = useState(""); // State for category description
  const [loading, setLoading] = useState(false); // Loading state

  const handleCreateCategory = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    setLoading(true); // Start loading

    try {
      const response = await axios.post("http://localhost:4000/Admin/createCategory", {
        name,
        description,
      });
      toast.success(response.data.message); // Show success message
    } catch (error) {
      console.error("Error creating category:", error);
      const errorMessage = error.response?.data?.message || "Error creating category"; // Access the message from error response
      toast.error(errorMessage); // Show error message
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div>
      <h1>Create Category</h1>
      <form onSubmit={handleCreateCategory}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Category"}
        </button>
      </form>
    </div>
  );
}
