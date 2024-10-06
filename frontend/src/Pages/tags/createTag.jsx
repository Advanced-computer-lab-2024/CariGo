import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function CreateTag() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const handleCreateTag = async () => {
    try {
      const response = await axios.post("http://localhost:4000/Admin/createTag", { title });
      toast.success(response.data.message); // Show success message
      setTitle(""); // Reset input field
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Error creating tag"; // Access the message from error response
      toast.error(errorMessage); // Show error message
    }
  };

  return (
    <div>
      <h1>Create Tag</h1>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Tag Title"
        required
      />
      <button onClick={handleCreateTag}>Create</button>
    </div>
  );
}
